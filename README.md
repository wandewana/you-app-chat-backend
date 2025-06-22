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
      "zodiac": "Leo",
      "horoscope": "Today is a good day."
    }
    ```
-   **Success Response** (`201 Created`): Returns the created profile object.

#### Get a Profile

-   **Endpoint**: `GET /api/getProfile`
-   **Auth**: JWT Required
-   **Success Response** (`200 OK`): Returns the user's profile object.

#### Update a Profile

-   **Endpoint**: `PUT /api/updateProfile`
-   **Auth**: JWT Required
-   **Request Body**:
    ```json
    {
      "zodiac": "Virgo"
    }
    ```
-   **Success Response** (`200 OK`): Returns the updated profile object.

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

This section covers endpoints for sending and viewing messages. All endpoints require a valid JWT token in the `Authorization` header.

#### Send a Message

Publishes a message to the chat queue for asynchronous processing. The sender is automatically identified from the JWT token.

-   **Endpoint**: `POST /api/sendMessage`
-   **Auth**: JWT Required
-   **Request Body**:

```json
{
  "receiver": "60d21b4667d0d8992e610c86",
  "content": "Hello there!"
}
```

-   **Success Response** (`201 Created`):

```json
{
  "status": "Message sent to queue"
}
```

#### View Chat History

Retrieves the message history between the logged-in user and another specified user, sorted by time.

-   **Endpoint**: `GET /api/viewMessages`
-   **Auth**: JWT Required
-   **Query Parameters**:
    -   `userId` (string, required): The MongoDB ObjectId of the other user in the conversation.
-   **Example Request**:

```
GET /api/viewMessages?userId=60d21b4667d0d8992e610c86
```

-   **Success Response** (`200 OK`):

```json
{
  "messages": [
    {
      "_id": "66767e3b5e4f1a2b3c4d5e6f",
      "sender": "665f1a9e1f2c3d4e5f6a7b8c",
      "receiver": "60d21b4667d0d8992e610c86",
      "content": "Hello there!",
      "createdAt": "2025-06-22T04:58:03.123Z",
      "updatedAt": "2025-06-22T04:58:03.123Z",
      "__v": 0
    }
  ]
}
```
