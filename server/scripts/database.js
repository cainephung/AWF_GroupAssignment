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
// Untested
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

async function selectManyImageById(image_ids) {
  const sql = neon(`${CONNECTION_STRING}`);
  const response = await sql`SELECT * FROM images WHERE image_id IN (${image_ids});`;
  
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

// Albums table
// Untested
async function createAlbum(user_id, album_name) {
  const sql = neon(`${CONNECTION_STRING}`);
  const response = await sql`INSERT INTO albums (user_id, album_name) VALUES (${user_id}, ${album_name});`;
  
  if (settings.DEBUG) {
    console.log(response);
  }

  return response;
}

async function selectImageIdByAlbumId(album_id) {
  const sql = neon(`${CONNECTION_STRING}`);
  const response = await sql`SELECT image_id FROM image_album WHERE album_id = ${album_id};`;
  
  if (settings.DEBUG) {
    console.log(response);
  }

  return response;
}

async function deleteAlbumById(album_id) {
  const sql = neon(`${CONNECTION_STRING}`);
  var response = await sql`DELETE FROM albums WHERE album_id = ${album_id};`;
  
  if (settings.DEBUG) {
    console.log(response);
  }

  response = await sql`DELETE FROM image_album WHERE album_id = ${album_id};`;
  
  if (settings.DEBUG) {
    console.log(response);
  }

  return response;
}

async function addImageToAlbum(album_id, image_id) {
  const sql = neon(`${CONNECTION_STRING}`);
  const response = await sql`INSERT INTO image_album (image_id, album_id) VALUES (${image_id}, ${album_id});`;
  
  if (settings.DEBUG) {
    console.log(response);
  }

  return response;
}

// Tags table
// Untested
async function createTag(user_id, tag_name) {
  const sql = neon(`${CONNECTION_STRING}`);
  const response = await sql`INSERT INTO tags (user_id, tag_name) VALUES (${user_id}, ${tag_name});`;
  
  if (settings.DEBUG) {
    console.log(response);
  }

  return response;
}

async function selectImageIdByTagId(tag_id) {
  const sql = neon(`${CONNECTION_STRING}`);
  const response = await sql`SELECT image_id FROM image_tag WHERE tag_id = ${tag_id};`;
  
  if (settings.DEBUG) {
    console.log(response);
  }

  return response;
}

async function deleteTagById(tag_id) {
  const sql = neon(`${CONNECTION_STRING}`);
  var response = await sql`DELETE FROM tags WHERE tag_id = ${tag_id};`;
  
  if (settings.DEBUG) {
    console.log(response);
  }

  response = await sql`DELETE FROM image_tag WHERE tag_id = ${tag_id};`;
  
  if (settings.DEBUG) {
    console.log(response);
  }

  return response;
}

async function addTagToImage(tag_id, image_id) {
  const sql = neon(`${CONNECTION_STRING}`);
  const response = await sql`INSERT INTO image_tag (image_id, tag_id) VALUES (${image_id}, ${tag_id});`;
  
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
  selectManyImageById,
  deleteImageById,

  createAlbum,
  selectImageIdByAlbumId,
  deleteAlbumById,
  addImageToAlbum,

  createTag,
  selectImageIdByTagId,
  deleteTagById,
  addTagToImage,

  testConnection
};
