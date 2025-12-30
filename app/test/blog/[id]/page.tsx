"use client"
import React, {use} from 'react'

interface DetailProps {
  params: Promise<{ id: string }>
}
const Detail: React.FC<DetailProps> =  ({ params}) => {
  const {id} = use(params)
  console.log(id)
  return (
    <div>Detail page for ID: {id}</div>
  )
}

export default Detail