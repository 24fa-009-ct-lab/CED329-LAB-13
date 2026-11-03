const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let todos = [
    { id: 1, task: 'Learn Express.js', completed: false },
    { id: 2, task: 'Build a Full-Stack App', completed: false }
];

// GET all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// POST a new todo
app.post('/todos', (req, res) => {
    const { task } = req.body;

    if (!task || !task.trim()) {
        return res.status(400).json({ message: 'Task is required' });
    }

    const exists = todos.some(
        todo => todo.task.toLowerCase() === task.trim().toLowerCase()
    );

    if (exists) {
        return res.status(409).json({ message: 'Task already exists!' });
    }

    const newTodo = {
        id: Date.now(),
        task: task.trim(),
        completed: false
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PUT update todo
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);

    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    const { task, completed } = req.body;

    if (task !== undefined) todo.task = task;
    if (completed !== undefined) todo.completed = completed;

    res.status(200).json(todo);
});

// DELETE todo
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (!todos.some(todo => todo.id === id)) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    todos = todos.filter(todo => todo.id !== id);
    res.status(204).send();
});

// Start server
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});