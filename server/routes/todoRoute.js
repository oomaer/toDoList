

const router = require('express').Router();
const todoController = require('../controllers/todoController');

router.get('/', (req, res) => {
    res.send('In todo route')
});

router.post('/create', (req, res) => {
    todoController.createTodoTask(req, res);
})