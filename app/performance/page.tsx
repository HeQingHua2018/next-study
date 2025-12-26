import Hero from '@/components/hero'
import React from 'react'
import PerformSrc from '../../public/4377.jpg'

const Performance: React.FC = () => {
  return (
      <Hero imgUrl={PerformSrc} content="Welcome to the Performance Page"/>
  )
}

export default Performance