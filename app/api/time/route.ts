import { NextRequest, NextResponse } from "next/server";


// 缓存时效性
export const revalidate = 10; // seconds

export function GET(request: NextRequest) {
    console.log('GET /api/time called');
    return NextResponse.json({ time: new Date().toLocaleTimeString() });
}