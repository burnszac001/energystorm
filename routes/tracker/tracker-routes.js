const express = require('express');
const DB = require('../../config/database');

const { trackerGet, trackerPost } = require('./tracker-controller');

const secureRouter = express.Router();

secureRouter.use(async (req, res, next) => {
    const authToken = req.cookies['token'];
    const user = await DB.userCollection.findOne({token: authToken});
    if (user) {
        next();
    } else {
        res.redirect('/');
    }
});


secureRouter.get('/', trackerGet);
secureRouter.post('/', trackerPost);

module.exports = secureRouter;