var path = require('path');
require('dotenv').config({ path: path.join(__dirname, "..", ".env") });
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

const settings = require("../settings.json");
const { neon } = require('@neondatabase/serverless');


async function testConnection() {
  if (settings.DEBUG == false) {
    return { undefined };
  }
  
  const sql = neon(`${CONNECTION_STRING}`);
  const response = await sql`SELECT version();`;
  
  
  console.log("testConnection called");
  console.log(response);

  const { version } = response[0];
  return version;
}

async function selectFromTable(table, where = undefined) {
  const sql = neon(`${CONNECTION_STRING}`);
  const response = await sql`SELECT * FROM ${sql.unsafe(table)} WHERE ${where != undefined ? where : "true"};`;

  if (settings.DEBUG) {
    console.log(`selectFromTable called on table ${table} where ${where}`);
    console.log(response);
  }

  return response;
}

module.exports = {
  selectFromTable,
  testConnection
};
