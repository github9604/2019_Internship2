import express from 'express';
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

router.use(cors());

const MemberLogin = sequelize.define(
    'memberLogin',
    {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        user_pw: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        tableName: 'member'
    }
);

router.post('/signin', (req, res) => {
    const memberData = {
        user_id: req.body.user_id,
        user_pw: req.body.user_pw
    };
    console.log(memberData);

    MemberLogin.findOne({
        where: { user_id: req.body.user_id }
    })
        .then(memberLogin => {
            if (!memberLogin) {
                return res.status(401).json({
                    error: "존재하지 않는 사용자",
                    code: 2
                });
            }
            if (req.body.user_pw === memberLogin.user_pw) {
                console.log("express 로그인 성공");
                // let session = req.session;
                // session.loginInfo = {
                //    user_id = memberLogin.user_id
                // };
                return res.json({
                    success: true
                });
            } else {
                console.log("express 로그인 실패");
                return res.status(401).json({
                    error: "비밀번호 오류",
                    code: 3
                });
            }
        });
});

export default router;