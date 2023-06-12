import dotenv from 'dotenv';
dotenv.config();

import fs from 'node:fs';
import mysql from 'mysql2/promise';

async function createTable(connection) {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS pokemon (
      id INT,
      name VARCHAR(255),
      hp INT,
      attack INT,
      defense INT,
      special_attack INT,
      special_defense INT,
      speed INT,
      PRIMARY KEY (id)
    )
  `;

    await connection.query(createTableQuery);
    console.log(`Table pokemon created or already exists!`);
}

async function readPokemonFromJson(file_path) {
    const contents = await fs.promises.readFile(file_path);
    return JSON.parse(contents);
}

async function insertPokemon(connection, pokemon) {
    const query =
        'INSERT INTO pokemon (id, name, hp, attack, defense, special_attack, special_defense, speed) VALUES ?';

    const values = pokemon.map((p) => [
        p.id,
        p.name,
        p.hp,
        p.attack,
        p.defense,
        p.special_attack,
        p.special_defense,
        p.speed,
    ]);
    await connection.query(query, [values]);
}

async function main() {
    const file_path = './pokemon-1500.json';

    try {
        // Read Pokemon from the JSON file
        const pokemon = await readPokemonFromJson(file_path);

        const connection = await mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            ssl: {
                rejectUnauthorized: false,
            },
        });
        console.log('creating table');
        await createTable(connection);

        console.log('inserting pokemon');
        await insertPokemon(connection, pokemon);

        console.log('Done!');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main();
