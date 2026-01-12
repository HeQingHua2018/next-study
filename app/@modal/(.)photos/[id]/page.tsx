"use client"
import React from 'react'
import Image from 'next/image'
import { products } from '@/data'
import { useRouter } from 'next/navigation'

const Page:React.FC<{params:Promise<{ id: string }>}>=({params}) => {
  // 1. 解包params Promise
  const resolvedParams = React.use(params)
  // 2. 正确获取并解析id
  const productId = parseInt(resolvedParams.id, 10)
  // 3. 匹配商品
  const product = products.find(p => p.id === productId)!;
  
  const router = useRouter();

  // 若仍无匹配（如id无效），触发404
  return (
    <div className='flex justify-center items-center fixed inset-0 bg-gray-500/[0.5]' onClick={()=>router.back()}>
        <Image
            width={300}
            height={420}
            alt={product?.imageAlt}
            src={product?.imageSrc}
            className="aspect-square rounded-lg bg-gray-200 object-cover group-hover:opacity-75 mx-auto"
            onClick={(e)=>e.stopPropagation()}
        />
    </div>
  )
}

export default Page