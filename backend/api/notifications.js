const express = require("express");
const { PrismaClient } = require("../lib/generated/prisma");
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req,res) => {
  try {
    const notifications = await prisma.notification.findMany({ include: { medicine:true } });
    res.json(notifications);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req,res) => {
  try {
    const { userId, medicineId, scheduled_time } = req.body;
    if (!userId || !medicineId || !scheduled_time) return res.status(400).json({ error:'Missing fields' });

    const notification = await prisma.notification.create({
      data: { userId, medicineId, scheduled_time: new Date(scheduled_time) },
    });
    res.status(201).json(notification);
  } catch (err) { res.status(500).json({ error: err.message }); }

});

router.post('/acknowledge', async (req,res) => {
  try {
    const { id, action } = req.body;
    if (!id || !action) return res.status(400).json({ error:'Missing fields' });

    await prisma.notification.update({ where:{ id:parseInt(id) }, data:{ sent:true } });
    pushedNotificationIds.delete(parseInt(id));

    if (action==='snooze') {
      const notif = await prisma.notification.findUnique({ where:{ id:parseInt(id) } });
      if (notif) {
        const snoozeSeconds = process.env.NODE_ENV==='production'?300:10;
        await prisma.notification.create({
          data:{ userId:notif.userId, medicineId:notif.medicineId, scheduled_time:new Date(Date.now()+snoozeSeconds*1000) }
        });
      }
    }
    res.json({ success:true });
  } catch(err) { res.status(500).json({ error: err.message }); }
});

router.get('/due', async (req,res) => {
  try {
    const now = new Date();
    const due = await prisma.notification.findMany({ 
      where:{ scheduled_time:{ lte: now }, sent:false },
      include:{ medicine:true } 
    });
    res.json(due);
  } catch(err) { res.status(500).json({ error: err.message }); }
});




module.exports = router;