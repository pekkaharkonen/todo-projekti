const request = require("supertest");
const app = require("../app");

describe("REST API GET tests", () => {
  test("GET /api/tasks should return something", () => {
    return request(app)
      .get("/api/tasks")
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.body.length > 0);
      });
  });
  test("GET /api/tasks/:id with invalid id should return error message and status 404", () => {
    return request(app)
      .get("/api/tasks/45")
      .then(res => {
        expect(res.statusCode).toBe(404);
        expect(res.body.Viesti).toBe("Taskia ei löydy!");
      });
  });
});

describe("PUT tests", () => {
  test("PUT with invalid values should not be OK", () => {
    let ID = "6f313b62-d038-4bd6-a840-3a03f849912b"
    return request(app)
      .put(`/api/tasks/${ID}`)
      .send({
        task: ""
      })
      .then(res => {
        expect(res.statusCode).toBe(400)
      })
  })
  test("PUT with correct values should return correct status and message", () => {
    let ID = "6f313b62-d038-4bd6-a840-3a03f849912b"
    return request(app)
      .put(`/api/tasks/${ID}`)
      .send({
        task: "Walk the Dog"
      })
      .then(res => {
        expect(res.statusCode).toBe(200)
        expect(res.body.Viesti).toBe("Muutettu")
      })
  })
})
describe("REST API POST tests", () => {
  test("POST /api/tasks with invalid data", () => {
    return request(app)
      .post("/api/tasks")
      .send({message: "Kukkuu"})
      .then(res => {
        expect(res.statusCode).toBe(500);
      });
  });
});

describe("GET, PUT, POST and DELETE work together", () => {
  let testTask = {
    task: "Take a break"
  };
  let ID;
  let taskLength;
  test("GET all data should work", () => {
    return request(app)
      .get("/api/tasks")
      .then(res => {
        taskLength = res.body.length;
        expect(res.statusCode).toBe(200);
      });
  });
  test("POST a new task should work", () => {
    return request(app)
      .post("/api/tasks")
      .send(testTask)
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.body.id.length).not.toBe(0);
        expect(res.body.task).toBe("Take a break");
        ID = res.body.id;
      });
  });
  test("Length of the data should be changed (GET ALL)", () => {
    return request(app)
      .get("/api/tasks")
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(taskLength + 1);
      });
  });
  test("Changing task name with PUT should work", () => {
    return request(app)
      .put(`/api/tasks/${ID}`)
      .send({task: "Do not take a break"})
      .then(res => {
        expect(res.statusCode).toBe(200)
        expect(res.body.Viesti).toBe("Muutettu")
      })
  })

  test("Test that the PUT request changed the content", () => {
    return request(app)
      .get(`/api/tasks/${ID}`)
      .then(res => {
        expect(res.statusCode).toBe(200)
        expect(res.body.task).toBe("Do not take a break")
      })
  })
  test("DELETE the posted content should work", () => {
    return request(app)
      .delete(`/api/tasks/${ID}`)
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.body.Viesti).toBe("Taski poistettu!");
      });
  });
  test("Testing that DELETE actually deleted the task correctly", () => {
    return request(app)
      .get("/api/tasks")
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(taskLength);
      });
  });
});