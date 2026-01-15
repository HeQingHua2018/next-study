"use client";
import React from 'react'
import { Button } from 'antd'
import { useRouter } from 'next/navigation';


const Dashboard:React.FC = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'DELETE',
      });
      const data = await response.json();
      if(data.code === 200){
        router.push('/login');
      }
      console.log('Response from server:', data);
    }catch(error){
      console.error('Error during logout:', error);
    }
  }
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      Dashboard
      <Button type='primary' onClick={handleLogout}>退出</Button>
    </div>
  )
}

export default Dashboard