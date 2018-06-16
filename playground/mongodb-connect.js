const MongoClient = require('mongodb').MongoClient;

// main database url
// const url = 'mongodb://localhost:27017';
const url = 'mongodb://<ashwani>:<iamgoodboy6@ds261440>.mlab.com:61440';

//name of database
const dbname = 'ashwani0605';

MongoClient.connect(url,(err,client) => {

    //Referencing collection to which inserting data
    const colTodo = client.db(dbname).collection('Todos');
    const colUsers = client.db(dbname).collection('Users');

    //Inserting document to Todo Collection.
    colTodo.insert({
        text: 'Something to Todo',
        completed: false
    },(err,result) => {
        if(err){
            return console.log('Unable to insert Todo to mongodb server');
        }

        console.log(JSON.stringify(result.ops,undefined,2));
    });

    //Inserting Document to Users Collection.
    colUsers.insert({
        name:'Ashwani',
        lastname:'Singh',
        age:'20'
    },(err,result) => {
        if(err){
            return console.log('Unable to insert data to mongodb server.');
        }

        console.log(JSON.stringify(result.ops,undefined,2));
    });

    client.close();

});