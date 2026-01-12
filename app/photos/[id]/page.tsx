import React from 'react'
import Image from 'next/image'
import { products } from '@/data'
import { notFound } from 'next/navigation'

const Page:React.FC<{params:Promise<{ id: string }>}>=({params}) => {
  // 1. 解包params Promise
  const resolvedParams = React.use(params)
  // 2. 正确获取并解析id
  const productId = parseInt(resolvedParams.id, 10)
  // 3. 匹配商品
  const product = products.find(p => p.id === productId)

  // 若仍无匹配（如id无效），触发404
  if (!product) notFound()
  return (
    <div className='container mx-auto pt-8'>
        <Image
            width={400}
            height={520}
            alt={product?.imageAlt}
            src={product?.imageSrc}
            className="aspect-square rounded-lg bg-gray-200 object-cover group-hover:opacity-75 mx-auto"
        />
        <div className='border-2 border-dashed border-gray-500 rounded-lg p-3 mt-5 leading-8'>
            <p>
                <strong>Product Name:</strong> {product?.name}
            </p>
            <p>
                <strong>Price:</strong> {product?.price}
            </p>
            <p>
                <strong>Desc:</strong> {product?.imageAlt.repeat(5)}
            </p>
        </div>
    </div>
  )
}

export default Page