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
            const full_name = readLine.question('Nama Lengkap: ');
            const email = readLine.questionEMail('Email: ');
            const phone = readLine.question('No HP: ');
            const address = readLine.question('Alamat: ');
            const type = readLine.question('Tipe (STUDENT/TEACHER/PUBLIC): ', { defaultInput: 'PUBLIC' });
            await addMember(full_name, email, phone, address, type);
        } else if (choice === '2') {
            await listMembers();
        } else if (choice === '3') {
            const title = readLine.question('Judul Buku: ');
            const author = readLine.question('Penulis: ');
            const genre = readLine.question('Genre: ');
            const publisher = readLine.question('Penerbit: ');
            const year = readLine.questionInt('Tahun Terbit: ');
            const category_id = readLine.questionInt('ID Kategori: ');
            const copies = readLine.questionInt('Jumlah Salinan: ');
            await addBook(title, author, genre, publisher, year, category_id, copies);
        } else if (choice === '4') {
            await listBooks();
        } else if (choice === '5') {
            await listMembers();
            const member_id = readLine.questionInt('ID Member: ');
            const book_id = readLine.questionInt('ID Buku: ');
            const due_date = readLine.question('Tanggal Jatuh Tempo (YYYY-MM-DD): ');
            const staff_id = readLine.questionInt('ID Staff (opsional): ', { defaultInput: 1 });
            await borrowBook(member_id, book_id, due_date, staff_id);
        } else if (choice === '0') {
            console.log('Terima Kasih Telah Menggunakan...\nExiting...');
            process.exit();
        } else {
            console.log('Pilihan tidak valid');
        }
    }
}

main();