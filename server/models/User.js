const mongoose = require('mongoose')

//User Model
var User = mongoose.model('User',{
    username:{
        type:String,
        required:true,
        trim:true,
        minlength:1
    }
});

module.exports = {User};
