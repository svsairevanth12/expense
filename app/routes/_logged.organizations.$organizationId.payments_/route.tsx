import {
  Typography,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Card,
  Switch,
  Row,
  Col,
  message,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function PaymentsPage() {
  const { organizationId } = useParams()
  const { user } = useUserContext()
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false)
  const [isMethodModalVisible, setIsMethodModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [methodForm] = Form.useForm()

  // Fetch payments
  const { data: payments, refetch: refetchPayments } =
    Api.payment.findMany.useQuery({
      where: { organizationId },
      include: { expense: true },
      orderBy: { createdAt: 'desc' },
    })

  // Fetch expenses
  const { data: expenses } = Api.expense.findMany.useQuery({
    where: { organizationId },
  })

  // Mutations
  const { mutateAsync: createPayment } = Api.payment.create.useMutation()
  const { mutateAsync: updateExpense } = Api.expense.update.useMutation()

  const handlePayment = async (values: any) => {
    try {
      await createPayment({
        data: {
          amount: values.amount,
          paymentMethod: values.paymentMethod,
          status: 'COMPLETED',
          organizationId,
          userId: user?.id || '',
          expenseId: values.expenseId,
        },
      })
      message.success('Payment processed successfully')
      setIsPaymentModalVisible(false)
      form.resetFields()
      refetchPayments()
    } catch (error) {
      message.error('Failed to process payment')
    }
  }

  const handleAutomaticPayment = async (
    expenseId: string,
    enabled: boolean,
  ) => {
    try {
      await updateExpense({
        where: { id: expenseId },
        data: { isRecurring: enabled },
      })
      message.success(`Automatic payments ${enabled ? 'enabled' : 'disabled'}`)
    } catch (error) {
      message.error('Failed to update automatic payments')
    }
  }

  const paymentColumns = [
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('MMM D, YYYY'),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: string) => `$${amount}`,
    },
    {
      title: 'Description',
      dataIndex: 'expense',
      key: 'description',
      render: (expense: any) => expense?.description || '-',
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <Title level={2}>
          <i className="las la-credit-card" style={{ marginRight: 8 }}></i>
          Payments Management
        </Title>
        <Text type="secondary">
          Manage your payments, payment methods, and automatic payments setup
        </Text>

        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} lg={16}>
            <Card
              title={
                <>
                  <i className="las la-history"></i> Payment History
                </>
              }
            >
              <Table
                dataSource={payments}
                columns={paymentColumns}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card>
              <Button
                type="primary"
                icon={<i className="las la-plus"></i>}
                block
                onClick={() => setIsPaymentModalVisible(true)}
                style={{ marginBottom: 16 }}
              >
                Process New Payment
              </Button>
              <Button
                icon={<i className="las la-wallet"></i>}
                block
                onClick={() => setIsMethodModalVisible(true)}
              >
                Manage Payment Methods
              </Button>
            </Card>

            <Card
              title={
                <>
                  <i className="las la-clock"></i> Automatic Payments
                </>
              }
              style={{ marginTop: 16 }}
            >
              {expenses?.map((expense: any) => (
                <div
                  key={expense.id}
                  style={{
                    marginBottom: 16,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <Text>{expense.description}</Text>
                    <br />
                    <Text type="secondary">${expense.amount} / month</Text>
                  </div>
                  <Switch
                    checked={expense.isRecurring}
                    onChange={checked =>
                      handleAutomaticPayment(expense.id, checked)
                    }
                  />
                </div>
              ))}
            </Card>
          </Col>
        </Row>

        <Modal
          title="Process Payment"
          open={isPaymentModalVisible}
          onCancel={() => setIsPaymentModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handlePayment} layout="vertical">
            <Form.Item
              name="expenseId"
              label="Expense"
              rules={[{ required: true }]}
            >
              <Select>
                {expenses?.map((expense: any) => (
                  <Select.Option key={expense.id} value={expense.id}>
                    {expense.description} - ${expense.amount}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="amount"
              label="Amount"
              rules={[{ required: true }]}
            >
              <Input prefix="$" />
            </Form.Item>
            <Form.Item
              name="paymentMethod"
              label="Payment Method"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="CREDIT_CARD">Credit Card</Select.Option>
                <Select.Option value="BANK_TRANSFER">
                  Bank Transfer
                </Select.Option>
                <Select.Option value="PAYPAL">PayPal</Select.Option>
              </Select>
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
              Process Payment
            </Button>
          </Form>
        </Modal>

        <Modal
          title="Manage Payment Methods"
          open={isMethodModalVisible}
          onCancel={() => setIsMethodModalVisible(false)}
          footer={null}
        >
          <Form form={methodForm} layout="vertical">
            <Form.Item name="cardNumber" label="Card Number">
              <Input placeholder="**** **** **** ****" />
            </Form.Item>
            <Form.Item name="expiryDate" label="Expiry Date">
              <Input placeholder="MM/YY" />
            </Form.Item>
            <Form.Item name="cvv" label="CVV">
              <Input placeholder="***" />
            </Form.Item>
            <Button type="primary" block>
              Add Payment Method
            </Button>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
