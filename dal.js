/*
//const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017'; // <-- from local testing

let users = null;

// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
  console.log('Connected to the database server.');

  // connect to BankCrypto database
  db = client.db('BankCrypto');
  // user collection
  users = db.collection('users');
});
*/

//Require 🥭 Mongo
//The emoji is a mango because there is no mongoose emoji. yet.
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongoose').Types.ObjectId

//define the uri as seen here
//https://www.mongodb.com/docs/manual/reference/connection-string/
const uri = "mongodb+srv://bank3databaseuser:bank3databasepassword@bank3tiermongodatabase.qk3f3.mongodb.net/?retryWrites=true&w=majority";

//define a holder for the 🗄️ database
let db = null;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    console.log("Connected successfully to mongo's db server");
    //🗄️ database
    db = client.db("Bank3TierMongoDatabase");
    console.log("db = " + db.namespace);
     // user collection
    users = db.collection('users');
});




const create = (name, email, password) => {
  return new Promise((resolve, reject) => {
    const user = {name, email, password, balance: 0};
    users.insertOne(user, {w:1}, (err, result) => {
      console.log('dal.js --> create user: ', user);
      console.log('dal.js --> create result: ', result);
      err ? reject(err) : resolve(user);
    });
  });
}

const login = (email) => {
  return new Promise((resolve, reject) => {
    users.findOne({email}, (err, result) => {
      console.log('dal.js --> login result: ', result)
      err ? reject(err) : resolve(result);
    });
  });
}

const findUser = (id) => {
  return new Promise((resolve, reject) => {
    users.findOne({_id: ObjectId(id)}, (err, result) => {
      console.log('dal.js --> login result: ', result)
      err ? reject(err) : resolve(result);
    });
  });
}

const updateBalance = (id, amount) => {
  return new Promise((resolve, reject) => {
    users.findOneAndUpdate({_id: ObjectId(id)}, {$inc: {balance: amount}}, {returnDocument: 'after'}, (err, result) => {
      console.log('dal.js --> deposit balance: ', result)
      err ? reject(err) : resolve(result);
    });
  })
}

const allData = () => {
  return new Promise((resolve, reject) => {
    users.find().toArray((err, result) => {
      err ? reject(err) : resolve(result);
    });
  })
}

/*
const onSignIn = (googleUser) => {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
*/


module.exports = {create, login, findUser, updateBalance, allData};