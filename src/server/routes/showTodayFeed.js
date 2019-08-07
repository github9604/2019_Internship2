import express from 'express';
import axios from 'axios';
import Sequelize from 'sequelize';

const router = express.Router();
const cors = require("cors");
router.use(cors());

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

const BoardFeed = sequelize.define(
    'BoardFeed',
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
        tableName: 'board_feed'
    }
);

const BoardDirectory = sequelize.define(
    'BoardDirectory',
    {
        dir_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        dir_name: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        tableName: 'board_directory'
    }
);

router.get('/', function (req, res, next) {
    BoardFeed.findOne({
        where: { user_id: req.session.user_id },
        attributes: [
            'post_feedid'
        ]
    })
        .then(boardFeed => {
            console.log(boardFeed.post_feedid);
            let base_url = 'http://cloud.feedly.com//v3/streams/contents?streamId=' + boardFeed.post_feedid;
            console.log(base_url);
            axios.get(base_url)
                .then(response => res.json(response.data.items))
                .catch(error => console.log(error))
        })
});

router.get('/dirlist', function (req, res, next) {
    BoardDirectory.findAll({
        where: { user_id: req.session.user_id },
        attributes: [
            'dir_name'
        ]
    })
        .then(boardDirectory => {
            res.json(boardDirectory);
        })
});

export default router;