'use client';

import React from 'react';
import Navbar from '@/components/Navbar';

function CodeBlock({ title, code }) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-gray-300 mb-2">{title}</h3>
      <pre className="bg-[#111111] p-4 rounded-xl border border-gray-800 overflow-x-auto">
        <code className="text-sm text-gray-300">{code}</code>
      </pre>
    </div>
  );
}

function EndpointSection({ title, endpoint, method, description, parameters, response }) {
  return (
    <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors duration-200">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-sm font-medium">
            {method}
          </span>
        </div>
      </div>
      <div className="mb-4">
        <code className="px-3 py-1 bg-gray-800 rounded-lg text-gray-300">{endpoint}</code>
      </div>
      <p className="text-gray-400 mb-6">{description}</p>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Parameters</h3>
          <div className="bg-black/50 rounded-lg overflow-hidden">
            <table className="w-full text-left">
              <thead className="border-b border-gray-800">
                <tr>
                  <th className="px-4 py-3 text-gray-400">Name</th>
                  <th className="px-4 py-3 text-gray-400">Type</th>
                  <th className="px-4 py-3 text-gray-400">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {parameters.map((param, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-emerald-500 font-medium">{param.name}</td>
                    <td className="px-4 py-3 text-gray-400">{param.type}</td>
                    <td className="px-4 py-3 text-gray-400">{param.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Example Response</h3>
          <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-gray-300">{JSON.stringify(response, null, 2)}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default function APIDocsPage() {
  const javaEndpoint = {
    title: 'Java Edition Server Status',
    endpoint: '/api/minecraft/java?url={server_address}',
    method: 'GET',
    description: 'Get the status of a Minecraft Java Edition server including player count, version, and MOTD.',
    parameters: [
      {
        name: 'url',
        type: 'string',
        description: 'The server address (e.g., hypixel.net)',
      }
    ],
    response: {
      "success": true,
      "data": {
        "online": true,
        "host": "hypixel.net",
        "port": 25565,
        "version": {
          "name_clean": "Requires MC 1.8 / 1.21",
          "protocol": 47
        },
        "players": {
          "online": 23844,
          "max": 200000
        },
        "motd": {
          "clean": "                Hypixel Network [1.8-1.21]\n   NEW BUILD BATTLE MODE: SPEED BUILDERS"
        }
      }
    }
  };

  const bedrockEndpoint = {
    title: 'Bedrock Edition Server Status',
    endpoint: '/api/minecraft/bedrock?url={server_address}',
    method: 'GET',
    description: 'Get the status of a Minecraft Bedrock Edition server including player count, version, and game mode.',
    parameters: [
      {
        name: 'url',
        type: 'string',
        description: 'The server address (e.g., play.hypixel.net)',
      }
    ],
    response: {
      "success": true,
      "data": {
        "online": true,
        "host": "sg.hivebedrock.network",
        "port": 19132,
        "version": {
          "name": "1.0",
          "protocol": 121
        },
        "players": {
          "online": 12608,
          "max": 100001
        },
        "gamemode": "Survival",
        "motd": {
          "clean": "BEDWARS! \nHive Games"
        }
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent mb-4">
              API Documentation
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Simple and powerful API to check Minecraft server status for both Java and Bedrock editions.
              Powered by <a href="https://mcstatus.io/" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:text-emerald-400">MCStatus.io</a>.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-[#111111] border border-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Getting Started</h2>
              <p className="text-gray-400 mb-4">
                Our API is built on top of the MCStatus.io API service, providing a simplified interface for checking Minecraft server status. 
                For more detailed information about the underlying API, visit the <a href="https://mcstatus.io/docs" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:text-emerald-400">MCStatus.io documentation</a>.
              </p>
              <div className="bg-black/50 rounded-lg p-4">
                <p className="text-gray-400">Base URL:</p>
                <code className="text-emerald-500">https://your-domain.com/api/minecraft</code>
              </div>
            </div>

            <EndpointSection {...javaEndpoint} />
            <EndpointSection {...bedrockEndpoint} />

            <div className="bg-[#111111] border border-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Rate Limits</h2>
              <p className="text-gray-400">
                To ensure fair usage and maintain service quality, we implement the following rate limits:
              </p>
              <ul className="list-disc list-inside text-gray-400 mt-2 space-y-2">
                <li>100 requests per minute per IP address</li>
                <li>1000 requests per hour per IP address</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
