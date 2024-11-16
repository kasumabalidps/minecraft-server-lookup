import React from 'react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className='bg-[#111111] border-t border-gray-800 mt-24'>
      <div className='max-w-7xl mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Logo and Description */}
          <div className='col-span-1 md:col-span-2 space-y-4'>
            <div className='flex items-center gap-3'>
              <Image src="/logo.svg" alt="MSL Logo" width={35} height={35} />
              <span className='font-bold text-xl'>MSL<span className='text-emerald-500'>.id</span></span>
            </div>
            <p className='text-gray-400 max-w-sm'>
              Get real-time information about any Minecraft server. Check server status, player count, and more with our simple lookup tool.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='font-semibold text-lg mb-4'>Quick Links</h3>
            <ul className='space-y-3'>
              <li>
                <a href="#" className='text-gray-400 hover:text-emerald-500 transition-colors'>Home</a>
              </li>
              <li>
                <a href="#" className='text-gray-400 hover:text-emerald-500 transition-colors'>API</a>
              </li>
              <li>
                <a href="#" className='text-gray-400 hover:text-emerald-500 transition-colors'>About</a>
              </li>
              <li>
                <a href="#" className='text-gray-400 hover:text-emerald-500 transition-colors'>Dashboard</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className='font-semibold text-lg mb-4'>Contact</h3>
            <ul className='space-y-3'>
              <li>
                <a href="#" className='text-gray-400 hover:text-emerald-500 transition-colors'>Discord</a>
              </li>
              <li>
                <a href="#" className='text-gray-400 hover:text-emerald-500 transition-colors'>Twitter</a>
              </li>
              <li>
                <a href="#" className='text-gray-400 hover:text-emerald-500 transition-colors'>GitHub</a>
              </li>
              <li>
                <a href="#" className='text-gray-400 hover:text-emerald-500 transition-colors'>Email</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-gray-400 text-sm'>
            2024 MSL.id. All rights reserved.
          </p>
          <div className='flex gap-6'>
            <a href="#" className='text-gray-400 hover:text-emerald-500 transition-colors text-sm'>Privacy Policy</a>
            <a href="#" className='text-gray-400 hover:text-emerald-500 transition-colors text-sm'>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}