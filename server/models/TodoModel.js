
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
    Todo Schema will Contain a description, completed boolean, and a reference to the user who created it.
    The timestamps option will automatically add a createdAt and updatedAt field to our schema.
    Created at will help to sort the todos by date created.
    Updated at will help to get date of completion.
*/

const TodoSchema = new Schema({
    description: {
        type: String,
        required: [true, 'Description is required.']
    },
    completed: {
        type: Boolean,
        required: [true, 'Completed is required.']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required.']
    },
}, {
    timestamps: true
})


const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;