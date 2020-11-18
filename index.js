'use strict';
require('dotenv').config()
require("@babel/register")({
	presets: ["@babel/preset-env", "@babel/preset-react"]
});
const { Pool } = require('pg')

const ReactPDF = require('@react-pdf/renderer');
const { TestPdf } = require('./pdfs/testPdf');

const pool = new Pool({
	host: process.env.HOST,
	database: process.env.DATABASE,
	user: process.env.USERNAME,
	password: process.env.PASSWORD,
	port: process.env.PORT,
})

const handler = async (event) => {
	const { rows } = await pool.query("SELECT * FROM patient WHERE first_name = 'asd'");

	let responseBody = {
		message: rows,
		input: event
	};
	
	let response = {
		statusCode: 200,
		headers: {
				"x-custom-header" : "my custom header value"
		},
		body: JSON.stringify(responseBody)
	};
	return response;
};

exports.handler = handler;

// const handler = async (event) => {
// 	ReactPDF.render(TestPdf, `./test.pdf`);
// }

// exports.handler = handler;