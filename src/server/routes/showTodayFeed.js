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

const TableFeed = sequelize.define(
    'TableFeed',
    {
        feed_id_AI: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        feed_id: {
            type: Sequelize.STRING
        },
        feed_icon: {
            type: Sequelize.STRING
        },
        feed_description: {
            type: Sequelize.STRING
        },
        feed_name: {
            type: Sequelize.STRING
        },
        feed_reader_id: {
            type: Sequelize.INTEGER
        },
        feed_topic: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        tableName: 'tbl_feed'
    }
);

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
        },
        websiteTitle: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        tableName: 'board_feed'
    }
);

const TableDirectory = sequelize.define(
    'TableDirectory',
    {
        dir_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        dir_name: {
            type: Sequelize.STRING
        },
        owner_id: {
            type: Sequelize.INTEGER
        },
        share_group_id: {
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false,
        tableName: 'tbl_directory'
    }
);

const ArticleToDirectory = sequelize.define(
    'ArticleToDirectory',
    {
        idx: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        post_urlid: {
            type: Sequelize.TEXT
        },
        dir_name: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        tableName: 'article_to_directory'
    }
);

router.get('/', function (req, res, next) {
    TableFeed.findAll({
        where: { feed_reader_id: req.session.user_id },
        attributes: [
            'feed_id'
        ]
    })
        .then(tableFeed => {
            let arrayOfPromises = [];
            tableFeed.map((result, i) => {
                // console.log("result: " + result.post_feedid);
                let base_url = 'http://cloud.feedly.com//v3/streams/contents?streamId=' + result.feed_id;
                arrayOfPromises.push(
                    axios.get(base_url)
                    .then(response => (response.data.items))
                    .catch(error => console.log(error))
                );
            });
            
            Promise.all(arrayOfPromises).then(
                function (values) {
                    console.log(values[0]);
                    // let targetvalues_0 = JSON.parse(JSON.stringify(values[0]));
                    // let targetvalues_1 = JSON.parse(JSON.stringify(values[1]));
                    // let result = Object.assign(targetvalues_0, targetvalues_1);
                    for(let i=0; i<values.length-1; i++){
                        Array.prototype.push.apply(values[0], values[i+1]);
                    }
                    console.log("result: " + values[0]);
                    let sortedvalues = values[0];
                    sortedvalues.sort(function(b, a){
                        return a["published"] - b["published"];
                    });
                    res.json(sortedvalues);
                }
            );
            // console.log(boardFeed.post_feedid);
            // let base_url = 'http://cloud.feedly.com//v3/streams/contents?streamId=' + boardFeed.post_feedid;
            // console.log(base_url);
            // axios.get(base_url)
            //     .then(response => res.json(response.data.items))
            //     .catch(error => console.log(error))
        })
});

router.get('/feedlist', function (req, res, next) {
    TableFeed.findAll({
        where: {  feed_reader_id: req.session.user_id },
        attributes: [
            `feed_id`
        ]
    }).then(tableFeed => {
        res.json(tableFeed);
    })
});

router.get('/short', function (req, res, next) {
    TableFeed.findAll({
        where: { feed_reader_id: req.session.user_id },
        attributes: [
            'feed_id'
        ]
    }).then(tableFeed => {
            let arrayOfPromises = [];
            tableFeed.slice(0,5).map((result, i) => {
                // console.log("result: " + result.post_feedid);
                let base_url = 'http://cloud.feedly.com//v3/streams/contents?streamId=' + result.feed_id;
                arrayOfPromises.push(
                    axios.get(base_url)
                    .then(response => (response.data.items))
                    .catch(error => console.log(error))
                );
            });
            
            Promise.all(arrayOfPromises).then(
                function (values) {
                    // console.log(values[0]);
                    // let targetvalues_0 = JSON.parse(JSON.stringify(values[0]));
                    // let targetvalues_1 = JSON.parse(JSON.stringify(values[1]));
                    // let result = Object.assign(targetvalues_0, targetvalues_1);
                    for(let i=0; i<values.length-1; i++){
                        Array.prototype.push.apply(values[0], values[i+1]);
                    }
                    // console.log("result: " + values[0]);
                    let sortedvalues = values[0];
                    sortedvalues.sort(function(b, a){
                        return a["published"] - b["published"];
                    });
                    res.json(sortedvalues);
                }
            );
            // console.log(boardFeed.post_feedid);
            // let base_url = 'http://cloud.feedly.com//v3/streams/contents?streamId=' + boardFeed.post_feedid;
            // console.log(base_url);
            // axios.get(base_url)
            //     .then(response => res.json(response.data.items))
            //     .catch(error => console.log(error))
        })
});

router.get('/otherdirlist', function(req, res, next) {
    let new_query = 'SELECT * FROM tbl_directory WHERE tbl_directory.share_group_id = :now_group AND NOT tbl_directory.owner_id = :now_user'
    let values = {
        now_group: req.session.group_id,
        now_user: req.session.user_id
    };
    sequelize.query(new_query, {replacements:values, model:TableDirectory})
    .then(tableDirectory => {
        res.json(tableDirectory);
    })
});

router.get('/dirlist', function (req, res, next) {
    TableDirectory.findAll({
        where: { owner_id: req.session.user_id },
        attributes: [
            'dir_name'
        ]
    })
        .then(TableDirectory => {
            res.json(TableDirectory);
        })
});

router.post('/diratriclemap', function (req, res, next) {
    const inputData = {
        post_urlid: req.body.articleId,
        dir_name: req.body.dirId
    };

    console.log(inputData);

    ArticleToDirectory.create(inputData)
        .then(artdirmap => {
            console.log(artdirmap);
            console.log("dir article map success");
        })
        .catch(err => {
            return res.send('error', err)
        })
});

export default router;