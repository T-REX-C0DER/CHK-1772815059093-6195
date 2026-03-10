import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

function hashAadhaar(aadhaar: string): string {
  return crypto.createHash('sha256').update(aadhaar).digest('hex');
}

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create organizations
  const org1 = await prisma.organization.create({
    data: {
      organizationName: 'Hope Orphanage',
      organizationType: 'orphanage',
      email: 'contact@hopeorphanage.org',
      passwordHash: await bcrypt.hash('password123', 10),
      phone: '+91-9876543210',
      address: '123 Hope Street, Mumbai',
      city: 'Mumbai',
      registrationNumber: 'ORG001',
      logo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hope'
    }
  });

  const org2 = await prisma.organization.create({
    data: {
      organizationName: 'Golden Age Home',
      organizationType: 'old_age_home',
      email: 'info@goldenagehome.org',
      passwordHash: await bcrypt.hash('password123', 10),
      phone: '+91-9876543211',
      address: '456 Care Lane, Bangalore',
      city: 'Bangalore',
      registrationNumber: 'ORG002',
      logo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=golden'
    }
  });

  const org3 = await prisma.organization.create({
    data: {
      organizationName: 'City Shelter',
      organizationType: 'shelter',
      email: 'help@cityshelter.org',
      passwordHash: await bcrypt.hash('password123', 10),
      phone: '+91-9876543212',
      address: '789 Shelter Road, Delhi',
      city: 'Delhi',
      registrationNumber: 'ORG003',
      logo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=city'
    }
  });

  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      passwordHash: await bcrypt.hash('password123', 10),
      phone: '+91-9876543213',
      city: 'Mumbai',
      role: 'USER',
      aadhaarHash: hashAadhaar('123456789012'),
      aadhaarLast4: '9012',
    }
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      passwordHash: await bcrypt.hash('password123', 10),
      phone: '+91-9876543214',
      city: 'Bangalore',
      role: 'USER',
      aadhaarHash: hashAadhaar('987654321098'),
      aadhaarLast4: '1098',
    }
  });

  // Create campaigns
  await prisma.campaign.create({
    data: {
      organizationId: org1.id,
      title: 'Education for All',
      description: 'Help us provide quality education to 50 children in our orphanage.',
      targetAmount: 50000,
      collectedAmount: 25000,
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80'
    }
  });

  await prisma.campaign.create({
    data: {
      organizationId: org2.id,
      title: 'Senior Care Initiative',
      description: 'Support our elderly residents with better healthcare and nutrition.',
      targetAmount: 75000,
      collectedAmount: 30000,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&q=80'
    }
  });

  await prisma.campaign.create({
    data: {
      organizationId: org3.id,
      title: 'Emergency Shelter Support',
      description: 'Help us provide warm meals and shelter to homeless individuals.',
      targetAmount: 25000,
      collectedAmount: 15000,
      image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&q=80'
    }
  });

  // Create donations
  await prisma.donation.create({
    data: {
      userId: user1.id,
      organizationId: org1.id,
      amount: 1000,
      paymentStatus: 'COMPLETED'
    }
  });

  await prisma.donation.create({
    data: {
      userId: user1.id,
      organizationId: org2.id,
      amount: 500,
      paymentStatus: 'COMPLETED'
    }
  });

  await prisma.donation.create({
    data: {
      userId: user2.id,
      organizationId: org3.id,
      amount: 750,
      paymentStatus: 'COMPLETED'
    }
  });

  // Create volunteer applications
  await prisma.volunteer.create({
    data: {
      userId: user1.id,
      organizationId: org1.id,
      status: 'APPROVED',
      hours: 5.5
    }
  });

  await prisma.volunteer.create({
    data: {
      userId: user2.id,
      organizationId: org2.id,
      status: 'PENDING',
      hours: 3
    }
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });