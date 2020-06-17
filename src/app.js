const fs = require('fs');
const path = require('path');

const express = require('express');
const { reset } = require('sinon');
const app = express();

app.set('views', path.join(process.cwd(), 'src/views'));
app.set('view engine', 'ejs');

app.use(express.static('src/public'));

const accountData = fs.readFileSync('src/json/accounts.json', {encoding: 'utf-8'});
const accounts = JSON.parse(accountData);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Account Summary',
    accounts: accounts
  });
});

app.get('/savings', (req, res) => {
  res.render('account', {
    account: accounts.savings
  });
});

app.get('/checking', (req, res) => {
  res.render('account', {
    account: accounts.checking
  });
});

app.get('/credit', (req, res) => {
  res.render('account', {
    account: accounts.credit
  });
});

app.get('/profile', (req, res) => {
  res.render('profile', {user: users[0]});
});

const userData = fs.readFileSync('src/json/users.json', {encoding: 'utf-8'});
const users = JSON.parse(userData);

app.listen(3000, () => {
  console.log('PS Project Running on port 3000!');
});