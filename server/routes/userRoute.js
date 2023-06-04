

const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/', (req, res) => {
    res.send('In user route')
})

router.post('/register', (req, res) => {
    userController.registerUser(req, res);
})

module.exports = router;