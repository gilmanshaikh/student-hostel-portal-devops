import express from 'express';
import { createApplication, getStudentApplications, getAdminApplications, getApplicationById, updateApplicationStatus, deleteApplication } from '../controllers/applicationController.js';
import { authenticate, isStudent, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, isStudent, createApplication);
router.get('/student/my-applications', authenticate, isStudent, getStudentApplications);
router.get('/admin/applications', authenticate, isAdmin, getAdminApplications);
router.get('/:id', authenticate, getApplicationById);
router.patch('/:id/status', authenticate, isAdmin, updateApplicationStatus);
router.delete('/:id', authenticate, deleteApplication);

export default router;
