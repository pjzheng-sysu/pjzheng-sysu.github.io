'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, Card, Typography, message } from 'antd';

const { Title, Text } = Typography;

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: { password: string }) => {
    setLoading(true);
    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 这里应该有一个真实的认证过程
      // 这里为了演示，使用简单密码
      if (values.password === 'admin123') {
        // 将登录状态存储在sessionStorage中
        sessionStorage.setItem('isAuthenticated', 'true');
        message.success('登录成功！正在跳转...');
        router.push('/admin/dashboard');
      } else {
        message.error('密码错误，请重试');
      }
    } catch (error) {
      console.error('登录出错:', error);
      message.error('登录失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-8">
          <Title level={2} className="mb-2">管理员登录</Title>
          <Text type="secondary">请输入密码继续访问管理后台</Text>
        </div>

        <Form
          name="login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              size="large"
              placeholder="请输入密码"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="w-full" 
              size="large"
              loading={loading}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
        
        <div className="text-center text-sm text-gray-500 mt-4">
          <Text type="secondary">提示：默认密码为 admin123</Text>
        </div>
      </Card>
    </div>
  );
}
