const express = require('express');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const DB = require('../../config/database');


const authGet = (req, res) => {
    res.sendFile('./views/index.html', { root: 'public' });
};


// Login User
const loginUser = async (req, res) => {
    const user = await DB.userCollection.findOne({email: req.body.email})
    if (user !== null) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            setAuthCookie(res, user.token);
            res.send({id: user._id});
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
}



// Register User
const registerUser = async (req, res) => {
    const userExists = await emailExists(req.body.email);
    if (!userExists) {
        const user = await createUser(req.body.email, req.body.password);
        setAuthCookie(res, user.token);
        res.send({id: user._id})
    } else {
        res.status(409).send({ msg: 'User with that email already exists.' });
    }
}


async function emailExists (email) {
    const user = await DB.userCollection.findOne({email: email});
    if (user !== null) {
        return true;
    } else {
        return false;
    }
}


async function createUser (email, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        email: email,
        password: passwordHash,
        token: uuid.v4(),
    };
    await DB.userCollection.insertOne(user);

    return user;
}


function setAuthCookie(res, authToken) {
    res.cookie('token', authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict'
    });
}


// Logout Route
function logoutRoute(res, res) {
    res.clearCookie('token');
    res.status(204).end();
}



module.exports = {
    authGet,
    loginUser,
    registerUser, 
    logoutRoute
};