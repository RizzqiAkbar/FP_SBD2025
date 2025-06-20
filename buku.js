const { connectMySQL } = require('./mysql');
const { logActivity } = require('./activity');
const { listCategories } = require('./kategori');
const { listGenres } = require('./genre');

async function addBook(title, author, publisher, year, category_id, copies, genre_id) {
    const conn = await connectMySQL();
    const [result] = await conn.execute(
        'INSERT INTO BOOKS (title, author, publisher, publication_year, category_id, total_copies, available_copies, genre_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [title, author, publisher, year, category_id, copies, copies, genre_id]
    );

    await logActivity('add_book', {
        book_id: result.insertId,
        title,
        author,
        year,
        publisher,
        category_id,
        total_copies: copies,
        genre_id: result.insertId
    });

    console.log("✅ Buku berhasil ditambahkan!");
}

async function listBooks() {
    const conn = await connectMySQL();
    console.log('\n=== LIST BUKU ===');
    const [rows] = await conn.execute('SELECT * FROM books');
    rows.forEach(book => {
        console.log(`${book.book_id}. ${book.title} | ${book.author} | ${book.publisher} (${book.publication_year}) | ${book.genre_id}`);
    });
    console.log('=================\n');
    return rows;
}

async function shortlistBooks() {
    const conn = await connectMySQL();
    console.log('\n=== LIST BUKU ===');
    const [rows] = await conn.execute('SELECT * FROM books');
    rows.forEach(book => {
        console.log(`${book.book_id}. ${book.title} | ${book.author}`);
    });
    console.log('=================\n');
    return rows;
}

async function printQuestionBooks() {
    const readLine = require('readline-sync');

    const title = readLine.question('Judul Buku: ');
    const author = readLine.question('Penulis: ');
    const publisher = readLine.question('Penerbit: ');
    const year = readLine.questionInt('Tahun Terbit: ');
    await listCategories();
    const category_id = readLine.questionInt('ID Kategori: ');
    const copies = readLine.questionInt('Jumlah Salinan: ');
    await listGenres();
    const genre_id = readLine.questionInt('ID Genre: ');
    await addBook(title, author, publisher, year, category_id, copies, genre_id);
}

async function deleteBook() {
    const conn = await connectMySQL();
    const readLine = require('readline-sync');

    while (true) {
        await shortlistBooks();
        const book_id = readLine.questionInt('Masukkan ID Buku yang ingin dihapus (0 untuk batal): ');

        if (book_id === '0') {
            console.log('❌ Penghapusan dibatalkan');
            break;
        }

        const [rows] = await conn.execute('SELECT * FROM books WHERE book_id = ?', [book_id]);

        if (rows.length === 0) {
            console.log('❌ Buku tidak tersedia');
            continue;
        } 
        
        const check = readLine.question('Apa kamu yakin ingin menghapus buku ini? (y/n): ');

        if (check === 'n') {
            console.log('❌ Penghapusan dibatalkan');
            break;
        } else if (check === 'y') {
            await conn.execute('DELETE FROM books WHERE book_id = ?', [book_id]);
            console.log('✅ Buku berhasil dihapus');
            break;
        } else {
            console.log('❗ Pilihan tidak tersedia');
            continue;
        }
    }
}

module.exports = { addBook, listBooks, printQuestionBooks, shortlistBooks, deleteBook };