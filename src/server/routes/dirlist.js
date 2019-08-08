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

router.get('/', (req, res, next) => {
    BoardDirectory.findAll({
        where: {user_id: req.session.user_id}
    })
    .then(BoardDirectory=>{
        res.json(BoardDirectory);
    })
})

router.post('/insertDir', (req, res, next) => {
    const inputData = {
        dir_name: req.body.insertDirinput,
        user_id: req.session.user_id
    };
    console.log(inputData);

    BoardDirectory.create(inputData)
    .then(dirInput => {
        res.send("success");
    })
    .catch(err => {
        return res.send('error' + err)
    })
});


export default router;