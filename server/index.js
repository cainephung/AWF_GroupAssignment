const express = require("express");
const settings = require("./settings.json");

const app = express();
const port = 3000;

const { testConnection, selectFromTable } = require("./scripts/database");

app.get("/", async (req, res) => {
  if (settings.DEBUG == false) {
    res.status(404);
  }
  res.json(await testConnection());
});

// Example request localhost:port/get_images/1234/5678
app.get("/get_images/:uid/:imgid?", async (req, res) => {
  const user_id = req.params.uid;
  const image_id = req.params.imgid; // This is optional and will be undefined if not provided

  // Make call to database and get images then return files to user
  const image_data = await getImagesFromDatabase(user_id, image_id); // array of { data: Buffer, mimeType: 'image/jpeg' }
  if (!image_data) {
    return res.status(404);
  }

  // result = image_data.map((img) => ({
  //   mimeType: img.mimeType,
  //   base64: img.data.toString("base64"),
  // }));

  // res.json({ images: result });

  res.send(
    `I have no image to send you right now but your user id is ${user_id} and you requested ${image_id}`
  );
});

app.listen(port, () => {
  console.log(`Express server running on http://localhost:${port}`);
});
