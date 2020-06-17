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

app.use(express.urlencoded({extended: true}));

app.get('/transfer', (req, res) => {
  res.render('transfer');
});

app.post('/transfer', (req, res) => {
  const {from, to, amount} = req.body;
  accounts[from].balance -= Number.parseInt(amount); 
  accounts[to].balance += Number.parseInt(amount);

  const accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(path.join(process.cwd(), 'src/json/accounts.json'), accountsJSON, 'UTF8');
  res.render('transfer', { message: "Transfer Completed"});
})

app.get('/payment', (req, res) => {
  res.render('payment', {account: accounts.credit});
})

app.post('/payment', (req, res) => {
  const { amount } = req.body;
  accounts.credit.balance -= amount;
  accounts.credit.available += Number.parseInt(amount);

  const accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(path.join(process.cwd(), 'src/json/accounts.json'), accountsJSON, "utf-8");
  res.render('payment', {message: "Payment Successful", account: accounts.credit});
});

app.listen(3000, () => {
  console.log('PS Project Running on port 3000!');
});