//Importing Libraries
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

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
        res.send(result);
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

app.listen(port,() => {
    console.log(`Server started at port ${port}`);
});


