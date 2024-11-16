'use client';

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <nav className='w-full bg-[#111111] border-b border-gray-800 backdrop-blur-sm bg-opacity-80 sticky top-0 z-50 h-[72px]'>
        <div className='max-w-7xl mx-auto h-full'>
          <div className='flex justify-between items-center h-full px-6'>
            <Link href="/" className='flex gap-4 items-center group cursor-pointer'>
              <div className='transition-transform duration-300 group-hover:scale-110'>
                <Image src="/logo.svg" alt="Minecraft Server Lookup" width={35} height={35} />
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
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
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
      </nav>

      {/* Mobile Menu - Moved outside of nav */}
      <div 
        className={`
          lg:hidden 
          transform 
          transition-all 
          duration-300 ease-in-out
          fixed top-[72px] left-0 right-0 z-40
          ${isMenuOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-2 pointer-events-none'
          }
        `}
      >
        <ul className='
          flex flex-col gap-4 px-6 py-4 
          border-t border-gray-800
          bg-[#111111]/95 backdrop-blur-sm
          shadow-lg
        '>
          <li>
            <Link 
              href="/" 
              className={`block hover:text-emerald-500 transition-colors duration-200 font-medium ${
                pathname === '/' ? 'text-emerald-500' : 'text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="/api-docs" 
              className={`block hover:text-emerald-500 transition-colors duration-200 font-medium ${
                pathname === '/api-docs' ? 'text-emerald-500' : 'text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              API
            </Link>
          </li>
          <li>
            <Link 
              href="/about" 
              className={`block hover:text-emerald-500 transition-colors duration-200 font-medium ${
                pathname === '/about' ? 'text-emerald-500' : 'text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              href="https://github.com/kasumabalidps/minecraft-server-lookup" 
              target="_blank"
              rel="noopener noreferrer"
              className='inline-block px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg cursor-pointer transition-colors duration-200 font-medium text-white'
              onClick={() => setIsMenuOpen(false)}
            >
              GitHub
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}
