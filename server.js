const express = require('express');
const bcrypt = require('bcrypt-node');
const cors = require('cors');
const database = {
  users: [
    {
      id: '123',
      name: 'john',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '124',
      name: 'sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date(),
    },
  ],
};
const app = express();

app.use(cors());
app.use(express.json());
//Signin
app.post('/signin', (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  )
    // res.json('success');
    res.json(database.users[0]);
  else res.status(400).json('error logging in');
});
//Register
app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  bcrypt.hash('bacon', null, null, function (err, hash) {
    // Store hash in your password DB.
    console.log(hash);
  });
  database.users.push({
    id: 125,
    name: name,
    email: email,
    // password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
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
