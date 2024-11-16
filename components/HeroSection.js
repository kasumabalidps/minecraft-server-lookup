'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HeroSection() {
  const router = useRouter();
  const [serverType, setServerType] = useState('java');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (address.trim()) {
      router.push(`/status/${serverType}/${address}`);
    }
  };

  const handlePopularServer = (server) => {
    setAddress(server);
    router.push(`/status/${serverType}/${server}`);
  };

  return (
    <div className='flex flex-col justify-center items-center max-w-7xl mx-auto mt-24 px-4'>
      <div className='text-center space-y-4 mb-12'>
        <h1 className='text-5xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent'>
          Minecraft Server Lookup
        </h1>
        <h3 className='text-xl text-gray-400 max-w-2xl'>
          Get real-time status of your Minecraft Server including player count, version, and more detailed information
        </h3>
      </div>
      
      <div className='w-full max-w-2xl space-y-6'>
        <div className='flex flex-col sm:flex-row gap-4'>
          <div className="w-full sm:w-32">
            <label htmlFor="server-type" className="sr-only">
              Minecraft Server Type
            </label>
            <select 
              id="server-type"
              name="server-type"
              aria-label="Select Minecraft server type"
              value={serverType}
              onChange={(e) => setServerType(e.target.value)}
              className='bg-[#111111] border border-gray-700 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200'
            >
              <option value="java">Java</option>
              <option value="bedrock">Bedrock</option>
            </select>
          </div>
          
          <form onSubmit={handleSubmit} className='flex-1 w-full'>
            <div className='relative'>
              <input 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder='Enter server IP (ex: hypixel.net)' 
                className='w-full bg-[#111111] border border-gray-700 rounded-lg px-4 py-3 pr-24 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-gray-500'
              />
              <button 
                type='submit'
                className='absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 hover:bg-emerald-500 px-4 sm:px-6 py-2 rounded-md transition-colors duration-200 font-medium text-sm sm:text-base'
              >
                Search
              </button>
            </div>
          </form>
        </div>
        
        <div className='text-center'>
          <p className='text-gray-500 text-sm'>
            Popular servers: 
            <span 
              onClick={() => handlePopularServer('hypixel.net')}
              className='text-emerald-500 ml-2 cursor-pointer hover:text-emerald-400 transition-colors'
            >
              hypixel.net
            </span>
            <span className='text-gray-700 mx-2'>•</span>
            <span 
              onClick={() => handlePopularServer('mc.hypixel.net')}
              className='text-emerald-500 cursor-pointer hover:text-emerald-400 transition-colors'
            >
              mc.hypixel.net
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
