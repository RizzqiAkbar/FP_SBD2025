const readLine = require('readline-sync');
const { addMember, listMembers, printQuestionMember, shortlistMembers, deleteMember } = require('./members');
const { addBook, listBooks, printQuestionBooks, shortlistBooks, deleteBook } = require('./buku');
const { borrowBook, listBorrowed, returnBook } = require('./borrow');
const { addCategory, listCategories, printQuestionCategory } = require('./kategori');
const { addStaff, listStaff, printQuestionStaff } = require('./staff');
const { addReview, listReview } = require('./review');
const { printQuestionGenre, listGenres } = require('./genre');

async function main() {
    while (true) {
        console.log('\n===== LIBRARY MANAGEMENT =====\n');
        console.log('1. Menu Member (Tambah dan Menampilkan semua member)'); // tambah, melihat member
        console.log('2. Menu Staff (Tambah dan Menampilkan semua staff)'); // tambah, melihat staff
        console.log('3. Menu Buku - Buku (Menambah buku beserta atributnya)'); // tambah buku, kategori, genre, lihat kategori, lihat genre
        console.log('4. Menu List Buku (Melihat semua buku yang tersedia dan review buku)'); // melihat list buku dan reviewnya
        console.log('5. Menu Peminjaman Buku (Meminjam dan mengembalikan buku)');
        console.log('0. Keluar')

        const choice = readLine.question('Pilih menu: ');

        if (choice === '1') {
            while (true) {
                console.log('\n=== MENU MEMBER ===\n')
                console.log('1. Tambah Member Baru');
                console.log('2. Melihat Semua Member');
                console.log('3. Hapus Member');
                console.log('0. Kembali')

                const choicemember = readLine.question('Pilih menu: ');

                if (choicemember === '1') {
                    await printQuestionMember();
                } else if (choicemember === '2') {
                    await listMembers();
                } else if(choicemember === '3') {
                    await deleteMember();
                } else if (choicemember === '0') {
                    break;
                } else {console.log('\n⚠️ Pilihanmu tidak tersedia\n');}
            }
        } else if (choice === '2') {
            while (true) {
                console.log('\n=== MENU STAFF ===\n')
                console.log('1. Tambah Staff');
                console.log('2. Melihat Semua Staff');
                console.log('3. Hapus Staff');
                console.log('0. Kembali');

                const choicestaff = readLine.question('Pilih menu: ');

                if (choicestaff === '1') {
                    await printQuestionStaff();
                } else if (choicestaff === '2') {
                    await listStaff();
                } else if (choicestaff === '3') {
                    await deleteMember();
                } else if (choicestaff === '0') {
                    break;
                } else {console.log('\n⚠️ Pilihanmu tidak tersedia\n');}
            }
        } else if (choice === '3') {
            while (true) {
                console.log('\n=== MENU BUKU - BUKU ===\n')
                console.log('1. Tambah Buku');
                console.log('2. Hapus Buku');
                console.log('3. Tambah Kategori');
                console.log('4. Tambah Genre');
                console.log('5. Lihat semua kategori');
                console.log('6. Lihat semua genre');
                console.log('0. Kembali');

                const choicebuku = readLine.question('Pilih menu: ');

                if (choicebuku === '1') {
                    await printQuestionBooks();
                } else if (choicebuku === '2') {
                    await deleteBook();
                } else if (choicebuku === '3') {
                    await printQuestionCategory();
                } else if (choicebuku === '4') {
                    await printQuestionGenre();
                } else if (choicebuku === '5') {
                    await listCategories();
                } else if (choicebuku === '6') {
                    await listGenres();
                } else if (choicebuku === '0') {
                    break;
                } else {console.log('\n⚠️ Pilihanmu tidak tersedia\n');}
            }
        } else if (choice === '4') {
            while (true) {
                console.log('\n=== MENU TAMPILKAN BUKU ===\n')
                console.log('1. Menampilkan Semua Buku');
                console.log('2. Tambah Review Sebuah Buku');
                console.log('3. Melihat Semua Review');
                console.log('0. Kembali');

                const choicebook = readLine.question('Pilih menu: ');

                if (choicebook === '1') {
                    await listBooks();
                } else if (choicebook === '2') {
                    await shortlistBooks();
                    const book_id = readLine.questionInt("ID Buku: ");
                    const book_title = readLine.question("Judul Buku: ");
                    await shortlistMembers();
                    const member_id = readLine.questionInt("ID Member: ");
                    const rating = readLine.questionFloat("Rating (0-5): ");
                    const review_text = readLine.question("Masukkan review: ");
                    await addReview(book_id, book_title, member_id, rating, review_text);
                } else if (choicebook === '3') {
                    await listReview();
                } else if (choicebook === '0') {
                    break;
                } else {console.log('\n⚠️ Pilihanmu tidak tersedia\n');}
            }
        } else if (choice === '5') {
            while (true) {
                console.log('\n=== MENU PEMINJAMAN BUKU ===\n');
                console.log('1. Pinjam Buku');
                console.log('2. Kembalikan Buku');
                console.log('0. Kembali');

                const choicebor = readLine.question('Pilih menu: ');

                if (choicebor === '1') {
                    await shortlistMembers();
                    const member_id = readLine.questionInt('ID Member: ');
                    await shortlistBooks();
                    const book_id = readLine.questionInt('ID Buku: ');
                    const due_date = readLine.question('Tanggal Jatuh Tempo (YYYY-MM-DD): ');
                    await listStaff();
                    const staff_id = readLine.questionInt('ID Staff: ');
                    await borrowBook(member_id, book_id, due_date, staff_id);
                } else if (choicebor === '2') {
                    await listBorrowed();
                    await returnBook();
                } else if (choicebor === '0') {
                    break;
                } else {console.log('\n⚠️ Pilihanmu tidak tersedia\n');}
            }
        } else if (choice === '0') {
            console.log('Terima kasih telah menggunakan Library Management')
            console.log('Exiting...\n')
            process.exit();
        } else {console.log('\n⚠️ Pilihanmu tidak tersedia\n');}
    }

}

main();