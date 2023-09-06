const express = require('express');
const DB = require('../../config/database');

const { trackerGet, trackerPost, getDay } = require('./tracker-controller');

const secureRouter = express.Router();

secureRouter.use(async (req, res, next) => {
    const authToken = req.cookies['token'];
    const user = await DB.userCollection.findOne({token: authToken});
    if (user) {
        res.locals.user = user;
        next();
    } else {
        res.redirect('/');
    }
});


secureRouter.get('/', trackerGet);

secureRouter.post('/day', getDay);

module.exports = secureRouter;