const {MongoClient} = require('mongodb');

//Variable for fetching data from database
const url = `mongodb://localhost:27017`;
const dbname = `TodoApp`;

//Fetching data from database
MongoClient.connect(url,(err,client) => {
    if(err){
        return console.log('Can not connect to database');
    }

    console.log('Connected to database');

    //Refrencing collection from which to fectch data
    const colUsers = client.db(dbname).collection('Todos');

    //Querying documents in collection whose completed value is true
    colUsers.find({ completed:true}).toArray().then((data) => {
        console.log(JSON.stringify(data,undefined,2));
    });

    client.close();
});
