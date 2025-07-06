const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function deployDatabase() {
  try {
    console.log('🚀 Starting database deployment...');
    
    // Check connection
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Push schema to database
    console.log('📋 Pushing schema to database...');
    const { execSync } = require('child_process');
    execSync('npx prisma db push', { stdio: 'inherit' });
    console.log('✅ Schema pushed successfully');
    
    // Check if we have users
    const userCount = await prisma.user.count();
    console.log(`📊 Found ${userCount} users in database`);
    
    if (userCount === 0) {
      console.log('🌱 No users found, running seed...');
      await seedDatabase();
    } else {
      console.log('✅ Database already has data');
    }
    
    console.log('🎉 Database deployment completed successfully!');
    
  } catch (error) {
    console.error('❌ Database deployment failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function seedDatabase() {
  const hashedPassword = await bcrypt.hash('password123', 12);
  
  // Create a test company
  const company = await prisma.company.create({
    data: {
      name: 'MapleAI Test Company',
      industry: 'Technology',
      size: 'SMALL_1_10',
      website: 'https://mapleai.com',
      email: 'test@mapleai.com',
    },
  });
  
  // Create a test subscription
  const subscription = await prisma.subscription.create({
    data: {
      plan: 'ENTERPRISE',
      amount: 15000,
      currency: 'USD',
      billingCycle: 'MONTHLY',
      features: {
        fullPlatformAccess: true,
        dedicatedSupport: true,
      },
      companyId: company.id,
    },
  });
  
  // Create test users
  const users = [
    {
      email: 'enterprise@mapleai.com',
      firstName: 'Enterprise',
      lastName: 'User',
      role: 'SUPER_ADMIN',
      companyId: company.id,
      subscriptionId: subscription.id,
    },
    {
      email: 'admin@mapleai.com',
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      companyId: company.id,
      subscriptionId: subscription.id,
    },
  ];
  
  for (const userData of users) {
    await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });
  }
  
  console.log('✅ Database seeded successfully');
  console.log('\n📋 Test User Credentials:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔹 ENTERPRISE PLAN:');
  console.log('   Email: enterprise@mapleai.com');
  console.log('   Password: password123');
  console.log('   Features: Full platform access, Dedicated support');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

// Run if called directly
if (require.main === module) {
  deployDatabase()
    .then(() => {
      console.log('🎉 Database deployment completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Database deployment failed:', error);
      process.exit(1);
    });
}

module.exports = { deployDatabase, seedDatabase }; 