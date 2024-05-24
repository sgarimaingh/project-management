const Project = require('../models/project');
const AuditLog = require('../models/auditlog');
const logger = require('../config/logger');
const User = require('../models/user');
const { NotFoundError, ValidationError } = require('../middleware/errors');
const {redisClient} = require('../config/cache');

// Implementation class for all project related functionalities
class ProjectService{

    static async createProject(req) {
        logger.info(`Create Project Request: ${JSON.stringify(req.body)}`);
        const manager = await User.findByPk(req.body.project_manager_id);
        const client = await User.findByPk(req.body.client_id);
        if(!manager) throw new NotFoundError('Project manager not found');
        if(!client) throw new NotFoundError('Client not found');
        const project = await Project.create(req.body);
        await AuditLog.create({ user_id: req.user.id, action: 'Create', entity: 'Project', entity_id: project.id });
        return project.id;
    }

    static async updateProject(req) {
        logger.info(`Update Project Request: ${JSON.stringify(req.body)}`);
        const updateParams = req.body;
        if (Object.keys(updateParams).length === 0) {
            throw new ValidationError('No update parameters provided');
        }
        const project = await Project.findByPk(req.params.id);
        if (!project) throw new NotFoundError('Project not found');
        await project.update(req.body);
        await AuditLog.create({ user_id: req.user.id, action: 'Update', entity: 'Project', entity_id: project.id });
        
    }

    static async deleteProject(req){
        const project = await Project.findByPk(req.params.id);
        if (!project) throw new NotFoundError('Project not found');
        await project.destroy();
        await AuditLog.create({ user_id: req.user.id, action: 'Delete', entity: 'Project', entity_id: project.id });
    }

    static async getProjects(req){
        const { page = 1, pageSize = 10, sort = 'createdAt', order = 'ASC' } = req.query;
        const offset = (page - 1) * pageSize;
        const projects = await Project.findAll({ limit: pageSize, offset, order: [[sort, order]] });
        return projects;
    }

    static async getProjectById(req){
        try {
            // Check if project is available in cache
            
            // const cachedData = await redisClient.get(`project:${req.params.id}`);
            // logger.info(cachedData);
            // if (cachedData) {
            //     return JSON.parse(cachedData);
            // } else {
                const project = await Project.findByPk(req.params.id);
                // Store fetched data in cache
                // await client.setex(`project:${req.params.id}`,3600,  JSON.stringify(project));
                return project;
            // }
        } catch (error) {
            console.error('Error fetching project:', error);
            throw error;
        }
    }

  
};

module.exports = ProjectService;
