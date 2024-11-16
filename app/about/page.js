'use client';

import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

function TechnologyCard({ icon, name, description }) {
  return (
    <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors duration-200">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 relative">
          <Image
            src={icon}
            alt={name}
            fill
            className="object-contain"
          />
        </div>
        <h3 className="text-xl font-bold text-white">{name}</h3>
      </div>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

function DeveloperCard({ name, role, image, github, linkedin }) {
  return (
    <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors duration-200">
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full overflow-hidden relative mb-4 ring-2 ring-emerald-500/20">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
        <p className="text-emerald-500 mb-4">{role}</p>
        <div className="flex gap-4">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd" />
              </svg>
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const technologies = [
    {
      icon: '/next.svg',
      name: 'Next.js 15',
      description: 'Built with the latest Next.js 15 features including app directory and server components.'
    },
    {
      icon: '/vercel.svg',
      name: 'Vercel',
      description: 'Deployed on Vercel for optimal performance and reliability.'
    },
    {
      icon: '/window.svg',
      name: 'Tailwind CSS',
      description: 'Styled using Tailwind CSS for a modern and responsive design.'
    },
    {
      icon: '/globe.svg',
      name: 'MCStatus API',
      description: 'Powered by MCStatus.io API for real-time Minecraft server status.'
    }
  ];

  const developers = [
    {
      name: 'Kasuma Bali',
      role: 'Full Stack Developer',
      image: 'https://avatars.githubusercontent.com/kasumabalidps',
      github: 'https://github.com/kasumabalidps',
      linkedin: 'https://linkedin.com/in/kasumabalidps'
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent mb-4">
              About MSL
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A modern Minecraft server lookup tool built with cutting-edge technologies.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Technologies Used</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {technologies.map((tech, index) => (
                <TechnologyCard key={index} {...tech} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-center mb-8">Meet the Developer</h2>
            <div className="flex justify-center">
              <div className="max-w-sm">
                {developers.map((dev, index) => (
                  <DeveloperCard key={index} {...dev} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
