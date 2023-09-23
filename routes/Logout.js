require('dotenv').config();
const _ = require('lodash')
const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken');
const BlackList = require('../models/BlackListToken')

router.post('/logout', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const present = await BlackList.findOne({ token: token });
    if (_.isEmpty(present) == false) {
        return res.status(401).send('already loggedout');
    }
    try {
        jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
        await BlackList.create({
            token: token
        })
        res.json({ status: 'logged out' })
    }
    catch (error) {
        return res.status(400).send('Invalid token.');
    }

})

module.exports = router;