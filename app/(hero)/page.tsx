import Hero from '@/components/hero';
import React from 'react'
import { Metadata } from 'next';

export const metadata:Metadata = {
  title: 'Home',
}

const Home: React.FC = () => {
  return (
    <Hero imgUrl="/2200.jpg" content="Welcome to the Home Page"/>
  )
}
export default Home;
