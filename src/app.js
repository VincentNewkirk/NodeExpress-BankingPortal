const path = require('path');
const express = require('express');
const data = require('./data');

const { accounts, users, writeJSON } = data;

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

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

app.get('/transfer', function(req, res) {
  res.render('transfer');
});

app.post('/transfer', function(req, res) {
  const { body: { from, to, amount } } = req;
  accounts[from].balance -= parseInt(amount);
  accounts[to].balance += parseInt(amount);

  writeJSON();

  res.render('transfer', { message: 'Transfer Completed' });
});

app.get('/payment', function(req, res) {
  res.render('payment', { account: accounts.credit });
});

app.post('/payment', function(req, res) {
  const { body: { amount: amt } } = req;
  const amount = parseInt(amt);
  accounts.credit.balance -= amount;
  accounts.credit.available += amount;

  writeJSON();

  res.render('payment', { message: 'Payment Successful', account: accounts.credit });

});

app.listen(3000, function() {
  console.log('PS Project Running on port 3000!');
});
