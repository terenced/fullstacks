import dotenv from 'dotenv';
dotenv.config();

import fs from 'node:fs';
import { createClient } from '@libsql/client';

async function createTable(client) {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS pokemon (
        id INTEGER PRIMARY KEY,
        name TEXT,
        hp INTEGER,
        attack INTEGER,
        defense INTEGER,
        special_attack INTEGER,
        special_defense INTEGER,
        speed INTEGER
    )
  `;

    await client.execute(createTableQuery);
    console.log(`Table pokemon created or already exists!`);
}

async function readPokemonFromJson(file_path) {
    const contents = await fs.promises.readFile(file_path);
    return JSON.parse(contents);
}

async function insertPokemon(client, pokemon) {
    const sql =
        'INSERT INTO pokemon VALUES (:id, :name, :hp, :attack, :defense, :special_attack, :special_defense, :speed)';

    const statements = pokemon.map((p) => ({
        sql,
        args: {
            id: p.id,
            name: p.name,
            hp: p.hp,
            attack: p.attack,
            defense: p.defense,
            special_attack: p.special_attack,
            special_defense: p.special_defense,
            speed: p.speed,
        },
    }));
    await client.batch(statements);
}

async function main() {
    const file_path = './pokemon-500.json';

    try {
        console.log('connecting to turso');

        const client = createClient({
            url: process.env.TURSO_URL,
            authToken: process.env.TURSO_AUTH_TOKEN,
        });

        console.log('creating table');
        await createTable(client);

        const pokemon = await readPokemonFromJson(file_path);

        console.log('inserting pokemon');
        await insertPokemon(client, pokemon);

        console.log('Done!');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main();
