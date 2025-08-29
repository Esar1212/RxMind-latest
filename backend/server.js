require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const cors = require('cors');
const { PrismaClient } = require('./lib/generated/prisma');
const bcrypt = require('bcryptjs');
const webpush = require('web-push');
const loginRoute = require('./api/login');
const logoutRoute = require('./api/logout');
const authMiddleware = require('./api/middleware/auth');
const cookieParser = require('cookie-parser');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// In-memory dedupe to avoid resending the same notification every minute
const pushedNotificationIds = new Set();

// CORS configuration - MUST be before route
app.use(cors({
  origin: "http://localhost:3000", // React dev server
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true               // allow cookies (JWT)
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Web Push setup (VAPID)
const VAPID_PUBLIC = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY;
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || 'mailto:admin@example.com';
if (VAPID_PUBLIC && VAPID_PRIVATE) {
  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC, VAPID_PRIVATE);
}

// In-memory store for demo; ideally persist by user in DB
// Key by endpoint to deduplicate repeated subscriptions
const pushSubscriptions = new Map(); // endpoint -> subscription

app.post('/api/push/subscribe', (req, res) => {
  try {
    const sub = req.body;
    console.log('📥 Received subscription data:', JSON.stringify(sub, null, 2));
    
    if (!sub || !sub.endpoint) {
      console.log('❌ Invalid subscription: missing endpoint');
      return res.status(400).json({ error: 'Invalid subscription - missing endpoint' });
    }
    
    if (!sub.keys || !sub.keys.p256dh || !sub.keys.auth) {
      console.log('❌ Invalid subscription: missing keys');
      return res.status(400).json({ error: 'Invalid subscription - missing keys' });
    }
    
    // Validate key lengths (accept base64url with or without padding)
    const p256dhLen = sub.keys.p256dh.length; // 65 bytes -> 88 (padded) or 87 (unpadded)
    if (p256dhLen !== 87 && p256dhLen !== 88) {
      console.log('❌ Invalid p256dh key length:', p256dhLen);
      return res.status(400).json({ error: 'Invalid p256dh key length' });
    }

    const authLen = sub.keys.auth.length; // 16 bytes -> 24 (padded) or 22 (unpadded)
    if (authLen !== 22 && authLen !== 24) {
      console.log('❌ Invalid auth key length:', authLen);
      return res.status(400).json({ error: 'Invalid auth key length' });
    }
    
    // Test the subscription with web-push to ensure it's valid
    try {
      webpush.sendNotification(sub, JSON.stringify({ test: true }));
      console.log('✅ Subscription validated successfully');
    } catch (validationError) {
      console.log('❌ Subscription validation failed:', validationError.message);
      return res.status(400).json({ error: 'Invalid subscription format' });
    }
    
    // Deduplicate by endpoint
    pushSubscriptions.set(sub.endpoint, sub);
    console.log(`🔔 Push subscribed successfully. Total unique: ${pushSubscriptions.size}`);
    return res.json({ success: true, message: 'Subscription stored' });
    
  } catch (e) {
    console.error('❌ Error in push subscription:', e);
    return res.status(500).json({ error: e.message });
  }
});

async function sendPushToAll(payload) {
  const tasks = [];
  for (const [endpoint, sub] of pushSubscriptions.entries()) {
    tasks.push(
      webpush.sendNotification(sub, JSON.stringify(payload)).catch(() => {
        // Remove invalid subscriptions
        pushSubscriptions.delete(endpoint);
      })
    );
  }
  await Promise.allSettled(tasks);
}

// Clear all subscriptions (for debugging)
app.post('/api/push/clear', (req, res) => {
  try {
    const oldCount = pushSubscriptions.size;
    pushSubscriptions.clear();
    console.log(`🗑️ Cleared ${oldCount} subscriptions`);
    return res.json({ success: true, message: `Cleared ${oldCount} subscriptions` });
  } catch (e) {
    console.error('❌ Error clearing subscriptions:', e);
    return res.status(500).json({ error: e.message });
  }
});

// Get subscription count (for debugging)
app.get('/api/push/count', (req, res) => {
  try {
    return res.json({ count: pushSubscriptions.size, subscriptions: Array.from(pushSubscriptions.values()) });
  } catch (e) {
    console.error('❌ Error getting subscription count:', e);
    return res.status(500).json({ error: e.message });
  }
});

// Test push endpoint
app.post('/api/push/test', async (req, res) => {
  try {
    const currentCount = pushSubscriptions.size;
    console.log(`🔔 Sending test push to ${currentCount} subscription(s)`);
    
    await sendPushToAll({
      title: 'Test Notification',
      body: 'This is a test push from RxMind',
      url: '/alarms',
    });
    res.json({ success: true, count: pushSubscriptions.size });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

async function ensureDbConnection() {
  try {
    await prisma.$connect();
    console.log("✅ Connected to database");
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
  }
}

// Start cron jobs
function startCron() {
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();

      const due = await prisma.notification.findMany({
        where: {
          scheduled_time: { lte: now },
          sent: false,
        },
        include: { medicine: true },
      });

      for (const n of due) {
        if (pushedNotificationIds.has(n.id)) {
          continue; // already pushed this one
        }
        console.log(`⏰ Alarm for ${n.medicine.medicine_name}`);
        // Try web push so users see a system notification even if the page is closed
        try {
          await sendPushToAll({
            title: 'Medication Reminder',
            body: `Time to take ${n.medicine.medicine_name}`,
            url: '/alarms',
            notificationId: n.id,
          });
          pushedNotificationIds.add(n.id);
        } catch {}
        // Do not mark as sent; the client acknowledges explicitly
      }
    } catch (err) {
      if (err.message.includes("prepared statement")) {
    console.warn("⚠️ Resetting Prisma client due to prepared statement bug...");
    await prisma.$disconnect();
    prisma = new (require("@prisma/client").PrismaClient)();
  } else {
    throw err;
  }
    }
  });
  
  console.log('🚀 Cron jobs started');
}

// API Routes
app.post('/api/notifications', async (req, res) => {
  try {
    const { userId, medicineId, scheduled_time } = req.body;

    if (!userId || !medicineId || !scheduled_time) {
      return res.status(400).json({ error: "userId, medicineId, and scheduled_time are required" });
    }

    const newNotification = await prisma.notification.create({
      data: {
        userId,
        medicineId,
        scheduled_time: new Date(scheduled_time),
      },
    });

    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/notifications', async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      include: {
        medicine: true,
      },
    });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/notifications/due', async (req, res) => {
  try {
    const now = new Date();

    const dueNotifications = await prisma.notification.findMany({
      where: {
        scheduled_time: { lte: now },
        sent: false,
      },
      include: {
        medicine: true,
      },
    });

    res.json(dueNotifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/notifications/acknowledge', async (req, res) => {
  try {
    const { id, action } = req.body;

    if (!id || !action) {
      return res.status(400).json({ error: "id and action are required" });
    }

    // Mark as sent and drop from dedupe set
    await prisma.notification.update({
      where: { id: parseInt(id) },
      data: { sent: true },
    });
    try { pushedNotificationIds.delete(parseInt(id)); } catch {}

    if (action === "snooze") {
      const notification = await prisma.notification.findUnique({
        where: { id: parseInt(id) },
        include: { medicine: true },
      });

      if (notification) {
        const now = new Date();
        const snoozeSecondsEnv = process.env.SNOOZE_SECONDS;
        const defaultSeconds = process.env.NODE_ENV === 'production' ? 300 : 10; // 5m prod, 10s dev
        const snoozeSeconds = snoozeSecondsEnv ? parseInt(snoozeSecondsEnv, 10) : defaultSeconds;
        const snoozeTime = new Date(now.getTime() + snoozeSeconds * 1000);

        await prisma.notification.create({
          data: {
            userId: notification.userId,
            medicineId: notification.medicineId,
            scheduled_time: snoozeTime,
          },
        });
      }
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/api/users/signup", async (req, res) => {
  try {
    const {
      email,
      password,
      age,
      phone_number,
      caregiver_phone_verified,
      caregiver_phone,
      family_members,
    } = req.body;

    // Validation
    if (!email || !password || !phone_number || !age) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        phone_number,
        caregiver_phone,
        caregiver_phone_verified: caregiver_phone_verified || false,
        age: parseInt(age, 10),

        // ✅ Bulk create family members if provided
        family_members: {
          create: (family_members || []).map((member) => ({
            name: member.name,
            relation: member.relation,
          })),
        },
      }
      
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        phone_number: newUser.phone_number,
        caregiver_phone: newUser.caregiver_phone,
        caregiver_phone_verified: newUser.caregiver_phone_verified,
        age: newUser.age,
        family_members: newUser.family_members,
      },
    });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.use('/api/users/login', loginRoute);
app.use('/api/users/logout', logoutRoute);
app.use('/api/dashboard', require('./api/dashboard'));

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  startCron();
});
