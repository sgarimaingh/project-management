const express = require('express');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const validateRequest = require('../middleware/validation');
const Project = require('../models/project');
const {projectSchema} = require('../requests/create_project');
const {updateProjectSchema} = require('../requests/update_project');
const logger = require('../config/logger');
const {createProject, updateProject, deleteProject, getProjects, getProjectById} = require('../services/project_service');
const router = express.Router();

// Create Project API
router.post('/', authenticateToken, authorizeRole(['Admin', 'SuperAdmin']), validateRequest(projectSchema), async (req, res) => {
    try{
      await createProject(req);
      res.status(201).json({message: 'Project created successfully'});
    } catch(error){
      logger.error(`Error creating project: ${error.message}`);
      res.status(500).json({ error: 'An error occurred while creating the project' });
    } 
});

// Update Project API
router.put('/:id', authenticateToken, authorizeRole(['Admin', 'SuperAdmin']), validateRequest(updateProjectSchema), async (req, res, next) => {
  try{
    await updateProject(req);
    res.json({id: req.params.id, msg: "updated"});
  } catch(error){
    next(error);
  }
  
});

// Delete Project API
router.delete('/:id', authenticateToken, authorizeRole(['SuperAdmin']), async (req, res,next) => {
  try{
    await deleteProject(req);
    return res.status(200).json("Deleted");
  } catch(error){
    next(error);
  }
});

// List all Projects API
router.get('/', authenticateToken, authorizeRole(['SuperAdmin']), async (req, res) => {
  res.json(await getProjects(req));
});


// Get project by id API
router.get('/:id', authenticateToken, async (req, res) => {
  const project = await getProjectById(req);
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json(project);
});

module.exports = router;
