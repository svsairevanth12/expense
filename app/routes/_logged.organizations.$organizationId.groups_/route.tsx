import {
  Typography,
  Button,
  Card,
  Table,
  Modal,
  Form,
  Input,
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

export default function GroupsPage() {
  const { organizationId } = useParams()
  const navigate = useNavigate()
  const { user } = useUserContext()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  // Fetch groups with members
  const { data: groups, refetch } = Api.group.findMany.useQuery({
    where: { organizationId },
    include: { groupMembers: { include: { user: true } } },
  })

  // Mutations
  const { mutateAsync: createGroup } = Api.group.create.useMutation()
  const { mutateAsync: createMember } = Api.groupMember.create.useMutation()
  const { mutateAsync: deleteMember } = Api.groupMember.delete.useMutation()

  const handleCreateGroup = async (values: any) => {
    try {
      const group = await createGroup({
        data: {
          name: values.name,
          description: values.description,
          organizationId: organizationId!,
        },
      })

      // Add creator as owner
      await createMember({
        data: {
          groupId: group.id,
          userId: user!.id,
          permissionLevel: 'OWNER',
        },
      })

      message.success('Group created successfully')
      setIsModalVisible(false)
      form.resetFields()
      refetch()
    } catch (error) {
      message.error('Failed to create group')
    }
  }

  const generateInviteLink = (groupId: string) => {
    return `${window.location.origin}/invite/group/${groupId}`
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Space>
          <i className="las la-users"></i>
          <a
            onClick={() =>
              navigate(`/organizations/${organizationId}/groups/${record.id}`)
            }
          >
            {text}
          </a>
        </Space>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Members',
      key: 'members',
      render: (_: any, record: any) => (
        <Space>
          {record.groupMembers?.map((member: any) => (
            <Text key={member.id}>{member.user.name}</Text>
          ))}
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button
            icon={<i className="las la-link"></i>}
            onClick={() => {
              const link = generateInviteLink(record.id)
              navigator.clipboard.writeText(link)
              message.success('Invite link copied to clipboard')
            }}
          >
            Copy Invite Link
          </Button>
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
          <Title level={2}>
            <i className="las la-users"></i> Expense Sharing Groups
          </Title>
          <Button
            type="primary"
            icon={<i className="las la-plus"></i>}
            onClick={() => setIsModalVisible(true)}
          >
            Create Group
          </Button>
        </div>

        <Card>
          <Table
            dataSource={groups}
            columns={columns}
            rowKey="id"
            pagination={false}
          />
        </Card>

        <Modal
          title="Create New Group"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleCreateGroup}>
            <Form.Item
              name="name"
              label="Group Name"
              rules={[{ required: true, message: 'Please enter group name' }]}
            >
              <Input
                prefix={<i className="las la-users"></i>}
                placeholder="Enter group name"
              />
            </Form.Item>

            <Form.Item name="description" label="Description">
              <Input.TextArea placeholder="Enter group description" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Create Group
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
