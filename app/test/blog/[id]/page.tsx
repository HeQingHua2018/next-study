import React, {use} from 'react'

interface DetailProps {
  params: Promise<{ id: string }>
}
export async function generateMetadata({params}: DetailProps) {
  const resolvedParams = await params;
  return {
    title: `Blog Detail - ${resolvedParams.id}`,
    description: `This is the detail page for blog ID ${resolvedParams.id}.`,
  };
}
const Detail: React.FC<DetailProps> =  ({ params}) => {
  const {id} = use(params)
  console.log(id)
  return (
    <div>Detail page for ID: {id}</div>
  )
}

export default Detail