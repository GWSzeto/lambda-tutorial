const { Pool } = require('pg');

const pool = new Pool({
	host: process.env.HOST,
	database: process.env.DATABASE,
	user: process.env.USERNAME,
	password: process.env.PASSWORD,
	port: process.env.PORT,
});

module.exports = {
  query: async (text, params) => {
    const start = Date.now();
    const data = pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: data.rowCount });

    return data;
  },
};
