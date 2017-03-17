var mongoose = require('mongoose');
var todoSchema = new mongoose.Schema({
    task: {
        type: String
    }
});





module.exports =  mongoose.model('Todos', todoSchema);
