import { NextResponse } from 'next/server';
import { mcs } from 'node-mcstatus'

export async function GET() {
  return NextResponse.json({ message: 'Hello World!' });
}