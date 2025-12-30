"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, {useState} from 'react';

const DashboardLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
    const pathname = usePathname();
    console.log(pathname)
    const [count, setCount] = useState(0);
    const addCount = () => {
        setCount(count + 1);
    }
    const linkData = [
        {name:'About', path:'/dashboard/about'},
        {name:'Settings', path:'/dashboard/settings'}
    ]
  return (
      <div className='border-2 border-dashed border-black p-4 w-1/2 mx-auto mt-4'>
        <div className='flex gap-4 font-bold text-lg'>
            {
                linkData.map((item) => (
                    <Link key={item.path} className={pathname === item.path ? 'text-purple-500' : 'text-black'} href={item.path}>{item.name}</Link>
                ))
            }
           
        </div>
        <h2>Dashboard Layout {count}</h2>
        <button onClick={addCount} className='bg-black text-white px-2 py-1 rounded-md mb-4'>
            add
        </button>
        {children}
    </div>
  );
}

export default DashboardLayout;
