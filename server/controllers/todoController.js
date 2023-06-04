

const Todo = require('../models/TodoModel');
const {checkValidTodo} = require('../utils/validityCheckers');

/*
    @desc Create a todo
    @route POST /todos/create
    @access Private
    @required description in body, authorization in header
*/
const createTodo = async (req, res) => {
    try {
        const {description} = req.body;
        if(!checkValidTodo(description)){
            res.status(400).json({success: false, message: 'Invalid todo'});
            return;
        }
    }
    catch(error){
        res.status(500).json({success: false, message: 'Internal server error'});
    }
}


module.exports = {
    createTodo
}