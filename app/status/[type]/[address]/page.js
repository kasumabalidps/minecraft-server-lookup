'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

function StatusCard({ title, value, fullWidth = false }) {
  return (
    <div className={`bg-[#111111] p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors duration-200 ${fullWidth ? 'col-span-full' : ''}`}>
      <h3 className="text-gray-400 text-sm mb-2">{title}</h3>
      <div className="text-white text-xl font-semibold">{value}</div>
    </div>
  );
}

export default function ServerStatus({ params }) {
  const resolvedParams = use(params);
  const [serverData, setServerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/minecraft/${resolvedParams.type}?url=${resolvedParams.address}`);
        const data = await res.json();
        
        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch server data');
        }
        
        setServerData(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [resolvedParams.type, resolvedParams.address]);

  const LoadingState = () => (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="animate-pulse flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-2xl text-gray-400">Loading server status...</div>
          </div>
        </div>
      </div>
    </>
  );

  const ErrorState = () => (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">Error: {error}</div>
            <Link 
              href="/"
              className="text-emerald-500 hover:text-emerald-400 transition-colors inline-flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </>
  );

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <Link 
              href="/"
              className="text-emerald-500 hover:text-emerald-400 transition-colors inline-flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to search
            </Link>
          </div>

          <div className="bg-[#111111] border border-gray-800 rounded-xl p-8 mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
              {resolvedParams.address}
            </h1>
            <div className="flex flex-wrap gap-4 text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>{resolvedParams.type.charAt(0).toUpperCase() + resolvedParams.type.slice(1)} Edition</span>
              </div>
              <span>•</span>
              <p>IP: {serverData.ip_address}</p>
              <span>•</span>
              <p>Port: {serverData.port}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatusCard 
              title="Status" 
              value={
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${serverData.online ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                  <span className={serverData.online ? 'text-emerald-500' : 'text-red-500'}>
                    {serverData.online ? 'Online' : 'Offline'}
                  </span>
                </div>
              }
            />
            
            {serverData.online && (
              <>
                <StatusCard 
                  title="Players" 
                  value={
                    <div className="flex flex-col">
                      <span className="text-2xl text-emerald-500">{serverData.players?.online.toLocaleString()}</span>
                      <span className="text-sm text-gray-400">of {serverData.players?.max.toLocaleString()} max</span>
                    </div>
                  }
                />
                
                <StatusCard 
                  title="Version" 
                  value={serverData.version?.name_clean || serverData.version?.name || 'Unknown'} 
                />

                {resolvedParams.type === 'bedrock' && serverData.gamemode && (
                  <StatusCard 
                    title="Game Mode" 
                    value={serverData.gamemode} 
                  />
                )}

                {serverData.srv_record && (
                  <StatusCard 
                    title="SRV Record" 
                    value={`${serverData.srv_record.host}:${serverData.srv_record.port}`} 
                  />
                )}

                {serverData.motd?.clean && (
                  <StatusCard 
                    title="Message of the Day" 
                    value={
                      <div className="whitespace-pre-wrap text-base">
                        {serverData.motd.clean}
                      </div>
                    }
                    fullWidth={true}
                  />
                )}

                {serverData.icon && (
                  <StatusCard
                    title="Server Icon"
                    value={
                      <img 
                        src={serverData.icon} 
                        alt="Server Icon" 
                        className="w-16 h-16 rounded"
                      />
                    }
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
