
import { Router } from 'express';
const router = Router();
import { register, login } from '../controllers/authController.js'
import { getProfile, updateProfile, uploadFile, getFile, deleteFile } from '../controllers/studentController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

router.post('/register', register);
router.post('/login', login);

router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);

router.post('/upload', verifyToken, upload.single('file'), uploadFile);
router.get('/file/:fileName', verifyToken, getFile);
router.delete('/file/:fileName', verifyToken, deleteFile);

export default router;
    