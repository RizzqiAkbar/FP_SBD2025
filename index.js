const readLine = require('readline-sync');
const { addMember, listMembers } = require('./members');
const { addBook, listBooks } = require('./buku');
const { borrowBook } = require('./borrow');
const { addCategory, listCategories } = require('./kategori');
const { addStaff, listStaff } = require('./staff');
const { addReview, listRiview } = require('./review');

async function main() {
    while (true) {
        console.log('\n=== Library Management ===');
        console.log('1. Tambah Member');
        console.log('2. Lihat Semua member');
        console.log('3. Tambah Buku');
        console.log('4. Lihat List Buku');
        console.log('5. Pinjam Buku');
        console.log('6. Tambah Kategori');
        console.log('7. Lihat Kategori');
        console.log('8. Tambah Staff');
        console.log('9. Lihat Staff');
        console.log('10. Tambah Review');
        console.log('11. List Review');
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
        } else if (choice === '6') {
            const category_name = readLine.question('Nama Kategori: ');
            await addCategory(category_name);
        } else if (choice === '7') {
            await listCategories();
        } else if (choice === '8') {
            const staff_name = readLine.question('Nama Lengkap: ');
            const staff_phone = readLine.question('No HP: ');
            await addStaff(staff_name, staff_phone);
        } else if (choice === '9') {
            await listStaff();
        } else if (choice === '10') {
            const book_id = readLine.questionInt("ID Buku: ");
            const book_title = readLine.question("Judul Buku: ");
            const member_id = readLine.questionInt("ID Member: ");
            const rating = readLine.questionFloat("Rating (0-5): ");
            const review_text = readLine.question("Masukkan review: ");
            await addReview(book_id, book_title, member_id, rating, review_text);
        } else if (choice === '11') {
            await listRiview();
        } else if (choice === '0') {
            console.log('Terima Kasih Telah Menggunakan...\nExiting...');
            process.exit();
        } else {
            console.log('Pilihan tidak valid');
        }
    }
}

main();