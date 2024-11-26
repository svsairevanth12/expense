import {
  Typography,
  Card,
  Row,
  Col,
  Input,
  InputNumber,
  Button,
  Progress,
  Switch,
  notification,
  Spin,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function BudgetsPage() {
  const { organizationId } = useParams()
  const { organization } = useUserContext()
  const [newBudgetLimit, setNewBudgetLimit] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [notificationsEnabled, setNotificationsEnabled] =
    useState<boolean>(false)

  // Fetch categories with their budget limits
  const {
    data: categories,
    isLoading,
    refetch,
  } = Api.category.findMany.useQuery({
    where: { organizationId },
    include: { expenses: true },
  })

  // Fetch expenses for budget analysis
  const { data: expenses } = Api.expense.findMany.useQuery({
    where: { organizationId },
    include: { category: true },
  })

  // Mutation to update category budget
  const { mutateAsync: updateCategory } = Api.category.update.useMutation()

  // Mutation to create notification
  const { mutateAsync: createNotification } =
    Api.notification.create.useMutation()

  const handleSetBudget = async () => {
    if (!selectedCategory || !newBudgetLimit) {
      notification.error({
        message: 'Please select a category and enter a budget limit',
      })
      return
    }

    try {
      await updateCategory({
        where: { id: selectedCategory },
        data: { budgetLimit: newBudgetLimit },
      })

      notification.success({ message: 'Budget limit updated successfully' })
      refetch()
      setNewBudgetLimit('')
      setSelectedCategory('')
    } catch (error) {
      notification.error({ message: 'Failed to update budget limit' })
    }
  }

  const calculateSpending = (categoryId: string) => {
    const categoryExpenses =
      expenses?.filter(exp => exp.categoryId === categoryId) || []
    return categoryExpenses.reduce(
      (sum, exp) => sum + parseFloat(exp.amount),
      0,
    )
  }

  const handleNotificationToggle = async (
    checked: boolean,
    categoryId: string,
  ) => {
    setNotificationsEnabled(checked)
    if (checked) {
      await createNotification({
        data: {
          type: 'BUDGET_ALERT',
          message: 'Budget notifications enabled for this category',
          status: 'ACTIVE',
          userId: organization?.roles[0]?.userId || '',
        },
      })
      notification.success({ message: 'Budget notifications enabled' })
    }
  }

  if (isLoading) {
    return (
      <PageLayout layout="full-width">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <Title level={2}>
          <i className="las la-wallet"></i> Budget Management
        </Title>
        <Text>
          Manage your spending limits and track expenses across different
          categories
        </Text>

        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
          <Col xs={24} lg={12}>
            <Card
              title={
                <>
                  <i className="las la-plus-circle"></i> Set Budget Limit
                </>
              }
            >
              <div style={{ marginBottom: '16px' }}>
                <Text>Category</Text>
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  style={{ width: '100%', padding: '8px', marginTop: '8px' }}
                >
                  <option value="">Select a category</option>
                  {categories?.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <Text>Budget Limit</Text>
                <InputNumber
                  style={{ width: '100%' }}
                  value={
                    newBudgetLimit ? parseFloat(newBudgetLimit) : undefined
                  }
                  onChange={value => setNewBudgetLimit(value?.toString() || '')}
                  prefix="$"
                />
              </div>
              <Button type="primary" onClick={handleSetBudget} block>
                Set Budget
              </Button>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              title={
                <>
                  <i className="las la-chart-pie"></i> Budget Overview
                </>
              }
            >
              {categories?.map(category => (
                <div key={category.id} style={{ marginBottom: '16px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Text strong>{category.name}</Text>
                    <Switch
                      checkedChildren="Notifications On"
                      unCheckedChildren="Notifications Off"
                      onChange={checked =>
                        handleNotificationToggle(checked, category.id)
                      }
                    />
                  </div>
                  {category.budgetLimit && (
                    <Progress
                      percent={Math.min(
                        100,
                        (calculateSpending(category.id) /
                          parseFloat(category.budgetLimit)) *
                          100,
                      )}
                      status={
                        calculateSpending(category.id) >
                        parseFloat(category.budgetLimit)
                          ? 'exception'
                          : 'active'
                      }
                      format={() =>
                        `$${calculateSpending(category.id).toFixed(2)} / $${
                          category.budgetLimit
                        }`
                      }
                    />
                  )}
                </div>
              ))}
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}
