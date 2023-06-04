

const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/', (req, res) => {
    res.send('In user route')
})

router.post('/register', (req, res) => {
    userController.registerUser(req, res);
})

router.post('/login', (req, res) => {
    userController.loginUser(req, res);
})

router.get('/authenticate', (req, res) => {
    userController.authenticateUser(req, res);
})

module.exports = router;