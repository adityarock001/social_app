const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    text : {
        type : String,
        required : true
    },
    user_id : {
        type : mongoose.Schema.ObjectId,
        ref : "user",
        required : true,
    },
    post_id : {
        type : mongoose.Schema.ObjectId,
        ref : "post",
        required: true
    },
    parent_id : {
        type: mongoose.Schema.ObjectId,
        ref: 'Comment', // This allows for nesting replies
        default: null,
    },
    likes : [{
        type : mongoose.Schema.ObjectId,
        ref : "user",
        default : []
    }],
}, {timestamps : true})

const Comment = mongoose.model('comment', CommentSchema)
module.exports = Comment;