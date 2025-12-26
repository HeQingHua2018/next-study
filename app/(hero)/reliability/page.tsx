import React from 'react'
import Hero from '@/components/hero'
import { Metadata } from 'next';

export const metadata:Metadata = {
  title: 'Reliability',
}

const Reliability: React.FC = () => {
  return (
      <Hero imgUrl="/11650.jpg" content="Welcome to the Reliability Page"/>
  )
}
export default Reliability
