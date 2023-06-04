

const router = require('express').Router();


router.get('/', (req, res) => {
    res.send('In user route')
})

module.exports = router;