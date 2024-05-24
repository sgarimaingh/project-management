
const Joi = require('joi');

const userLogin = Joi.object({
    username: Joi.string().required(),
    password:Joi.string().required()
  });

  module.exports = {userLogin};