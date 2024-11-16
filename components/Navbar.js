'use client';

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className='w-full bg-[#111111] border-b border-gray-800 backdrop-blur-sm bg-opacity-80 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex justify-between items-center py-4 px-6'>
          <Link href="/" className='flex gap-4 items-center group cursor-pointer'>
            <div className='transition-transform duration-300 group-hover:scale-110'>
              <Image src="/logo.svg" alt="Minecraft Server Lookup" width={35} height={35} />
            </div>
            <h1 className='font-bold text-xl tracking-tight'>
              MSL <span className='text-emerald-500 text-base font-normal'>.id</span>
            </h1>
          </Link>
          <div>
            <ul className='flex gap-6 items-center'>
              <li>
                <Link 
                  href="/" 
                  className={`hover:text-emerald-500 transition-colors duration-200 font-medium ${
                    pathname === '/' ? 'text-emerald-500' : 'text-white'
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/api-docs" 
                  className={`hover:text-emerald-500 transition-colors duration-200 font-medium ${
                    pathname === '/api-docs' ? 'text-emerald-500' : 'text-white'
                  }`}
                >
                  API
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className={`hover:text-emerald-500 transition-colors duration-200 font-medium ${
                    pathname === '/about' ? 'text-emerald-500' : 'text-white'
                  }`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="https://github.com/kasumabalidps/minecraft-server-lookup" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className='px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg cursor-pointer transition-colors duration-200 font-medium text-white'
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
