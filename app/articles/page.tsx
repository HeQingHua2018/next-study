/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { GetProp, TableProps } from 'antd';
import { Button, Form, Input, message, Modal, Space, Table } from 'antd';

type ColumnsType<T extends object = object> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<
  GetProp<TableProps, 'pagination'>,
  boolean
>;
interface DataType {
  title: string;
  content: string;
  id: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
}


const Articles: React.FC = () => {
  const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: true,
  },
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '内容',
    dataIndex: 'content',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    render: (_: any, record: DataType) => (
      <Space size="middle">
        <Button type="link" onClick={()=> {showModal(); setArticle(record)}}>编辑</Button>
        <Button danger type="text" onClick={()=>handleDel(record)}>
          删除
        </Button>
      </Space>
    ),
  },
];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState<DataType>();
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 2,
    },
  });
  const [queryForm] = Form.useForm();
  const [form] = Form.useForm();

  const fetchData = async () => {
    setLoading(true);
    const { query } = await queryForm.getFieldsValue();
    fetch(
      `http://localhost:3000/api/articles?pageSize=${
        tableParams.pagination?.pageSize
      }&pageNumber=${tableParams.pagination?.current}&query=${query || ''}`,
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((res) => {
        if (res?.code === 200) {
          setData(Array.isArray(res.data) ? res.data : []);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: res.total,
            },
          });
        }
      })
      .catch(() => {
        console.log('fetch mock data failed');
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    tableParams.pagination?.pageSize,
    tableParams.pagination?.current,
  ]);

  const handleTableChange: TableProps<DataType>['onChange'] = (
    pagination,
    _filters,
    _sorter,
  ) => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  };
  const onSearch = () => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: 1,
      },
    });
  };
  const onReset = () => {
    queryForm.resetFields();
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: 1,
      },
    });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const delArticle = async (id: string) => { 
   try{
     const data = await fetch(`http://localhost:3000/api/articles/${id}`, {
        method: 'DELETE',
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      });
      if(data?.code === 200){
        message.success('文章删除成功');
        fetchData();
      }
   }catch(error){
     console.log('删除文章失败：', error);
     message.error('文章删除失败');
   }
  }
  const handleDel = (record: DataType) => {
   Modal.confirm({
        title: '确认删除该文章吗？',
        content: `标题：${record.title}`,
        okText: '确认',
        cancelText: '取消',
        onOk: async () => {
          await delArticle(record.id);
        }
      }
      )
  };

  const handleSubmit = async () => {
    try {
      const formValues = await form.validateFields();
      const isEdit = Object.keys(article || {}).length > 0;
      const data = await fetch(`http://localhost:3000/api/articles/${isEdit ? article?.id : ''}`, {
        method: isEdit ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(article ? { ...article, ...formValues } : formValues),
      }).then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      });
      if(data?.code === 200){
        message.success(isEdit ? '文章更新成功' : '文章创建成功');
        fetchData();
      }
      closeModal();
    } catch (errorInfo) {
      // 表单校验失败，antd会自动显示错误提示，无需额外处理
      console.log('表单校验失败：', errorInfo);
    }
  };

  const closeModal = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <div className="w-2xl mx-auto mt-20 p-4 border border-dashed border-gray-200 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <Form layout="inline" form={queryForm}>
          <Form.Item label="关键字" name="query">
            <Input
              type="text"
              placeholder="请输入关键字"
              onPressEnter={onSearch}
            />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button
                type="primary"
                onClick={onSearch}
                htmlType="submit"
                icon={<SearchOutlined />}
              >
                查询
              </Button>
              <Button htmlType="reset" onClick={onReset}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
        <Button onClick={showModal} type="primary" icon={<PlusOutlined />}>
          新建文章
        </Button>
      </div>
      <Table<DataType>
        columns={columns}
        rowKey={(record) => record.id}
        bordered
        dataSource={data}
        pagination={tableParams?.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
      <Modal
        title="新建文章"
        open={isModalOpen}
        onCancel={closeModal}
        destroyOnHidden
        maskClosable={false}
        footer={
          <div className="w-full flex justify-center items-center gap-2">
            <Button key="cancel" onClick={closeModal}>
              取消
            </Button>
            <Button key="submit" type="primary" onClick={handleSubmit}>
              保存
            </Button>
          </div>
        }
      >
        <Form
          preserve={false}
          initialValues={article}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" />
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <Input.TextArea rows={4} placeholder="请输入文章内容" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Articles;
