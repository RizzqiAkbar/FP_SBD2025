const { connectMongo } = require('./mongo');

async function logActivity(action, details) {
    const db = await connectMongo();
    await db.collection('activites').insertOne({
        timestamp: new Date(),
        action,
        details
    });
    console.log("✅ Aktivitas berhasil dicatat!");
}

module.exports = { logActivity };