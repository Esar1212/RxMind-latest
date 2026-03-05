require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const cors = require('cors');
const { PrismaClient } = require('./lib/generated/prisma'); // <-- use generated client
const loginRoute = require('./api/login');
const logoutRoute = require('./api/logout');
const cookieParser = require('cookie-parser');

const app = express();

// ---------- Prisma singleton ----------
let prisma = null;

function createPrismaInstance() {
  return new PrismaClient({
    datasources: {
      db: { url: process.env.DATABASE_URL + '?pgbouncer=true&connection_limit=1' },
    },
    log: ['warn', 'error'],
  });
}

async function resetPrisma() {
  try {
    if (prisma) {
      await prisma.$disconnect().catch(() => {});
      prisma = null;
    }
  } finally {
    prisma = createPrismaInstance();
    return prisma;
  }
}

function getPrisma() {
  if (!prisma) prisma = createPrismaInstance();
  return prisma;
}

// ---------- App config ----------
const PORT = process.env.PORT || 3001;
const pushedNotificationIds = new Set(); // dedupe push notifications
const pushSubscriptions = new Map();
 // endpoint -> subscription

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true,
  //Allowing cookies or authorization headers to be sent in cross-origin requests
}));
app.use(express.json());
app.use(cookieParser());

// ---------- DB helpers ----------
async function ensureDbConnection() {
  try {
    prisma = getPrisma();
    await prisma.$connect();
    console.log('✅ Connected to DB');
  } catch (err) {
    console.error('❌ DB connection failed:', err?.message || err);
    if (err?.message?.includes('prepared statement') || err?.code === '42P05') {
      console.warn('⚠️ Prepared statement bug detected. Resetting Prisma client...');
      prisma = await resetPrisma();
    }
  }
}

// ---------- Cron ----------
// function startCron() {
//   cron.schedule('* * * * *', async () => {
//     try {
//       prisma = getPrisma();
//       try { await prisma.$connect(); } 
//       catch { prisma = await resetPrisma(); await prisma.$connect(); }

//       const now = new Date();
//       const due = await prisma.notification.findMany({
//         where: { scheduled_time: { lte: now }, sent: false },
//         include: { medicine: true },
//       });

//       for (const n of due) {
//         if (pushedNotificationIds.has(n.id)) continue;
//         await sendPushToAll({
//           title: 'Medication Reminder',
//           body: `Time to take ${n.medicine.medicine_name}`,
//           url: '/alarms',
//           notificationId: n.id,
//         });
//         pushedNotificationIds.add(n.id);
//       }
//     } catch (err) {
//       if ((err?.message||'').includes('prepared statement') || err?.code==='42P05') {
//         console.warn('⚠️ Resetting Prisma client due to prepared statement bug...');
//         await resetPrisma();
//       } else console.error('❌ Cron job error:', err);
//     }
//   });
//   console.log('🚀 Cron jobs started');
// }


// ---------- Other routes ----------
app.use('/api/users/login', loginRoute);
app.use('/api/users/logout', logoutRoute);
app.use('/api/dashboard', require('./api/dashboard'));
app.use('/api/medibuddy', require('./api/medibuddy'));
app.use('/api/users/signup', require('./api/signup'));
app.use('/api/notifications', require('./api/notifications'));
app.use('/api/push', require('./api/push'));
app.use('/api/auth', require('./api/authMe'));

// ------------- Start server ----------
app.listen(PORT, async ()=>{
  console.log(`🚀 Backend running on port ${PORT}`);
  await ensureDbConnection();
  //startCron();
});
