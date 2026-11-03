# Full-Stack To-Do List Application

## Project Description
This is a Full-Stack To-Do List Application developed using React.js for the frontend and Express.js for the backend.

## Technologies Used
- React.js
- Node.js
- Express.js
- Axios
- CSS

## Project Features
1. View all To-Do tasks.
2. Add new tasks.
3. Mark tasks as completed.
4. Delete tasks.
5. Prevent duplicate tasks.
6. Display an error message for duplicate tasks.

## Backend
The backend is developed using Express.js and runs on port 5000.

### API Routes
- GET /todos – Get all tasks.
- POST /todos – Add a new task.
- PUT /todos/:id – Update a task.
- DELETE /todos/:id – Delete a task.

## Frontend
The frontend is developed using React.js and runs on port 3000. Axios is used to communicate with the backend API.

## How to Run

### Backend
1. Open the backend folder.
2. Run `npm install`.
3. Run `node server.js`.

### Frontend
1. Open the frontend folder.
2. Run `npm install`.
3. Run `npm start`.

## Duplicate Task Handling
The application checks for duplicate tasks. If a duplicate task is entered, the backend returns HTTP 409 Conflict and the frontend displays an error message.

## Developed For
CED-329 Advanced Web Engineering – Lab 13