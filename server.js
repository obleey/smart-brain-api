const express = require('express');
const bcrypt = require('bcrypt-node');
const cors = require('cors');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'obleey',
    password: '',
    database: 'smart-brain',
  },
});

db.select('*')
  .from('users')
  .then((data) => {
    console.log(data);
  });

const app = express();

app.use(cors());
app.use(express.json());
//Signin
app.post('/signin', (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  )
    res.json(database.users[0]);
  else res.status(400).json('error logging in');
});
//Register
app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  db('users')
    .returning('*')
    .insert({
      email: email,
      name: name,
      joined: new Date(),
    })
    .then((user) => {
      res.json(user[0]);
    })
    .catch((err) => res.status(400).json('unable to register'));
});
//Root
app.get('/', (req, res) => {
  res.send(database.users);
});
//Profil
app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json('user not found');
  }
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400).json('user not found');
  }
});

app.listen(3000, () => {
  console.log('app is running on port 3000');
});

/*
/--> this is working
/ /signin --> POST = success/fail
/ /register --> POST = return user
/ /profile/:userid --> GET userinfo
/ /image --> PUT

 */
