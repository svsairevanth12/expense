import { Typography, Card, Row, Col, Space } from 'antd'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Header Section */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Title level={1}>
              <i
                className="las la-hand-holding-usd"
                style={{ marginRight: '12px' }}
              ></i>
              Welcome to ExpenseTracker
            </Title>
            <Paragraph style={{ fontSize: '18px' }}>
              Your complete solution for managing expenses, budgets, and team
              finances
            </Paragraph>
          </div>

          {/* Features Grid */}
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} lg={8}>
              <Card>
                <Title level={4}>
                  <i
                    className="las la-receipt"
                    style={{ marginRight: '8px' }}
                  ></i>
                  Track Expenses
                </Title>
                <Paragraph>
                  Easily record and categorize your expenses. Keep track of
                  every transaction with detailed descriptions and dates.
                </Paragraph>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Card>
                <Title level={4}>
                  <i
                    className="las la-users"
                    style={{ marginRight: '8px' }}
                  ></i>
                  Manage Groups
                </Title>
                <Paragraph>
                  Create and manage expense groups for teams or projects. Share
                  expenses and track group spending efficiently.
                </Paragraph>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Card>
                <Title level={4}>
                  <i
                    className="las la-chart-pie"
                    style={{ marginRight: '8px' }}
                  ></i>
                  Budget Analysis
                </Title>
                <Paragraph>
                  Set budgets and analyze your spending patterns with detailed
                  reports and visualizations.
                </Paragraph>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Card>
                <Title level={4}>
                  <i className="las la-sync" style={{ marginRight: '8px' }}></i>
                  Recurring Expenses
                </Title>
                <Paragraph>
                  Set up and manage recurring expenses automatically. Never miss
                  a regular payment or subscription.
                </Paragraph>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Card>
                <Title level={4}>
                  <i
                    className="las la-project-diagram"
                    style={{ marginRight: '8px' }}
                  ></i>
                  Project Tracking
                </Title>
                <Paragraph>
                  Associate expenses with specific projects. Monitor project
                  budgets and costs in real-time.
                </Paragraph>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Card>
                <Title level={4}>
                  <i
                    className="las la-credit-card"
                    style={{ marginRight: '8px' }}
                  ></i>
                  Payment Management
                </Title>
                <Paragraph>
                  Track payments and payment methods. Keep your financial
                  records organized and up-to-date.
                </Paragraph>
              </Card>
            </Col>
          </Row>

          {/* Getting Started Section */}
          <Card style={{ marginTop: '32px', textAlign: 'center' }}>
            <Title level={3}>
              <i className="las la-rocket" style={{ marginRight: '8px' }}></i>
              Getting Started
            </Title>
            <Paragraph style={{ fontSize: '16px' }}>
              Start by creating an organization or joining an existing one.
              Then, you can begin tracking expenses, creating groups, and
              managing your finances efficiently.
            </Paragraph>
          </Card>
        </Space>
      </div>
    </PageLayout>
  )
}
