//Importing Libraries
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

//Local Imports
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/Todo');
const {User} = require('./models/User');

const port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.json());

// POST todos
app.post('/todos',(req,res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    },(e) => {
        res.status(400).send(e.message);
    })
});

//GET todos
app.get('/todos',(req,res) => {
    Todo.find().then((result) => {
        res.send({Todos:result});
    },(e) => {
        res.status(400).send(e);
    });
});

//POST todos/:id
app.get('/todos/:id',(req,res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send({});
    }

    Todo.findById(id).then((doc) => {
        if(!doc){
            return res.status(404).send({});
        }
        res.send(doc);
    },(err) => {
        res.status(400).send({});
    })

});

//DELETE todos/:id
app.delete('/todos/:id',(req,res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send({});
    }

    Todo.findByIdAndRemove(id).then((doc) => {
        if(!doc){
            return res.status(404).send({});
        }
        res.send(doc);
    },(err) => {
        res.status(400).send({});
    })

});

//PATCH todos/:id
app.patch('/todos/:id',(req,res) => {
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send({});
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((doc) => {
        if(!doc){
            return res.status(404).send({});
        }
        res.send({todo:doc});
    }).catch((e) => {
        res.status(400).send({});
    });

});


//POST /users
app.post('/users',(req,res)=>{
    var body = _.pick(req.body,['email','password']);
    var user = new User(body);

    user.save().then(()=>{
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
        res.status(400).send(e); 
    })
});


app.listen(port,() => {
    console.log(`Server started at port ${port}`);
});


