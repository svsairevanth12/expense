import {
  Typography,
  Card,
  Row,
  Col,
  Table,
  Button,
  DatePicker,
  Statistic,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
const { RangePicker } = DatePicker
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function AnalyticsPage() {
  const { organizationId } = useParams()
  const { organization } = useUserContext()
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs().subtract(30, 'days'),
    dayjs(),
  ])

  // Fetch expenses with categories included
  const { data: expenses } = Api.expense.findMany.useQuery({
    where: { organizationId },
    include: { category: true },
  })

  // AI prediction mutation
  const { mutateAsync: generatePrediction } = Api.ai.generateText.useMutation()

  // Calculate total spending
  const totalSpending =
    expenses?.reduce((sum, expense) => sum + parseFloat(expense.amount), 0) || 0

  // Group expenses by category
  const expensesByCategory = expenses?.reduce((acc, expense) => {
    const categoryName = expense.category?.name || 'Uncategorized'
    acc[categoryName] = (acc[categoryName] || 0) + parseFloat(expense.amount)
    return acc
  }, {} as Record<string, number>)

  const categoryData = Object.entries(expensesByCategory || {}).map(
    ([name, amount]) => ({
      name,
      amount: amount.toFixed(2),
    }),
  )

  const columns = [
    {
      title: 'Category',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: string) => `$${amount}`,
    },
  ]

  // Handle export
  const handleExport = () => {
    const csvContent = [
      ['Date', 'Category', 'Amount', 'Description'],
      ...(expenses?.map(expense => [
        dayjs(expense.date).format('YYYY-MM-DD'),
        expense.category?.name || 'Uncategorized',
        expense.amount,
        expense.description || '',
      ]) || []),
    ]
      .map(row => row.join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'financial-report.csv'
    a.click()
  }

  // Get AI prediction
  const getPrediction = async () => {
    const prompt = `Based on the total spending of $${totalSpending.toFixed(
      2,
    )} across ${
      Object.keys(expensesByCategory || {}).length
    } categories, predict next month's spending trend.`

    const prediction = await generatePrediction({ prompt })
    // You can handle the prediction display as needed
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px' }}>
        <Title level={2}>
          <i className="las la-chart-line" style={{ marginRight: '8px' }}></i>
          Financial Analytics
        </Title>
        <Text type="secondary">
          Track your spending patterns and get detailed insights into your
          financial activities
        </Text>

        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
          <Col xs={24} lg={8}>
            <Card>
              <Statistic
                title="Total Spending"
                value={totalSpending}
                precision={2}
                prefix="$"
                suffix=""
              />
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card>
              <Statistic
                title="Categories"
                value={Object.keys(expensesByCategory || {}).length}
                prefix={<i className="las la-tags"></i>}
              />
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card>
              <Statistic
                title="Average per Day"
                value={totalSpending / 30}
                precision={2}
                prefix="$"
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
          <Col xs={24} lg={16}>
            <Card title="Spending by Category">
              <Table
                dataSource={categoryData}
                columns={columns}
                pagination={false}
              />
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="Actions">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <RangePicker
                  value={dateRange}
                  onChange={dates => dates && setDateRange(dates)}
                  style={{ width: '100%' }}
                />
                <Button
                  type="primary"
                  icon={<i className="las la-file-export"></i>}
                  onClick={handleExport}
                  block
                >
                  Export Report
                </Button>
                <Button
                  icon={<i className="las la-robot"></i>}
                  onClick={getPrediction}
                  block
                >
                  Get AI Prediction
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}
