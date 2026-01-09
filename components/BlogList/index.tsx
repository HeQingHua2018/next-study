'use client';
import React from 'react'
import { Avatar, List } from 'antd';
import Link from 'next/link';
interface BlogProps{
    data: {title:string}[]
}
const BlogList:React.FC<BlogProps> = ({data}) =>{
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item
          className="cursor-pointer"
        >
          <List.Item.Meta
            avatar={
              <Avatar
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
              />
            }
            title={<Link href={`/test/blog/${index+1}`}>{item.title}</Link>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
        </List.Item>
      )}
    />
  )
}

export default BlogList;