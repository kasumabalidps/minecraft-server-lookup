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
        
        const res = await fetch(`https://api.mcstatus.io/v2/status/java/${url}`);
        const data = await res.json();
        
        return NextResponse.json({
            success: true,
            data: data
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
