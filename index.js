'use strict';
require('dotenv').config()
require("@babel/register")({
	presets: ["@babel/preset-env"]
});
require("regenerator-runtime/runtime");

const generatePdf = require('./pdfs')

// follow this guide for getting the body params properly, the api gateway and all is already set up
// so don't worry about that
// https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html
const handler = async (event) => {
	const {
		patientId,
		appointmentId,
		appointmentType,
	} = event.body
	await generatePdf[appointmentType](patientId, appointmentId)

	// let responseBody = {
	// 	message: rows,
	// 	input: event
	// };
	
	// let response = {
	// 	statusCode: 200,
	// 	headers: {
	// 			"x-custom-header" : "my custom header value"
	// 	},
	// 	body: JSON.stringify(responseBody)
	// };
	// return response;
};

exports.handler = handler;
