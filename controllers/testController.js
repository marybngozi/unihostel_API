const { Router } = require('express')

module.exports = () => {
    let api = Router();

    // '/withholding/single' Endpoint to Send single upload
    api.post('/', async (req, res) => {

        try {
            
            // return res.status(200).json({
            //     status: "error",
            //     data: {
            //         code: "E501",
            //         message: "From Database: Data not inserted!"
            //     }
            // });

            // Response for passed record
            return res.status(200).json({
                status: "success",
                data: {
                    code: "S200",
                    message: "Upload Hello"
                }
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
