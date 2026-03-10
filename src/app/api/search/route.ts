import { NextResponse } from 'next/server';
import { prisma } from '@/server/db';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q')?.toLowerCase() || '';

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  // search organizations, campaigns, volunteer events (stub)
  const orgs = await prisma.organization.findMany({
    where: { organizationName: { contains: q } },
    take: 5,
    select: { id: true, organizationName: true }
  });
  const campaigns = await prisma.campaign.findMany({
    where: { title: { contains: q } },
    take: 5,
    select: { id: true, title: true }
  });

  const results = [
    ...orgs.map(o => ({ id: o.id, type: 'organization', name: o.organizationName })),
    ...campaigns.map(c => ({ id: c.id, type: 'campaign', name: c.title })),
  ];

  return NextResponse.json({ results });
}
