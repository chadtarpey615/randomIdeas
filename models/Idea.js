const mongoose = require('mongoose')

const IdeaSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Please add some text"],
    },

    tag: {
        type: String,
        required: [true, "Please add a tag"],
    },

    username: {
        type: String,
        required: [true, "Please add a username"],
    },

    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Idea', IdeaSchema)