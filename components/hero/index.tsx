import Image, { type StaticImageData } from 'next/image';
import React from 'react';

interface IProps {
  imgUrl: StaticImageData;
  altTxt?: string;
  content?: string;
}
const Hero: React.FC<IProps> = ({ imgUrl, content, altTxt}) => {
  return (
    <div className="h-screen relative text-white">
      <div className="absolute inset-0 -z-10">
        <Image
          src={imgUrl}
          alt={altTxt || 'Image'}
          fill
          className="object-cover"
          priority
        />
        <div className='absolute inset-0 bg-linear-to-r from-gray-950'></div>
      </div>
      {content && (
        <div className="flex justify-center items-center h-full">
          <h1 className="text-white text-6xl ">{content}</h1>
        </div>
      )}
    </div>
  );
};

export default Hero;
