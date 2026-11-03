import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');
    const [error, setError] = useState('');

    // Get all todos
    useEffect(() => {
        axios.get('http://localhost:5000/todos')
            .then(response => setTodos(response.data))
            .catch(error => console.log(error));
    }, []);

    // Add todo
    const handleAddTodo = () => {
        if (!task.trim()) {
            setError('Please enter a task');
            return;
        }

        axios.post('http://localhost:5000/todos', { task })
            .then(response => {
                setTodos([...todos, response.data]);
                setTask('');
                setError('');
            })
            .catch(error => {
                if (error.response && error.response.status === 409) {
                    setError('Task already exists!');
                } else {
                    setError('Something went wrong!');
                }
            });
    };

    // Mark todo as completed
    const handleComplete = (id) => {
        const todo = todos.find(todo => todo.id === id);

        axios.put(`http://localhost:5000/todos/${id}`, {
            completed: !todo.completed
        })
            .then(response => {
                setTodos(todos.map(todo =>
                    todo.id === id ? response.data : todo
                ));
            });
    };

    // Delete todo
    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/todos/${id}`)
            .then(() => {
                setTodos(todos.filter(todo => todo.id !== id));
            });
    };

    return (
        <div>
            <h1>My To-Do List</h1>

            <input
                type="text"
                placeholder="Enter a new task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />

            <button onClick={handleAddTodo}>Add Task</button>

            <p style={{ color: 'red' }}>{error}</p>

            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <span style={{
                            textDecoration: todo.completed ? 'line-through' : 'none'
                        }}>
                            {todo.task}
                        </span>

                        <button onClick={() => handleComplete(todo.id)}>
                            {todo.completed ? 'Undo' : 'Complete'}
                        </button>

                        <button onClick={() => handleDelete(todo.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoApp;