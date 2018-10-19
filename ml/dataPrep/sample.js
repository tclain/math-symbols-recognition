// a simple sampler, only take a few images to speedup training

const { SUPPORTED_SYMBOLS } = require("../constants");
const { sampleFilesFromDirectory } = require("../fs");
const { copyFileSync } = require("fs");

async function gatherSamples(baseDir = "", outputPath) {
  // kaggle data are sorted inside directories
  const DirectoriesToHarvest = SUPPORTED_SYMBOLS.map(
    currentSymbol => baseDir + currentSymbol
  );
  const filesToCopy = (await Promise.all(
    DirectoriesToHarvest.map(directory =>
      sampleFilesFromDirectory(directory, 30)
    )
  )).map((files, index) => ({
    symbol: SUPPORTED_SYMBOLS[index],
    files
  }));
  // for Each sampled file
  filesToCopy.forEach(({ symbol, files }) => {
    files.forEach((file, index) => {
      const newPath = outputPath + "/" + symbol + "__" + index + ".jpg";
      copyFileSync(file, newPath);
    });
  });
}

// MAIN

(async () => {
  if (process.argv.length < 4)
    return console.error("USAGE: node script path/to/kaggle/extracted/data");
  const [node, script, directoryToHarvest, outputPath] = process.argv;
  await gatherSamples(directoryToHarvest, outputPath);
})();

module.exports = {
  gatherSamples
};
