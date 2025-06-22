# Chat App Backend

This project is a NestJS-based backend for a real-time chat application. It provides user authentication, profile management, and a complete messaging system using MongoDB and RabbitMQ.

## Features

-   **User Authentication**: JWT-based authentication with registration and login.
-   **Profile Management**: Full CRUD operations for user profiles.
-   **Real-time Messaging**: Asynchronous message handling with RabbitMQ.
-   **Simulated Notifications**: Logs notifications upon message receipt in the consumer.
-   **Database**: MongoDB with Mongoose for data modeling.
-   **Containerized**: Docker and Docker Compose for easy setup.

## Prerequisites

-   Node.js (v16 or higher)
-   npm
-   Docker
-   Docker Compose

## Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/wandewana/you-app-chat-backend.git
    cd you-app-chat-backend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start services**:
    This command starts the MongoDB and RabbitMQ services in Docker containers.
    ```bash
    docker-compose up -d
    ```

4.  **Run the application**:
    The main application server will run on `http://localhost:3000`.
    ```bash
    npm run start:dev
    ```

5.  **Run the RabbitMQ Consumer**:
    This command starts a separate microservice to listen for and process messages from the queue.
    ```bash
    npx ts-node src/main-rmq.ts
    ```
    The consumer will log incoming messages and simulated real-time notifications to the console (e.g., `🔔 New message from...`).

## API Documentation

All endpoints are prefixed with `/api`.

### Authentication

#### Register a New User

-   **Endpoint**: `POST /api/register`
-   **Request Body**:
    ```json
    {
      "email": "test@example.com",
      "password": "password123"
    }
    ```
-   **Success Response** (`201 Created`):
    ```json
    {
      "message": "User created successfully"
    }
    ```

#### Login

-   **Endpoint**: `POST /api/login`
-   **Request Body**:
    ```json
    {
      "email": "test@example.com",
      "password": "password123"
    }
    ```
-   **Success Response** (`200 OK`):
    ```json
    {
      "access_token": "your-jwt-token"
    }
    ```

### Profile Management

This section covers endpoints for managing user profiles. All endpoints require a valid JWT token in the `Authorization` header.

#### Create a Profile

-   **Endpoint**: `POST /api/createProfile`
-   **Auth**: JWT Required
-   **Request Body**:
    ```json
    {
      "displayName": "John Doe",
      "gender": "Male",
      "birthday": "1990-01-01",
      "horoscope": "Capricorn",
      "zodiac": "Rat",
      "height": 180,
      "weight": 75
    }
    ```
-   **Success Response** (`201 Created`):
    ```json
    {
      "message": "Profile created successfully"
    }
    ```

#### Get a Profile

-   **Endpoint**: `GET /api/getProfile`
-   **Auth**: JWT Required
-   **Success Response** (`200 OK`):
    ```json
    {
      "displayName": "John Doe",
      "gender": "Male",
      // ... other profile fields
    }
    ```

#### Update a Profile

-   **Endpoint**: `PUT /api/updateProfile`
-   **Auth**: JWT Required
-   **Request Body**: Same as create profile, with fields to update.
-   **Success Response** (`200 OK`):
    ```json
    {
      "message": "Profile updated successfully"
    }
    ```

#### Delete a Profile

-   **Endpoint**: `DELETE /api/deleteProfile`
-   **Auth**: JWT Required
-   **Success Response** (`200 OK`):
    ```json
    {
      "message": "Profile deleted successfully"
    }
    ```

### Chat Messaging

This section details how to send and retrieve chat messages between users.

#### Send a Message

-   **Endpoint**: `POST /api/sendMessage`
-   **Auth**: JWT Required
-   **Request Body**:
    ```json
    {
      "to": "recipient-user-id",
      "message": "Hello, how are you?"
    }
    ```

-   **Success Response** (`201 Created`):

    ```json
    {
      "message": "Message sent successfully"
    }
    ```

-   **How it Works**: When a message is sent, it is published to a RabbitMQ queue. The consumer service listens for new messages, persists them to the database, and logs a simulated real-time notification to the console.

#### Get Messages Between Users

-   **Endpoint**: `GET /api/getMessages/:userId`
-   **Auth**: JWT Required
-   **URL Parameter**:
    -   `userId`: The ID of the user you are chatting with.
-   **Success Response** (`200 OK`):

    ```json
    [
      {
        "from": "sender-id",
        "to": "recipient-id",
        "message": "Hello!",
        "timestamp": "2023-10-27T10:00:00.000Z"
      },
      // ... other messages
    ]
    ```

## Testing

The project includes a full suite of unit tests to ensure code quality and correctness. Tests are written with Jest and follow NestJS testing best practices.

### Running Tests

To run the entire test suite, use the following command:

```bash
npm run test
```

### Mocking Strategy

Unit tests are designed to run in isolation without connecting to a live database or message broker. All external dependencies are mocked using Jest:

-   **Mongoose Models**: Mongoose models are mocked using the `@nestjs/mongoose` `getModelToken` utility. This allows tests to simulate database operations without a live connection.
-   **Services**: Services like `UsersService`, `JwtService`, and `HashService` are mocked in the test files for the controllers that depend on them. This ensures that controller tests focus only on the controller's logic.
-   **RabbitMQ**: The RabbitMQ client is mocked to prevent tests from attempting to connect to a live message broker.
