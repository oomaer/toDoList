

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

/*
    @desc get all todos of a user
    @route GET /todo/get/:userId
    @access Private
    @required userId in params, authorization in header
*/
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

/*
    @desc Change todo complete status
    @route PUT /todo/changeComplete/:todoId
    @access Private
    @required completed in body, authorization in header
*/
const changeTodoComplete = async (req, res) => {
    try{
        const todoId = req.params.todoId;
        if(req.body.completed === undefined){
            res.status(400).json({success: false, message: 'Invalid request'});
            return;
        }
        const updated = await Todo.findByIdAndUpdate(todoId, {completed: req.body.completed}, {new: true});
        if(!updated){
            res.status(404).json({success: false, message: 'Todo does not exist'});
            return;
        }
        res.status(200).json({success: true, message: 'Todo updated successfully', todo: {description: updated.description, completed: updated.completed, id: updated._id}});
    }
    catch(error){
        if(error.name === 'CastError'){
            res.status(400).json({success: false, message: 'Invalid todo id'});
            return;
        }
        res.status(500).json({success: false, message: 'Internal server error'});
    }
}


module.exports = {
    createTodo,
    getTodos,
    changeTodoComplete
}