import React from 'react';
import type { Metadata } from "next";
import BlogList from '@/components/BlogList';
export const metadata: Metadata = {
  title: 'Blog List',
};

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
const Blog: React.FC = () => {
  return (
    <BlogList data={data} />
  );
};

export default Blog;
