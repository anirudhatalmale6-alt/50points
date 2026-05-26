import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request, { params }) {
  try {
    const { slug } = params;

    const tournament = await prisma.tournament.findUnique({
      where: { slug },
      include: {
        races: {
          include: {
            horses: true,
            results: {
              include: { horse: true },
              orderBy: { position: 'asc' },
            },
          },
          orderBy: { raceNumber: 'asc' },
        },
        _count: {
          select: { tickets: true },
        },
      },
    });

    if (!tournament) {
      return NextResponse.json({ error: 'Tournament not found' }, { status: 404 });
    }

    return NextResponse.json({ tournament });
  } catch (error) {
    console.error('Tournament detail error:', error);
    return NextResponse.json({ error: 'Failed to fetch tournament' }, { status: 500 });
  }
}
