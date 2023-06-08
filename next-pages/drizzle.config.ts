import * as dotenv from 'dotenv';
dotenv.config();
import type { Config } from 'drizzle-kit';

console.log('>>', process.env.DATABASE_URL);
export default {
    schema: './src/schema/*',
    out: './drizzle',
    connectionString: process.env.DATABASE_URL,
} satisfies Config;
