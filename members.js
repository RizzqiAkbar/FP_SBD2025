const { connectMySQL } = require('./mysql');
const { logActivity } = require('./activity');

async function addMember(full_name, email, phone, address, membership_type) {
    const conn = await connectMySQL();
    const [result] = await conn.execute(
    'INSERT INTO MEMBERS (full_name, email, phone, address, membership_type) VALUES (?, ?, ?, ?, ?)',
    [full_name, email, phone, address, membership_type]
  );
  await logActivity('add_member', {
    member_id: result.insertId,
    full_name,
    email,
    phone,
    membership_type
  });
  console.log("Member berhasil ditambahkan!");
}

async function listMembers() {
    const conn = await connectMySQL();
    const [rows] = await conn.execute('SELECT * FROM members');
    rows.forEach(members => console.log('${members.id}. ${members.name}'));
}

module.exports = { addMember, listMembers };