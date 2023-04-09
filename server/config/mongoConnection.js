const { MongoClient } = require("mongodb");

// const connectionString = process.env.MONGO_STRING;
const connectionString = "mongodb+srv://hamzah:sITWAlyYggmSrG4A@dizagramdb.p4aoivm.mongodb.net/test";

let db = null;

const mongoConnect = async () => {
  const client = new MongoClient(connectionString);

  try {
    const database = client.db("dizagramDB");

    db = database;

    return database;
  } catch (err) {
    await client.close();
  }
};

const getDatabase = () => db;

module.exports = {
  mongoConnect,
  getDatabase,
};
