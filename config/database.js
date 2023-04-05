const { MongoClient } = require('mongodb');


const user = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!user) {
    throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${user}:${password}@${hostname}`

const client = new MongoClient(url);

const userCollection = client.db('energystorm').collection('user');

module.exports = userCollection;