import {
  Typography,
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Card,
  Row,
  Col,
  Statistic,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ProjectsPage() {
  const { organizationId } = useParams()
  const { organization } = useUserContext()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  // Fetch projects with expenses included
  const { data: projects, refetch } = Api.project.findMany.useQuery({
    where: { organizationId },
    include: { expenses: true },
  })

  // Fetch categories for expense creation
  const { data: categories } = Api.category.findMany.useQuery({
    where: { organizationId },
  })

  // Mutations
  const { mutateAsync: createProject } = Api.project.create.useMutation()
  const { mutateAsync: createExpense } = Api.expense.create.useMutation()

  const handleCreateProject = async (values: any) => {
    await createProject({
      data: {
        name: values.name,
        description: values.description,
        status: 'ACTIVE',
        organizationId,
      },
    })
    form.resetFields()
    setIsModalVisible(false)
    refetch()
  }

  const handleCreateExpense = async (projectId: string, values: any) => {
    await createExpense({
      data: {
        amount: values.amount.toString(),
        description: values.description,
        date: dayjs().format('YYYY-MM-DD'),
        isRecurring: false,
        categoryId: values.categoryId,
        projectId,
        organizationId,
        userId: organization?.roles?.[0]?.userId || '',
      },
    })
    refetch()
  }

  const columns = [
    { title: 'Project Name', dataIndex: 'name', key: 'name' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Total Expenses',
      key: 'totalExpenses',
      render: (record: any) => {
        const total =
          record.expenses?.reduce(
            (acc: number, curr: any) => acc + parseFloat(curr.amount),
            0,
          ) || 0
        return `$${total.toFixed(2)}`
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Button
          type="primary"
          onClick={() => {
            Modal.confirm({
              title: 'Add Expense',
              content: (
                <Form
                  onFinish={values => handleCreateExpense(record.id, values)}
                >
                  <Form.Item
                    name="amount"
                    label="Amount"
                    rules={[{ required: true }]}
                  >
                    <InputNumber prefix="$" />
                  </Form.Item>
                  <Form.Item name="description" label="Description">
                    <Input />
                  </Form.Item>
                  <Form.Item name="categoryId" label="Category">
                    <Select>
                      {categories?.map(category => (
                        <Select.Option key={category.id} value={category.id}>
                          {category.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Button type="primary" htmlType="submit">
                    Add Expense
                  </Button>
                </Form>
              ),
              footer: null,
            })
          }}
        >
          <i className="las la-plus" /> Add Expense
        </Button>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={2}>
                <i className="las la-project-diagram" /> Project Expense
                Management
              </Title>
              <Text>Track and manage expenses for your projects</Text>
            </Col>
            <Col>
              <Button type="primary" onClick={() => setIsModalVisible(true)}>
                <i className="las la-plus" /> New Project
              </Button>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Total Projects"
                  value={projects?.length || 0}
                  prefix={<i className="las la-folder" />}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Total Expenses"
                  value={projects?.reduce(
                    (acc, project) =>
                      acc +
                        project.expenses?.reduce(
                          (sum: number, expense: any) =>
                            sum + parseFloat(expense.amount),
                          0,
                        ) || 0,
                    0,
                  )}
                  prefix="$"
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Active Projects"
                  value={
                    projects?.filter(p => p.status === 'ACTIVE').length || 0
                  }
                  prefix={<i className="las la-check-circle" />}
                />
              </Card>
            </Col>
          </Row>

          <Table
            columns={columns}
            dataSource={projects}
            rowKey="id"
            expandable={{
              expandedRowRender: record => (
                <Table
                  columns={[
                    { title: 'Date', dataIndex: 'date', key: 'date' },
                    {
                      title: 'Amount',
                      dataIndex: 'amount',
                      key: 'amount',
                      render: amount => `$${amount}`,
                    },
                    {
                      title: 'Description',
                      dataIndex: 'description',
                      key: 'description',
                    },
                  ]}
                  dataSource={record.expenses}
                  pagination={false}
                  rowKey="id"
                />
              ),
            }}
          />
        </Space>

        <Modal
          title="Create New Project"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleCreateProject}>
            <Form.Item
              name="name"
              label="Project Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Project
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
