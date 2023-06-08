import { InferModel } from 'drizzle-orm';
import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2';

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
}

export const pokemonTable = mysqlTable('pokemon', {
    id: int('id').primaryKey().notNull(),
    name: varchar('name', { length: 255 }),
    hp: int('hp'),
    attack: int('attack'),
    defense: int('defense'),
    specialAttack: int('special_attack'),
    specialDefense: int('special_defense'),
    speed: int('speed'),
});

export type Pokemon = InferModel<typeof pokemonTable>;

const connection = mysql.createConnection(process.env.DATABASE_URL);

export const db = drizzle(connection);
