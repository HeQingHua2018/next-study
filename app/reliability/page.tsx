import React from 'react'
import ReliabilitySrc from '../../public/11650.jpg'
import Hero from '@/components/hero'
import { Metadata } from 'next';

export const metadata:Metadata = {
  title: 'Reliability',
}

const Reliability: React.FC = () => {
  return (
      <Hero imgUrl={ReliabilitySrc} content="Welcome to the Reliability Page"/>
  )
}
export default Reliability
