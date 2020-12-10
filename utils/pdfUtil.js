
'use strict';
require('dotenv').config()
require("@babel/register")({
	presets: ["@babel/preset-env", "@babel/preset-react"]
});

const pdfFiller = require('pdffiller');

const getPdfFields = async (sourcePdf) => {
  const fields = await new Promise((resolve, reject) => pdfFiller.generateFDFTemplate(sourcePdf, null, (error, data)  => {
      if (error) reject(error);
      resolve(data);
    })
  );

  return fields;
}

const fillPdf = (sourcePdf, destinationPdf, data) => new Promise((resolve, reject) => pdfFiller.fillForm(sourcePdf, destinationPdf, data, error => {
  if (error) reject(error);
  resolve('Done');
}));

module.exports = {
  getPdfFields,
  fillPdf,
};
