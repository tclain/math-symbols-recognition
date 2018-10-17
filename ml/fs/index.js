const fs = require("fs");
const { promisify } = require("../utils/promise");
/** simple linear sample, every n elements */
module.exports = {
  sampleFilesFromDirectory: async function(directoryPath, takeEvery = 5) {
    if (!fs.existsSync(directoryPath))
      throw new Error("Directory does not exists: " + directoryPath);
    const files = await promisify(fs.readdir)(directoryPath);
    // take every N images
    return files
      .filter((file, index) => index % takeEvery === 0)
      .map(fileName => directoryPath + "/" + fileName);
  },
  selectFilesInDirectory(directory, pattern) {
    if (!fs.existsSync(directoryPath))
      throw new Error("Directory does not exists: " + directoryPath);
    const files = await promisify(fs.readdir)(directoryPath);
    return files
      .filter(pattern.test)
  }
};
