'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Card, Button, Input, Form, Space, Typography, Upload, Modal, message, Tabs, Avatar, Row, Col, Tag
} from 'antd';
import { 
  SaveOutlined, LogoutOutlined, PlusOutlined, DeleteOutlined, UploadOutlined, UserOutlined, 
  CodeOutlined, GlobalOutlined, ReadOutlined, BookOutlined
} from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload/interface';
import type { HomepageData, Publication, SocialLink, Project } from '@/types';

const { Title } = Typography;
const { TextArea } = Input;
const { confirm } = Modal;

export default function AdminDashboard() {
  const [data, setData] = useState<HomepageData | null>(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/admin');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('获取数据失败:', error);
        message.error('获取数据失败');
      }
    };

    fetchData();
  }, [router]);

  // --- Handlers --- //
  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) message.success('保存成功！');
      else message.error('保存失败');
    } catch (error) {
      console.error('保存数据时出错:', error);
      message.error('保存失败');
    } finally {
      setSaving(false);
    }
  };

  const confirmLogout = () => {
    confirm({
      title: '确认退出登录吗？',
      icon: <LogoutOutlined className="text-red-500" />,
      okText: '确认', okType: 'danger', cancelText: '取消',
      onOk: () => {
        sessionStorage.removeItem('isAuthenticated');
        message.success('已成功退出登录');
        router.push('/admin');
      },
    });
  };

  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!data) return;
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleAvatarChange = (info: UploadChangeParam) => {
    console.log(info);
    const file = info.fileList?.[0].originFileObj;
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        if (data && typeof reader.result === 'string') {
          setData({ ...data, avatarUrl: reader.result });
          message.success('头像已选择，请保存以上传');
        }
      });
      reader.readAsDataURL(file);
    }
  };

  // --- Research Interests Handlers ---
  const addResearchInterest = (interest: string) => {
    if (!data || !interest.trim() || data.researchInterests.includes(interest.trim())) return;
    setData({ ...data, researchInterests: [...data.researchInterests, interest.trim()] });
  };
  const removeResearchInterest = (index: number) => {
    if (!data) return;
    const newInterests = data.researchInterests.filter((_, i) => i !== index);
    setData({ ...data, researchInterests: newInterests });
  };

  // --- Publications Handlers ---
  const handlePublicationChange = (index: number, field: keyof Publication, value: string | string[] | number) => {
    if (!data) return;
    const newPublications = [...data.publications];
    newPublications[index] = { ...newPublications[index], [field]: value };
    setData({ ...data, publications: newPublications });
  };
  const addPublication = () => {
    if (!data) return;
    const newPub: Publication = { title: '', authors: [], venue: '', year: new Date().getFullYear(), pdf: '', url: '' };
    setData({ ...data, publications: [...data.publications, newPub] });
  };
  const removePublication = (index: number) => {
    if (!data) return;
    const newPublications = data.publications.filter((_, i) => i !== index);
    setData({ ...data, publications: newPublications });
  };

  // --- Social Links Handlers ---
  const handleSocialLinkChange = (index: number, field: keyof SocialLink, value: string) => {
    if (!data) return;
    const newLinks = [...data.socialLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setData({ ...data, socialLinks: newLinks });
  };
  const addSocialLink = () => {
    if (!data) return;
    setData({ ...data, socialLinks: [...data.socialLinks, { name: '', url: '' }] });
  };
  const removeSocialLink = (index: number) => {
    if (!data) return;
    const newLinks = data.socialLinks.filter((_, i) => i !== index);
    setData({ ...data, socialLinks: newLinks });
  };

  // --- Projects Handlers ---
  const handleProjectChange = (index: number, field: keyof Project, value: string) => {
    if (!data) return;
    const newProjects = [...data.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setData({ ...data, projects: newProjects });
  };
  const addProject = () => {
    if (!data) return;
    setData({ ...data, projects: [...data.projects, { title: '', description: '', link: '' }] });
  };
  const removeProject = (index: number) => {
    if (!data) return;
    const newProjects = data.projects.filter((_, i) => i !== index);
    setData({ ...data, projects: newProjects });
  };

  if (!data) {
    return <div className="p-8 text-center">加载中...</div>;
  }

  const tabItems = [
    { key: '1', label: <span><UserOutlined /> 基本信息</span>, children: (
      <Card><Form layout="vertical">
        <Row gutter={24}><Col xs={24} md={8} className="text-center mb-6 md:mb-0">
          <Avatar src={data.avatarUrl} size={160} className="shadow-lg"/>
          <Upload name="avatar" showUploadList={false} beforeUpload={() => false} onChange={handleAvatarChange}>
            <Button icon={<UploadOutlined />} className="mt-4">更换头像</Button>
          </Upload>
        </Col><Col xs={24} md={16}>
          <Form.Item label="姓名"><Input name="name" value={data.name} onChange={handleBasicInfoChange} /></Form.Item>
          <Form.Item label="头衔/职位"><Input name="title" value={data.title} onChange={handleBasicInfoChange} /></Form.Item>
          <Form.Item label="个人简介"><TextArea name="bio" value={data.bio} onChange={handleBasicInfoChange} rows={4} /></Form.Item>
        </Col></Row>
      </Form></Card>
    )},
    { key: '2', label: <span><ReadOutlined /> 研究方向</span>, children: (
      <Card><div className="flex flex-wrap gap-2">
        {data.researchInterests.map((interest, index) => (
          <Tag key={index} closable onClose={() => removeResearchInterest(index)} color="blue">{interest}</Tag>
        ))}
        <Input
          size="small"
          className="w-28"
          placeholder="添加方向"
          onPressEnter={e => {
            const target = e.target as HTMLInputElement;
            addResearchInterest(target.value);
            target.value = '';
          }}
        />
      </div></Card>
    )},
    { key: '3', label: <span><BookOutlined /> 发表论文</span>, children: (
      <Card>{data.publications.map((pub, index) => (
        <div key={index} className="mb-4 p-4 border rounded-lg">
          <Input placeholder="论文标题" value={pub.title} className="mb-2" onChange={e => handlePublicationChange(index, 'title', e.target.value)} />
          <Row gutter={8}><Col span={12}><Input placeholder="PDF 链接" value={pub.pdf} onChange={e => handlePublicationChange(index, 'pdf', e.target.value)} /></Col>
          <Col span={12}><Input placeholder="项目链接" value={pub.url} onChange={e => handlePublicationChange(index, 'url', e.target.value)} /></Col></Row>
          <Button danger icon={<DeleteOutlined />} onClick={() => removePublication(index)} className="mt-2"/>
        </div>))}
        <Button type="dashed" onClick={addPublication} block icon={<PlusOutlined />}>添加论文</Button>
      </Card>
    ),},
    { key: '4', label: <span><GlobalOutlined /> 社交链接</span>, children: (
        <Card>{data.socialLinks.map((link, index) => (
          <div key={index} className="mb-2 p-2 border rounded">
            <Space.Compact block>
              <Input value={link.name} placeholder="平台" onChange={e => handleSocialLinkChange(index, 'name', e.target.value)} />
              <Input value={link.url} placeholder="https://..." onChange={e => handleSocialLinkChange(index, 'url', e.target.value)} />
              <Button danger icon={<DeleteOutlined />} onClick={() => removeSocialLink(index)} />
            </Space.Compact>
          </div>))}
          <Button type="dashed" onClick={addSocialLink} block icon={<PlusOutlined />}>添加链接</Button>
        </Card>
    )},
    { key: '5', label: <span><CodeOutlined /> 项目作品</span>, children: (
      <Card>{data.projects.map((proj, index) => (
        <div key={index} className="mb-4 p-4 border rounded-lg">
          <Input placeholder="项目标题" value={proj.title} className="mb-2" onChange={e => handleProjectChange(index, 'title', e.target.value)} />
          <TextArea placeholder="项目描述" value={proj.description} className="mb-2" onChange={e => handleProjectChange(index, 'description', e.target.value)} />
          <Input placeholder="项目链接" value={proj.link} onChange={e => handleProjectChange(index, 'link', e.target.value)} />
          <Button danger icon={<DeleteOutlined />} onClick={() => removeProject(index)} className="mt-2"/>
        </div>))}
        <Button type="dashed" onClick={addProject} block icon={<PlusOutlined />}>添加项目</Button>
      </Card>
    )}
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8 pb-4 border-b">
          <Title level={2} className="!mb-0">管理后台</Title>
          <Space>
            <Button type="primary" icon={<SaveOutlined />} onClick={handleSave} loading={saving} size="large">保存全部</Button>
            <Button danger icon={<LogoutOutlined />} onClick={confirmLogout} size="large">退出登录</Button>
          </Space>
        </header>
        <Tabs defaultActiveKey="1" size="large" items={tabItems} className="admin-tabs" />
        <div className="mt-8 text-center text-gray-500">
          <p> 个人主页管理系统</p>
        </div>
      </div>
    </div>
  );
}
