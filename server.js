const express = require('express');
//const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'vimu',
    database : 'smart-brain'
  }
});

const app = express();

app.use(express.json());
app.use(cors());

//ROOT
app.get('/',(req,res)=>{
	res.send('success')
})

//SIGNIN
app.post('/signin',(req,res) => { signin.handleSignin(req, res, db, bcrypt) })

//REGISTER
app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt) })

//PROFILE
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

//IMAGE 
app.put('/image',(req, res) => { image.handleImage(req, res, db) })
app.post('/imageUrl',(req, res) => { image.handleApiCall(req, res) })


//PORT
app.listen(8080,()=>{
	console.log('app is running on port 8080');
});
