import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const url = searchParams.get('url');
        
        if (!url) {
            return NextResponse.json({
                success: false,
                error: "Please provide a IP address"
            }, { status: 400 });
        }
        
        // Start timing for latency calculation
        const startTime = Date.now();
        
        // Fetch Minecraft server status
        const mcRes = await fetch(`https://api.mcstatus.io/v2/status/bedrock/${url}`);
        const mcData = await mcRes.json();
        
        // Calculate latency
        const latency = Date.now() - startTime;
        
        // Fetch IP geolocation data
        const geoRes = await fetch(`http://ip-api.com/json/${url}?fields=status,message,country,regionName,city,isp,org,query`);
        const geoData = await geoRes.json();
        
        // Combine the data
        const combinedData = {
            ...mcData,
            ping: latency,
            location: geoData.status === 'success' ? {
                country: geoData.country,
                region: geoData.regionName,
                city: geoData.city,
                isp: geoData.isp,
                org: geoData.org,
                ip: geoData.query
            } : null
        };
        
        return NextResponse.json({
            success: true,
            data: combinedData
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
