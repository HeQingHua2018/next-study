'use client';
import React from "react";
import { Button } from "antd";
import { useRouter } from "next/navigation";

const Index:React.FC = () => {
  const router = useRouter();
  return (
    <div className="container mx-auto p-4 flex justify-center items-center gap-4">
      <Button type="primary" onClick={() => router.push('/login')}>登录</Button>
      <Button type="primary" onClick={() => router.push('/home')}>HOME</Button>
    </div>
  );
}
export default Index;
