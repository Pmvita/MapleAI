const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function setupDatabase() {
  try {
    console.log('🔧 Setting up database...');
    
    // Check if we can connect to the database
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Check if we have any users
    const userCount = await prisma.user.count();
    console.log(`📊 Found ${userCount} users in database`);
    
    if (userCount === 0) {
      console.log('🌱 No users found, running seed...');
      await seedDatabase();
    } else {
      console.log('✅ Database already has data');
    }
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
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
}

// Run if called directly
if (require.main === module) {
  setupDatabase()
    .then(() => {
      console.log('🎉 Database setup completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Database setup failed:', error);
      process.exit(1);
    });
}

module.exports = { setupDatabase, seedDatabase }; 