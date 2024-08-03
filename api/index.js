const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/taskmanager', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

const taskSchema = new mongoose.Schema({
    id: Number,
    name: String,
    priority: String,
    description: String,
    isComplete: Boolean,
});

const Task = mongoose.model('Task', taskSchema);

app.post('/tasks', async (req, res) => {
    try {
        const newTask = new Task({
            id: Date.now(),
            name: req.body.name,
            priority: req.body.priority,
            description: req.body.description,
            isComplete: false,
        });

        const savedTask = await newTask.save();
        res.status(200).send(savedTask);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
