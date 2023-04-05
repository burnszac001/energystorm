const { MongoClient } = require('mongodb');


const user = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!user) {
    throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${user}:${password}@${hostname}`

const client = new MongoClient(url);

const database = client.db('energystorm');

const userCollection = database.collection('user');

userCollection.insertOne({email: "zach", password: "help me please"});