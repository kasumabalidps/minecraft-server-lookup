'use client'

import React, { useState, useEffect } from 'react'

const PopularSection = () => {
  const [servers, setServers] = useState([
    {
      name: 'Hypixel',
      description: 'The world\'s largest Minecraft server network, featuring original games like SkyBlock and BedWars.',
      ip: 'mc.hypixel.net',
      players: 'Loading...',
      status: 'Loading...',
      platform: 'Java'
    },
    {
      name: 'Mineplex',
      description: 'One of the largest Minecraft networks featuring unique minigames and creative game modes.',
      ip: 'us.mineplex.com',
      players: 'Loading...',
      status: 'Loading...',
      platform: 'Java & Bedrock'
    },
    {
      name: 'CubeCraft',
      description: 'Popular server network offering various minigames and survival game modes for both Java and Bedrock.',
      ip: 'play.cubecraft.net',
      players: 'Loading...',
      status: 'Loading...',
      platform: 'Java & Bedrock'
    },
    {
      name: 'Wynncraft',
      description: 'The largest MMORPG server in Minecraft, featuring custom quests, items, and a vast open world.',
      ip: 'play.wynncraft.com',
      players: 'Loading...',
      status: 'Loading...',
      platform: 'Java'
    },
    {
      name: 'ManaCube',
      description: 'Feature-rich Minecraft network offering Skyblock, Prison, and various survival game modes.',
      ip: 'play.manacube.com',
      players: 'Loading...',
      status: 'Loading...',
      platform: 'Java'
    },
    {
      name: 'GommeHD',
      description: 'One of Europe\'s largest Minecraft networks with various minigames and competitive modes.',
      ip: 'gommehd.net',
      players: 'Loading...',
      status: 'Loading...',
      platform: 'Java'
    }
  ]);

  useEffect(() => {
    const fetchServerData = async () => {
      const updatedServers = await Promise.all(
        servers.map(async (server) => {
          try {
            const platforms = server.platform.toLowerCase().split(' & ');
            let javaData = null;
            let bedrockData = null;

            try {
              if (platforms.includes('java')) {
                const javaRes = await fetch(`/api/minecraft/java?url=${server.ip}`);
                if (!javaRes.ok) throw new Error(`HTTP error! status: ${javaRes.status}`);
                javaData = await javaRes.json();
              }

              if (platforms.includes('bedrock')) {
                const bedrockRes = await fetch(`/api/minecraft/bedrock?url=${server.ip}`);
                if (!bedrockRes.ok) throw new Error(`HTTP error! status: ${bedrockRes.status}`);
                bedrockData = await bedrockRes.json();
              }

              const data = javaData?.data || bedrockData?.data;
              
              if (!data) {
                return {
                  ...server,
                  players: 'Offline',
                  status: 'Offline'
                };
              }

              return {
                ...server,
                players: data.players?.online !== undefined ? `${data.players.online} online` : 'N/A',
                status: data.online ? 'Online' : 'Offline',
                description: data.motd?.clean && Array.isArray(data.motd.clean) && data.motd.clean.length > 0
                  ? data.motd.clean.join('\n')
                  : server.description
              };
            } catch (error) {
              console.error(`Error fetching data for ${server.name}:`, error);
              return {
                ...server,
                players: 'Error',
                status: 'Unknown'
              };
            }
          } catch (error) {
            console.error(`Error fetching data for ${server.name}:`, error);
            return {
              ...server,
              players: 'Error',
              status: 'Unknown'
            };
          }
        })
      );

      setServers(updatedServers);
    };

    fetchServerData();
    // Refresh every 5 minutes
    const interval = setInterval(fetchServerData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='max-w-7xl mx-auto px-4'>
      <div className='text-center space-y-4 mb-12'>
        <h2 className='text-4xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent'>
          Popular Servers
        </h2>
        <p className='text-gray-400 max-w-2xl mx-auto text-lg'>
          Discover some of the most popular Minecraft servers that players love to join
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {servers.map((server, index) => (
          <div 
            key={index}
            className='bg-[#111111] rounded-xl p-6 border border-gray-800 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 group'
          >
            <div className='flex justify-between items-start mb-4'>
              <h3 className='font-bold text-xl group-hover:text-emerald-500 transition-colors duration-300'>{server.name}</h3>
              <div className='flex gap-2'>
                <span className='px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-sm font-medium'>
                  {server.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  server.platform === 'Java' ? 'bg-blue-500/10 text-blue-500' : 
                  server.platform === 'Bedrock' ? 'bg-purple-500/10 text-purple-500' :
                  'bg-indigo-500/10 text-indigo-500'
                }`}>
                  {server.platform}
                </span>
              </div>
            </div>
            <p className='text-gray-400 mb-4 line-clamp-2'>{server.description}</p>
            <div className='flex justify-between items-center text-sm'>
              <span className='text-gray-500 hover:text-emerald-500 cursor-pointer transition-colors duration-300'>{server.ip}</span>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-emerald-500 rounded-full animate-pulse'></div>
                <span className='text-emerald-500'>{server.players}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PopularSection;
