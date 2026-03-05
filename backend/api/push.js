const express = require('express');
const router = express.Router();
const webpush = require('web-push');

const pushedNotificationIds = new Set(); // dedupe push notifications
const pushSubscriptions = new Map();

if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || 'mailto:admin@example.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
}

router.post('/subscribe', (req, res) => {
  try {
    const sub = req.body;
    if (!sub?.endpoint || !sub?.keys?.p256dh || !sub?.keys?.auth) {
      return res.status(400).json({ error: 'Invalid subscription' });
    }
    pushSubscriptions.set(sub.endpoint, sub);
    return res.json({ success: true, message: 'Subscription stored' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

async function sendPushToAll(payload) {
  const tasks = [];
  for (const [endpoint, sub] of pushSubscriptions.entries()) {
    tasks.push(webpush.sendNotification(sub, JSON.stringify(payload))
      .catch(() => pushSubscriptions.delete(endpoint)));
  }
  await Promise.allSettled(tasks);
}

router.post('/clear', (req,res) => {
  pushSubscriptions.clear();
  return res.json({ success:true });
});

router.get('/count', (req,res) => {
  return res.json({ count: pushSubscriptions.size });
});

router.post('/test', async (req,res) => {
  await sendPushToAll({ title:'Test', body:'Test push', url:'/alarms' });
  res.json({ success:true });
});

module.exports = router;

