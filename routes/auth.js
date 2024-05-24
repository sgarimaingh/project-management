const express = require('express');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../middleware/auth');
const {registerUser} = require('../requests/register_user');
const {userLogin} = require('../requests/user_login');
const validateRequest = require('../middleware/validation');
const {userRegistration, loginUser, enable2fa} = require('../services/auth_service');
const passport = require('../config/passport');
const router = express.Router();

router.post('/register', validateRequest(registerUser), async (req, res) => {
  try {
    const userId = await userRegistration(req);
    res.status(201).json({id: userId});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', validateRequest(userLogin), async (req, res,next) => {
  try{
    const token = await loginUser(req);
    res.json({ loggedIn: true,token });
  }catch(error){
     next(error);
  }
    
});

// Google OAuth login
router.get('/google', passport.authenticate('google', {
  scope: ['email']
}));

//callback 
router.get('/google/callback',passport.authenticate('google', { failureRedirect: '/login', session: false }),(req, res) => {
    const token = jwt.sign({ id: req.user.id, role: req.user.role }, process.env.SECRET, {
      expiresIn: '1h'
    });
    res.json({ token });
  }
);


router.post('/2fa/enable', authenticateToken, async (req, res) => {
  try{
    await enable2fa(req);
    res.status(200).json({enabled: true});
  } catch(error) {
    res.status(400).json({ error: error.message });
  }
  
});



// router.post('/2fa/verify', authenticateToken, async (req, res) => {
//   const { token } = req.body;
//   const user = await User.findByPk(req.user.id);
//   logger.info(user.twoFactorSecret);
//   const verified = speakeasy.totp.verify({
//     secret: user.twoFactorSecret,
//     encoding: 'base32',
//     token,
//   });
//   logger.info(verified);
//   if (verified) {
//     res.json({ verified: true });
//   } else {
//     res.status(400).json({ verified: false });
//   }
// });

module.exports = router;
