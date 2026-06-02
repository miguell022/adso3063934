const express = require('express');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const cors    = require('cors');
const db      = require('./database');
const auth    = require('./authMiddleware');

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = 'your_secret';

// AUTH ENDPOINTS:
// POST: /register
app.post('/register', async (req, res) => {
    const {username, password, image} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(`INSERT INTO users (username, password, image)
            VALUES(?, ?, ?)`, [username, hashedPassword, image], (err) => {
                if(err) return res.status(400).json({error: 'User already exists!'});
                res.json({message: 'User Registered!'});
            }
    );
});

// POST: /login
app.post('/login', (req, res) => {
    const {username, password} = req.body;

    db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
        if(err) return res.status(500).json({error: 'Database error!'});
        if(!user) return res.status(400).json({error: 'Invalid username or password!'});

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) return res.status(400).json({error: 'Invalid username or password!'});

        const token = jwt.sign({id: user.id, username: user.username}, SECRET_KEY, {expiresIn: '1h'});
        res.json({token});
    });
});

// POST: /logout
app.post('/logout', auth, (req, res) => {
    db.run(`INSERT INTO blacklisted_tokens (token, expires_at)
            VALUES (?, ?)`, [req.token, req.user.exp], (err) => {
        if(err) return res.status(400).json({error: 'Session already closed!'});
        res.json({message: 'Logged out successfully!'});
    });
});

// GTA GAMES

// GET: /gta-games
app.get('/gta-games', auth, (req, res) => {
    db.all(`SELECT gta_games.id,
                   gta_games.title,
                   gta_games.release_year,
                   gta_games.main_city,
                   gta_games.protagonist,
                   gta_games.image,
                   gta_games.console_generation_id,
                   console_generations.name AS console_generation
            FROM gta_games
            LEFT JOIN console_generations
            ON gta_games.console_generation_id = console_generations.id`, [], (err, rows) => {
        if(err) return res.status(500).json({error: 'Database error!'});
        res.json(rows);
    });
});

// GET: /gta-games/:id
app.get('/gta-games/:id', auth, (req, res) => {
    db.get(`SELECT gta_games.id,
                   gta_games.title,
                   gta_games.release_year,
                   gta_games.main_city,
                   gta_games.protagonist,
                   gta_games.image,
                   gta_games.console_generation_id,
                   console_generations.name AS console_generation
            FROM gta_games
            LEFT JOIN console_generations
            ON gta_games.console_generation_id = console_generations.id
            WHERE gta_games.id = ?`, [req.params.id], (err, game) => {
        if(err) return res.status(500).json({error: 'Database error!'});
        if(!game) return res.status(404).json({error: 'GTA game not found!'});
        res.json(game);
    });
});

// POST: /gta-games
app.post('/gta-games', auth, (req, res) => {
    const {title, release_year, main_city, protagonist, image, console_generation_id} = req.body;

    db.run(`INSERT INTO gta_games (title, release_year, main_city, protagonist, image, console_generation_id)
            VALUES (?, ?, ?, ?, ?, ?)`, [title, release_year, main_city, protagonist, image, console_generation_id], function(err) {
        if(err) return res.status(400).json({error: 'GTA game already exists or invalid generation!'});
        res.json({id: this.lastID, title, release_year, main_city, protagonist, image, console_generation_id});
    });
});

// PUT: /gta-games/:id
app.put('/gta-games/:id', auth, (req, res) => {
    const {title, release_year, main_city, protagonist, image, console_generation_id} = req.body;

    db.run(`UPDATE gta_games
            SET title = ?, release_year = ?, main_city = ?, protagonist = ?, image = ?, console_generation_id = ?
            WHERE id = ?`, [title, release_year, main_city, protagonist, image, console_generation_id, req.params.id], function(err) {
        if(err) return res.status(400).json({error: 'Could not update GTA game!'});
        if(this.changes === 0) return res.status(404).json({error: 'GTA game not found!'});
        res.json({id: Number(req.params.id), title, release_year, main_city, protagonist, image, console_generation_id});
    });
});

// DELETE: /gta-games/:id
app.delete('/gta-games/:id', auth, (req, res) => {
    db.run(`DELETE FROM gta_games WHERE id = ?`, [req.params.id], function(err) {
        if(err) return res.status(500).json({error: 'Database error!'});
        if(this.changes === 0) return res.status(404).json({error: 'GTA game not found!'});
        res.json({message: 'GTA game deleted!'});
    });
});

// CHARACTERS

// GET: /characters
app.get('/characters', auth, (req, res) => {
    db.all(`SELECT characters.id,
                   characters.name,
                   characters.description,
                   characters.image,
                   characters.gta_game_id,
                   gta_games.title AS gta_game
            FROM characters
            LEFT JOIN gta_games
            ON characters.gta_game_id = gta_games.id`, [], (err, rows) => {
        if(err) return res.status(500).json({error: 'Database error!'});
        res.json(rows);
    });
});

// GET: /characters/:id
app.get('/characters/:id', auth, (req, res) => {
    db.get(`SELECT characters.id,
                   characters.name,
                   characters.description,
                   characters.image,
                   characters.gta_game_id,
                   gta_games.title AS gta_game
            FROM characters
            LEFT JOIN gta_games
            ON characters.gta_game_id = gta_games.id
            WHERE characters.id = ?`, [req.params.id], (err, character) => {
        if(err) return res.status(500).json({error: 'Database error!'});
        if(!character) return res.status(404).json({error: 'Character not found!'});
        res.json(character);
    });
});

// POST: /characters
app.post('/characters', auth, (req, res) => {
    const {name, description, image, gta_game_id} = req.body;

    db.run(`INSERT INTO characters (name, description, image, gta_game_id)
            VALUES (?, ?, ?, ?)`, [name, description, image, gta_game_id], function(err) {
        if(err) return res.status(400).json({error: 'Could not create character!'});
        res.json({id: this.lastID, name, description, image, gta_game_id});
    });
});

// PUT: /characters/:id
app.put('/characters/:id', auth, (req, res) => {
    const {name, description, image, gta_game_id} = req.body;

    db.run(`UPDATE characters
            SET name = ?, description = ?, image = ?, gta_game_id = ?
            WHERE id = ?`, [name, description, image, gta_game_id, req.params.id], function(err) {
        if(err) return res.status(400).json({error: 'Could not update character!'});
        if(this.changes === 0) return res.status(404).json({error: 'Character not found!'});
        res.json({id: Number(req.params.id), name, description, image, gta_game_id});
    });
});

// DELETE: /characters/:id
app.delete('/characters/:id', auth, (req, res) => {
    db.run(`DELETE FROM characters WHERE id = ?`, [req.params.id], function(err) {
        if(err) return res.status(500).json({error: 'Database error!'});
        if(this.changes === 0) return res.status(404).json({error: 'Character not found!'});
        res.json({message: 'Character deleted!'});
    });
});

// GET: /gta-games/:id/characters
app.get('/gta-games/:id/characters', auth, (req, res) => {
    db.all(`SELECT * FROM characters WHERE gta_game_id = ?`, [req.params.id], (err, rows) => {
        if(err) return res.status(500).json({error: 'Database error!'});
        res.json(rows);
    });
});
// CONSOLE GENERATIONS

// GET: /console-generations
app.get('/console-generations', auth, (req, res) => {
    db.all(`SELECT * FROM console_generations`, [], (err, rows) => {
        if(err) return res.status(500).json({error: 'Database error!'});
        res.json(rows);
    });
});

// GET: /console-generations/:id
app.get('/console-generations/:id', auth, (req, res) => {
    db.get(`SELECT * FROM console_generations WHERE id = ?`, [req.params.id], (err, generation) => {
        if(err) return res.status(500).json({error: 'Database error!'});
        if(!generation) return res.status(404).json({error: 'Console generation not found!'});
        res.json(generation);
    });
});

// POST: /console-generations
app.post('/console-generations', auth, (req, res) => {
    const {name, years, main_consoles} = req.body;

    db.run(`INSERT INTO console_generations (name, years, main_consoles)
            VALUES (?, ?, ?)`, [name, years, main_consoles], function(err) {
        if(err) return res.status(400).json({error: 'Console generation already exists!'});
        res.json({id: this.lastID, name, years, main_consoles});
    });
});

// PUT: /console-generations/:id
app.put('/console-generations/:id', auth, (req, res) => {
    const {name, years, main_consoles} = req.body;

    db.run(`UPDATE console_generations
            SET name = ?, years = ?, main_consoles = ?
            WHERE id = ?`, [name, years, main_consoles, req.params.id], function(err) {
        if(err) return res.status(400).json({error: 'Could not update console generation!'});
        if(this.changes === 0) return res.status(404).json({error: 'Console generation not found!'});
        res.json({id: Number(req.params.id), name, years, main_consoles});
    });
});

// DELETE: /console-generations/:id
app.delete('/console-generations/:id', auth, (req, res) => {
    db.run(`DELETE FROM console_generations WHERE id = ?`, [req.params.id], function(err) {
        if(err) return res.status(500).json({error: 'Database error!'});
        if(this.changes === 0) return res.status(404).json({error: 'Console generation not found!'});
        res.json({message: 'Console generation deleted!'});
    });
});

// GET: /console-generations/:id/gta-games
app.get('/console-generations/:id/gta-games', auth, (req, res) => {
    db.all(`SELECT * FROM gta_games WHERE console_generation_id = ?`, [req.params.id], (err, rows) => {
        if(err) return res.status(500).json({error: 'Database error!'});
        res.json(rows);
    });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));





