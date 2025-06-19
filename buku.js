const { connectMySQL } = require('./mysql');

async function addBook(title) {
    const conn = await connectMySQL();
    await conn.execute('INSERT INTO books (title) VALUES (?)', [title]);
    console.log("Buku berhasil ditambahkan!");
}

async function listBooks() {
    const conn = await connectMySQL();
    const [rows] = await conn.execute('SELECT * FROM books');
    rows.forEach(book => console.log('${book.id}. ${book.title}'));
    return rows;
}

module.exports = { addBook, listBooks };