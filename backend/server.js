const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { CohereClient } = require('cohere-ai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));
const todoSchema = new mongoose.Schema({
  text: String,
  completed: { type: Boolean, default: false }
});

const Todo = mongoose.model('Todo', todoSchema);
const cohere = new CohereClient({ token: process.env.COHERE_API_KEY });
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  try {
    const { text } = req.body;
    const todo = new Todo({ text });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    console.error('Error in /todos:', err);
    res.status(500).json({ error: 'Failed to add todo' });
  }
});

app.put('/todos/:id', async (req, res) => {
  const { text, completed } = req.body;
  const todo = await Todo.findByIdAndUpdate(req.params.id, { text, completed }, { new: true });
  res.json(todo);
});

app.delete('/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Todo deleted' });
});

app.post('/summarize', async (req, res) => {
  try {
    const todos = await Todo.find({ completed: false });
    const todoTexts = todos.map(t => t.text).join('\n');

    const prompt = `Summarize these tasks into a short, clear overview:\n${todoTexts}`;

    const response = await cohere.generate({
      model: 'command-r-plus',
      prompt,
      maxTokens: 500,
      temperature: 0.7,
    });

    const summary = response.generations[0].text.trim();
    res.json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});