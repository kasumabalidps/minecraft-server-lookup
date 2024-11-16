import React from 'react'

export default function HeroSection() {
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
        <div className='flex gap-4'>
          <select className='bg-[#111111] border border-gray-700 rounded-lg px-4 py-3 w-32 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200'>
            <option value="java">Java</option>
            <option value="bedrock">Bedrock</option>
          </select>
          
          <form className='flex-1'>
            <div className='relative'>
              <input 
                placeholder='Enter server IP (ex: hypixel.net)' 
                className='w-full bg-[#111111] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-gray-500'
              />
              <button 
                type='submit'
                className='absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 hover:bg-emerald-500 px-6 py-2 rounded-md transition-colors duration-200 font-medium'
              >
                Search
              </button>
            </div>
          </form>
        </div>
        
        <div className='text-center'>
          <p className='text-gray-500 text-sm'>
            Popular servers: 
            <span className='text-emerald-500 ml-2 cursor-pointer hover:text-emerald-400 transition-colors'>hypixel.net</span>
            <span className='text-gray-700 mx-2'>•</span>
            <span className='text-emerald-500 cursor-pointer hover:text-emerald-400 transition-colors'>mc.hypixel.net</span>
          </p>
        </div>
      </div>
    </div>
  )
}
