const { connect, disconnect, clearDatabase } = require("../config/testdb");
const request = require("supertest");
const app = require("../app");
const Task = require("../models/Task");

let token;

beforeAll(async () => {
  await connect();

  // Register a user and get a token
  const res = await request(app).post("/api/register").send({
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
  });

  token = res.body.token;
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await disconnect();
});

describe("Authentication", () => {
  test("POST /register - Successful registration", async () => {
    const response = await request(app).post("/api/register").send({
      name: "Jane Doe",
      email: "jane@example.com",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe(201);
    expect(response.body.user).toHaveProperty("_id");
    expect(response.body.user.name).toBe("Jane Doe");
    expect(response.body.user.email).toBe("jane@example.com");
    expect(response.body.token).toBeDefined();
  });

  test("POST /register - User already exists", async () => {
    await request(app).post("/api/register").send({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });

    const response = await request(app).post("/api/register").send({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe(400);
    expect(response.body.msg).toBe("User already exists");
  });

  test("POST /login - Successful login", async () => {
    await request(app).post("/api/register").send({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });

    const response = await request(app).post("/api/login").send({
      email: "john@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.user.email).toBe("john@example.com");
  });

  test("POST /login - User does not exist", async () => {
    const response = await request(app).post("/api/login").send({
      email: "nonexistent@example.com",
      password: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("User does not exist");
  });

  test("POST /login - Invalid credentials", async () => {
    await request(app).post("/api/register").send({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });

    const response = await request(app).post("/api/login").send({
      email: "john@example.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Invalid credentials");
  });
});

describe("Tasks API", () => {
  test("GET /api/tasks - Get tasks with pagination", async () => {
    await Task.insertMany([
      { title: "Task 1", description: "Description 1" },
      { title: "Task 2", description: "Description 2" },
      { title: "Task 3", description: "Description 3" },
    ]);

    const response = await request(app)
      .get("/api/tasks?page=1&limit=2")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.tasks.length).toBe(2);
    expect(response.body.totalTasks).toBe(3);
  });

  test("POST /api/tasks - Create a new task", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "New Task",
        description: "New Task Description",
      });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe(201);
    expect(response.body.task.title).toBe("New Task");
    expect(response.body.task.description).toBe("New Task Description");
  });

  test("PUT /api/tasks/:id - Update a task", async () => {
    const task = await Task.create({ title: "Task", description: "Description" });

    const response = await request(app)
      .put(`/api/tasks/${task._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated Task",
        description: "Updated Description",
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.task.title).toBe("Updated Task");
    expect(response.body.task.description).toBe("Updated Description");
  });

  test("PATCH /api/tasks/:id - Partially update a task", async () => {
    const task = await Task.create({ title: "Task", description: "Description" });

    const response = await request(app)
      .patch(`/api/tasks/${task._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Partially Updated Task",
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.task.title).toBe("Partially Updated Task");
    expect(response.body.task.description).toBe("Description");
  });

  test("GET /api/tasks/:id - Get a task by ID", async () => {
    const task = await Task.create({ title: "Task", description: "Description" });

    const response = await request(app)
      .get(`/api/tasks/${task._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.task.title).toBe("Task");
    expect(response.body.task.description).toBe("Description");
  });

  test("DELETE /api/tasks/:id - Delete a task", async () => {
    const task = await Task.create({ title: "Task", description: "Description" });

    const response = await request(app)
      .delete(`/api/tasks/${task._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(200);

    const taskExists = await Task.findById(task._id);
    expect(taskExists).toBeNull();
  });
});
