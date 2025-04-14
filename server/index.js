const express = require("express");
const multer = require("multer");
const settings = require("./settings.json");

const app = express();
const port = 3000;

app.use("/create_image", express.raw({ type: "application/octet-stream" }));
const upload = multer({ storage: multer.memoryStorage() });

const {
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

  testConnection,
} = require("./scripts/database");

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
app.post("/create_image", upload.single("image"), async (req, res) => {
  const { user_id } = req.body;
  const image_bytes = req.file.buffer; // get raw binary

  const result = await createImage(user_id, image_bytes);

  res.json(result);
});

app.get("/get_image/:image_id", async (req, res) => {
  const image_id = req.params.image_id;

  const result = await selectImageById(image_id);

  res.json(result);
});

app.get("/get_many_image/:image_ids", async (req, res) => {
  // This should be multiple image ids comma separated (ex. 1,3,5,7)
  const image_ids = req.params.image_ids;

  const result = await selectImageById(image_ids);

  res.json(result);
});

app.get("/delete_image/:image_id", async (req, res) => {
  const image_id = req.params.image_id;

  const result = await deleteImageById(image_id);

  res.json(result);
});

// Albums API
// Untested
app.get("/create_album/:user_id/:album_name", async (req, res) => {
  const user_id = req.params.identifier;
  const album_name = req.params.album_name;

  const result = await createAlbum(user_id, album_name);

  res.json(result);
});

app.get("/get_album_imageIds/:album_id", async (req, res) => {
  const album_id = req.params.album_id;

  const result = await selectImageIdByAlbumId(album_id);

  res.json(result);
});

app.get("/delete_image/:album_id", async (req, res) => {
  const album_id = req.params.album_id;

  const result = await deleteAlbumById(album_id);

  res.json(result);
});

app.get("/add_image_album/:album_id/:image_id", async (req, res) => {
  const album_id = req.params.album_id;
  const image_id = req.params.image_id;

  const result = await addImageToAlbum(album_id, image_id);

  res.json(result);
});

// Tags API
// Untested
app.get("/create_tag/:user_id/:tag_name", async (req, res) => {
  const user_id = req.params.identifier;
  const tag_name = req.params.tag_name;

  const result = await createTag(user_id, tag_name);

  res.json(result);
});

app.get("/get_tag_imageIds/:tag_id", async (req, res) => {
  const tag_id = req.params.tag_id;

  const result = await selectImageIdByTagId(tag_id);

  res.json(result);
});

app.get("/delete_image/:tag_id", async (req, res) => {
  const tag_id = req.params.tag_id;

  const result = await deleteTagById(tag_id);

  res.json(result);
});

app.get("/add_image_tag/:tag_id/:image_id", async (req, res) => {
  const tag_id = req.params.tag_id;
  const image_id = req.params.image_id;

  const result = await addTagToImage(tag_id, image_id);

  res.json(result);
});

app.listen(port, () => {
  console.log(`Express server running on http://localhost:${port}`);
});
