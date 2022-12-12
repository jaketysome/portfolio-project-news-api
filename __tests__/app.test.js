const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const app = require("../app");
const request = require("supertest");
const testData = require("../db/data/test-data/index");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(testData);
});

describe("api", () => {
  test("status: 404, path not found", () => {
    return request(app)
      .get("/api/invalidpath")
      .expect(404)
      .then((response) => {
        const msg = response.body.msg;
        expect(msg).toBe("path not found");
      });
  });
  describe("/api/topics", () => {
    test("status: 200, should return an array of topic objects", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((response) => {
            const topics = response.body.topics;
            expect(topics).toBeInstanceOf(Array);
            expect(topics).toHaveLength(3);
            topics.forEach((topic) => {
                expect(topic).toEqual(
                    expect.objectContaining({
                        description: expect.any(String),
                        slug: expect.any(String)
                    })
                )
            })
        });
    });
  });
});
