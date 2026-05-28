import express from 'express';
import { 
  createHostel, 
  getAllHostels, 
  getHostelById, 
  getAdminHostels,
  updateHostel,
  deleteHostel,
  deleteHostelImage
} from '../controllers/hostelController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getAllHostels);
router.get('/admin/my-hostels', authenticate, isAdmin, getAdminHostels);
router.get('/:id', getHostelById);
router.post('/', authenticate, isAdmin, upload.array('images', 5), createHostel);
router.put('/:id', authenticate, isAdmin, upload.array('images', 5), updateHostel);
router.delete('/:id', authenticate, isAdmin, deleteHostel);
router.delete('/:id/image', authenticate, isAdmin, deleteHostelImage);

export default router;
