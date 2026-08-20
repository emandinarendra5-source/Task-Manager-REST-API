# Task Manager REST API

A backend-focused Task Manager application built with **Node.js, Express.js, MongoDB, and Mongoose**. The project exposes a RESTful API for creating, reading, updating, and deleting tasks, with persistent data storage and basic request validation.

## Overview

This project demonstrates the core concepts involved in building a REST API:

- RESTful API design
- CRUD operations
- Express.js routing
- Controller-based backend structure
- MongoDB database integration
- Mongoose schema and model usage
- Request validation
- HTTP status codes and JSON responses
- Persistent data storage
- Basic error handling

## Features

### Task Management

- Create a task
- Retrieve all tasks
- Retrieve a task by ID
- Update task details
- Delete a task
- Track task completion status

### Validation & Error Handling

- Validates that task titles are non-empty strings
- Validates the `completed` field as a boolean during updates
- Returns appropriate responses for missing tasks
- Handles server/database errors with JSON error responses

### Database Persistence

Tasks are stored in **MongoDB** through **Mongoose**, so data remains available after the server restarts.

Each task contains:

- `title`
- `completed`
- `createdAt`
- `updatedAt`

## Tech Stack

- **Node.js** — JavaScript runtime
- **Express.js** — REST API and routing
- **MongoDB** — NoSQL database
- **Mongoose** — MongoDB object modeling
- **Nodemon** — Development-time server restart utility

## API Endpoints

Base URL:

```text
http://localhost:5000
