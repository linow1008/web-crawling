import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageParam = searchParams.get('page');
    const dateFilter = searchParams.get('dateFilter') || 'default';
    const viewsFilter = searchParams.get('viewsFilter') || 'default';
    const statusFilter = searchParams.get('status') || 'ongoing';
    const page = pageParam ? Number(pageParam) : 1;
    const pageSize = 21;
    const skip = (page - 1) * pageSize;

    let orderBy: any[] = [];
    if (dateFilter !== 'default') {
      orderBy.push({ date: dateFilter });
    }
    if (viewsFilter !== 'default') {
      orderBy.push({ views: viewsFilter });
    }
    if (orderBy.length === 0) {
      orderBy.push({ id: 'asc' });
    }

    const where = { status: statusFilter };

    const totalCount = await prisma.gdwebData.count({ where });

    const entries = await prisma.gdwebData.findMany({
      skip,
      take: pageSize,
      where,
      orderBy,
    });

    const serializedEntries = entries.map((entry) => ({
      ...entry,
      id: entry.id.toString(),
    }));

    const totalPages = Math.ceil(totalCount / pageSize);

    return NextResponse.json({
      data: serializedEntries,
      page,
      pageSize,
      totalCount,
      totalPages,
      dateFilter,
      viewsFilter,
      status: statusFilter,
    });
  } catch (error) {
    console.error('데이터 불러오기 오류:', error);
    return NextResponse.json(
      { error: '데이터 불러오기 중 오류 발생' },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
