const mongoose = require('mongoose')

//Todo Model
var Todo = mongoose.model('Todo',{
    text:{
        type:String,
        required: true,
        trim: true,
        minlength:2
    },
    Completed:{
        type:Boolean,
        default:false
    },
    CompletedAt:{
        type:Number,
        default:null
    }
});

module.exports = {Todo};