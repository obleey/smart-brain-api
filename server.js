const express = require('express');
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

app.post('/signin', (req, res) => {
  req.body;
  res.json('signin');
});

app.get('/', (req, res) => {
  res.send('this is working');
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
