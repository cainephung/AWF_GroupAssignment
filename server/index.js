const express = require("express");
const settings = require("./settings.json");

const app = express();
const port = 3000;

const { testConnection, createUser, selectUserById, deleteUserById, createImage, selectImageById, deleteImageById } = require("./scripts/database");

app.get("/", async (req, res) => {
  if (settings.DEBUG == false) {
    res.status(404);
  }
  res.json(await testConnection());
});

// Users API

app.get("/create_user/:identifier/:user_name", async (req, res) => {
  const identifier = req.params.identifier;
  const user_name = req.params.user_name;

  const result = await createUser(identifier, user_name);
  
  res.json(result);
});

app.get("/get_user/:user_id", async (req, res) => {
  const user_id = req.params.user_id;

  const result = await selectUserById(user_id);
  
  res.json(result);
});

app.get("/delete_user/:user_id", async (req, res) => {
  const user_id = req.params.user_id;

  const result = await deleteUserById(user_id);
  
  res.json(result);
});

// Images API
// Untested
app.get("/create_image/:user_id/:image_bytes", async (req, res) => {
  const user_id = req.params.identifier;
  const image_bytes = req.params.image_bytes;

  const result = await createImage(user_id, image_bytes);
  
  res.json(result);
});

app.get("/get_image/:image_id", async (req, res) => {
  const image_id = req.params.image_id;

  const result = await selectImageById(image_id);
  
  res.json(result);
});

app.get("/delete_image/:image_id", async (req, res) => {
  const image_id = req.params.image_id;

  const result = await deleteImageById(image_id);
  
  res.json(result);
});


app.listen(port, () => {
  console.log(`Express server running on http://localhost:${port}`);
});
