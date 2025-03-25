import express from "express";
import { Task } from "../modules/task.js";

const router = express.Router();

router.post("/add-task", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const task = new Task({ title, description });
    await task.save();
    return res
      .status(201)
      .json({ success: true, message: "Task Created successfully", task });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
});

router.get("/getall-task", async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.status(200).json({ success: true, tasks });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
});

router.put("/update-task/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title } = req.body;
    const { description } = req.body;
    const { isCompleted } = req.body;
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, isCompleted },
      { new: true }
    );
    await task.save();
    return res
      .status(200)
      .json({ success: true, message: "Task Updated successfully", task });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
});

router.delete("/task-delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Task.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
});

router.get("/taskById/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);
    return res.status(200).json({ success: true, task });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
});

export default router;
