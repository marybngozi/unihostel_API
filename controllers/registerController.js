const { Router } = require('express');
const { checkUser, addUser } = require('../services/user');
const { issue } = require('../utils/auth');

module.exports = () => {
    let api = Router();

    // '/v1/register' To register a user
    api.post('/', async (req, res) => {

        try {
            const userRequiredInfo = ['email', 'password', 'level', 'regNumber', 'gender', 'surname', 'firstName', 'otherName'];
            
            userRequiredInfo.forEach(info => {
                if (!req.body[info]) {
                    return res.status(400).json({
                        status: "error",
                        code: "E401",
                        message: `${info} is not provided`
                        
                    });
                }
            });

            const { password, verifyPassword, email, regNumber } = req.body;

            if (password != verifyPassword) {
                return res.status(400).json({
                    status: "error",
                    code: "E402",
                    message: "Passwords does not match"
                    
                });
            }

            // check if user email or regNumber exists
            const userExist = await checkUser({regNumber, email});

            if (userExist.status) {
                return res.status(400).json({
                    status: "error",
                    code: "E403",
                    message: userExist.message 
                });
            }

            // use external api to validate regNumber 

            const user = await addUser(req.body);

            if (!user) {
                return res.status(400).json({
                    status: "error",
                    code: "E404",
                    message: "Register not Successful" 
                });
            }

            const token = issue({id: user.id});

            // Response for passed record
            return res.status(200).json({
                status: "success",
                code: "S200",
                message: "Register Successful",
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
