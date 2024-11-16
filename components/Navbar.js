'use client';

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  if (!isMounted) {
    return null 
  }

  return (
    <nav className='w-full bg-[#111111] border-b border-gray-800 backdrop-blur-sm bg-opacity-80 sticky top-0 z-50 h-[72px]'>
      <div className='max-w-7xl mx-auto h-full'>
        <div className='flex justify-between items-center h-full px-6'>
          <Link href="/" className='flex gap-4 items-center group cursor-pointer'>
            <div className='transition-transform duration-300 group-hover:scale-110'>
              <Image src="/logo.svg" alt="Minecraft Server Lookup" width={35} height={35} priority />
            </div>
            <h1 className='font-bold text-xl tracking-tight'>
              MSL <span className='text-emerald-500 text-base font-normal'>.id</span>
            </h1>
          </Link>

          {/* Hamburger Menu Button */}
          <button
            className='lg:hidden text-white hover:text-emerald-500 transition-colors duration-200'
            onClick={toggleMenu}
            aria-label='Toggle Menu'
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Desktop Menu */}
          <div className='hidden lg:block'>
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

      {/* Mobile Menu - Full Screen */}
      <div 
        className={`
          lg:hidden fixed inset-0 z-30
          transform transition-all duration-300 ease-in-out
          bg-[#111111]/95 backdrop-blur-md
          ${isMenuOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-1 pointer-events-none'
          }
        `}
        style={{ top: '72px', height: 'calc(100vh - 72px)' }}
      >
        <div className="h-full flex flex-col justify-start pt-8 px-6 overflow-y-auto">
          <ul className='flex flex-col gap-8 items-center text-lg w-full'>
            <li className="w-full max-w-sm">
              <Link 
                href="/" 
                className={`flex items-center justify-center gap-3 p-4 rounded-xl border border-gray-800 hover:bg-gray-800/50 transition-all duration-200 ${
                  pathname === '/' ? 'text-emerald-500 border-emerald-500/50' : 'text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </Link>
            </li>
            <li className="w-full max-w-sm">
              <Link 
                href="/api-docs" 
                className={`flex items-center justify-center gap-3 p-4 rounded-xl border border-gray-800 hover:bg-gray-800/50 transition-all duration-200 ${
                  pathname === '/api-docs' ? 'text-emerald-500 border-emerald-500/50' : 'text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                API
              </Link>
            </li>
            <li className="w-full max-w-sm">
              <Link 
                href="/about" 
                className={`flex items-center justify-center gap-3 p-4 rounded-xl border border-gray-800 hover:bg-gray-800/50 transition-all duration-200 ${
                  pathname === '/about' ? 'text-emerald-500 border-emerald-500/50' : 'text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                About
              </Link>
            </li>
            <li className="w-full max-w-sm">
              <Link 
                href="https://github.com/kasumabalidps/minecraft-server-lookup" 
                target="_blank"
                rel="noopener noreferrer"
                className='flex items-center justify-center gap-3 p-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 transition-all duration-200 text-white'
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                GitHub
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}