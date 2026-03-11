const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

function hashAadhaar(aadhaar) {
  return crypto.createHash('sha256').update(aadhaar).digest('hex');
}

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with Indian NGO data...');

  const [pw, pw2] = await Promise.all([
    bcrypt.hash('password123', 10),
    bcrypt.hash('Admin@1234', 10)
  ]);

  // ── Verified Indian NGOs ──
  const cry = await prisma.organization.create({
    data: {
      organizationName: 'CRY — Child Rights and You',
      organizationType: 'ngo',
      email: 'contact@cry.org',
      passwordHash: pw,
      phone: '+91-9876543200',
      address: '189-B, Anand Estate, Sane Guruji Marg, Mumbai',
      city: 'Mumbai',
      country: 'India',
      verified: true,
      registrationNumber: 'NGO-CRY-001',
      logo: 'https://api.dicebear.com/7.x/initials/svg?seed=CRY&backgroundColor=ff8c42&fontColor=ffffff',
    }
  });

  const goonj = await prisma.organization.create({
    data: {
      organizationName: 'Goonj Foundation',
      organizationType: 'ngo',
      email: 'info@goonj.org',
      passwordHash: pw,
      phone: '+91-9876543201',
      address: 'J-93, Sarita Vihar, New Delhi',
      city: 'New Delhi',
      country: 'India',
      verified: true,
      registrationNumber: 'NGO-GOONJ-002',
      logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Goonj&backgroundColor=c8875c&fontColor=ffffff',
    }
  });

  const helpage = await prisma.organization.create({
    data: {
      organizationName: 'HelpAge India',
      organizationType: 'ngo',
      email: 'contact@helpage.in',
      passwordHash: pw,
      phone: '+91-9876543202',
      address: 'C-14, Qutab Institutional Area, New Delhi',
      city: 'New Delhi',
      country: 'India',
      verified: true,
      registrationNumber: 'NGO-HELP-003',
      logo: 'https://api.dicebear.com/7.x/initials/svg?seed=HelpAge&backgroundColor=10b981&fontColor=ffffff',
    }
  });

  const prayas = await prisma.organization.create({
    data: {
      organizationName: 'Prayas Juvenile Aid Centre',
      organizationType: 'orphanage',
      email: 'info@prayasjac.org',
      passwordHash: pw,
      phone: '+91-9876543203',
      address: '119 Mukherjee Park, New Delhi',
      city: 'New Delhi',
      country: 'India',
      verified: true,
      registrationNumber: 'NGO-PRAYAS-004',
      logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Prayas&backgroundColor=8b5cf6&fontColor=ffffff',
    }
  });

  // Legacy orgs (for existing data integrity)
  const org1 = await prisma.organization.create({
    data: {
      organizationName: 'Hope Orphanage',
      organizationType: 'orphanage',
      email: 'contact@hopeorphanage.org',
      passwordHash: pw,
      phone: '+91-9876543210',
      address: '123 Hope Street, Mumbai',
      city: 'Mumbai',
      country: 'India',
      verified: false,
      registrationNumber: 'ORG001',
      logo: 'https://api.dicebear.com/7.x/initials/svg?seed=HO&backgroundColor=f59e0b&fontColor=ffffff',
    }
  });

  const org2 = await prisma.organization.create({
    data: {
      organizationName: 'Golden Age Home',
      organizationType: 'old_age_home',
      email: 'info@goldenagehome.org',
      passwordHash: pw,
      phone: '+91-9876543211',
      address: '456 Care Lane, Bangalore',
      city: 'Bangalore',
      country: 'India',
      verified: false,
      registrationNumber: 'ORG002',
      logo: 'https://api.dicebear.com/7.x/initials/svg?seed=GA&backgroundColor=64748b&fontColor=ffffff',
    }
  });

  // ── Users ──
  const user1 = await prisma.user.create({
    data: {
      name: 'Amit Sharma',
      email: 'amit@example.com',
      passwordHash: pw,
      phone: '+91-9876543213',
      city: 'Mumbai',
      role: 'USER',
      aadhaarHash: hashAadhaar('123456789012'),
      aadhaarLast4: '9012',
    }
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Priya Singh',
      email: 'priya@example.com',
      passwordHash: pw,
      phone: '+91-9876543214',
      city: 'Delhi',
      role: 'USER',
      aadhaarHash: hashAadhaar('987654321098'),
      aadhaarLast4: '1098',
    }
  });

  // ── OrgPosts — Campaign Type ──
  await prisma.orgPost.create({
    data: {
      organizationId: cry.id,
      postType: 'campaign',
      title: 'Help us raise ₹5 Lakh for school supplies for 200 orphan children',
      description: "Every child deserves the right to education. This season, help CRY provide school bags, books, stationery and uniforms to over 200 underprivileged children across India. Your small contribution can change a child's future forever. Together we have already touched the lives of over 3 million children.",
      images: JSON.stringify(['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80']),
      targetAmount: 500000,
      raisedAmount: 318000,
      supportersCount: 1247,
      location: 'Pan India',
      category: 'Education',
      likesCount: 2840,
      status: 'active',
    }
  });

  await prisma.orgPost.create({
    data: {
      organizationId: prayas.id,
      postType: 'campaign',
      title: 'Winter Care Kit for 150 Street Children — ₹2 Lakh Needed',
      description: "As temperatures drop in Delhi, over 150 street children under our care urgently need warm clothes, blankets, and food. Prayas has been working for street children since 1988. Your donation this winter can keep a child warm and hope alive. Each ₹500 provides one child a warm kit for the entire winter.",
      images: JSON.stringify(['https://images.unsplash.com/photo-1541516160071-4bb0c5af65ba?w=800&q=80']),
      targetAmount: 200000,
      raisedAmount: 87500,
      supportersCount: 435,
      location: 'New Delhi',
      category: 'Child Welfare',
      likesCount: 1560,
      status: 'active',
    }
  });

  // ── OrgPosts — Event Type ──
  await prisma.orgPost.create({
    data: {
      organizationId: goonj.id,
      postType: 'event',
      title: 'Cloth Collection Drive — "Not Just a Piece of Cloth"',
      description: 'Join us for our citywide clothes and material collection drive. Bring your gently used clothes, bedsheets, and household material to our collection centers. Goonj will convert your material into dignified products and disaster relief kits for flood-affected communities across India. Last drive collected 42 tonnes of material!',
      images: JSON.stringify(['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80']),
      eventDate: 'March 22, 2026',
      location: 'Mumbai, Delhi, Bangalore, Pune — Multiple Zones',
      category: 'Community',
      likesCount: 3200,
      status: 'active',
    }
  });

  await prisma.orgPost.create({
    data: {
      organizationId: helpage.id,
      postType: 'event',
      title: 'Free Health Checkup Camp for Senior Citizens',
      description: 'HelpAge India is organising a comprehensive free health checkup camp for senior citizens aged 60+. Services include blood pressure screening, diabetes testing, eye checkup, dental consultation, and physiotherapy. Our expert medical team will provide personalized health advice. Bring your elders, spread the word!',
      images: JSON.stringify(['https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80']),
      eventDate: 'March 15, 2026',
      location: 'Gandhi Nagar Community Hall, Jaipur, Rajasthan',
      category: 'Healthcare',
      likesCount: 1890,
      status: 'active',
    }
  });

  await prisma.orgPost.create({
    data: {
      organizationId: cry.id,
      postType: 'event',
      title: 'Education Awareness Workshop — Rights of the Child',
      description: 'CRY invites educators, parents, and youth volunteers to our half-day workshop on child rights and how communities can protect children from exploitation. The workshop will be hands-on with case studies from rural India. Certificate provided upon completion. Register online, seats are limited.',
      images: JSON.stringify(['https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80']),
      eventDate: 'March 28, 2026',
      location: 'YMCA Hall, Connaught Place, New Delhi',
      category: 'Education',
      likesCount: 742,
      status: 'active',
    }
  });

  // ── OrgPosts — Awareness Type ──
  await prisma.orgPost.create({
    data: {
      organizationId: helpage.id,
      postType: 'awareness',
      title: 'Meet Kamala Devi, 78 — Our Mobile Healthcare Program Changed Her Life',
      description: "Kamala Devi from a remote village in Rajasthan had not seen a doctor in over 8 years. When our HelpAge Mobile Healthcare van reached her village, she was diagnosed with uncontrolled hypertension. Today, with regular medication and follow-up through our program, she says 'I feel like I have been given a second life.' Your support makes stories like Kamala's possible every single day.",
      images: JSON.stringify(['https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80']),
      location: 'Alwar District, Rajasthan',
      category: 'Healthcare',
      likesCount: 5420,
      status: 'active',
    }
  });

  await prisma.orgPost.create({
    data: {
      organizationId: goonj.id,
      postType: 'awareness',
      title: '🌊 Flood Relief Update — 8,400 Families Reached in Assam',
      description: 'Our teams have been on the ground in Assam for the past 3 weeks. We have distributed 8,400 Goonj Flood Relief Kits containing clothes, tarpaulins, hygiene products and dry rations to families displaced by the Brahmaputra floods. 40 tonnes of material collected in the last cloth drive made this possible. Thank you for being part of this! 🙏',
      images: JSON.stringify(['https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&q=80']),
      location: 'Jorhat & Golaghat Districts, Assam',
      category: 'Disaster Relief',
      likesCount: 9100,
      status: 'active',
    }
  });

  await prisma.orgPost.create({
    data: {
      organizationId: prayas.id,
      postType: 'awareness',
      title: '100 Kids Complete Class 10 — "The Street Was Our School, Now It Won\'t Be"',
      description: "This year, 100 children who once lived on Delhi's streets successfully appeared for their Class 10 Board Exams — many of them the first in their families to do so. These kids were rescued by our outreach workers from railway stations and footpaths. Today they dream of becoming doctors, engineers, and teachers. Education is the most powerful tool.",
      images: JSON.stringify(['https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80']),
      location: 'New Delhi',
      category: 'Education',
      likesCount: 7300,
      status: 'active',
    }
  });

  // Legacy campaigns
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

  await prisma.donation.create({
    data: { userId: user1.id, organizationId: cry.id, amount: 2500, paymentStatus: 'COMPLETED' }
  });
  await prisma.donation.create({
    data: { userId: user2.id, organizationId: goonj.id, amount: 750, paymentStatus: 'COMPLETED' }
  });
  await prisma.volunteer.create({
    data: { userId: user1.id, organizationId: cry.id, status: 'APPROVED', hours: 8 }
  });

  console.log('✅ Database seeded successfully with 8 Indian NGO posts!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
