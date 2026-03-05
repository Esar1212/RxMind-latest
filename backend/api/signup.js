const express = require('express');
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("../lib/generated/prisma");
const prisma = new PrismaClient();
const router = express.Router();

router.post('/', async (req,res)=>{
  try{
    const { email, password, age, phone_number, caregiver_phone_verified, caregiver_phone, family_members } = req.body;
    if(!email||!password||!phone_number||!age) return res.status(400).json({ error:'Missing fields' });

    const existing = await prisma.user.findUnique({ where:{ email } });
    if(existing) return res.status(400).json({ error:'User exists' });

    const hashed = await bcrypt.hash(password,10);
    const newUser = await prisma.user.create({
      data:{
        email, password:hashed, phone_number, caregiver_phone,
        caregiver_phone_verified: caregiver_phone_verified||false,
        age: parseInt(age,10),
        family_members: { create:(family_members||[]).map(m=>({ name:m.name, relation:m.relation })) }
      }
    });
    res.status(201).json({ message:'User registered', user:newUser });
  } catch(err){ res.status(500).json({ error: err.message }); }
});

module.exports = router;