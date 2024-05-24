
const Joi = require('joi');

const projectSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().valid('Planned', 'In Progress', 'Completed').required(),
    project_manager_id: Joi.number().required(),
    client_id: Joi.number().required(),
  });

  module.exports = {projectSchema};