const express = require('express');
const app = express();

const path = require("path");

const cors = require('cors');
const dal = require('./dal.js');

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

// CreateAccount
app.post('/account/createaccount', (req, res) => {
  dal.create(req.body.name, req.body.email, req.body.password)
    .then((user) => {
      console.log('index.js createaccount user: ', user);
      res.send(user);
    });
});

// Find User By Email
app.get('/account/login/:email', (req, res) => {
  dal.login(req.params.email)
    .then((user) => {
      console.log('index.js login user: ', user);
      res.send(user);
    });
});

// Find User By ID
app.get('/find/user/:id', (req, res) => {
  dal.findUser(req.params.id)
    .then((user) => {
      console.log('index.js find user: ', user);
      res.send(user);
    });
});

// Update Balance
app.post('/update/balance', (req, res) => {
  dal.updateBalance(req.body.currentUser, req.body.amount)
    .then((balance) => {
      console.log('index.js deposit balance: ', balance);
      res.send(balance);
    });
});

// Find AllData
app.get('/find/allData', (req, res) => {
  dal.allData()
    .then((users) => {
      console.log('index.js allData users: ', users);
      res.send(users);
    })
});

//Make port and listener
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === "production"){
  app.use(express.static("build"))
  app.get("*", (req, res) => {
   res.sendFile(path.resolve(_dirname, "build","index.html")) 
  })
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
