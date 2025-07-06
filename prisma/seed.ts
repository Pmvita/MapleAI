import { PrismaClient, PlanType, UserRole, CompanySize } from '../src/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.auditLog.deleteMany();
  await prisma.complianceRecord.deleteMany();
  await prisma.user.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.company.deleteMany();

  // Hash password for all users
  const hashedPassword = await bcrypt.hash('password123', 12);

  // Create Starter Plan Company & User
  const starterCompany = await prisma.company.create({
    data: {
      name: 'Starter Corp',
      industry: 'Technology',
      size: CompanySize.SMALL_1_10,
      website: 'https://startercorp.com',
      email: 'contact@startercorp.com',
      phone: '+1-555-0101',
      address: '123 Starter St',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      zipCode: '94102',
    },
  });

  const starterSubscription = await prisma.subscription.create({
    data: {
      plan: PlanType.STARTER,
      amount: 2500,
      currency: 'USD',
      billingCycle: 'MONTHLY',
      maxUsers: 100,
      maxStorage: 50,
      maxApiCalls: 10000,
      features: {
        basicCompliance: true,
        emailSupport: true,
        standardIntegrations: true,
      },
      companyId: starterCompany.id,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _starterUser = await prisma.user.create({
    data: {
      email: 'starter@mapleai.com',
      firstName: 'Starter',
      lastName: 'User',
      password: hashedPassword,
      role: UserRole.ADMIN,
      jobTitle: 'CEO',
      department: 'Executive',
      phone: '+1-555-0101',
      companyId: starterCompany.id,
      subscriptionId: starterSubscription.id,
    },
  });

  // Create Professional Plan Company & User
  const professionalCompany = await prisma.company.create({
    data: {
      name: 'Professional Solutions Inc',
      industry: 'Financial Services',
      size: CompanySize.MEDIUM_11_50,
      website: 'https://prosolutions.com',
      email: 'info@prosolutions.com',
      phone: '+1-555-0202',
      address: '456 Professional Ave',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zipCode: '10001',
    },
  });

  const professionalSubscription = await prisma.subscription.create({
    data: {
      plan: PlanType.PROFESSIONAL,
      amount: 7500,
      currency: 'USD',
      billingCycle: 'MONTHLY',
      maxUsers: 500,
      maxStorage: 200,
      maxApiCalls: 50000,
      features: {
        advancedAI: true,
        prioritySupport: true,
        customIntegrations: true,
        advancedAnalytics: true,
      },
      companyId: professionalCompany.id,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _professionalUser = await prisma.user.create({
    data: {
      email: 'professional@mapleai.com',
      firstName: 'Professional',
      lastName: 'User',
      password: hashedPassword,
      role: UserRole.ADMIN,
      jobTitle: 'CTO',
      department: 'Technology',
      phone: '+1-555-0202',
      companyId: professionalCompany.id,
      subscriptionId: professionalSubscription.id,
    },
  });

  // Create Enterprise Plan Company & User
  const enterpriseCompany = await prisma.company.create({
    data: {
      name: 'Enterprise Global Ltd',
      industry: 'Healthcare',
      size: CompanySize.GLOBAL_1000_PLUS,
      website: 'https://enterpriseglobal.com',
      email: 'enterprise@enterpriseglobal.com',
      phone: '+1-555-0303',
      address: '789 Enterprise Blvd',
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
      zipCode: '60601',
    },
  });

  const enterpriseSubscription = await prisma.subscription.create({
    data: {
      plan: PlanType.ENTERPRISE,
      amount: 15000,
      currency: 'USD',
      billingCycle: 'MONTHLY',
      maxUsers: null, // Unlimited
      maxStorage: null, // Unlimited
      maxApiCalls: null, // Unlimited
      features: {
        fullPlatformAccess: true,
        dedicatedSupport: true,
        customDevelopment: true,
        onPremiseDeployment: true,
        advancedSecurity: true,
        complianceAudit: true,
      },
      companyId: enterpriseCompany.id,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _enterpriseUser = await prisma.user.create({
    data: {
      email: 'enterprise@mapleai.com',
      firstName: 'Enterprise',
      lastName: 'User',
      password: hashedPassword,
      role: UserRole.SUPER_ADMIN,
      jobTitle: 'CIO',
      department: 'Information Technology',
      phone: '+1-555-0303',
      companyId: enterpriseCompany.id,
      subscriptionId: enterpriseSubscription.id,
    },
  });

  // Create Trial User (no subscription)
  const trialCompany = await prisma.company.create({
    data: {
      name: 'Trial Company',
      industry: 'Consulting',
      size: CompanySize.SMALL_1_10,
      website: 'https://trialcompany.com',
      email: 'trial@trialcompany.com',
      phone: '+1-555-0404',
      address: '321 Trial Lane',
      city: 'Austin',
      state: 'TX',
      country: 'USA',
      zipCode: '73301',
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _trialUser = await prisma.user.create({
    data: {
      email: 'trial@mapleai.com',
      firstName: 'Trial',
      lastName: 'User',
      password: hashedPassword,
      role: UserRole.USER,
      jobTitle: 'Manager',
      department: 'Operations',
      phone: '+1-555-0404',
      companyId: trialCompany.id,
      // No subscription for trial user
    },
  });

  // Create some compliance records for demonstration
  await prisma.complianceRecord.createMany({
    data: [
      {
        type: 'AML',
        status: 'PASSED',
        score: 95.5,
        details: { checks: 150, alerts: 2, resolved: 2 },
        companyId: starterCompany.id,
      },
      {
        type: 'KYC',
        status: 'PASSED',
        score: 98.2,
        details: { verifications: 45, pending: 1 },
        companyId: professionalCompany.id,
      },
      {
        type: 'SANCTIONS',
        status: 'PASSED',
        score: 100.0,
        details: { screenings: 200, matches: 0 },
        companyId: enterpriseCompany.id,
      },
    ],
  });

  console.log('✅ Database seeded successfully!');
  console.log('\n📋 Test User Credentials:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔹 STARTER PLAN:');
  console.log('   Email: starter@mapleai.com');
  console.log('   Password: password123');
  console.log('   Features: Basic compliance, Email support, Standard integrations');
  console.log('');
  console.log('🔹 PROFESSIONAL PLAN:');
  console.log('   Email: professional@mapleai.com');
  console.log('   Password: password123');
  console.log('   Features: Advanced AI, Priority support, Custom integrations, Advanced analytics');
  console.log('');
  console.log('🔹 ENTERPRISE PLAN:');
  console.log('   Email: enterprise@mapleai.com');
  console.log('   Password: password123');
  console.log('   Features: Full platform access, Dedicated support, Custom development, On-premise deployment');
  console.log('');
  console.log('🔹 TRIAL USER:');
  console.log('   Email: trial@mapleai.com');
  console.log('   Password: password123');
  console.log('   Features: No subscription (trial period)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 