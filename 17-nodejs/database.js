const sqlite3 = require('sqlite3').verbose();
const db      = new sqlite3.Database('./gta.sqlite');

function createTable(sql, tableName) {
    db.run(sql, (err) => {
        if(err) console.error(`Could not create ${tableName} table:`, err.message);
    });
}

db.serialize(() => {
    // Users Table
    createTable(`CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )`, 'users');

    // Tokens closed with logout
    createTable(`CREATE TABLE IF NOT EXISTS blacklisted_tokens(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        token TEXT UNIQUE,
        expires_at INTEGER
    )`, 'blacklisted_tokens');

    // Console Generations Table
    createTable(`CREATE TABLE IF NOT EXISTS console_generations(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE,
        years TEXT,
        main_consoles TEXT
    )`, 'console_generations');

    // GTA Games Table
    createTable(`CREATE TABLE IF NOT EXISTS gta_games(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT UNIQUE,
        release_year INTEGER,
        main_city TEXT,
        protagonist TEXT,
        console_generation_id INTEGER,
        FOREIGN KEY (console_generation_id) REFERENCES console_generations(id)
    )`, 'gta_games');
});

module.exports = db;
