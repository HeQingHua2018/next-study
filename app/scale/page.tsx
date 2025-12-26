import React from 'react'
import ScaleSrc from '../../public/21094.jpg'
import Hero from '@/components/hero'
import { Metadata } from 'next';

export const metadata:Metadata = {
  title: 'Scale',
}

const Scale: React.FC = () => {
  return (
      <Hero imgUrl={ScaleSrc} content="Welcome to the Scale Page"/>
  )
}

export default Scale