
const Todo = require('../models/TodoModel');

const createNewTodo = async (description, userId) => {
    const todo = new Todo({
        description,
        completed: false,
        user: userId
    })
    const createdTodo = await todo.save();
    return createdTodo;
}


const findTodosByUserId = async (userId) => {
    return await Todo.find({user: userId}).sort({createdAt: -1});
}


const findTodosByDate = async (userId, date) => {
    const todos = await Todo.find({user: userId, createdAt: {
        $gte: new Date(date),
        $lt: new Date(date).setDate(new Date(date).getDate() + 1)
    }}).sort({createdAt: -1});
    return todos;
}

const findTodosByFilter = async (userId, filter) => {

    let startDate = new Date();
    startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, 0, 0);
    if(filter === 'week'){
        startDate.setDate(startDate.getDate() - 7);
    }
    else if(filter === 'month'){
        startDate.setDate(startDate.getDate() - 30);
    }
    const todos = await Todo.find({user: userId, createdAt: {
        $gte: new Date(startDate),
    }}).sort({createdAt: -1});
    return todos;

}

const changeCompletedStatus = async (todoId, completed) => {
    const updated = await Todo.findByIdAndUpdate(todoId, {completed: completed}, {new: true});
    return updated;
}

const deleteById = async (todoId) => {
    return await Todo.findByIdAndDelete(todoId);
}

module.exports = {
    createNewTodo,
    findTodosByUserId,
    findTodosByDate,
    findTodosByFilter,
    changeCompletedStatus,
    deleteById
}
