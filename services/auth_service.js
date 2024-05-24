const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const User = require('../models/user');
const secret = require('../config/config');
const logger = require('../config/logger');
const {ValidationError } = require('../middleware/errors');

// Implementation class for all Authorization related functionalities
class AuthService{

    static async userRegistration(req) {
          logger.info(`Register User Request: ${JSON.stringify(req.body)}`);
          const { username, password, email, role } = req.body;
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = await User.create({ username, password: hashedPassword, email, role });
          return user.id;
    }

    static async loginUser(req) {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user || !await bcrypt.compare(password, user.password)) {
            throw new ValidationError('Invalid Credentials');
        }
        const token = jwt.sign({ id: user.id, role: user.role }, secret);
        return token;
    }

    static async enable2fa(req){
        const secret = speakeasy.generateSecret();
        logger.info(secret.base32);
        await User.update({ twoFactorSecret: secret.base32 }, { where: { id: req.user.id } });
    }

  
};

module.exports = AuthService;
