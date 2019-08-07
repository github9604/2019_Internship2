import express from 'express';
import axios from 'axios';

const router = express.Router();
const cors = require("cors");
router.use(cors());

router.get('/', function(req, res, next) {
    let name = req.session.user_id;
    console.log(name);
});

export default router;