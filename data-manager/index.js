import Example from "./src/controller/example/Example.js";
import * as example from "./src/controller/example/example.mjs";
import * as dataManager from './src/dataManager.js'


// 모듈 예제
example.sayHello()
// 클래스 예제
const exampleClass = new Example();
exampleClass.run();

dataManager.run();


// import input from 'input';

// async function askStuff() {
//   const name = await input.text('What is your name?', { default: 'Fred' });
 
//   const colors = await input.checkboxes(`OK ${name}, choose some colors`, [
//     'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'rebeccapurple'
//   ]);
 
//   console.log('You chose:\n  ' + colors.join('\n  '));
// }
 
// askStuff();