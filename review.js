const { connectMongo } = require('./mongo');

async function addReview(text) {
    const db = await connectMongo();
    await db.collection('reviews').insertOne(review);
    console.log("Review berhasil ditambahkan!");
}

async function listRiview() {
    const db = await connectMongo();
    const reviews = await db.collection('reviews').find().toArray();
    console.table(reviews);
}

module.exports = { addReview, listRiview };