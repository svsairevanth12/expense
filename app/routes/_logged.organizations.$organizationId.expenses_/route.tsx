import {
  Typography,
  Table,
  Button,
  Input,
  DatePicker,
  Select,
  Modal,
  Form,
  InputNumber,
  Radio,
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

export default function ExpensesPage() {
  const { organizationId } = useParams()
  const { user } = useUserContext()
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')
  const [searchText, setSearchText] = useState('')
  const [dateFilter, setDateFilter] = useState<string | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  // Fetch expenses with relations
  const { data: expenses, refetch } = Api.expense.findMany.useQuery({
    where: { organizationId },
    include: {
      category: true,
      user: true,
    },
  })

  // Fetch categories for filter and form
  const { data: categories } = Api.category.findMany.useQuery({
    where: { organizationId },
  })

  // Mutations
  const { mutateAsync: createExpense } = Api.expense.create.useMutation()
  const { mutateAsync: updateExpense } = Api.expense.update.useMutation()
  const { mutateAsync: deleteExpense } = Api.expense.delete.useMutation()

  const handleAddExpense = async (values: any) => {
    try {
      await createExpense({
        data: {
          amount: values.amount.toString(),
          description: values.description,
          date: values.date.format('YYYY-MM-DD'),
          isRecurring: values.isRecurring || false,
          recurringSchedule: values.recurringSchedule,
          taxCategory: values.taxCategory,
          categoryId: values.categoryId,
          organizationId: organizationId!,
          userId: user!.id,
        },
      })
      message.success('Expense added successfully')
      setIsModalVisible(false)
      form.resetFields()
      refetch()
    } catch (error) {
      message.error('Failed to add expense')
    }
  }

  const handleDeleteExpense = async (id: string) => {
    try {
      await deleteExpense({ where: { id } })
      message.success('Expense deleted successfully')
      refetch()
    } catch (error) {
      message.error('Failed to delete expense')
    }
  }

  const filteredExpenses = expenses?.filter(expense => {
    const matchesSearch =
      expense.description?.toLowerCase().includes(searchText.toLowerCase()) ||
      expense.amount.includes(searchText)
    const matchesDate = !dateFilter || expense.date === dateFilter
    const matchesCategory =
      !categoryFilter || expense.categoryId === categoryFilter
    return matchesSearch && matchesDate && matchesCategory
  })

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
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
      title: 'Category',
      key: 'category',
      render: (record: any) => record.category?.name,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Button
          type="link"
          danger
          onClick={() => handleDeleteExpense(record.id)}
        >
          <i className="las la-trash"></i>
        </Button>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <Title level={2}>
          <i className="las la-receipt"></i> Expenses Management
        </Title>
        <Text>Track, manage, and categorize your expenses efficiently</Text>

        <div
          style={{
            marginTop: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <Radio.Group
              value={viewMode}
              onChange={e => setViewMode(e.target.value)}
            >
              <Radio.Button value="list">
                <i className="las la-list"></i> List
              </Radio.Button>
              <Radio.Button value="calendar">
                <i className="las la-calendar"></i> Calendar
              </Radio.Button>
            </Radio.Group>
          </div>
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            <i className="las la-plus"></i> Add Expense
          </Button>
        </div>

        <div style={{ marginTop: 20, display: 'flex', gap: 16 }}>
          <Input
            placeholder="Search expenses..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            prefix={<i className="las la-search"></i>}
            style={{ width: 200 }}
          />
          <DatePicker
            onChange={date =>
              setDateFilter(date ? date.format('YYYY-MM-DD') : null)
            }
            placeholder="Filter by date"
          />
          <Select
            placeholder="Filter by category"
            style={{ width: 200 }}
            allowClear
            onChange={setCategoryFilter}
          >
            {categories?.map(category => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </div>

        <Table
          style={{ marginTop: 20 }}
          dataSource={filteredExpenses}
          columns={columns}
          rowKey="id"
        />

        <Modal
          title="Add New Expense"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleAddExpense} layout="vertical">
            <Form.Item
              name="amount"
              label="Amount"
              rules={[{ required: true }]}
            >
              <InputNumber prefix="$" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="date" label="Date" rules={[{ required: true }]}>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name="categoryId"
              label="Category"
              rules={[{ required: true }]}
            >
              <Select>
                {categories?.map(category => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="taxCategory" label="Tax Category">
              <Select>
                <Select.Option value="business">Business</Select.Option>
                <Select.Option value="personal">Personal</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="isRecurring" valuePropName="checked">
              <Button type="link">
                <i className="las la-sync"></i> Make this a recurring expense
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Add Expense
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
