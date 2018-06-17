const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

//UserSchema
var UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:1,
        unique:true,
        validate:{
            validator: validator.isEmail,
            message:'{VALUE} is not an valid email'
        },
    },
    password:{
        type:String,
        required: true,
        minlength: 6       
    },
    tokens:[{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
    }]
});

//updating mongoose schema method to define json representation of users
UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();
    var userObject =  _.pick(userObject,['_id','email']);
    return userObject;
}; 

//Generating tokens for authentication
UserSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({ _id:user._id.toHexString(), access},'1234').toString();

    user.tokens.push({access,token});

    // Here value token will act as a success argument for next then call
    return user.save().then(() => {
        return token;
    })
};

//User Model
var User = mongoose.model('User',UserSchema);

module.exports = {User};
