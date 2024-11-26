import {
  Typography,
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Switch,
  Select,
  Space,
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

export default function RecurringPage() {
  const { organizationId } = useParams()
  const { user } = useUserContext()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  // Fetch recurring expenses
  const { data: expenses, refetch } = Api.expense.findMany.useQuery({
    where: {
      organizationId,
      isRecurring: true,
      userId: user?.id,
    },
    include: {
      category: true,
    },
  })

  // Mutations
  const { mutateAsync: createExpense } = Api.expense.create.useMutation()
  const { mutateAsync: updateExpense } = Api.expense.update.useMutation()
  const { mutateAsync: deleteExpense } = Api.expense.delete.useMutation()

  const handleCreate = async (values: any) => {
    try {
      await createExpense({
        data: {
          ...values,
          isRecurring: true,
          organizationId,
          userId: user?.id,
        },
      })
      message.success('Recurring expense created successfully')
      setIsModalVisible(false)
      form.resetFields()
      refetch()
    } catch (error) {
      message.error('Failed to create recurring expense')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteExpense({ where: { id } })
      message.success('Recurring expense deleted successfully')
      refetch()
    } catch (error) {
      message.error('Failed to delete recurring expense')
    }
  }

  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: string) => `$${amount}`,
    },
    {
      title: 'Schedule',
      dataIndex: 'recurringSchedule',
      key: 'recurringSchedule',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: any) => category?.name,
    },
    {
      title: 'Next Payment',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button
            type="text"
            icon={<i className="las la-edit" />}
            onClick={() => {
              form.setFieldsValue(record)
              setIsModalVisible(true)
            }}
          />
          <Button
            type="text"
            danger
            icon={<i className="las la-trash-alt" />}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <div>
            <Title level={2}>Recurring Expenses</Title>
            <Text>Manage your recurring expenses and payment schedules</Text>
          </div>
          <Button
            type="primary"
            icon={<i className="las la-plus" />}
            onClick={() => {
              form.resetFields()
              setIsModalVisible(true)
            }}
          >
            Add Recurring Expense
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={expenses}
          rowKey="id"
          loading={!expenses}
        />

        <Modal
          title="Recurring Expense"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleCreate}>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="amount"
              label="Amount"
              rules={[{ required: true }]}
            >
              <InputNumber style={{ width: '100%' }} prefix="$" min={0} />
            </Form.Item>

            <Form.Item
              name="recurringSchedule"
              label="Schedule"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="MONTHLY">Monthly</Select.Option>
                <Select.Option value="WEEKLY">Weekly</Select.Option>
                <Select.Option value="YEARLY">Yearly</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="date"
              label="Next Payment Date"
              rules={[{ required: true }]}
            >
              <Input type="date" />
            </Form.Item>

            <Form.Item>
              <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
