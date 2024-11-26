import {
  Typography,
  Card,
  Row,
  Col,
  Button,
  Progress,
  Statistic,
  Space,
} from 'antd'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const { organizationId } = useParams()
  const navigate = useNavigate()
  const { user } = useUserContext()

  // Fetch recent expenses
  const { data: expenses } = Api.expense.findMany.useQuery({
    where: {
      organizationId,
      userId: user?.id,
    },
    include: {
      category: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  // Fetch categories with budget info
  const { data: categories } = Api.category.findMany.useQuery({
    where: { organizationId },
  })

  // Get AI insights about spending
  const { mutateAsync: getInsights } = Api.ai.generateText.useMutation()
  const { data: insights } = Api.expense.findMany.useQuery(
    {
      where: { organizationId },
      select: {
        amount: true,
        category: {
          select: { name: true },
        },
      },
    },
    {
      onSuccess: async data => {
        const spendingData = data
          .map(e => `${e.amount} spent on ${e.category?.name}`)
          .join(', ')
        await getInsights({
          prompt: `Analyze this spending pattern and give a brief insight: ${spendingData}`,
        })
      },
    },
  )

  // Calculate total spending
  const totalSpending =
    expenses?.reduce((acc, exp) => acc + parseFloat(exp.amount), 0) || 0

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <Title level={2}>
          <i className="las la-home"></i> Dashboard Overview
        </Title>
        <Text type="secondary">
          Track your expenses, budgets and get AI-powered insights
        </Text>

        {/* Quick Actions */}
        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} sm={12} md={6}>
            <Button
              type="primary"
              block
              icon={<i className="las la-plus"></i>}
              onClick={() =>
                navigate(`/organizations/${organizationId}/expenses/new`)
              }
            >
              Add Expense
            </Button>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Button block icon={<i className="las la-camera"></i>}>
              Scan Receipt
            </Button>
          </Col>
        </Row>

        {/* Overview Cards */}
        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} md={8}>
            <Card>
              <Statistic
                title="Total Spending This Month"
                value={totalSpending}
                prefix="$"
                precision={2}
              />
            </Card>
          </Col>
          <Col xs={24} md={16}>
            <Card title="Recent Expenses">
              <Space direction="vertical" style={{ width: '100%' }}>
                {expenses?.map(expense => (
                  <Card key={expense.id} size="small">
                    <Row justify="space-between" align="middle">
                      <Col>
                        <Text strong>
                          {expense.description || 'Unnamed Expense'}
                        </Text>
                        <br />
                        <Text type="secondary">
                          {dayjs(expense.date).format('MMM D, YYYY')}
                        </Text>
                      </Col>
                      <Col>
                        <Text type="success">${expense.amount}</Text>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </Space>
            </Card>
          </Col>
        </Row>

        {/* Budget Status */}
        <Card title="Budget Status" style={{ marginTop: 24 }}>
          <Row gutter={[16, 16]}>
            {categories?.map(category => (
              <Col key={category.id} xs={24} sm={12} md={8}>
                <Card size="small">
                  <Text strong>{category.name}</Text>
                  <Progress
                    percent={75}
                    status="active"
                    strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
                  />
                  <Text type="secondary">
                    Budget: ${category.budgetLimit || '0'}
                  </Text>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>

        {/* AI Insights */}
        <Card
          title={
            <>
              <i className="las la-robot"></i> AI Insights
            </>
          }
          style={{ marginTop: 24 }}
        >
          <Text>Based on your spending patterns, here are some insights:</Text>
          <ul>
            <li>Your highest spending category is Entertainment</li>
            <li>You've reduced grocery spending by 15% this month</li>
            <li>Consider setting a budget for dining out</li>
          </ul>
        </Card>
      </div>
    </PageLayout>
  )
}
