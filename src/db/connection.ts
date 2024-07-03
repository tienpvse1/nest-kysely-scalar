import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import { Pool, types } from 'pg';
import { Database } from './type';

types.setTypeParser(1700, function (val) {
  return parseFloat(val);
});
const dialect = new PostgresDialect({
  pool: new Pool({
    database: 'test_db',
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'postgres',
    max: 10,
  }),
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<Database>({
  dialect,
  plugins: [new CamelCasePlugin()],
});
