require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { CreateUser, ActivateUser, LoginUser } = require('./Controlers/user.controler');
const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;


// Connecting to MongoDB
mongoose.connect(process.env.URI,{})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


// API endpoints
app.post('/register', CreateUser);
app.post('/activate', ActivateUser);
app.post('/login', LoginUser);


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
