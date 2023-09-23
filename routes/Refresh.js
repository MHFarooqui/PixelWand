require('dotenv').config();
const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken');
const session = require('../models/Session')

router.post('/refreshToken', async (req, res) => {
  const  refreshToken  = req.headers.authorization.split(' ')[1];
  if (!refreshToken) {
    return res.status(401).send('Access Denied. No refresh token provided.');
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const authToken = jwt.sign({ user: decoded.user }, process.env.AUTH_TOKEN_SECRET, { expiresIn: '20s' });
    await session.updateOne({ user_id: decoded.user.id }, { token: authToken, updatedAt: new Date() });

    res
      .json({ success: true, Token: authToken, RefreshToken: refreshToken })
  } catch (error) {
    return res.status(400).send('Invalid refresh token.');
  }
});

module.exports = router;