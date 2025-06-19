const { connectMySQL } = require('./mysql');
const { logActivity } = require('./activity');

async function borrowBook(membersId, bookId) {
    const conn = await connectMySQL();
    const [updateResult] = await conn.execute(
    'UPDATE BOOKS SET available_copies = available_copies - 1 WHERE book_id = ? AND available_copies > 0',
    [book_id]
  );

  if (updateResult.affectedRows === 0) {
    console.log("Buku tidak tersedia");
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
    console.log('Buku berhasil dipinjam!');
}

module.exports = { borrowBook };