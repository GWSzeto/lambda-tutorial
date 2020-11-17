'use strict';
require("@babel/register")({
	presets: ["@babel/preset-env", "@babel/preset-react"]
});

const ReactPDF = require('@react-pdf/renderer');
const { TestPdf } = require('./pdfs/testPdf');

exports.handler = async (event) => {
		const greeting = "Heyooo world"

    let responseBody = {
        message: greeting,
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

// const handler = async (event) => {
// 	ReactPDF.render(TestPdf, `./test.pdf`);
// }

// exports.handler = handler;