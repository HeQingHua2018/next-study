"use client";
import React, { useState } from 'react';
import { Button, Input, Space } from 'antd';
import CustomModal, { CustomButtonConfig } from './CustomModal';

/**
 * CustomModal 使用示例
 */
const CustomModalExample: React.FC = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  // 示例1: 使用默认按钮
  const handleOk1 = async () => {
    setLoading1(true);
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading1(false);
    setOpen1(false);
    console.log('确认操作完成');
  };

  // 示例2: 自定义按钮配置
  const customButtons: CustomButtonConfig[] = [
    {
      text: '保存草稿',
      type: 'default',
      onClick: () => {
        console.log('保存草稿');
        setOpen2(false);
      },
    },
    {
      text: '发布',
      type: 'primary',
      onClick: async () => {
        setLoading2(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading2(false);
        setOpen2(false);
        console.log('发布成功');
      },
      loading: loading2,
    },
  ];

  // 示例3: 完全自定义 footer
  const customFooter = (
    <div className="flex justify-between items-center">
      <Button type="link">查看帮助</Button>
      <Space>
        <Button onClick={() => setOpen3(false)}>关闭</Button>
        <Button type="primary" onClick={() => setOpen3(false)}>
          完成
        </Button>
      </Space>
    </div>
  );

  // 示例4: 无按钮
  const handleOk4 = () => {
    setOpen4(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">CustomModal 使用示例</h1>
      <Space orientation="vertical" size="middle" className="w-full">
        {/* 示例1: 默认按钮 */}
        <div>
          <Button type="primary" onClick={() => setOpen1(true)}>
            打开 Modal（默认按钮）
          </Button>
          <CustomModal
            title="默认按钮示例"
            open={open1}
            onOk={handleOk1}
            onCancel={() => setOpen1(false)}
            confirmLoading={loading1}
          >
            <div className="space-y-2">
              <p className="text-gray-700">这是一个使用默认按钮的 Modal。</p>
              <p className="text-gray-700">点击确认按钮会执行异步操作。</p>
            </div>
          </CustomModal>
        </div>

        {/* 示例2: 自定义按钮配置 */}
        <div>
          <Button type="primary" onClick={() => setOpen2(true)}>
            打开 Modal（自定义按钮配置）
          </Button>
          <CustomModal
            title="自定义按钮配置示例"
            open={open2}
            onCancel={() => setOpen2(false)}
            footer={customButtons}
          >
            <div className="space-y-4">
              <p className="text-gray-700">这是一个使用自定义按钮配置的 Modal。</p>
              <Input placeholder="输入一些内容..." />
            </div>
          </CustomModal>
        </div>

        {/* 示例3: 完全自定义 footer */}
        <div>
          <Button type="primary" onClick={() => setOpen3(true)}>
            打开 Modal（完全自定义 footer）
          </Button>
          <CustomModal
            title="完全自定义 Footer 示例"
            open={open3}
            onCancel={() => setOpen3(false)}
            footer={customFooter}
            showDefaultButtons={false}
          >
            <div className="space-y-2">
              <p className="text-gray-700">这是一个完全自定义 footer 的 Modal。</p>
              <p className="text-gray-700">footer 可以是任何 ReactNode。</p>
            </div>
          </CustomModal>
        </div>

        {/* 示例4: 无按钮 */}
        <div>
          <Button type="primary" onClick={() => setOpen4(true)}>
            打开 Modal（无按钮）
          </Button>
          <CustomModal
            title="无按钮示例"
            open={open4}
            onCancel={() => setOpen4(false)}
            footer={null}
            showDefaultButtons={false}
          >
            <div className="space-y-2">
              <p className="text-gray-700">这是一个没有按钮的 Modal。</p>
              <p className="text-gray-700">可以通过点击遮罩层或右上角关闭按钮来关闭。</p>
            </div>
          </CustomModal>
        </div>
      </Space>
    </div>
  );
};

export default CustomModalExample;
