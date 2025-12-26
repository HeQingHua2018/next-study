import Hero from '@/components/hero';
import React from 'react'
import homSrc from '../public/2200.jpg';

const Home: React.FC = () => {
  return (
    <Hero imgUrl={homSrc} content="Welcome to the Home Page"/>
  )
}
export default Home;
