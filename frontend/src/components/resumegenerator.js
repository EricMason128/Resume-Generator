import React, { useState } from 'react';
import { Select, Input, Button, Typography, Spin } from 'antd';
import axios from 'axios';

const { TextArea } = Input;
const { Title } = Typography;

const ResumeGenerator = ({ profiles }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [resume, setResume] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    const profile = profiles.find(p => p._id === selectedId);
    if (!profile || !jobDescription) return;

    setLoading(true);
    setResume('');

    try {
      const res = await axios.post('http://localhost:5000/resume/generate', {
        profile,
        jobDescription,
      });
      setResume(res.data.resume);
    } catch (err) {
      alert('Failed to generate resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: '2rem', background: '#fff' }}>
      <Title level={3}>Resume Generator</Title>

      <Select
        placeholder="Select Profile"
        style={{ width: '100%', marginBottom: 20 }}
        onChange={(value) => setSelectedId(value)}
      >
        {profiles.map(p => (
          <Select.Option key={p._id} value={p._id}>
            {p.name} - {p.email}
          </Select.Option>
        ))}
      </Select>

      <TextArea
        rows={6}
        placeholder="Paste the job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <Button
        type="primary"
        onClick={handleGenerate}
        disabled={!selectedId || !jobDescription}
        style={{ marginTop: 16 }}
      >
        Generate Resume
      </Button>

      {loading && <Spin style={{ marginTop: 20 }} />}

      {resume && (
        <div style={{ whiteSpace: 'pre-wrap', marginTop: 32 }}>
          <Title level={4}>Generated Resume</Title>
          <div>{resume}</div>
        </div>
      )}
    </div>
  );
};

export default ResumeGenerator;
