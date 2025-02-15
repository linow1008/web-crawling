import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing id or status' },
        { status: 400 },
      );
    }

    const updatedEntry = await prisma.gdwebData.update({
      where: { id: id },
      data: { status: status },
    });

    return NextResponse.json({ success: true, data: updatedEntry });
  } catch (error) {
    console.error('상태 업데이트 오류:', error);
    return NextResponse.json(
      { error: '상태 업데이트 중 오류 발생' },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
