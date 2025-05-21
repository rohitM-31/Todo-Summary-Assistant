import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/todos');
      setTodos(res.data);
    } catch (err) {
      alert(' Failed to fetch todos');
    }
  };

  const addTodo = async () => {
    if (!input.trim()) return;
    try {
      await axios.post('http://localhost:5000/todos', { text: input });
      setInput('');
      fetchTodos();
    } catch (err) {
      alert(' Failed to add todo');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      fetchTodos();
    } catch (err) {
      alert(' Failed to delete todo');
    }
  };

  const updateTodo = async (id, newText, completed = false) => {
    try {
      await axios.put(`http://localhost:5000/todos/${id}`, { text: newText, completed });
      fetchTodos();
    } catch (err) {
      alert(' Failed to update todo');
    }
  };

  const summarizeTodos = async () => {
    try {
      const res = await axios.post('http://localhost:5000/summarize');
      setSummary(res.data.summary);
      setShowSummary(true);
    } catch (err) {
      alert(' Failed to summarize todos');
    }
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="display-5 fw-bold"> Todo Summary Assistant</h1>
        <p className="lead">Manage The tasks and get instant summaries using AI</p>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="input-group mb-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="form-control"
              placeholder="Add a new task"
            />
            <button className="btn btn-primary" onClick={addTodo}>Add</button>
          </div>

          <ul className="list-group">
            {todos.map((todo) => (
              <li key={todo._id} className="list-group-item d-flex justify-content-between align-items-center">
                <input
                  type="text"
                  defaultValue={todo.text}
                  onBlur={(e) => updateTodo(todo._id, e.target.value, todo.completed)}
                  className="form-control border-0 bg-transparent"
                />
                <button className="btn btn-sm btn-outline-danger" onClick={() => deleteTodo(todo._id)}>
                  &times;
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="d-grid mb-3">
        <button className="btn btn-success btn-lg" onClick={summarizeTodos}>Summarize Todos</button>
      </div>

      <div className={`collapse ${showSummary ? 'show' : ''}`}>
        <div className="alert alert-info shadow-sm" role="alert">
          <h4 className="alert-heading"> Summary</h4>
          <p>{summary}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
