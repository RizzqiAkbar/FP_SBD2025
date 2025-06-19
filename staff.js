const { connectMySQL } = require('./mysql');
const { logActivity } = require('./activity');

async function addStaff (staff_name, staff_phone) {
    const conn = await connectMySQL();
    const [result] = await conn.execute('INSERT INTO STAFF (staff_name, staff_phone) VALUES (?, ?)', 
        [staff_name, staff_phone]);
    await logActivity('add_staff', {
    satff_id: result.insertId,
    staff_name,
    phone
  });
  console.log("Staff berhasil ditambahkan!");
}

async function listStaff() {
    const conn = await connectMySQL();
    const [rows] = await conn.execute('SELECT * FROM staff');
    rows.forEach(staff => {console.log(`${staff.staff_id}. ${staff.staff_name} | ${staff.staff_phone}`)});
}

module.exports = { addStaff, listStaff };