const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sharp = require("sharp");
const base64Converter = require("base64-img");
const { promisify } = require("../ml/utils/promise");

app.use(bodyParser.text());

app.post("/predict", async (req, res) => {
  // issue with the json parser, .... so do it manually
  //  console.log("predict", JSON.parse(req.body));
  const { image } = JSON.parse(req.body);
  const fileName = await promisify(base64Converter.img)(
    image,
    "data/input",
    "image"
  );
  console.log(fileName);
  sharp("./" + fileName)
    //.trim()
    .resize(45, 45)
    .toFile("./data/input/converted.png");
  res.end('{res: "success"}');
});

app.listen(1245, "0.0.0.0", () => console.log("listen to 1245"));
