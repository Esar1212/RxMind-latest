const express = require('express');
const router = express.Router();

router.post("/", (req, res) => {
  
  res.clearCookie("token",{
    httpOnly: true,
    sameSite: "lax",
    secure: false
  });
  
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
