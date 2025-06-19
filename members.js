const { connectMySQL } = require("./mysql");

async function addMember(name) {
    const conn = await connectMySQL();
    await conn.execute('INSERT INTO members (name) VALUES (?)', [name]);
    console.log('Member berhasil ditambahkan!');
}

async function listMembers() {
    const conn = await connectMySQL();
    const [rows] = await conn.execute('SELECT * FROM members');
    rows.forEach(members => console.log('${members.id}. ${members.name}'));
}

module.exports = { addMember, listMembers };