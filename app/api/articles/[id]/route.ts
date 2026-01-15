import { NextResponse } from 'next/server';
import db from '@/db';
// 根据文章ID删除文章
//  DELETE => api/articles/:id
interface IParams {
  params: Promise<{ id: string }>;
}
export async function DELETE(request: Request, { params }: IParams) {
  const { id } = await params;
  console.log('删除文章ID:', id);
  
  if (!id) {
    return NextResponse.json({ code: 400, message: '缺少文章ID' });
  }

  try {
    // 1. 第一步：在db.update回调中 只做【数据操作】，不抛错、不return响应
    let isDeleteSuccess = false;
    await db.update(({ articles }) => {
      const index = articles.findIndex((article) => article.id === id);
      if (index !== -1) {
        articles.splice(index, 1);
        isDeleteSuccess = true; // 标记删除成功
      }
    });

    // 2. 第二步：在外层函数中，根据操作结果 统一返回响应 ✅ 关键！
    if (isDeleteSuccess) {
      return NextResponse.json({ 
        code: 200, 
        message: '删除成功', 
        id 
      });
    } else {
      return NextResponse.json({ 
        code: 404, 
        message: '文章不存在', 
        id 
      });
    }

  } catch (error) {
    // 这里只捕获 数据库操作失败 的异常（比如文件写入失败等）
    const errorMessage = error instanceof Error ? error.message : '删除失败';
    return NextResponse.json({
      code: 500,
      message: errorMessage,
      id,
    });
  }
}

// 根据文章ID更新文章
//  PATCH => api/articles/:id
export async function PATCH(request: Request, { params }: IParams) {
  const data = await request.json();
  const { id } = await params; 
  if (!id) {
    return NextResponse.json({ code: 400, message: '缺少文章ID' });
  }

  let isUpdateSuccess = false;
  try {
    await db.update(({ articles }) => {
      const idx = articles.findIndex((article) => article.id === id);
      if (idx !== -1) {
        articles[idx] = { ...articles[idx], ...data };
        isUpdateSuccess = true;
      }
    });

    if (isUpdateSuccess) {
      return NextResponse.json({
        code: 200,
        message: '更新成功',
        data: db.data.articles.find(item => item.id === id),
      });
    } else {
      return NextResponse.json({
        code: 404,
        message: '文章不存在',
        id
      });
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '更新失败';
    return NextResponse.json({
      code: 500,
      message: errorMessage,
      id,
    });
  }
}

// 根据id获取文章详情
//  GET => api/articles/:id
export async function GET(request: Request, { params }: IParams) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ code: 400, message: '缺少文章ID' });
  }
    const article = db.data.articles.find(item => item.id === id);
    return NextResponse.json({ code: 200, data: article || null });
}
