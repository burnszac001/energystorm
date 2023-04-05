const express = require('express');

const trackerRoutes = require('./routes/tracker/tracker-routes');
const authRoutes = require('./routes/auth/auth-routes');

const app = express();

app.use(express.json());

app.use(express.static('public'));

app.use('/', authRoutes);

app.use('/tracker', trackerRoutes);

app.get('*',function (req, res) {
    res.redirect('/');
});

module.exports = app;