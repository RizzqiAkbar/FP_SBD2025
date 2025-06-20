const { connectMySQL } = require('./mysql');
const { logActivity } = require('./activity');

async function borrowBook(member_id, book_id, due_date, staff_id) {
    const conn = await connectMySQL();
    const [updateResult] = await conn.execute(
    'UPDATE BOOKS SET available_copies = available_copies - 1 WHERE book_id = ? AND available_copies > 0',
    [book_id]
  );

  if (updateResult.affectedRows === 0) {
    console.log("❌ Buku tidak tersedia");
    return;
  }

  const [result] = await conn.execute(
    'INSERT INTO BORROWINGS (member_id, book_id, due_date, staff_id) VALUES (?, ?, ?, ?)',
    [member_id, book_id, due_date, staff_id]
  );

  await logActivity('borrow_book', {
    borrowing_id: result.insertId,
    member_id,
    book_id,
    due_date,
    staff_id
  });
    console.log('✅ Buku berhasil dipinjam!');
}

async function returnBook() {
  const conn = await connectMySQL();

  const [borrowdata] = await conn.execute(
    'SELECT * FROM BORROWINGS WHERE status = "BORROWED"',
  );

  if (borrowdata.length === 0) {
    console.log("❌ Tidak ada peminjaman yang sedang berlangsung");
    return;
  }

  const { book_id, member_id, due_date, staff_id } = borrowdata[0];

  const readLine = require('readline-sync');
  const borrowing_id = readLine.questionInt('ID Peminjaman: ');

  await conn.execute(
    'UPDATE BORROWINGS SET status = "RETURNED" WHERE borrowing_id = ?',
    [borrowing_id]
  );

  await conn.execute(
    'UPDATE BOOKS SET available_copies = available_copies + 1 WHERE book_id = ?',
    [book_id]
  );

  await logActivity('return_book', {
    borrowing_id,
    member_id,
    book_id,
    due_date,
    staff_id
  });

  console.log('✅ Buku berhasil dikembalikan!');
}

async function listBorrowed() {
  const conn = await connectMySQL();
  const [rows] = await conn.execute('SELECT * FROM BORROWINGS WHERE status = "BORROWED"');

  if (rows.length === 0) {
    console.log('❌ Tidak ada buku yang sedang dipinjam');
  } else {
    console.log('\n=== LIST TERPINJAM ===');
    rows.forEach(b => {
    console.log(`${b.borrowing_id}. Member: ${b.member_id} | Buku: ${b.book_id} | Tanggal Pinjam: ${b.borrow_date} | Status: ${b.status}`);
  });
  console.log('======================\n');
  }
  return rows;
}

module.exports = { borrowBook, returnBook, listBorrowed };