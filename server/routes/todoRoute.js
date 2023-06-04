

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

module.exports = router;