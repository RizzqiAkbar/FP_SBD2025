const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function connectMongo() {
    await client.connect();
    const db = client.db('library_management_system');
    console.log("Sudah terhubung ke Database MongoDB");
    return db;
}

module.exports = { connectMongo };