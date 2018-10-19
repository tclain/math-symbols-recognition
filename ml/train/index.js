/** train our neural network with the sampled image */

const brain = require("brain.js");
const getImageData = require("get-image-data");
const { promisify } = require("../utils/promise");

function getNetwork() {
  return new brain.NeuralNetwork();
}

/*function train(imagesList) {
	const network = getNetwork();
    const stream = new brain.TrainStream({
        neuralNetwork: network,
        floodCallback: function() {
          flood(trainStream, data);
        },
        doneTrainingCallback: function(stats) {
          // network is done training!  What next?
        }
      });
    
    
    network.train({
		log: true
	});
}

*/
async function getDataForAnImage(imagePath) {
  const { data } = await promisify(getImageData)(imagePath);
  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];
    const alpha = data[i + 3];
    console.log("r", red, "G", green, "B", blue, "A", alpha);
  }
}

// MAIN
getDataForAnImage("./data/=__0.jpg");
