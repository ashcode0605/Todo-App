const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost:27017/TodoApp');
mongoose.connect(process.env.PROD_MONGODB||'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};