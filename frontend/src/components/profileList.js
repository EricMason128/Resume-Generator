import React from 'react';
import { Table, Button, Space, Typography, Popconfirm } from 'antd';

const { Title } = Typography;

const ProfileList = ({ profiles, onViewProfile, onCreateProfile, onDeleteProfile }) => {
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'City', dataIndex: 'city', key: 'city' },
    { title: 'State', dataIndex: 'state', key: 'state' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => onViewProfile(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this profile?"
            onConfirm={() => onDeleteProfile(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1000, margin: 'auto', padding: '2rem', background: '#fff' }}>
      <Space style={{ width: '100%', justifyContent: 'space-between' }}>
        <Title level={3}>Profile List</Title>
        <Button type="primary" onClick={onCreateProfile}>
          Create New Profile
        </Button>
      </Space>
      <Table
        dataSource={profiles}
        columns={columns}
        rowKey={(record) => record.email || record.name}
      />
    </div>
  );
};

export default ProfileList;
