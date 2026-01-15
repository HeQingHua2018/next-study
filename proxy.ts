import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// 如果函数在内部使用await，则可以将其标记为async
// export function proxy(request: NextRequest) {
//     console.log(request.nextUrl.pathname,'🐮');
//   // return NextResponse.rewrite(new URL('/login', request.url))
// }

// // 
// export const config = {
//     // matcher: '/api/test/:path*', // 匹配 /api/test/* 路径下的所有请求、
//     // matcher:['/api/test/:path*','/api/time']， // 匹配 /api/time 和 /api/test/* 路径下的所有请求
//     // matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'], // 排除 API 路由、静态文件、图像优化和 .png 文件
// }

export function proxy(request: NextRequest) {
  // 1、如果不是登录页
  // 2、没有登录状态，则重定向到登录页
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;
  console.log('Request pathname:', pathname, 'Token:', token);
  if (pathname !== '/login' && !token) {
    const loginUrl = new URL('/login', request.url);
  
    return NextResponse.redirect(loginUrl);
  }

  // return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
};