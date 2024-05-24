
const Joi = require('joi');

const registerUser = Joi.object({
    username: Joi.string().required(),
    password:Joi.string().required(),
    email:Joi.string().required(),
    role: Joi.string().valid('Admin', 'SuperAdmin', 'Client').required()
  });

  module.exports = {registerUser};