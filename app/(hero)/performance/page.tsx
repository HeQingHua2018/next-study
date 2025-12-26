import Hero from '@/components/hero'
import React from 'react'
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
      <Hero imgUrl="/4377.jpg" content="Welcome to the Performance Page"/>
  )
}

export default Performance