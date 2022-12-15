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
  describe("GET/api/topics", () => {
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
                slug: expect.any(String),
              })
            );
          });
        });
    });
  });
  describe("GET/api/articles", () => {
    test("status: 200, should return an array of article objects", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then((response) => {
          const articles = response.body.articles;
          expect(articles).toHaveLength(12);
          articles.forEach((article) => {
            expect(article).toEqual(
              expect.objectContaining({
                article_id: expect.any(Number),
                title: expect.any(String),
                topic: expect.any(String),
                author: expect.any(String),
                body: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                comment_count: expect.any(Number),
              })
            );
          });
        });
    });
    test("articles should be sorted by date in descending order", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then((response) => {
          const articles = response.body.articles;
          expect(articles).toBeSortedBy("created_at", { descending: true });
        });
    });
  });
  describe("GET/api/articles/:article_id", () => {
    test("status: 200, should return the requested article object ", () => {
      return request(app)
        .get("/api/articles/3")
        .expect(200)
        .then((response) => {
          const article = response.body.article;
          expect(article.article_id).toBe(3);
          expect(article).toEqual(
            expect.objectContaining({
              article_id: expect.any(Number),
              title: expect.any(String),
              topic: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
            })
          );
        });
    });
    test("status: 404, valid id but article does not exist", () => {
      return request(app)
        .get("/api/articles/25")
        .expect(404)
        .then((response) => {
          const msg = response.body.msg;
          expect(msg).toBe("article not found");
        });
    });
    test("status: 400, invalid id provided", () => {
      return request(app)
        .get("/api/articles/invalidid")
        .expect(400)
        .then((response) => {
          const msg = response.body.msg;
          expect(msg).toBe("bad request");
        });
    });
  });
  describe("GET/api/articles/:article_id/comments", () => {
    test("status: 200, should return an array of comment objects for the given article_id", () => {
      return request(app)
        .get("/api/articles/3/comments")
        .expect(200)
        .then((response) => {
          const comments = response.body.comments;
          expect(comments).toHaveLength(2);
          comments.forEach((comment) => {
            expect(comment).toEqual(
              expect.objectContaining({
                comment_id: expect.any(Number),
                votes: expect.any(Number),
                created_at: expect.any(String),
                author: expect.any(String),
                body: expect.any(String),
              })
            );
          });
        });
    });
    test("status: 200, should return an empty array if article has no comments", () => {
      return request(app)
        .get("/api/articles/4/comments")
        .expect(200)
        .then((response) => {
          const comments = response.body.comments;
          expect(comments).toHaveLength(0);
        });
    });
    test("comments should be served with the most recent comments first", () => {
      return request(app)
        .get("/api/articles/3/comments")
        .expect(200)
        .then((response) => {
          const comments = response.body.comments;
          expect(comments).toBeSortedBy("created_at", { descending: true });
        });
    });
    test("status: 400, invalid article id provided", () => {
      return request(app)
        .get("/api/articles/invalidid/comments")
        .expect(400)
        .then((response) => {
          const msg = response.body.msg;
          expect(msg).toBe("bad request");
        });
    });
    test("status: 404, valid id but article does not exist", () => {
      return request(app)
        .get("/api/articles/25/comments")
        .expect(404)
        .then((response) => {
          const msg = response.body.msg;
          expect(msg).toBe("article not found");
        });
    });
  });
  describe("POST/api/articles/:article_id/comments", () => {
    test("status: 201, responds with the posted comment", () => {
      const requestBody = {
        username: "butter_bridge",
        body: "generic comment",
      };
      return request(app)
        .post("/api/articles/2/comments")
        .send(requestBody)
        .expect(201)
        .then((response) => {
          const comment = response.body.comment;
          expect(comment.article_id).toBe(2);
          expect(comment.body).toBe("generic comment");
          expect(comment.author).toBe("butter_bridge");
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
            })
          );
        });
    });
    test("status: 404, valid id but article does not exist", () => {
      const requestBody = {
        username: "butter_bridge",
        body: "generic comment",
      };
      return request(app)
        .post("/api/articles/25/comments")
        .send(requestBody)
        .expect(404)
        .then((response) => {
          const msg = response.body.msg;
          expect(msg).toBe("not found");
        });
    });
    test("status: 400, invalid article id provided", () => {
      return request(app)
        .get("/api/articles/invalidid/comments")
        .expect(400)
        .then((response) => {
          const msg = response.body.msg;
          expect(msg).toBe("bad request");
        });
    });
    test("status: 404, username not found", () => {
      const requestBody = {
        username: "cool_guy73",
        body: "generic comment",
      };
      return request(app)
        .post("/api/articles/4/comments")
        .send(requestBody)
        .expect(404)
        .then((response) => {
          const msg = response.body.msg;
          expect(msg).toBe("not found");
        });
    });
    test("status: 400, missing required request keys", () => {
      const requestBody = {
        username: "butter_bridge",
      };
      return request(app)
        .post("/api/articles/2/comments")
        .send(requestBody)
        .expect(400)
        .then((response) => {
          const msg = response.body.msg;
          expect(msg).toBe("bad request");
        });
    });
  });
  describe("PATCH /api/articles/:article_id", () => {
    test("status: 200, responds with the updated article", () => {
      const requestBody = { inc_votes: 1 };
      return request(app)
        .patch("/api/articles/2")
        .send(requestBody)
        .expect(200)
        .then((response) => {
          const article = response.body.article;
          expect(article.article_id).toBe(2);
          expect(article.votes).toBe(1);
          expect(article).toEqual(
            expect.objectContaining({
              title: expect.any(String),
              topic: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              created_at: expect.any(String),
            })
          );
        });
    });
    test("status: 404, valid id but article does not exist", () => {
      const requestBody = {
        inc_votes: 1,
      };
      return request(app)
        .patch("/api/articles/25")
        .send(requestBody)
        .expect(404)
        .then((response) => {
          const msg = response.body.msg;
          expect(msg).toBe("article not found");
        });
    });
    test("status: 400, invalid article id provided", () => {
      return request(app)
        .patch("/api/articles/invalidid")
        .expect(400)
        .then((response) => {
          const msg = response.body.msg;
          expect(msg).toBe("bad request");
        });
    });
    test("status: 200, no inc_votes key", () => {
      const requestBody = {};
      return request(app)
        .patch("/api/articles/2")
        .send(requestBody)
        .expect(200)
        .then((response) => {
          const article = response.body.article;
          expect(article.votes).toBe(0);
        });
    });
    test("status: 400, invalid inv_votes value provided", () => {
      const requestBody = {
        inc_votes: 'banana',
      };
      return request(app)
        .patch("/api/articles/2")
        .send(requestBody)
        .expect(400)
        .then((response) => {
          const msg = response.body.msg;
          expect(msg).toBe("bad request");
        });
    });
  });
});
