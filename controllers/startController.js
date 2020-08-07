const { Router } = require('express');

module.exports = () => {
    let api = Router();

    // '/v1/' Start API endpoint
    api.get('/', async (req, res) => {

        try {
            const domainHost = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
            // Response for passed record
            return res.status(200).json({
                status: "For Nnamdi Azikiwe University",
                message: "Welcome to UniHostel API, links to register and login to proceed",
                login: `${domainHost}login`,
                register: `${domainHost}register`,
                start: domainHost
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
