const express = require('express')
const app = express()
const port = 5001
const bodyParser = require('body-parser');
require('dotenv').config();
// const dbpw = process.env;

const  stationsRouter = require('./routes/Stations'); // 추가된 코드

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
// console.log(dbpw.mongodbpw);

mongoose.connect(`mongodb+srv://gabrielyoon7:0000@gabrielyoon7.aq0fu.mongodb.net/myplug?retryWrites=true&w=majority`, {})

.then(() => console.log('MongoDB Connected!!'))
.catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use('/stationsRouter', stationsRouter);