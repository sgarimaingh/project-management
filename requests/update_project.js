
const Joi = require('joi');

const updateProjectSchema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    status: Joi.string().valid('Planned', 'In Progress', 'Completed'),
    project_manager_id: Joi.number(),
    client_id: Joi.number(),
  });

  module.exports = {updateProjectSchema};