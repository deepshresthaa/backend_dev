# Todo App

A simple RESTful Todo backend built with Node.js and Express.

## Features

- Create, read, update, and delete todo items.
- Retrieve all todos or a specific todo by ID.
- Simple home route for testing.

## API Endpoints

| Method | Route                    | Description                        |
| ------ | ------------------------ | ---------------------------------- |
| GET    | `/api/v1/home`           | Returns a welcome message.         |
| POST   | `/api/v1/createTodo`     | Creates a new todo item.           |
| GET    | `/api/v1/getTodos`       | Retrieves all todo items.          |
| GET    | `/api/v1/getTodo/:id`    | Retrieves a single todo by its ID. |
| PUT    | `/api/v1/updateTodo/:id` | Updates a todo by its ID.          |
| DELETE | `/api/v1/deleteTodo/:id` | Deletes a todo by its ID.          |

## Route Details & Examples

- **GET `/api/v1/home`**  
  Returns a simple message: `"you're in home page."`  
  **Example Response:**

  ```json
  "you're in home page."
  ```

- **POST `/api/v1/createTodo`**  
  Creates a new todo. Expects todo data in the request body (JSON).  
  **Example Request Body:**

  ```json
  {
    "title": "Computer Organization and Architecture",
    "description": "I/O organization"
  }
  ```

  **Example Response:**

  ```json
  {
    "_id": "64b7c2f1e1a2b3c4d5e6f7a8",
    "title": "Computer Organization and Architecture",
    "description": "I/O organization",
    "createdAt": "2025-07-18T12:34:56.789Z",
    "updatedAt": "2025-07-18T12:34:56.789Z",
    "__v": 0
  }
  ```

- **GET `/api/v1/getTodos`**  
  Retrieves a list of all todos.  
  **Example Response:**

  ```json
  [
    {
      "_id": "64b7c2f1e1a2b3c4d5e6f7a8",
      "title": "Computer Organization and Architecture",
      "description": "I/O organization",
      "createdAt": "2025-07-18T12:34:56.789Z",
      "updatedAt": "2025-07-18T12:34:56.789Z",
      "__v": 0
    },
    {
      "_id": "64b7c2f1e1a2b3c4d5e6f7a9",
      "title": "Database Management Systems",
      "description": "Normalization and ER diagrams",
      "createdAt": "2025-07-18T13:00:00.000Z",
      "updatedAt": "2025-07-18T13:00:00.000Z",
      "__v": 0
    }
  ]
  ```

- **GET `/api/v1/getTodo/:id`**  
  Retrieves a single todo item by its unique ID.  
  **Example Response:**

  ```json
  {
    "_id": "64b7c2f1e1a2b3c4d5e6f7a8",
    "title": "Computer Organization and Architecture",
    "description": "I/O organization",
    "createdAt": "2025-07-18T12:34:56.789Z",
    "updatedAt": "2025-07-18T12:34:56.789Z",
    "__v": 0
  }
  ```

- **PUT `/api/v1/updateTodo/:id`**  
  Updates an existing todo by its ID. Expects updated data in the request body (JSON).  
  **Example Request Body:**

  ```json
  {
    "title": "Computer Organization and Architecture",
    "description": "Memory hierarchy and cache"
  }
  ```

  **Example Response:**

  ```json
  {
    "_id": "64b7c2f1e1a2b3c4d5e6f7a8",
    "title": "Computer Organization and Architecture",
    "description": "Memory hierarchy and cache",
    "createdAt": "2025-07-18T12:34:56.789Z",
    "updatedAt": "2025-07-18T13:10:00.000Z",
    "__v": 0
  }
  ```

- **DELETE `/api/v1/deleteTodo/:id`**  
  Deletes a todo item by its ID.  
  **Example Response:**
  ```json
  {
    "message": "Todo deleted successfully"
  }
  ```

> Replace `:id` with the actual ID of the todo.

## Getting Started

1. Clone the repository.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npx nodemon
   ```
