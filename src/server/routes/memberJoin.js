import express from 'express';
import Sequelize from 'sequelize';

const router = express.Router();
const cors = require("cors");

const sequelize = new Sequelize('kt_intern', 'min9604', '!zpdlxl9604', {
    host: 'localhost',
    port: '6002',
    dialect: 'mysql',
    operatorsAliases: false,
    pool:{
        max:5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const MemberJoin = sequelize.define(
    'memberJoin',
    {
        user_id: {
            type:Sequelize.INTEGER,
            primaryKey: true
        },
        user_pw:{
            type: Sequelize.STRING
        },
        group_id: {
            type:Sequelize.INTEGER
        }
    },
    {
        timestamps: false,
        tableName: 'tbl_user'
    }
);

router.use(cors());

router.post('/signup', (req, res) => {

    const memberData = {
        user_id: req.body.user_id,
        user_pw: req.body.user_pw
    };
    console.log(memberData);

    MemberJoin.findOne({
        where:{user_id: req.body.user_id}})
        .then(memberJoin => {
            if(!memberJoin){
                MemberJoin.create(memberData)
                .then(memberJoin => {
                    console.log("회원가입 성공");
                    console.log(user_id);
                    return res.json({success: true})
                })
                .catch(err => {
                    return res.send('error' + err)
                })
            }
            else{
                console.log("회원가입 실패");
                return res.json({
                    error: "이미 있는 ID",
                    code: 3
                })
            }
        })
        .catch(err => {
            return res.send('error' + err)
        })
});

router.post('/logout', (req, res) => {

    return res.json({success: true});
});

export default router;