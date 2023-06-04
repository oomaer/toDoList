

const Todo = require('../models/TodoModel');
const { getUserIdFromJwt } = require('../utils/getUserIdFromJwt');
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
        const userId = getUserIdFromJwt(req.headers.authorization)
        const todo = new Todo({
            description,
            completed: false,
            user: userId
        })
        await todo.save();
        res.status(200).json({success: true, message: 'Todo created successfully', todo: {description: todo.description, completed: todo.completed, id: todo._id}});
    }
    catch(error){
        res.status(500).json({success: false, message: 'Internal server error'});
    }
}

const getTodos = async (req, res) => {
    try {
        const userId = req.params.userId;
        const todos = await Todo.find({user: userId}).sort({createdAt: -1});
        res.status(200).json({success: true, message: 'Todos fetched successfully', todos: todos});
    }
    catch(error){
        if(error.name === 'CastError'){
            res.status(400).json({success: false, message: 'Invalid user id'});
            return;
        }
        res.status(500).json({success: false, message: 'Internal server error'});
    }
}


module.exports = {
    createTodo,
    getTodos
}