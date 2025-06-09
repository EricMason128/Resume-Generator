import React, { useEffect } from 'react';
import { Form, Input, Button, Space, Typography, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ProfileForm = ({ initialData = {}, onBack, onSubmit }) => {
  const [form] = Form.useForm();
  const [educationList, setEducationList] = React.useState(initialData.education || [{ university: '', date: '', degree: '' }]);
  const [experienceList, setExperienceList] = React.useState(initialData.experience || [{ role: '', company: '', date: '' }]);

  useEffect(() => {
    form.setFieldsValue(initialData);
  }, [initialData, form]);

  const handleArrayChange = (type, index, field, value) => {
    const list = type === 'education' ? [...educationList] : [...experienceList];
    list[index][field] = value;
    type === 'education' ? setEducationList(list) : setExperienceList(list);
  };

  const addSection = (type) => {
    const empty = type === 'education' ? { university: '', date: '', degree: '' } : { role: '', company: '', date: '' };
    type === 'education'
      ? setEducationList([...educationList, empty])
      : setExperienceList([...experienceList, empty]);
  };

  const onFinish = (values) => {
    const profile = {
      ...values,
      education: educationList,
      experience: experienceList,
    };
    console.log('Saved profile:', profile);
    onSubmit(profile);
  };

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: '2rem', background: '#fff' }}>
      <Title level={3}>Edit Profile</Title>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Phone">
          <Input />
        </Form.Item>
        <Form.Item name="linkedin" label="LinkedIn">
          <Input />
        </Form.Item>
        <Form.Item name="city" label="City">
          <Input />
        </Form.Item>
        <Form.Item name="state" label="State">
          <Input />
        </Form.Item>

        <Divider orientation="left">Education</Divider>
        {educationList.map((edu, i) => (
          <Space direction="vertical" key={i} style={{ display: 'block', marginBottom: 10 }}>
            <Input placeholder="University" value={edu.university} onChange={(e) => handleArrayChange('education', i, 'university', e.target.value)} />
            <Input placeholder="Date" value={edu.date} onChange={(e) => handleArrayChange('education', i, 'date', e.target.value)} />
            <Input placeholder="Degree" value={edu.degree} onChange={(e) => handleArrayChange('education', i, 'degree', e.target.value)} />
          </Space>
        ))}
        <Button icon={<PlusOutlined />} onClick={() => addSection('education')}>Add Education</Button>

        <Divider orientation="left">Experience</Divider>
        {experienceList.map((exp, i) => (
          <Space direction="vertical" key={i} style={{ display: 'block', marginBottom: 10 }}>
            <Input placeholder="Role" value={exp.role} onChange={(e) => handleArrayChange('experience', i, 'role', e.target.value)} />
            <Input placeholder="Company" value={exp.company} onChange={(e) => handleArrayChange('experience', i, 'company', e.target.value)} />
            <Input placeholder="Date" value={exp.date} onChange={(e) => handleArrayChange('experience', i, 'date', e.target.value)} />
          </Space>
        ))}
        <Button icon={<PlusOutlined />} onClick={() => addSection('experience')}>Add Experience</Button>

        <Space style={{ marginTop: 24 }}>
          <Button type="default" onClick={onBack}>Back</Button>
          <Button type="primary" htmlType="submit">Save Profile</Button>
        </Space>
      </Form>
    </div>
  );
};

export default ProfileForm;
