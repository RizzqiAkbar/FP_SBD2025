const readLine = require('readline-sync');
const { addMember, listMembers } = require('./members');
const { addBook, listBooks } = require('./buku');
const { borrowBook } = require('./borrow');

async function main() {
    while (true) {
        console.log('\n=== Library Management ===');
        console.log('1. Tambah Member');
        console.log('2. Lihat Semua member');
        console.log('3. Tambah Buku');
        console.log('4. Lihat List Buku');
        console.log('5. Pinjam Buku');
        console.log('0. Keluar');

        const choice = readLine.question('Pilih menu: ');

        if (choice === '1') {
            const name = readLine.question('Masukkan nama: ');
            await addMember(name);
        } else if (choice === '2') {
            await listMembers();
        } else if (choice === '3') {
            const title = readLine.question('Masukkan judul buku: ');
            await addBook();
        } else if (choice === '4') {
            await listBooks();
        } else if (choice === '5') {
            await listMembers;
            const membersId = readLine.questionInt('Masukkan ID Member: ');
            const book = await listBooks();
            const bookId =readLine.questionInt('Masukkan ID Buku yang ingin dipinjam: ');
            await borrowBook(membersId, bookId);
        } else if (choice === '0') {
            console.log('Terima Kasih Telah Menggunakan...\nExiting...');
            process.exit();
        } else {
            console.log('Pilihan tidak valid');
        }
    }
}

main();