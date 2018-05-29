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
            var aProductListId = [];
            for (var i = 0; i < degiroAnswer.portfolio.length; i++)
            {
               aProductListId.push(degiroAnswer.portfolio[i].id);
            }
            var aProductList = await degiro.getProductsByIds(aProductListId);
            for(var index in aProductList.data) {
                console.log(index);
                for (var i = 0; i < degiroAnswer.portfolio.length; i++)
                {
                   if (degiroAnswer.portfolio[i].id == index)
                   {
                    degiroAnswer.portfolio[i]['details'] = aProductList.data[index];
                    break;
                   }
                }
            };


            answer = JSON.stringify(degiroAnswer, null, '  ');
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(answer);
    }
    catch (err) {
      next(err);
    }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
