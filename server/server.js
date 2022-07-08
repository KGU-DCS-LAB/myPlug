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
app.use('/usersRouter', usersRouter);
app.use('/favoritesRouter', favoritesRouter);

// const express = require('express');
// const app = express();
// const port = 5000

// app.listen(port, function(){
//     console.log(`listening on ${port}`)
// });

// app.get('/pet', function(요청, 응답){
//     응답.send('펫용품 쇼핑을 할 수 있는 페이지입니다.');
// });

// app.get('/', function(요청, 응답){
//     응답.sendFile(__dirname + '/index.html');
// });



// // 1. mongoose 모듈 가져오기!
// var mongoose = require('mongoose');
// // 2. testDB 세팅
// mongoose.connect('mongodb://localhost:27017/myplug');
// // 3. 연결된 testDB 사용
// var db = mongoose.connection;
// // 4. 연결 실패
// db.on('error', function(){
//     console.log('Connection Failed!');
// });
// // 5. 연결 성공
// db.once('open', function() {
//     console.log('Connected!');
// });

// // 6. Schema 생성. (혹시 스키마에 대한 개념이 없다면, 입력될 데이터의 타입이 정의된 DB 설계도 라고 생각하면 됩니다.)
// // var student = mongoose.Schema({
// //     name : 'string',
// //     address : 'string',
// //     age : 'number'
// // });
// const stationSchema = mongoose.Schema({
//     charging_station_name: {
//         type: String,
//         maxlength: 100,
//         required: true
//     },
//     charging_station_location_latitude: {
//         type: String,
//         maxlength: 100,
//         required: true
//     },
//     charging_station_location_longitude: {
//         type: String,
//         maxlength: 100,
//         required: true
//     },
//     charging_station_location_detail: {
//         type: String,
//         maxlength: 100,
//         required: true
//     }
// })

// // 7. 정의된 스키마를 객체처럼 사용할 수 있도록 model() 함수로 컴파일
// // var Student = mongoose.model('Schema', student);
// var Station = mongoose.model('charging_station', stationSchema);


// // // 8. Student 객체를 new 로 생성해서 값을 입력
// // var newStudent = new Student({name:'Hong Gil Dong', address:'서울시 강남구 논현동', age:'22'});

// // // 9. 데이터 저장
// // newStudent.save(function(error, data){
// //     if(error){
// //         console.log(error);
// //     }else{
// //         console.log('Saved!')
// //     }
// // });

// // 10. Student 레퍼런스 전체 데이터 가져오기
// // Student.find(function(error, students){
// //     console.log('--- Read all ---');
// //     if(error){
// //         console.log(error);
// //     }else{
// //         console.log(students);
// //     }
// // })
// Station.find(function(error, stations){
//     console.log('--- Read all ---');
//     if(error){
//         console.log(error);
//     }else{
//         console.log(stations);
//     }
// })

// // // 11. 특정 아이디값 가져오기
// // Student.findOne({_id:'620c7d529eef6f560f6d8b0d'}, function(error,student){
// //     console.log('--- Read one ---');
// //     if(error){
// //         console.log(error);
// //     }else{
// //         console.log(student);
// //     }
// // });

// // // 12. 특정아이디 수정하기
// // Student.findById({_id:'620c7d529eef6f560f6d8b0d'}, function(error,student){
// //     console.log('--- Update(PUT) ---');
// //     if(error){
// //         console.log(error);
// //     }else{
// //         student.name = '--modified--';
// //         student.save(function(error,modified_student){
// //             if(error){
// //                 console.log(error);
// //             }else{
// //                 console.log(modified_student);
// //             }
// //         });
// //     }
// // });

// // // 13. 삭제
// // Student.remove({_id:'620c7d529eef6f560f6d8b0d'}, function(error,output){
// //     console.log('--- Delete ---');
// //     if(error){
// //         console.log(error);
// //     }

// //     /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
// //         어떤 과정을 반복적으로 수행 하여도 결과가 동일하다. 삭제한 데이터를 다시 삭제하더라도, 존재하지 않는 데이터를 제거요청 하더라도 오류가 아니기 때문에
// //         이부분에 대한 처리는 필요없다. 그냥 삭제 된것으로 처리!
// //         */
// //     console.log('--- deleted ---');
// // });
