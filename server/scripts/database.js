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

// Users table

async function createUser(identifier, user_name) {
  const sql = neon(`${CONNECTION_STRING}`);
  const response = await sql`INSERT INTO users (identifier, user_name) VALUES (${identifier}, ${user_name});`;
  
  if (settings.DEBUG) {
    console.log(response);
  }

  return response;
}

async function selectUserById(user_id) {
  const sql = neon(`${CONNECTION_STRING}`);
  const response = await sql`SELECT * FROM users WHERE user_id = ${user_id};`;
  
  if (settings.DEBUG) {
    console.log(response);
  }

  return response;
}

async function deleteUserById(user_id) {
  const sql = neon(`${CONNECTION_STRING}`);
  const response = await sql`DELETE FROM users WHERE user_id = ${user_id};`;
  
  if (settings.DEBUG) {
    console.log(response);
  }

  return response;
}

// Images table

async function createImage(user_id, image_bytes) {
  const sql = neon(`${CONNECTION_STRING}`);
  const response = await sql`INSERT INTO images (user_id, image) VALUES (${user_id}, ${image_bytes});`;
  
  if (settings.DEBUG) {
    console.log(response);
  }

  return response;
}

async function selectImageById(image_id) {
  const sql = neon(`${CONNECTION_STRING}`);
  const response = await sql`SELECT * FROM images WHERE image_id = ${image_id};`;
  
  if (settings.DEBUG) {
    console.log(response);
  }

  return response;
}

async function deleteImageById(image_id) {
  const sql = neon(`${CONNECTION_STRING}`);
  const response = await sql`DELETE FROM images WHERE image_id = ${image_id};`;
  
  if (settings.DEBUG) {
    console.log(response);
  }

  return response;
}

module.exports = {
  createUser,
  selectUserById,
  deleteUserById,
  
  createImage,
  selectImageById,
  deleteImageById,

  testConnection
};
