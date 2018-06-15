const {MongoClient, ObjectID} = require('mongodb');

const url = `mongodb://localhost:27017`;
const dbname = `TodoApp`;

MongoClient.connect(url,(err,client) => {
    if(err){
        return console.log(err);
    }

    console.log('Connected to database');

    const colTodos = client.db(dbname).collection('Todos');

    //deleteMany
    colTodos.deleteMany({_id: new ObjectID("5b1fa74b7b566b0ecece936e")}).then((result) => {
        console.log(result);
    });

    //delete 
    

    //findOneAndDelete


});
