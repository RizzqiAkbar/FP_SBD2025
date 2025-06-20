const { connectMySQL } = require('./mysql');

async function addGenre(genre_name) {
    const conn = await connectMySQL();
    const [result] = await conn.execute('INSERT INTO genre (genre_name) VALUES (?)',
        [genre_name]);
    console.log("✅ Genre berhasil ditambahkan!");
}

async function listGenres() {
    const conn = await connectMySQL();
    console.log('\n=== LIST GENRE ===');
    const [rows] = await conn.execute('SELECT * FROM genre');
    rows.forEach(genre => {
        console.log(`${genre.genre_id}. ${genre.genre_name}`);
    });
    console.log('===================\n');
}

async function printQuestionGenre() {
    const conn = await connectMySQL();
    const readLine = require('readline-sync');

    const genre_name = await readLine.question('Masukkan nama genre: ');
    await addGenre(genre_name);
}

module.exports = { addGenre, listGenres, printQuestionGenre }