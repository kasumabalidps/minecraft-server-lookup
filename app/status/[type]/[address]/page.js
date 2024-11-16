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

function LoadingCard() {
  return (
    <div className="bg-[#111111] p-6 rounded-xl border border-gray-800">
      <div className="h-5 w-24 bg-gray-800 rounded mb-4 animate-pulse"></div>
      <div className="h-8 w-32 bg-gray-800 rounded animate-pulse"></div>
    </div>
  );
}

export default function ServerStatus({ params }) {
  const resolvedParams = use(params);
  const [serverData, setServerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [latency, setLatency] = useState(null);

  const measureLatency = async () => {
    try {
      const startTime = Date.now();
      const res = await fetch(`/api/minecraft/${resolvedParams.type}?url=${resolvedParams.address}`);
      const endTime = Date.now();
      const newLatency = endTime - startTime;
      setLatency(newLatency);
      
      if (res.ok) {
        const data = await res.json();
        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch server data');
        }
        setServerData(data.data);
      }
    } catch (err) {
      console.error('Error measuring latency:', err);
    }
  };

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

    // Set up real-time latency updates
    const latencyInterval = setInterval(measureLatency, 2000); // Update every 2 seconds

    return () => clearInterval(latencyInterval);
  }, [resolvedParams.type, resolvedParams.address]);

  const LoadingState = () => (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="h-8 w-32 bg-gray-800 rounded animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Server Info Column */}
            <div className="lg:col-span-3">
              <div className="bg-[#111111] border border-gray-800 rounded-xl p-8 mb-8">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-gray-800 rounded-lg animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-12 bg-gray-800 rounded w-3/4 mb-4 animate-pulse"></div>
                    <div className="flex flex-wrap gap-4">
                      <div className="h-6 w-32 bg-gray-800 rounded animate-pulse"></div>
                      <div className="h-6 w-6 bg-gray-800 rounded animate-pulse"></div>
                      <div className="h-6 w-40 bg-gray-800 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <LoadingCard key={i} />
                ))}
              </div>

              <div className="mt-6">
                <div className="bg-[#111111] p-6 rounded-xl border border-gray-800">
                  <div className="h-5 w-40 bg-gray-800 rounded mb-4 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-800 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-800 rounded animate-pulse w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Info Column */}
            <div className="lg:col-span-1">
              <div className="bg-[#111111] border border-gray-800 rounded-xl p-6">
                <div className="h-8 w-32 bg-gray-800 rounded mb-6 animate-pulse"></div>
                <div className="space-y-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i}>
                      <div className="h-5 w-24 bg-gray-800 rounded mb-2 animate-pulse"></div>
                      <div className="h-6 bg-gray-800 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="fixed bottom-8 right-8 flex items-center gap-3 bg-[#111111] px-4 py-3 rounded-full border border-gray-800 shadow-lg">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
            <span className="text-gray-400">Loading server status...</span>
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

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Server Info Column */}
            <div className="lg:col-span-3">
              <div className="bg-[#111111] border border-gray-800 rounded-xl p-8 mb-8">
                <div className="flex items-start gap-6">
                  {serverData?.icon && (
                    <img 
                      src={serverData.icon} 
                      alt="Server Icon" 
                      className="w-20 h-20 rounded-lg border-2 border-gray-800"
                    />
                  )}
                  <div>
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                      {resolvedParams.address}
                    </h1>
                    <div className="flex flex-wrap gap-4 text-gray-400">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span>{resolvedParams.type.charAt(0).toUpperCase() + resolvedParams.type.slice(1)} Edition</span>
                      </div>
                      <span>•</span>
                      <p>IP: {serverData?.ip_address}</p>
                      <span>•</span>
                      <p>Port: {serverData?.port}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatusCard 
                  title="Status" 
                  value={
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${serverData?.online ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                      <span className={serverData?.online ? 'text-emerald-500' : 'text-red-500'}>
                        {serverData?.online ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  }
                />

                <StatusCard 
                  title="Version" 
                  value={serverData?.version?.name_clean || serverData?.version?.name || 'Unknown'} 
                />

                <StatusCard 
                  title="Latency" 
                  value={
                    <div className="flex items-center gap-2">
                      <span>{latency ? `${latency}ms` : 'Unknown'}</span>
                      {latency && (
                        <span className={`w-2 h-2 rounded-full ${
                          latency < 100 ? 'bg-emerald-500' : 
                          latency < 200 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></span>
                      )}
                    </div>
                  }
                />

                <StatusCard 
                  title="Players" 
                  value={
                    <div className="flex flex-col">
                      <span className="text-2xl text-emerald-500">{serverData?.players?.online.toLocaleString()}</span>
                      <span className="text-sm text-gray-400">of {serverData?.players?.max.toLocaleString()} max</span>
                    </div>
                  }
                />

                {serverData?.srv_record ? (
                  <StatusCard 
                    title="SRV Record" 
                    value={`${serverData.srv_record.host}:${serverData.srv_record.port}`} 
                  />
                ) : (
                  <StatusCard 
                    title="Connection" 
                    value={`${serverData?.ip_address}:${serverData?.port}`} 
                  />
                )}

                {resolvedParams.type === 'bedrock' && serverData?.gamemode ? (
                  <StatusCard 
                    title="Game Mode" 
                    value={serverData.gamemode} 
                  />
                ) : (
                  <StatusCard 
                    title="Protocol" 
                    value={serverData?.version?.protocol || 'Unknown'} 
                  />
                )}
              </div>

              {serverData?.motd?.clean && (
                <div className="mt-6">
                  <StatusCard 
                    title="Message of the Day" 
                    value={
                      <div className="whitespace-pre-wrap text-base">
                        {serverData.motd.clean}
                      </div>
                    }
                    fullWidth={true}
                  />
                </div>
              )}
            </div>

            {/* Location Info Column */}
            <div className="lg:col-span-1">
              <div className="bg-[#111111] border border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Location Info</h2>
                <div className="space-y-4">
                  {serverData?.location && (
                    <>
                      <div>
                        <h3 className="text-gray-400 text-sm mb-1">Location</h3>
                        <p className="text-white">
                          {serverData.location.city && `${serverData.location.city}, `}
                          {serverData.location.region && `${serverData.location.region}, `}
                          {serverData.location.country || 'Unknown'}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-gray-400 text-sm mb-1">Network Provider</h3>
                        <p className="text-white">{serverData.location.isp || 'Unknown'}</p>
                      </div>
                      {serverData.location.org && (
                        <div>
                          <h3 className="text-gray-400 text-sm mb-1">Organization</h3>
                          <p className="text-white">{serverData.location.org}</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
