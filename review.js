const { connectMongo } = require('./mongo');

async function addReview(book_id, book_title, member_id, rating, review_text) {
    const db = await connectMongo();
    const review = {
    book_id,
    book_title,
    member_id,
    rating,
    review_text,
    review_date: new Date()
    };
    await db.collection('reviews').insertOne(review);
    console.log("✅ Review berhasil ditambahkan!");
}

async function listReview() {
    const db = await connectMongo();
    const reviews = await db.collection('reviews').find().toArray();
    console.table(reviews);
}

module.exports = { addReview, listReview };