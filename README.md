# Chat App Backend

This is the backend service for a real-time chat application, built with [NestJS](https://nestjs.com/). It currently features a robust foundation for user authentication and management using MongoDB and JWT.

## Architecture

The application is designed with a modular architecture to ensure separation of concerns and scalability.

-   **`AppModule`**: The root module that orchestrates the application and establishes the database connection.
-   **`UsersModule`**: Manages user-related operations, including registration, data storage, and retrieval. It handles password hashing and interacts directly with the `User` schema.
-   **`AuthModule`**: Handles all authentication logic. It uses Passport.js with a JWT strategy to secure the application. It provides endpoints for user login and token generation.
-   **Database**: MongoDB is used as the primary database, managed via a `docker-compose` setup for easy development. Mongoose is used as the ODM for interacting with the database.

## Libraries & Tools

-   **Framework**: [NestJS](https://nestjs.com/)
-   **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
-   **Authentication**: [Passport.js](http://www.passportjs.org/) (`passport-jwt`) for JWT-based authentication.
-   **Validation**: `class-validator` and `class-transformer` for robust request data validation.
-   **Password Hashing**: `bcrypt` for securely hashing user passwords.
-   **Containerization**: [Docker](https://www.docker.com/) and `docker-compose` to run the MongoDB instance.

## How to Run

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (v18 or later recommended)
-   [npm](https://www.npmjs.com/)
-   [Docker](https://www.docker.com/products/docker-desktop/)

### 1. Clone the repository

```bash
git clone https://github.com/wandewana/you-app-chat-backend.git
cd you-app-chat-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the database

Run the MongoDB instance using Docker Compose. This will start the database in the background.

```bash
docker-compose up -d
```

### 4. Run the application

Start the NestJS application in development mode. The server will automatically reload on file changes.

```bash
npm run start:dev
```

The application will be running at `http://localhost:3000`.

## API Endpoints

### Authentication

-   **`POST /api/register`**: Register a new user.
    -   **Body**:
        ```json
        {
          "email": "user@example.com",
          "password": "your-strong-password"
        }
        ```
-   **`POST /api/login`**: Log in an existing user and receive a JWT access token.
    -   **Body**:
        ```json
        {
          "email": "user@example.com",
          "password": "your-strong-password"
        }
        ```
    -   **Success Response**:
        ```json
        {
          "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
        ```
