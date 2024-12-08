const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res, next) => {
  try {
    const task = new Task(req.body);
    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    next(error);
  }
};

// Get all tasks with filters and sorting
exports.getTasks = async (req, res, next) => {
  try {
    const { status, priority, sort, limit = 10, skip = 0 } = req.query;
    const query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const tasks = await Task.find(query)
      .sort(sort ? { [sort]: 1 } : {})
      .limit(parseInt(limit))
      .skip(parseInt(skip));
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// Get task by ID
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// Update a task
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// Delete a task
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
