const brain = require("brain.js");

var net = new brain.NeuralNetwork();

console.time("TRAIN");
net.train([
  { input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 } },
  { input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 } },
  { input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 } }
]);
console.timeEnd("TRAIN");

var output = net.run({ r: 1, g: 0.4, b: 0 }); // { white: 0.99, black: 0.002 }

console.log(output);
