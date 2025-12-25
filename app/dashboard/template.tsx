"use client";
import React, {useState} from 'react';
const DashboardTemplate: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
    const [count, setCount] = useState(0);
    const addCount = () => {
        setCount(count + 1);
    }
  return (
      <div className='border-2 border-dashed border-black p-4 mx-auto mt-4'>
        <h2>Dashboard Template {count}</h2>
        <button onClick={addCount} className='bg-black text-white px-2 py-1 rounded-md mb-4'>
            add
        </button>
        {children}
    </div>
  );
}

export default DashboardTemplate;
