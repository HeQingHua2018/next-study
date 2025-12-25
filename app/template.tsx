import React from 'react'

const Template: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='template'>
        <h2>我是 Template</h2>
        {children}
    </div>
  )
}

export default Template