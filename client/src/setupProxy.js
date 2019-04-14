const proxy = require('http-proxy-middleware');
const express = require('express');
const app = express();

module.exports = function(app) {
    app.use(proxy('/api', 
        { target: 'http://localhost:3001/' }
    ));
}