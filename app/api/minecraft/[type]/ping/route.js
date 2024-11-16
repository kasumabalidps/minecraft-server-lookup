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
        
        // Simple ping request to measure latency
        const res = await fetch(`https://api.mcstatus.io/v2/status/${request.nextUrl.pathname.split('/')[3]}/${url}`);
        
        if (!res.ok) {
            throw new Error('Failed to ping server');
        }
        
        return NextResponse.json({
            success: true
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
