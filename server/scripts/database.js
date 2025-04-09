require('dotenv').config();
const { neon } = require('@neondatabase/serverless');
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
// image_id could be a list of multiple id's or undefined in which case we
//  can assume the user wants all images.
//
// This could be taxing so we should definitely consider pagination.
async function getImagesFromDatabase(user_id, image_id = undefined) {
  // No database yet, to be integrated
  return [];
}

async function testConnection() {
  const sql = neon(`${CONNECTION_STRING}`);
  const response = await sql`SELECT version()`;
  const { version } = response[0];
  return version;
}

module.exports = {
  getImagesFromDatabase,
  testConnection
};
