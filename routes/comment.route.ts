import express from 'express';
import {getComment, createComment} from '../controllers/comment.controller';

const router = express.Router();

router.post('/get', getComment);
router.post('/create', createComment);

export default router