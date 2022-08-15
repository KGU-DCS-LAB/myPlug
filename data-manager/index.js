import Example from "./src/controller/example/Example.js";
import * as example from "./src/controller/example/example.mjs";
import * as dataManager from './src/dataManager.js'

// 모듈 예제
example.sayHello()
// 클래스 예제
const exampleClass = new Example();
exampleClass.run();

dataManager.run();
