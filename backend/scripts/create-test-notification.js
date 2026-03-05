require('dotenv').config();
const { PrismaClient } = require('../lib/generated/prisma');

let prisma;

async function createTestNotification() {
  try {
    // Initialize Prisma with safer connection parameters
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL + '?pgbouncer=false&connection_limit=1',
        },
      },
    });

    await prisma.$connect();

    // Compute current and future time
    const now = new Date();
    const scheduledTime = new Date(now.getTime() + 3 * 60 * 1000);

    console.log('🕐 Current time:', now.toLocaleString());
    console.log('⏰ Scheduled time:', scheduledTime.toLocaleString());

    // Fetch first user & medicine (ensure minimal fields)
    const user = await prisma.user.findFirst({
      select: { id: true, email: true },
    });

    const medicine = await prisma.medicine.findFirst({
      select: { id: true, medicine_name: true },
    });

    if (!user || !medicine) {
      console.log('❌ No users or medicines found in the database.');
      console.log('➡️ Please add a user and medicine first.');
      return;
    }

    console.log('👤 Using user:', user.email || user.id);
    console.log('💊 Using medicine:', medicine.medicine_name || medicine.id);

    // Create the notification
    const notification = await prisma.notification.create({
      data: {
        userId: user.id,
        medicineId: medicine.id,
        scheduled_time: scheduledTime,
        sent: false,
      },
    });

    console.log('✅ Test notification created successfully!');
    console.log('📋 Notification ID:', notification.id);
    console.log('⏰ Will trigger at:', scheduledTime.toLocaleString());
    console.log('');
    console.log('🎯 Expected behavior:');
    console.log('Wait 3 minutes');
    console.log('You will receive a push notification');
    console.log(' Even if /alarms is closed!');

  } catch (error) {
    console.error('❌ Error creating test notification:', error);
  } finally {
    if (prisma) {
      await prisma.$disconnect().catch(() => {});
    }
  }
}

createTestNotification();
