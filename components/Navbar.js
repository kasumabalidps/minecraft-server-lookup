import React from 'react'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className='w-full bg-[#111111] border-b border-gray-800 backdrop-blur-sm bg-opacity-80 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex justify-between items-center py-4 px-6'>
          <div className='flex gap-4 items-center group cursor-pointer'>
            <div className='transition-transform duration-300 group-hover:scale-110'>
              <Image src="logo.svg" alt="Minecraft Server Lookup" width={35} height={35} />
            </div>
            <h1 className='font-bold text-xl tracking-tight'>
              MSL <span className='text-emerald-500 text-base font-normal'>.id</span>
            </h1>
          </div>
          <div>
            <ul className='flex gap-6 items-center'>
              <li className='hover:text-emerald-500 cursor-pointer transition-colors duration-200 font-medium'>Home</li>
              <li className='hover:text-emerald-500 cursor-pointer transition-colors duration-200 font-medium'>About</li>
              <li className='hover:text-emerald-500 cursor-pointer transition-colors duration-200 font-medium'>Support</li>
              <li className='px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg cursor-pointer transition-colors duration-200 font-medium'>Blog</li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
