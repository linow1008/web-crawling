import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    await prisma.gdwebData.delete({
      where: { id: id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('삭제 오류:', error);
    return NextResponse.json({ error: '삭제 중 오류 발생' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
