const tfjs = require('@tensorflow/tfjs-node');

function loadModel() {
  const modelUrl = "file://models/model-tfjs/model.json";
  return tfjs.loadLayersModel(modelUrl);
}

function predict(model, imageBuffer) {
  const tensor = tfjs.node
    .decodeJpeg(imageBuffer)
    .resizeNearestNeighbor([150, 150])
    .expandDims()
    .toFloat();

  return model.predict(tensor).data();
}

module.exports = { loadModel, predict };