const express = require("express");
const router = express.Router();
const Task = require("../model/Task");

// GET 
router.get("/", async (req, res) => {
  try {
    console.log("Fetching tasks...");
    const tasks = await Task.find();  // Fetch tasks from the database

    if (tasks.length === 0) {
      console.log("No tasks found.");
      return res.status(404).json({ message: "No tasks found" });
    }

    console.log(`Fetched ${tasks.length} tasks.`);
    res.status(200).json(tasks);  
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    res.status(500).json({ message: "Error retrieving tasks", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = new Task({
      title,
      description,
      status: status || "TODO",  
      priority: priority || "MEDIUM",  
      dueDate,
    });

    await task.save();  
    console.log("Task added:", task);
    res.status(201).json(task);  
  } catch (error) {
    console.error("Error adding task:", error.message);
    res.status(500).json({ message: "Error adding task", error: error.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.priority = priority || task.priority;
    task.dueDate = dueDate || task.dueDate;

    await task.save();
    console.log("Task updated:", task);
    res.status(200).json(task);  
  } catch (error) {
    console.error("Error updating task:", error.message);
    res.status(500).json({ message: "Error updating task", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    console.log("Task deleted:", task);
    res.status(204).send(); 
  } catch (error) {
    console.error("Error deleting task:", error.message);
    res.status(500).json({ message: "Error deleting task", error: error.message });
  }
});

module.exports = router;
