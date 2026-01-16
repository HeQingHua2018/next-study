import React from 'react'
import CustomModalExample from '@/components/CustomModal.example'
import CustomModalFormExample from '@/components/CustomModal.form.example'

const Home:React.FC=()=>{
  return <div className="container mx-auto p-4 ">
    <h1 className="text-2xl font-bold mb-2">Home组件(演示：自定义modal和表单modal—— 基于cursor生成的组件customModal)</h1>
    <div className="content w-full h-100 flex justify-between items-center p-2 gap-2 border border-dashed ">
    <div className="flex-1 h-full border-r border-dashed">
      <CustomModalExample />
    </div>  
    <div className="flex-1 h-full">
      <CustomModalFormExample />
    </div>
    </div>
  </div>
}
export default Home;
