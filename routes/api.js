 // API routes file (CRUD endpoints)
 // routes/api.js
// routes/api.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { signup, login } = require('../controllers/authController');
// ✅ Get all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/Create', async (req, res) => {
    try {
      const task = new Task(req.body);
      await task.save();
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: 'Error creating task' });
    }
  });
  
// ✅ Create a new task (changed to '/tasks' for consistency)
router.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task' });
  }
});

// ✅ Delete a task
router.delete('/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
});


router.post('/signup', signup);
router.post('/logi  n', login);
module.exports = router;
