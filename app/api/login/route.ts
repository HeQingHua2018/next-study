import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    const {username,password} = await request.json();
    console.log(username,password,'🐱');
    
    // return  NextResponse.json({code:200,message:"登录成功", data: username}, {headers:{
    //     'Set-Cookie': `token=${username}; Path=/; Max-Age-86400; HttpOnly`,
    // }});
    const response = NextResponse.json({code:200,message:"登录成功", data: JSON.stringify(username)});
    response.cookies.set('token',username,{path:'/',maxAge:86400,httpOnly:true});
    return response;
}