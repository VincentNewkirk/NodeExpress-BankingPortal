const fs = require('fs');
const path = require('path');

const jsonDir = path.join(__dirname, 'json');

const accountData = fs.readFileSync(jsonDir + '/accounts.json', 'utf8');
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(jsonDir + '/users.json',  'utf8');
const users = JSON.parse(userData);

const writeJSON = () => {
  const accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'), accountsJSON,  'utf8');
};

module.exports = {
  writeJSON,
  accounts,
  users,
};
