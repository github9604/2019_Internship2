import express from 'express';
import axios from 'axios';
import Sequelize from 'sequelize';

const router = express.Router();
const cors = require("cors");
const sequelize = new Sequelize('kt_intern', 'min9604', '!zpdlxl9604', {
    host: 'localhost',
    port: '6002',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const BoardArticle = sequelize.define(
    'BoardArticle',
    {
        post_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        post_feedid: {
            type: Sequelize.INTEGER,
        },
        user_id: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        tableName: 'board_article'
    }
);

router.use(cors());

router.post('/', function (req, res, next) {
    let name = req.body.obj;
    console.log(name);
    let base_url = 'http://cloud.feedly.com/v3/search/feeds?query=' + name;
    axios.get(base_url)
        .then(response => res.json(response.data.results))
});

router.post('/insertFeed', function(req, res, next) {
    console.log("insert article into db");
    console.log(req.session.user_id);
    console.log(req.body.feedInput);

    const inputData = {
        post_feedid: req.body.feedInput,
        user_id: req.session.user_id
    };

    console.log(inputData);

    BoardArticle.create(inputData)
    .then(articleInput => {
        console.log(articleInput);
        console.log("article input success");
    }).catch(err => {
        return res.send('error' + err)
    })
});

router.post('/scrap', function (req, res) {
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 1
        });
    }
});


export default router;