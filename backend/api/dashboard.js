const express = require("express");
const { PrismaClient } = require("../lib/generated/prisma");
const authMiddleware = require("./middleware/auth");

const prisma = new PrismaClient();
const router = express.Router();

// GET /api/dashboard
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        email: true,
        phone_number: true,
        caregiver_phone: true,
        caregiver_phone_verified: true,
        family_members: true,
        age: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    console.error("❌ Dashboard error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;