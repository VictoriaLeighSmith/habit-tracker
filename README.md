# Habit Tracker API

A RESTful API built with Node.js and Express for managing personal habits and tracking their completion through daily check-ins.

## Features

- Create, retrieve, update, and delete habits
- Set weekly completion targets for individual habits
- Record daily check-ins for specific habits
- Retrieve check-in history for each habit
- Automatically remove associated check-ins when a habit is deleted
- Validate request data and return appropriate HTTP error responses

## Technologies Used

- Node.js
- Express.js
- JavaScript

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the server using `node index.js` (assuming the main file is named `index.js`).

The API runs on `http://localhost:3000` by default.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/habits` | Retrieve all habits |
| GET | `/habits/:id` | Retrieve a specific habit |
| POST | `/habits` | Create a new habit |
| PUT | `/habits/:id` | Update an existing habit |
| DELETE | `/habits/:id` | Delete a habit and its check-ins |
| GET | `/habits/:id/checkins` | Retrieve check-ins for a habit |
| POST | `/habits/:habitId/checkins` | Record a new check-in |

## Data Storage

Habit and check-in data are stored in memory using JavaScript arrays. Changes are not persisted when the server restarts.

## Project Information

Developed as part of the Software Development program at Keyin College.
