

const router = require('express').Router();
const todoController = require('../controllers/todoController');
const { isAuthorized } = require('../middleware/auth');

router.get('/', (req, res) => {
    res.send('In todo route')
});

router.post('/create', isAuthorized, (req, res) => {
    todoController.createTodo(req, res);
})

router.get('/get/:userId', isAuthorized, (req, res) => {
    todoController.getTodos(req, res);
})

router.get('/getbydate/:userId/:date', isAuthorized, (req, res) => {
    todoController.getTodosByDate(req, res);
})

router.put('/changecompletestatus/:todoId', isAuthorized, (req, res) => {
    todoController.changeTodoComplete(req, res);
})

router.put('/delete/:todoId', isAuthorized, (req, res) => {
    todoController.deleteTodoById(req, res);
})

module.exports = router;