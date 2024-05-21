import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose';


const SECRET_KEY = new TextEncoder().encode('rl:Bo||;E5$)K)Y');

export async function middleware(request: NextRequest) {
    console.log("SECRET_KEY", SECRET_KEY)
    let token = request.cookies.get('access_token')?.value;
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);
        return NextResponse.next();
    } catch (err) {
        console.error('JWT Verification Error:', err);
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/user/:path*', '/todos/:path*'],
}
