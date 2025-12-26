import React from 'react'
import Hero from '@/components/hero'
import { Metadata } from 'next';

export const metadata:Metadata = {
  title: 'Scale',
}

const Scale: React.FC = () => {
  return (
      <Hero imgUrl="/21094.jpg" content="Welcome to the Scale Page"/>
  )
}

export default Scale