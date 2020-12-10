const fs = require('fs')
const AWS = require('aws-sdk')
const pg = require('../pg')
const { fillPdf } = require('../utils/pdfUtil')
const { parseAddress } = require('../utils/stringUtil')

AWS.config.update({ region: 'ca-central-1' });
s3 = new AWS.S3();

const sourcePdf = '../sourcePdfs/herpes.pdf'
const destinationPdf = './herpes_filled.pdf'

module.exports = async (patientId, appointmentId, nonDbData) => {
  const { rows: [{ healthNumber, versionCode, ...dbData }] } = await pg.query(`
    SELECT 
      p.first_name as "firstName", p.last_name as "lastName", p.birth_date as "birthDate", p.email as "email",
      ph.cell as "cellPhone", ph.home as "homePhone",
      h.number as "healthNumber", h.version_code as "versionCode"
    FROM
      patient p
      LEFT JOIN address add on add.patient_id = p.id
      LEFT JOIN phone ph on ph.patient_id = p.id 
      LEFT JOIN health_card h on h.patient_id = p.id
      LEFT JOIN appointment a on a.patient_id = p.id
    WHERE
      p.id = $1
  `, [patientId]);
  const { rows: [addressComponents] } = await pg.query(`
    SELECT
      add.unit as "unit", add.street_number as "streetNumber", add.street_name as "streetName", add.city as "city", add.province as "province", add.postal_code as "postalCode", add.po_box as poBox, add.country as "country"
    FROM
      address add
    WHERE
      add.patient_id = $1
  `, [patientId])

  const pdfData = {
    ...dbData,
    ...nonDbData,
    address: parseAddress(addressComponents),
    healthCard: `${healthNumber}${versionCode}`,
  }

  // await fillPdf(sourcePdf, destinationPdf, pdfData)

  // check this guide for uploading to s3 https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html
  // check this PR on setting up for s3 https://github.com/aws/aws-sdk-js/issues/3004
  // ask kalai on how to get the appropriate s3 bucket to upload to
  // const fileStream = fs.createReadStream(destinationPdf);
  // const uploadParams = {
  //   Bucket: 'Bucket Name',
  //   Body: fileStream,
  //   Key: 'HERPES'
  // };
  // await s3.upload(uploadParams).promise();

  console.log("fields: ", fields)
};
