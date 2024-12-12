const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const tasks = await Task.find().skip((page - 1) * limit).limit(limit);
        const totalTasks = await Task.countDocuments();

        res.status(200).json({ tasks, totalTasks, status: 200 });
    } catch (error) {
        res.status(500).json({ msg: "Internal server error", status: 500 });
    }
};

exports.createTask = async (req, res) => {
    const { title, description } = req.body;
    try {
        const task = new Task({ title, description });
        await task.save();
        res.status(201).json({ task, status: 201 });
    } catch (error) {
      res.status(400).json({ msg: error.message, status: 400 });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const task = await Task.findByIdAndUpdate(id, { title, description }, { new: true, runValidators: true ,overwrite: true});

        if (!task) {
            return res.status(404).json({ msg: "Task not found", status: 404 });
        }

        res.status(200).json({ task, status: 200 });
    } catch (error) {
        res.status(400).json({ msg: error.message, status: 400 });
    }
};

exports.patchTask = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const task = await Task.findByIdAndUpdate(id, { title, description }, { new: true, runValidators: true ,overwrite: true});

        if (!task) {
            return res.status(404).json({ msg: "Task not found", status: 404 });
        }
        
        res.status(200).json({ task, status: 200 });
    } catch (error) {
        res.status(400).json({ msg: error.message, status: 400 });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({ msg: "Task not found", status: 404 });
        }

        res.status(200).json({ status: 200 });
    } catch (error) {
        res.status(500).json({ msg: "Internal server error", status: 500 });
    }
};

exports.getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        res.status(200).json({ task, status: 200 });
    } catch (error) {
        res.status(500).json({ msg: "Internal server error", status: 500 });
    }
};