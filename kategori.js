const { connectMySQL } = require('./mysql');

async function addCategory(category_name) {
    const conn = await connectMySQL();
    const [result] = await conn.execute('INSERT INTO CATEGORIES (category_name) VALUES (?)',
        [category_name]);
    console.log("✅ Kategori berhasil ditambahkan!");
}

async function listCategories() {
    const conn = await connectMySQL();
    console.log('\n=== LIST KATEGORI ===');
    const [rows] = await conn.execute('SELECT * FROM categories');
    rows.forEach(categories => {
        console.log(`${categories.category_id}. ${categories.category_name}`);
    });
    console.log('=====================\n');
}

async function printQuestionCategory() {
    const readLine = require('readline-sync');

    const category_name = readLine.question('Nama Kategori: ');
    await addCategory(category_name);
}

module.exports = { addCategory, listCategories, printQuestionCategory };