const { Router } = require('express');
const { getUser } = require('../services/user');
const { issue } = require('../utils/auth');
const { comparePassword } = require('../utils/hash');

module.exports = () => {
    let api = Router();

    // '/v1/login' Endpoint to login a user
    api.post('/', async (req, res) => {

        try {
            const userRequiredInfo = ['password', 'regNumber'];
            
            userRequiredInfo.forEach(info => {
                if (!req.body[info]) {
                    return res.status(400).json({
                        status: "error",
                        code: "E401",
                        message: `${info} is not provided`
                        
                    });
                }
            });

            const user = await getUser(req.body);

            if (!user) {
                return res.status(400).json({
                    status: "error",
                    code: "E402",
                    message: "Reg number or Password is wrong" 
                });
            }

            const { password } = req.body;

            if (!comparePassword(password, user.password)) {
                return res.status(400).json({
                    status: "error",
                    code: "E402",
                    message: "Reg number or Password is wrong"
                });
            }

            user.password = null;

            const token = issue({id: user.id});

            // Response for passed record
            return res.status(200).json({
                status: "success",
                code: "S200",
                user,
                token: token
            });

        } catch (e) {
            console.log(e);

            return res.status(500).json({
              status: "error",
              data: {
                code: "E500",
                name: e.name,
                message: e.message,
              }
            })
        }
    });

    return api;
}
