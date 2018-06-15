const {MongoClient,ObjectID} = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbname = `TodoApp`;

MongoClient.connect(url,(err,client) => {
    if(err){
        return console.log(err);
    }

    console.log('Connected to database');

    const colTodos = client.db(dbname).collection('Todos');

    //update to find more refer documentation or autocomplete
    colTodos.update({_id:new ObjectID("5b21deb6c6afdcb03c7a1199")},
                    {$set:{text:'first todo'}}).
                    then((result) => {
                        console.log(result);
                    });

});