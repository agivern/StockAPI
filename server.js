'use strict';

const express = require('express');
const DeGiro = require('degiro');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const config = require('./app.config');


// App
const app = express();
app.get('/', async (req, res, next) => {
    try
    {
        var answer = {};
        if (config.degiro != undefined)
        {
            const degiro = DeGiro.create(config.degiro);
            await degiro.login();
            const degiroAnswer = await degiro.getPortfolio();
            answer = JSON.stringify(degiroAnswer, null, '  ');
        }
        res.send(answer);
    }
    catch (err) {
      next(err);
    }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
