const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const { Station } = require("./models/Station");
const { User } = require("./models/User");
require('dotenv').config();
// const dbpw = process.env;

const stationsRouter = require('./routes/Stations'); // 추가된 코드
const usersRouter = require('./routes/Users'); 
const favoritesRouter = require('./routes/Favorites'); 
const carsRouter = require('./routes/Cars');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
// console.log(dbpw.mongodbpw);

mongoose
// .connect(`mongodb+srv://gabrielyoon7:0000@gabrielyoon7.aq0fu.mongodb.net/myplug?retryWrites=true&w=majority`, {})
.connect(`mongodb://localhost:27017/myplug`, {})

.then(() => console.log('MongoDB Connected!!'))
.catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use('/stationsRouter', stationsRouter);
app.use('/usersRouter', usersRouter);
app.use('/favoritesRouter', favoritesRouter);
app.use('/carsRouter', carsRouter);