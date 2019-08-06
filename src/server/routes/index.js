import express from 'express';
import memberJoin from './memberJoin';
import memberLogin from './memberLogin';
import urlsearch from './urlsearch';

const router = express.Router();

router.use('/memberJoin', memberJoin);
router.use('/memberLogin', memberLogin);
router.use('/urlsearch', urlsearch);

export default router;