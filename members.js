const { connectMySQL } = require('./mysql');
const { logActivity } = require('./activity');

async function addMember(full_name, email, phone, address, membership_type) {
    const conn = await connectMySQL();
    const [result] = await conn.execute(
    'INSERT INTO MEMBERS (full_name, email, phone, address, membership_type) VALUES (?, ?, ?, ?, ?)',
    [full_name, email, phone, address, membership_type]);
  await logActivity('add_member', {
    member_id: result.insertId,
    full_name,
    email,
    phone,
    membership_type
  });
  console.log("✅ Member berhasil ditambahkan!");
}

async function listMembers() {
    const conn = await connectMySQL();
    console.log('\n=== LIST MEMBER ===');
    const [rows] = await conn.execute('SELECT * FROM members');
    rows.forEach(member => {
        console.log(`${member.member_id}. ${member.full_name} | ${member.email} | ${member.phone} | ${member.address}`);
    });
    console.log('===================\n');
}

async function shortlistMembers() {
    const conn = await connectMySQL();
    console.log('\n=== LIST MEMBER ===');
    const [rows] = await conn.execute('SELECT * FROM members');
    rows.forEach(member => {
        console.log(`${member.member_id}. ${member.full_name}`);
    });
    console.log('===================\n');
}

async function printQuestionMember() {
    const readLine = require('readline-sync');
    
    const full_name = readLine.question('Nama Lengkap: ');
    const email = readLine.questionEMail('Email: ');
    const phone = readLine.question('No HP: ');
    const address = readLine.question('Alamat: ');
    const type = readLine.question('Tipe (STUDENT/TEACHER/PUBLIC): ', { defaultInput: 'PUBLIC' });
    await addMember(full_name, email, phone, address, type);
}

async function deleteMember() {
    const conn = await connectMySQL();
    const readLine = require('readline-sync');

    while (true) {
        await shortlistMembers();
        const member_id = readLine.questionInt('Masukkan ID Member yang ingin dihapus (0 untuk batal): ');

        if (member_id === 0) {
            console.log('❌ Penghapusan dibatalkan.\n');
            break;
        }
        const [rows] = await conn.execute('SELECT * FROM members WHERE member_id = ?', [member_id]);

        if (rows.length === 0) {
            console.log('❌ Member dengan ID tersebut tidak ditemukan.\n');
            continue;
        }

        const confirm = readLine.question('Apakah Anda yakin ingin menghapus member ini? (y/n): ');
        if (confirm === 'n') {
            console.log('❌ Penghapusan dibatalkan.\n');
            break;
        } else if (confirm === 'y'){
            await conn.execute('DELETE FROM members WHERE member_id = ?', [member_id]);
            console.log('✅ Member berhasil dihapus!\n');
            break;
        } else {
            console.log('❗ Pilihan tidak tersedia');
            continue;
        }
    }
}

module.exports = { addMember, listMembers, printQuestionMember, shortlistMembers, deleteMember };