import express from 'express';
import axios from 'axios';
const router = express.Router();
const cors = require("cors");

router.use(cors());

router.post('/', function(req, res, next) {
    let name = req.body.obj;
    console.log(name);
    let base_url = 'http://cloud.feedly.com/v3/search/feeds?query=' + name;
    axios.get(base_url)
    .then(response => res.json(response.data.results))
   });

export default router;