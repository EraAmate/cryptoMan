const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017/";
const dbName = "cryptoName";

let client;

function connect() {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return client.connect();
}

function close() {
  return client.close();
}

function getCollection(collectionName) {
  return client.db(dbName).collection(collectionName);
}

exports.connect = connect;
exports.close = close;
exports.getCollection = getCollection;
