

import { NextRequest, NextResponse } from "next/server";
import db from "@/db";

//  GET => api/articles
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const pageNumber = Number(searchParams.get('pageNumber')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 2;
    const query = searchParams.get('query') || '';
    console.log("data:", { pageSize, pageNumber, query });
    const data = db.data.articles;
    let filterData = query ? data.filter(item => {
        const {id,...rest} = item;
        return Object.values(rest).some(value => String(value).toLowerCase().includes(query.toLowerCase()));
    }) : data;
    const total = filterData.length;
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, total);
    console.log("startIndex:", startIndex, "endIndex:", endIndex, "total:", total);
    filterData = startIndex >= total ? [] : filterData.slice(startIndex, endIndex);
    return NextResponse.json({ code: 200, message: "获取文章列表成功", data: filterData, total });
}
// 新增文章
//  POST => api/articles
export async function POST(request: Request) {
    const data = await request.json();
    await db.update(({ articles }) => articles.unshift({
        id: Math.random().toString(36).slice(-8),
        ...data,
    }))
    return NextResponse.json({code: 200, message: '添加成功', data: db.data.articles[0] });
}