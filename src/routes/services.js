const express = require('express');
const data = require('../data');

const router = express.Router();

const { accounts, writeJSON } = data;

router.get('/transfer', function(req, res) {
  res.render('transfer');
});

router.post('/transfer', function(req, res) {
  const { body: { from, to, amount } } = req;
  accounts[from].balance -= parseInt(amount);
  accounts[to].balance += parseInt(amount);

  writeJSON();

  res.render('transfer', { message: 'Transfer Completed' });
});

router.get('/payment', function(req, res) {
  res.render('payment', { account: accounts.credit });
});

router.post('/payment', function(req, res) {
  const { body: { amount: amt } } = req;
  const amount = parseInt(amt);
  accounts.credit.balance -= amount;
  accounts.credit.available += amount;

  writeJSON();

  res.render('payment', { message: 'Payment Successful', account: accounts.credit });
});

module.exports = router;
