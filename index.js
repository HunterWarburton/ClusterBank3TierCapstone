const express = require('express');
const session = require('express-session');
const passport = require('passport');

const app = express();
//express session
app.use(session({
  secret: 'cats',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const path = require("path");

const cors = require('cors');
const dal = require('./dal.js');

var googUser;
var clientPage;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

// CreateAccount
app.post('/account/createaccount', (req, res) => {
  console.log('*****post create account');
  dal.create(req.body.name, req.body.email, req.body.password)
    .then((user) => {
      console.log('index.js createaccount user: ', user);
      res.send(user);
    });

    req.logout(req.user, err => {
      if(err) return next(err);
    });
});

// Find User By Email
app.get('/account/login/:email', (req, res) => {
  console.log('*****index.js get find user by email');
  dal.login(req.params.email)
    .then((user) => {
      console.log('index.js login user: ', user);
      res.send(user);
    });
});

// Find User By ID
app.get('/find/user/:id', (req, res) => {
  console.log('***** index.js find user by ID');
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

/*******
 * GOOG TIME
 * 
 */
//GOOG Oauth
require('./GoogAuth.js');

//middleware function, checks for login
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);//does the login request have a user? if not, 401 unauthorized error
};

//GOOG Route
app.get('/login', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/auth/google/login',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
);
app.get('/auth/google/create',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
);


app.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/failure',
  }),
  function(req, res) {
    // If this function gets called, authentication was successful.
    console.log("***!!!index.js goog callback");
    if (clientPage == "login") {
      res.redirect('/#/login/');//send user back to login page
    } else {
      res.redirect('/#/createAccount/');//send user back to createAccount page
    } 
    googUser = (req.user);// `req.user` contains the authenticated user.
    console.log("Index.js Goog Callback --> ID: " + googUser.id +
      " Email: " + googUser.emails[0].value + " Name: " +
      googUser.displayName);
  }
);

//Depricated
app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);//Successful goog login
});
//

app.get('auth/failure', (req, res) => {
  res.send('something went wrong with google authentication')
});

app.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
});
//END GOOG

//Login Page Asks for the Goog User
app.get('/path/for/goog/login', function(req,res) {
  console.log("Index.js --> AJAX call login");
  clientPage = "login";
  if (googUser == null) {
    res.send(null);
  } else {
    res.send(googUser);
  }
  googUser = null;
});
//Create Page Asks for the Goog User
app.get('/path/for/goog/create', function(req,res) {
  console.log("Index.js --> AJAX call createAccount");
  clientPage = "createAccount";
  if (googUser == null) {
    res.send(null);
  } else {
    res.send(googUser);
  }
  googUser = null;
});


//Make port and listener
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === "production"){
  app.use(express.static("build"))
  app.get("*", (req, res) => {
   res.sendFile(path.resolve(_dirname, "build","index.html")) 
  })
};

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
