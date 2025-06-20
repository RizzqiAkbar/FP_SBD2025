const { connectMySQL } = require('./mysql');
const { logActivity } = require('./activity');

async function addStaff (staff_name, staff_phone) {
    const conn = await connectMySQL();
    const [result] = await conn.execute('INSERT INTO STAFF (staff_name, staff_phone) VALUES (?, ?)', 
        [staff_name, staff_phone]);
    await logActivity('add_staff', {
    satff_id: result.insertId,
    staff_name,
    staff_phone
  });
  console.log("✅ Staff berhasil ditambahkan!");
}

async function listStaff() {
    const conn = await connectMySQL();
    console.log('\n=== LIST STAFF ===');
    const [rows] = await conn.execute('SELECT * FROM staff');
    rows.forEach(staff => {console.log(`${staff.staff_id}. ${staff.staff_name} | ${staff.staff_phone}`)});
    console.log('==================\n');
}

async function printQuestionStaff() {
    const readLine = require('readline-sync');

    const staff_name = readLine.question('Nama Lengkap: ');
    const staff_phone = readLine.question('No HP: ');
    await addStaff(staff_name, staff_phone);
}

async function deleteStaff() {
    const conn = await connectMySQL();
    const readLine = require('readline-sync');

    while (true) {
        await listStaff();
        const staff_id = readLine.questionInt('Masukkan ID Staff yang ingin dihapus (0 untuk batal): ');

        if (staff_id === '0') {
            console.log('❌ Penghapusan dibatalkan');
            break;
        }

        const [rows] = await conn.execute('SELECT * FROM staff WHERE staff_id = ?', [staff_id]);

        if (rows.length === 0) {
            console.log('❌ Staff tidak ditemukan');
            continue;
        } 
        
        const check = readLine.question('Apa kamu yakin ingin menghapus staff ini? (y/n): ');

        if (check === 'n') {
            console.log('❌ Penghapusan dibatalkan');
            break;
        } else if (check === 'y') {
            await conn.execute('DELETE FROM staff WHERE staff_id = ?', [staff_id]);
            console.log('✅ Staff berhasil dihapus');
            break;
        } else {
            console.log('❗ Pilihan tidak tersedia');
            continue;
        }
    }
}

module.exports = { addStaff, listStaff, printQuestionStaff, deleteStaff };