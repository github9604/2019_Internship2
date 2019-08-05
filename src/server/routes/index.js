import express from 'express';
import memberJoin from './memberJoin';
import memberLogin from './memberLogin';

const router = express.Router();

router.use('/memberJoin', memberJoin);
router.use('/memberLogin', memberLogin);

export default router;