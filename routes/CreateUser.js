require('dotenv').config();
const express = require("express")
const router = express.Router()
const Users = require("../models/Users")
const Sessions = require("../models/Session")
const { body, validationResult } = require("express-validator")

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let secret = process.env.AUTH_TOKEN_SECRET;
let refreshSecret = process.env.REFRESH_TOKEN_SECRET;

router.post("/createUser", [
    body('email').isEmail(),
    body('password', 'incorrect passowrd').isLength({ min: 5 })
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    let salt = await bcrypt.genSalt(12);
    let bcPassword = await bcrypt.hash(req.body.password, salt)
    try {
        await Users.create({
            name: req.body.name,
            email: req.body.email,
            password: bcPassword
        })
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false }); 
    }
})

router.post("/loginUser", [
    body('email').isEmail(),
    body('password', 'incorrect a passowrd').isLength({ min: 5 })
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    let email = req.body.email;
    try {
        let userData = await Users.findOne({email});
        if (!userData) {
            console.log(true)
            return res.status(400).json({ error: "incorrect email" });
        }

        let pwdCompare = await bcrypt.compare(req.body.password,userData.password)
        if (!pwdCompare) {
            return res.status(400).json({ error: "incorrect password" });
        }
        const data = {
            user:{
                id:userData.id
            }
        }
        const userId = data.user.id
        const authToken = jwt.sign(data, secret, {expiresIn: '20s'});
        const refreshToken = jwt.sign(data, refreshSecret, { expiresIn: '1d' });
        
        await Sessions.create({
            user_id : data.user.id,
            token : authToken,
            singedAt: new Date(),
            updatedAt: new Date()
        })
    

        return res
        .json({ success: true, Token : authToken, RefreshToken: refreshToken  })
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})

module.exports = router;