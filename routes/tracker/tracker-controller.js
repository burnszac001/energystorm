const express = require('express');

const trackerGet = (req, res) => {
    res.sendFile('./views/tracker.html', { root: 'public' });
};

const trackerPost = (req, res) => {
    res.json("posting to /tracker")
}

module.exports = {
    trackerGet,
    trackerPost,
}