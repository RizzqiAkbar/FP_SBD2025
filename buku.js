const { connectMySQL } = require('./mysql');
const { logActivity } = require('./activity');

async function addBook(title) {
    const conn = await connectMySQL();
    const [result] = await conn.execute(
    'INSERT INTO BOOKS (title, author, genre, publisher, publication_year, category_id, total_copies, available_copies) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [title, author, genre, publisher, year, category_id, copies, copies]
  );
  await logActivity('add_book', {
    book_id: result.insertId,
    title,
    author,
    genre,
    year,
    publisher,
    category_id,
    total_copies: copies
  });
    console.log("Buku berhasil ditambahkan!");
}

async function listBooks() {
    const conn = await connectMySQL();
    const [rows] = await conn.execute('SELECT * FROM books');
    rows.forEach(book => console.log('${book.id}. ${book.title}'));
    return rows;
}

module.exports = { addBook, listBooks };