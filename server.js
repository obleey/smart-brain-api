const express = require('express');
const bcrypt = require('bcrypt-node');
const cors = require('cors');
const knex = require('knex');
const register = require('./controlers/register');
const signin = require('./controlers/signin');
const profile = require('./controlers/profile');
const image = require('./controlers/image');
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

const app = express();

app.use(cors());
app.use(express.json());
//Signin
app.post('/signin', (req, res) => {
  signin.handleSignIn(req, res, db, bcrypt);
});
//Register
app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
//Root
app.get('/', (req, res) => {
  res.send(database.users);
});

//Profil
app.get('/profile/:id', (req, res) => {
  profile.handleProfile(req, res, db);
});

app.put('/image', (req, res) => {
  image.handleImage(req, res, db);
});

app.post('/imageurl', (req, res) => {
  image.handleImageApi(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
