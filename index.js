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
            const full_name = readline.question('Nama Lengkap: ');
            const email = readline.questionEMail('Email: ');
            const phone = readline.question('No HP: ');
            const address = readline.question('Alamat: ');
            const type = readline.question('Tipe (STUDENT/TEACHER/PUBLIC): ', { defaultInput: 'PUBLIC' });
            await addMember(full_name, email, phone, address, type);
        } else if (choice === '2') {
            await listMembers();
        } else if (choice === '3') {
            const title = readline.question('Judul Buku: ');
            const author = readline.question('Penulis: ');
            const genre = readline.question('Genre: ');
            const publisher = readline.question('Penerbit: ');
            const year = readline.questionInt('Tahun Terbit: ');
            const category_id = readline.questionInt('ID Kategori: ');
            const copies = readline.questionInt('Jumlah Salinan: ');
            await addBook(title, author, genre, publisher, year, category_id, copies);
        } else if (choice === '4') {
            await listBooks();
        } else if (choice === '5') {
            await listMembers();
            const member_id = readline.questionInt('ID Member: ');
            const book_id = readline.questionInt('ID Buku: ');
            const due_date = readline.question('Tanggal Jatuh Tempo (YYYY-MM-DD): ');
            const staff_id = readline.questionInt('ID Staff (opsional): ', { defaultInput: 1 });
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