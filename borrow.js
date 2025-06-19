const { connectMySQL } = require('./mysql');

async function borrowBook(membersId, bookId) {
    const conn = await connectMySQL();
    await conn.execute('INSERT INTO borrowings (members_id, book_id) VALUES (?)', [membersId, bookId]);
    await conn.execute('UPDATE books SET available = FALSE WHERE id = ?', [bookId]);
    console.log('Buku berhasil dipinjam!');
}

module.exports = { borrowBook };