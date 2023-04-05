const express = require('express');

const trackerGet = (req, res) => {
    res.json("getting from /tracker");
};

const trackerPost = (req, res) => {
    res.json("posting to /tracker")
}

module.exports = {
    trackerGet,
    trackerPost,
}