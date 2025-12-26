"use client";
import React from 'react';
import Link from 'next/link'
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
  const pathname = usePathname();
  const linkData = [
    {path: '/performance', label: 'Performance'},
    {path: '/reliability', label: 'Reliability'},
    {path: '/scale', label: 'Scale'}
  ]
  return (
    <div className="w-full absolute z-10 inset-0">
          <div className="flex justify-between container h-16 items-center mx-auto p-8 text-white">
            <Link href="/" className="text-3xl font-bold">Home</Link>
            <div className="text-xl space-x-4">
              {
                linkData.map((link) => (
                  <Link 
                    key={link.path} 
                    className={pathname === link.path ? 'text-purple-500' : ''} 
                    href={link.path}
                  >
                    {link.label}
                  </Link>
                ))
              }
            </div>
          </div>
        </div>
  )
}

export default Header