require('dotenv').config();
const _ = require('lodash')
const jwt = require('jsonwebtoken');
const BlackList = require('../models/BlackListToken')

module.exports = async (req, res, next) => {
  try {
    var isExpired = false;
    var dateNow = new Date();
    const token = req.headers.authorization.split(' ')[1];
    // console.log(req.headers.authorization)
    const present = await BlackList.findOne({ token: token });
    if (_.isEmpty(present) == false) {
      return res.status(401).json({  
        error: 'Expired token'
      });
    }
    const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
    // if decodedToken.exp is old wali value // return status 401
    if (!!decodedToken)
      next();
    else{
      res.status(401).json({  
        error: 'Expired token'
      });
    }
      
  } catch (err) {
    res.status(401).json({  
      error: err
    });
  }
};