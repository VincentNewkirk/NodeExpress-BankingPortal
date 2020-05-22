const fs = require('fs');
const path = require('path');
const express = require('express');

const jsonDir = path.join(__dirname, 'json');

const accountData = fs.readFileSync(jsonDir + '/accounts.json', { encoding: 'UTF8' });
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(jsonDir + '/users.json', { encoding: 'UTF8' });
const users = JSON.parse(userData);


const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('index',  { title: 'Account Summary', accounts });
},);

app.get('/savings', function(req, res) {
  res.render('account', { account: accounts.savings });
});

app.get('/checking', function(req, res) {
  res.render('account', { account: accounts.checking });
});

app.get('/credit', function(req, res) {
  res.render('account', { account: accounts.credit });
});

app.get('/profile', function(req, res) {
  res.render('profile', { user: users[0] });
});

app.listen(3000, function() {
  console.log('PS Project Running on port 3000!');
});
