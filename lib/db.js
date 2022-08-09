const { MongoClient } = require('mongodb');

require('dotenv').config();

const url = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.CLUSTER}.mongodb.net/?retryWrites=true&w=majority`;
let client;

async function connetToMongoDB() {
  client = new MongoClient(url);

  try {
    await client.connect();
    console.log('connection Successfull');
  } catch (error) {
    console.log('Error -> ', error);
  }

  return client;
}

module.exports = connetToMongoDB;
