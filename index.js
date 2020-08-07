const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const {port} = require('./config/connection')
const publicRoutes = require('./route/public');
const privateRoutes = require('./route/private');

const app = express();
const server = http.createServer(app);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*",);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
    next();
});

// api routes
app.use('/v1', publicRoutes);
app.use('/v1', privateRoutes);

// catch 404 and forwarding to error handler
app.use((req, res, next) => {
    const err = new Error('Not found')
    err.status = 404;
    next(err);
});

// Handles the error and send response accordingly
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
        error: {
            message: err.message
        }
    })
})

server.listen(port, () => {
    console.log(`server running on port ${server.address().port}`);
})

module.exports = app