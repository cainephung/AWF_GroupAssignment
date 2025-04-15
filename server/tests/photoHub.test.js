const request = require("supertest");
const app = require("../index");

jest.mock("../scripts/database", () => ({
  createUser: jest.fn(async (id, name) => ({ message: `User ${name} with ID ${id} created.` })),
  selectUserById: jest.fn(async (id) => ({ id, name: "Mock User" })),
  deleteUserById: jest.fn(async (id) => ({ message: `User ${id} deleted.` })),
  createImage: jest.fn(async (userId, bytes) => ({ imageId: "img123", uploaded: true })),
  selectImageById: jest.fn(async (id) => ({ id, bytes: "abc123" })),
  deleteImageById: jest.fn(async (id) => ({ message: `Image ${id} deleted.` })),
  createAlbum: jest.fn(async (userId, name) => ({ albumId: "alb456", name })),
  selectImageIdByAlbumId: jest.fn(async (albumId) => ({ albumId, imageIds: ["img1", "img2"] }))
}));

describe("User API", () => {
  it("should get a user by ID", async () => {
    const res = await request(app).get("/get_user/123");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: "123", name: "Mock User" });
  });

  it("should delete a user by ID", async () => {
    const res = await request(app).get("/delete_user/123");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "User 123 deleted." });
  });

  it("handle user does not exist", async () => {
    const res = await request(app).get("/get_user/1as999");
    expect(res.body).toEqual({});
    expect(res.statusCode).toBe(200); // or 404 if you want to update your code
  });

  it("handle missing or bad ID", async () => {
    const res = await request(app).get("/get_user/");
    expect(res.statusCode).toBe(404); // Express will throw this
  });
});




describe("Image API", () => {
  it("should create an image for a user", async () => {
    const res = await request(app).get("/create_image/456/abc123");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ imageId: "img123", uploaded: true });
  });

  it("should get an image by ID", async () => {
    const res = await request(app).get("/get_image/img123");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: "img123", bytes: "abc123" });
  });

  it("should get multiple images by comma-separated IDs", async () => {
    const res = await request(app).get("/get_many_image/img1,img2");
    expect(res.statusCode).toBe(200);
    // Note: you're using `selectImageById()` which is probably meant for 1 ID — maybe update your route to use a batch version
    expect(res.body).toEqual({ id: "img1,img2", bytes: "abc123" }); // based on mock
  });

  it("should delete an image by ID", async () => {
    const res = await request(app).get("/delete_image/img123");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Image img123 deleted." });
  });
});

describe("Album API", () => {
  it("should create an album for a user", async () => {
    const res = await request(app).get("/create_album/456/MyAlbum");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ albumId: "alb456", name: "MyAlbum" });
  });

  it("should get image IDs in an album", async () => {
    const res = await request(app).get("/get_album_imageIds/alb456");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ albumId: "alb456", imageIds: ["img1", "img2"] });
  });
});