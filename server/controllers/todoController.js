

const {checkValidTodo} = require('../utils/validityCheckers');
const {
    createNewTodo,
    findTodosByUserId,
    findTodosByDate,
    findTodosByFilter,
    changeCompletedStatus,
    deleteById
} = require('../services/TodoService');

/*
    @desc Create a todo
    @route POST /todos/create
    @access Private
    @required description in body, authorization in header
*/
const createTodo = async (req, res) => {
    try {
        const {userId, description} = req.body;
        if(!checkValidTodo(description)){
            res.status(400).json({success: false, message: 'Invalid todo'});
            return;
        }
    
        if(!userId){
            res.status(400).json({success: false, message: 'Error in creating todo'});
            return;
        }
        const createdTodo = await createNewTodo(description, userId);
        res.status(200).json({success: true, message: 'Todo created successfully', todo: createdTodo});
    }
    catch(error){
        console.log(error.message)
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
        const todos = await findTodosByUserId(userId);
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
    @desc Get todos of a specific date
    @route GET /todo/getbydate/:userId/:date
    @access Private
    @required userId in params, date in params, authorization in header
*/
const getTodosByDate = async (req, res) => {
    try{
        const userId = req.params.userId;
        const date = req.params.date;
        const todos = await findTodosByDate(userId, date);
        res.status(200).json({success: true, message: 'Todos fetched successfully', todos: todos});
    }
    catch(error){
        if(error.name === 'CastError'){
            res.status(400).json({success: false, message: 'Invalid data provided by user'});
            return;
        }
        res.status(500).json({success: false, message: 'Internal server error'});
    }
}

/*
    @desc Get todos of a specific date
    @route GET /todo/getbydate/:userId/:date
    @access Private
    @required userId in params, date in params, authorization in header
*/
const getTodosByFilter = async (req, res) => {
    try{
        const userId = req.params.userId;
        const filter = req.params.filter;
        const todos = await findTodosByFilter(userId, filter);
        res.status(200).json({success: true, message: 'Todos fetched successfully', todos: todos});
    }
    catch(error){
        if(error.name === 'CastError'){
            res.status(400).json({success: false, message: 'Invalid data provided by user'});
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
        const updated = await changeCompletedStatus(todoId, req.body.completed);
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

/*
    @desc Delete a todo
    @route PUT /todo/delete/:todoId
    @access Private
    @required authorization in header
*/
const deleteTodoById = async (req, res) => {
    try{
        const todoId = req.params.todoId;
        const deleted = await deleteById(todoId);
        if(!deleted){
            res.status(404).json({success: false, message: 'Todo does not exist'});
            return;
        }
        res.status(200).json({success: true, message: 'Todo deleted successfully'});
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
    getTodosByDate,
    getTodosByFilter,
    changeTodoComplete,
    deleteTodoById
}