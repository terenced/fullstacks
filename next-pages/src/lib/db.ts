import { InferModel } from 'drizzle-orm';
import { int, text, sqliteTable } from 'drizzle-orm/sqlite-core';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

export const pokemonTable = sqliteTable('pokemon', {
    id: int('id').primaryKey().notNull(),
    name: text('name', { length: 255 }),
    hp: int('hp'),
    attack: int('attack'),
    defense: int('defense'),
    specialAttack: int('special_attack'),
    specialDefense: int('special_defense'),
    speed: int('speed'),
});

export type Pokemon = InferModel<typeof pokemonTable>;

const client = createClient({
    url: process.env.TURSO_URL || '',
    authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client);

export async function getAllPokemon(): Promise<Pokemon[]> {
    return await db.select().from(pokemonTable).all();
}
