import Hero from '@/components/hero'
import React from 'react'
import PerformSrc from '../../public/4377.jpg'
import { Metadata } from 'next';

/**
 *  标题: Performance
 *  描述: This is the performance page of our Next.js application.
 */
export const metadata: Metadata = {
  title: 'Performance',
  description: 'This is the performance page of our Next.js application.',
}
const Performance: React.FC = () => {
  return (
      <Hero imgUrl={PerformSrc} content="Welcome to the Performance Page"/>
  )
}

export default Performance