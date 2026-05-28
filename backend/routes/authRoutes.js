import express from 'express';
import { 
  studentRegister, 
  studentLogin, 
  adminRegister, 
  adminLogin,
  getStudentProfile,
  updateStudentProfile,
  getAdminProfile,
  updateAdminProfile
} from '../controllers/authController.js';
import { authenticate, isStudent, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/student/register', studentRegister);
router.post('/student/login', studentLogin);
router.post('/admin/register', adminRegister);
router.post('/admin/login', adminLogin);

// Profile routes
router.get('/student/profile', authenticate, isStudent, getStudentProfile);
router.put('/student/profile', authenticate, isStudent, updateStudentProfile);
router.get('/admin/profile', authenticate, isAdmin, getAdminProfile);
router.put('/admin/profile', authenticate, isAdmin, updateAdminProfile);

export default router;
