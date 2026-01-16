"use client";
import React, { useState, useRef } from 'react';
import { Button, Form, Input, InputNumber, Select, message, FormInstance } from 'antd';
import CustomModal from './CustomModal';

const { Option } = Select;

interface FormValues {
  name: string;
  age: number;
  email: string;
  role: string;
}

/**
 * CustomModal 表单使用示例
 */
const CustomModalFormExample: React.FC = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef1 = useRef<FormInstance>(null);
  const formRef2 = useRef<FormInstance>(null);
  const [form2] = Form.useForm();

  // 示例1: 使用默认按钮 + form 属性（推荐，自动处理验证）
  const handleOk1 = async () => {
    setLoading(true);
    // 模拟异步提交
    await new Promise(resolve => setTimeout(resolve, 1000));
    const values = formRef1.current?.getFieldsValue();
    console.log('表单提交成功:', values);
    message.success('提交成功！');
    setLoading(false);
    setOpen1(false);
  };

  const handleCancel1 = () => {
    setOpen1(false);
  };

  // 示例2: 使用自定义按钮配置
  const handleSaveDraft = () => {
    formRef2.current?.validateFields().then(values => {
      console.log('保存草稿:', values);
      message.info('草稿已保存');
    }).catch(() => {
      // 验证失败时也允许保存草稿
      const values = formRef2.current?.getFieldsValue();
      console.log('保存草稿（部分数据）:', values);
      message.info('草稿已保存（部分数据）');
    });
  };

  const handleSubmit2 = async () => {
    try {
      const values = await formRef2.current?.validateFields();
      if (values) {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('发布成功:', values);
        message.success('发布成功！');
        setLoading(false);
        setOpen2(false);
        formRef2.current?.resetFields();
      }
    } catch (error) {
      console.log('表单验证失败:', error);
    }
  };

  const handleCancel2 = () => {
    setOpen2(false);
    formRef2.current?.resetFields();
  };

  // 示例3: 使用 Form 的 onFinish（推荐方式）
  const handleFinish3 = async (values: FormValues) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('表单提交成功:', values);
      message.success('提交成功！');
      setOpen3(false);
      form2.resetFields();
    } catch {
      message.error('提交失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel3 = () => {
    setOpen3(false);
    form2.resetFields();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">CustomModal 表单使用示例</h1>
      <div className="space-y-4">
        {/* 示例1: 使用默认按钮 + Form ref */}
        <div>
          <Button type="primary" onClick={() => setOpen1(true)}>
            打开表单 Modal（默认按钮 + ref）
          </Button>
          <CustomModal
            title="用户信息表单"
            open={open1}
            onOk={handleOk1}
            onCancel={handleCancel1}
            confirmLoading={loading}
            form={formRef1.current || undefined}
            resetOnClose={true}
            width={600}
          >
            <Form
              ref={formRef1}
              layout="vertical"
              className="mt-4"
            >
              <Form.Item
                label="姓名"
                name="name"
                rules={[{ required: true, message: '请输入姓名' }]}
              >
                <Input placeholder="请输入姓名" />
              </Form.Item>
              <Form.Item
                label="年龄"
                name="age"
                rules={[
                  { required: true, message: '请输入年龄' },
                  { type: 'number', min: 1, max: 120, message: '年龄必须在 1-120 之间' }
                ]}
              >
                <InputNumber placeholder="请输入年龄" className="w-full" />
              </Form.Item>
              <Form.Item
                label="邮箱"
                name="email"
                rules={[
                  { required: true, message: '请输入邮箱' },
                  { type: 'email', message: '请输入有效的邮箱地址' }
                ]}
              >
                <Input placeholder="请输入邮箱" />
              </Form.Item>
              <Form.Item
                label="角色"
                name="role"
                rules={[{ required: true, message: '请选择角色' }]}
              >
                <Select placeholder="请选择角色">
                  <Option value="admin">管理员</Option>
                  <Option value="user">普通用户</Option>
                  <Option value="guest">访客</Option>
                </Select>
              </Form.Item>
            </Form>
          </CustomModal>
        </div>

        {/* 示例2: 自定义按钮配置 */}
        <div>
          <Button type="primary" onClick={() => setOpen2(true)}>
            打开表单 Modal（自定义按钮）
          </Button>
          <CustomModal
            title="发布文章"
            open={open2}
            onCancel={handleCancel2}
            footer={[
              {
                text: '保存草稿',
                type: 'default',
                onClick: handleSaveDraft,
              },
              {
                text: '发布',
                type: 'primary',
                onClick: handleSubmit2,
                loading: loading,
              },
            ]}
            width={600}
          >
            <Form
              ref={formRef2}
              layout="vertical"
              className="mt-4"
            >
              <Form.Item
                label="标题"
                name="title"
                rules={[{ required: true, message: '请输入标题' }]}
              >
                <Input placeholder="请输入文章标题" />
              </Form.Item>
              <Form.Item
                label="内容"
                name="content"
                rules={[{ required: true, message: '请输入内容' }]}
              >
                <Input.TextArea rows={4} placeholder="请输入文章内容" />
              </Form.Item>
            </Form>
          </CustomModal>
        </div>

        {/* 示例3: 使用 Form 的 onFinish（推荐） */}
        <div>
          <Button type="primary" onClick={() => setOpen3(true)}>
            打开表单 Modal（Form onFinish）
          </Button>
          <CustomModal
            title="编辑用户"
            open={open3}
            onCancel={handleCancel3}
            footer={[
              {
                text: '取消',
                type: 'default',
                onClick: handleCancel3,
              },
              {
                text: '提交',
                type: 'primary',
                onClick: () => form2.submit(),
                loading: loading,
              },
            ]}
            width={600}
          >
            <Form
              form={form2}
              layout="vertical"
              onFinish={handleFinish3}
              className="mt-4"
            >
              <Form.Item
                label="姓名"
                name="name"
                rules={[{ required: true, message: '请输入姓名' }]}
              >
                <Input placeholder="请输入姓名" />
              </Form.Item>
              <Form.Item
                label="邮箱"
                name="email"
                rules={[
                  { required: true, message: '请输入邮箱' },
                  { type: 'email', message: '请输入有效的邮箱地址' }
                ]}
              >
                <Input placeholder="请输入邮箱" />
              </Form.Item>
            </Form>
          </CustomModal>
        </div>
      </div>
    </div>
  );
};

export default CustomModalFormExample;
