
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        ref: 'User'
    }
}, {
    timestamps: true
})


const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;