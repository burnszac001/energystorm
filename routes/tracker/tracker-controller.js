const express = require('express');
const DB = require('../../config/database');

const trackerGet = (req, res) => {
    res.sendFile('./views/tracker.html', { root: 'public' });
};

const getDay = async (req, res) => {
    const day = await DB.daysCollection.findOne({ user: res.locals.user.email, date: req.body.date });
    const goals = { calorieGoal: res.locals.user.calorieGoal, proteinGoal: res.locals.user.proteinGoal };
    if (day != null) {
        res.json({day: day, goals: goals});
    } else {
        res.json({ day: createDay(req.body.date, res.locals.user.email), goals: goals });
    }
}


function createDay(date, email) {
    const dayObj = {
        date: date,
        user: email,
        nutritionItems: [],
        alternateGoal: null,
        caloriesEaten: 0
    }
    DB.daysCollection.insertOne(dayObj);
    return dayObj;
}



module.exports = {
    trackerGet,
    getDay,
}