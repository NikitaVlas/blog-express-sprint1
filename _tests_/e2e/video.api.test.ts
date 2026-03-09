import request from "supertest";
import { app } from "../../src";
import { RouterPaths } from "../../src/setup-app";

const testingAllDataPath = `${RouterPaths.testing}/all-data`;

describe("testing API", () => {
  beforeEach(async () => {
    await request(app).delete(testingAllDataPath).expect(204);
  });

  it("should return 204 for DELETE /testing/all-data", async () => {
    await request(app).delete(testingAllDataPath).expect(204);
  });

  it("should clear all videos from database", async () => {
    await request(app)
      .post(RouterPaths.videos)
      .send({
        title: "video 1",
        author: "author 1",
        availableResolutions: ["P144"],
        publicationDate: new Date().toISOString(),
      })
      .expect(201);

    const videosBeforeDelete = await request(app).get(RouterPaths.videos).expect(200);
    expect(videosBeforeDelete.body.length).toBe(1);

    await request(app).delete(testingAllDataPath).expect(204);

    const videosAfterDelete = await request(app).get(RouterPaths.videos).expect(200);
    expect(videosAfterDelete.body).toEqual([]);
  });
});
