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

const TableGroup = sequelize.define(
    'TableGroup',
    {
        group_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        group_name: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        tableName: 'tbl_group'
    }
);


const TableArticle = sequelize.define(
    'TableArticle',
    {
        article_id_AI: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        article_originId: {
            type: Sequelize.STRING
        },
        article_url: {
            type: Sequelize.STRING
        },
        dir_id: {
            type: Sequelize.INTEGER
        },
        article_author: {
            type: Sequelize.STRING
        },
        article_content: {
            type: Sequelize.STRING
        },
        article_title: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        tableName: 'tbl_group'
    }
);


router.get('/', (req, res, next) => {
    TableDirectory.findAll({
        where: { owner_id: req.session.user_id }
    })
        .then(TableDirectory => {
            res.json(TableDirectory);
        })
})

router.post('/grouplist', (req, res, next) => {
    TableGroup.findAll()
        .then(TableGroup => {
            // console.log(JSON.stringify(TableGroup));
            let results = [{ value: 0, text: req.session.user_id }];
            TableGroup.map((result, i) => {
                results.push({ value: result.group_id, text: result.group_name });
                console.log(results);
            })
            // console.log("now: " + results);
            res.json(results);
        })
})

router.post('/insertDir', (req, res, next) => {
    const inputData = {
        dir_name: req.body.insertDirinput,
        owner_id: req.session.user_id
    };
    // console.log(inputData);

    TableDirectory.create(inputData)
        .then(dirInput => {
            res.send("success");
        })
        .catch(err => {
            return res.send('error' + err)
        })
});

router.delete('/delete', (req, res) => {
    const dltdirname = req.body.deleteDirInput;
    console.log(dltdirname);
    TableDirectory.findOne({
        where: {dir_name: req.body.deleteDirInput, owner_id: req.session.user_id}
    })
    .then(tableDirectory => {
        if(!tableDirectory) {
            return res.status(404).json({
                error: "NO DIRECTORY",
                code: 3
            });
        }
        // let first_query = 'DELETE * FROM tbl_article INNER JOIN tbl_directory ON tbl_directory.dir_Id = tbl_article.dir_id WHERE tbl_directory.dir_name = :now_dir';
        // let values = {
        //    now_dir: req.body.deleteDirInput
        // };
        // sequelize.query(first_query, {replacements:values, model:TableArticle})
        // .then(result => console.log(result));

        TableDirectory.destroy({
            where: {dir_name: req.body.deleteDirInput}
        })
        .then(response => {
            res.json({success:true});
        })
        .catch(err => console.log("error" + err));
    })
    // TableDirectory.findOne({
    //     where: {dir_name: req.body.deleteDirInput, owner_id: req.session.user_id}
    // })
    // .then(dir => {
    //     console.log(dir);
    //     if(!dir) {
    //         return res.status(404).json({
    //             error: "NO RESOURCE",
    //             code : 3
    //         });
    //     }
    //     if(dir.owner_id != req.session.user_id){
    //         return res.status(403).json({
    //             error: "PERMISSION FAILURE",
    //             code : 4
    //         });
    //     }
    //     console.log("wow?");
    //     TableDirectory.destroy({
    //         where: {dir_name: req.body.deleteDirInput}
    //     }).then(dirresult => {
    //             res.json({success:true});
    //         })
    //         .catch(err => console.log("error" + err))
    //     })
    // .catch(err => {
    //     return res.send('error' + err);
    // })
});

router.post('/groupAuth', (req, res, next) => {
    let group_auth = req.body.group_auth;
    console.log("grou???: " + group_auth);
    TableDirectory.update({
        share_group_id: req.body.group_auth
    }, {
        where: {owner_id: req.session.user_id, dir_name: req.body.now_dir}
    })
    .then(console.log("success"))
    .catch(err => {
        return res.send('error' + err);
    })
})


export default router;