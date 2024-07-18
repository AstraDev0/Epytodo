# EpyTodo

## Project Description

EpyTodo is a project aimed at building a comprehensive Todo List application. The primary focus of this project is on the backend development, leveraging Node.js and MySQL. The project allows users to manage their tasks efficiently by offering a robust API to handle CRUD operations on tasks and user management.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed on your system.
- **MySQL**: A running MySQL server or use Docker Compose as described below.

## Project Structure

```
EpyTodo/
├── .env
├── package.json
├── src/
│   ├── config/
│   │   └── db.js
│   ├── index.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── notFound.js
│   ├── routes/
│   │   ├── auth/
│   │   │   └── auth.js
│   │   ├── todos/
│   │   │   ├── todos.js
│   │   │   └── todos.query.js
│   │   └── user/
│   │       ├── user.js
│   │       └── user.query.js
└── epytodo.sql
```

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd EpyTodo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure the environment variables**:
   Create a `.env` file at the root of the project and add the following variables:
   ```env
   MYSQL_DATABASE=epytodo
   MYSQL_HOST=localhost
   MYSQL_USER=root
   MYSQL_ROOT_PASSWORD=yourpassword
   PORT=3000
   SECRET=your_jwt_secret
   ```

4. **Set up the MySQL database**:
   ```bash
   mysql -u root -p < epytodo.sql
   ```

Alternatively, you can use Docker Compose to set up the MySQL database:

Create a `docker-compose.yml` file with the following content:

```yaml
version: '3.5'

services:
  db:
    image: mysql
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=1234
      - MYSQL_USER=root
      - MYSQL_PASSWORD=1234
      - MYSQL_DATABASE=epytodo
    ports:
      - "3306:3306"
    volumes:
      - $HOME/Desktop/MySQL-Snippets/epytodo.sql:/docker-entrypoint-initdb.d/epytodo.sql
```

Run the Docker Compose command to start the MySQL service:

```bash
docker-compose up -d
```

## Usage

1. **Start the server**:
   ```bash
   npm start
   ```

2. **API Endpoints**:

   - **User Authentication**:
     - `POST /register`: Register a new user.
     - `POST /login`: Login a user.

   - **User Management**:
     - `GET /user`: View all user information.
     - `GET /user/todos`: View all tasks for the logged-in user.
     - `GET /users/:id`: View specific user information.
     - `PUT /users/:id`: Update user information.
     - `DELETE /users/:id`: Delete a user.

   - **Todo Management**:
     - `GET /todos`: View all todos.
     - `GET /todos/:id`: View specific todo.
     - `POST /todos`: Create a new todo.
     - `PUT /todos/:id`: Update a todo.
     - `DELETE /todos/:id`: Delete a todo.

## Middleware

- **Authentication**:
  The protected routes require a valid JWT token in the Authorization header.

- **Error Handling**:
  Custom error handler middleware for managing common errors.

## Environment Variables

- `MYSQL_DATABASE`: Name of the MySQL database.
- `MYSQL_HOST`: Host of the MySQL server.
- `MYSQL_USER`: MySQL user.
- `MYSQL_ROOT_PASSWORD`: MySQL root user password.
- `PORT`: Port on which the Express server runs.
- `SECRET`: Secret for signing JWTs.

## Dependencies

- **Express**: Web framework for Node.js.
- **mysql2**: MySQL client for Node.js.
- **dotenv**: Loads environment variables from a .env file.
- **jsonwebtoken**: JSON Web Token implementation.
- **bcryptjs**: Library to hash passwords.
- **body-parser**: Middleware to parse incoming request bodies (optional).

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
