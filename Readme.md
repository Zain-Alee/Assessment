# **Node.js API with Authentication and Task Management**

This project is a RESTful API built with Node.js, Express, and MongoDB. It provides user authentication with JWT and CRUD operations for managing tasks. The project is fully tested using Jest and Supertest.

---

## **Features**

- **User Authentication**:
  - User registration with password hashing.
  - User login with JWT token generation.
  - Authentication middleware to protect routes.

- **Task Management**:
  - Create, read, update, and delete tasks.
  - Pagination support for listing tasks.
  - Validation and error handling.

- **Testing**:
  - Comprehensive unit tests for authentication and task management using Jest and Supertest.

---

## **Technologies Used**

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Token)
- **Testing**: Jest, Supertest

---

## **Installation**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Zain-Alee/Assessment.git
   cd Assessment
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory with the following:
   ```env
   MONGO_URI=mongodb://localhost:27017/your-database-name
   JWT_SECRET=your-secret-key
   PORT=3000
   ```

4. **Run the Server**
   ```bash
   npm start
   ```

   The API will be available at `http://localhost:3000`.

5. **Run Tests**
   ```bash
   npm test
   ```

---

## **API Endpoints**

### **Authentication**
| Method | Endpoint        | Description            | Auth Required |
|--------|-----------------|------------------------|---------------|
| POST   | `/api/register` | Register a new user    | No            |
| POST   | `/api/login`    | Login an existing user | No            |

### **Task Management**
| Method | Endpoint        | Description                   | Auth Required |
|--------|-----------------|-------------------------------|---------------|
| GET    | `/api/tasks`    | Get all tasks (paginated)     | Yes           |
| POST   | `/api/tasks`    | Create a new task             | Yes           |
| GET    | `/api/tasks/:id`| Get a task by ID              | Yes           |
| PUT    | `/api/tasks/:id`| Update a task (overwrite)     | Yes           |
| PATCH  | `/api/tasks/:id`| Update specific fields of a task | Yes       |
| DELETE | `/api/tasks/:id`| Delete a task                 | Yes           |

---

## **Usage Examples**

### **Request and Response Examples**

#### **Register a New User**
**Request**:
```bash
POST /api/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "status": 201,
  "user": {
    "_id": "user-id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt-token"
}
```

#### **Login a User**
**Request**:
```bash
POST /api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "status": 200,
  "user": {
    "_id": "user-id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt-token"
}
```

#### **Get Tasks (Paginated)**
**Request**:
```bash
GET /api/tasks?page=1&limit=2
Authorization: Bearer jwt-token
```

**Response**:
```json
{
  "status": 200,
  "tasks": [
    {
      "_id": "task-id",
      "title": "Task 1",
      "description": "Description 1",
      "completed": false,
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "_id": "task-id",
      "title": "Task 2",
      "description": "Description 2",
      "completed": false,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "totalTasks": 10
}
```

#### **Create a New Task**
**Request**:
```bash
POST /api/tasks
Content-Type: application/json
Authorization: Bearer jwt-token

{
  "title": "New Task",
  "description": "New Task Description"
}
```

**Response**:
```json
{
  "status": 201,
  "task": {
    "_id": "task-id",
    "title": "New Task",
    "description": "New Task Description",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### **Get a Task by ID**
**Request**:
```bash
GET /api/tasks/:id
Authorization: Bearer jwt-token
```

**Response**:
```json
{
  "status": 200,
  "task": {
    "_id": "task-id",
    "title": "Task 1",
    "description": "Description 1",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### **Update a Task**
**Request**:
```bash
PUT /api/tasks/:id
Content-Type: application/json
Authorization: Bearer jwt-token

{
  "title": "Updated Task",
  "description": "Updated Task Description",
  "completed": true
}
```

**Response**:
```json
{
  "status": 200,
  "task": {
    "_id": "task-id",
    "title": "Updated Task",
    "description": "Updated Task Description",
    "completed": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### **Partially Update a Task**
**Request**:
```bash
PATCH /api/tasks/:id
Content-Type: application/json
Authorization: Bearer jwt-token

{
  "title": "Partially Updated Task"
}
```

**Response**:
```json
{
  "status": 200,
  "task": {
    "_id": "task-id",
    "title": "Partially Updated Task",
    "description": "Description 1",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### **Delete a Task**
**Request**:
```bash
DELETE /api/tasks/:id
Authorization: Bearer jwt-token
```

**Response**:
```json
{
  "status": 200
}
```

---

## **Folder Structure**

```
project/
├── config/
│   └── db.js            # MongoDB connection
├── models/
│   ├── User.js          # User schema
│   └── Task.js          # Task schema
├── routes/
│   ├── auth.js          # Authentication routes
│   └── task.js          # Task routes
├── controllers/
│   ├── authController.js # Authentication logic
│   └── taskController.js # Task CRUD logic
├── test/
│   └── app.test.js       # Jest and Supertest tests
├── app.js               # Express application
├── server.js            # Server entry point
└── README.md            # Documentation
```

---

## **Running Tests**

Run the comprehensive tests for authentication and task management:

```bash
npm test
```

