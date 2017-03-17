// Third Party Modules
var express = require("express");
var app = express();
var path = require('path')
var bodyParser = require('body-parser');
var mongoose = require('mongoose')

// MongoDB Connection
var db = mongoose.connect('mongodb://localhost:27017/todoAPI')

// Middlewares
app.set('views', path.join(__dirname, '../client/dist'));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.static(path.join(__dirname, '../client/node_modules')));

// BodyParser Middlewares
// parse application/json 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

//  Show Client Index.html
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

// Server Port
var port = process.env.PORT || 5000;

// Require MongoDB Model
var Todos = require('./src/models/todoModel')
// var TodoController = require('./src/Router/todoRouter')

// TodoRouter Router
var todoRouter = express.Router();

// Get Request
todoRouter.get('/getTodos', function (req, res) {
    var findTodo = {};
    //  Find  All Todos
    Todos.find(findTodo, function (err, todos) {
        if (err)
            res.status(500).send(err);
        else
            res.json(todos)
    });
});

// Post Request
todoRouter.post('/postTodos', (function (req, res) {
    console.log('req.body', req.body)

    // Save Todo In MongoDB
    var todoObj = new Todos(req.body);
    todoObj.save()
    res.status(201).send(todoObj);
})
)

// Update Request
todoRouter.put('/updateTodos', function (req, res) {

    console.log('req.body', req.body)
    // Find  Todo ID
    Todos.findOneAndUpdate({ _id: req.body.tid }, { $set: { task: req.body.udTodo } }, function (err, updateTodos) {
        if (err)
            return res.send(err);
        res.send(updateTodos);
    })
})

// Delete Request
todoRouter.delete('/deleteTodos', function (req, res) {
    // Remove  Todo ID
    Todos.remove({ _id: req.body.Todo._id }, function (err, deleteTodos) {
        if (err)
            return res.send(err)
        res.send(deleteTodos);
    })

})
// TodoRouter MiddleWare
app.use('/api', todoRouter);


app.listen(port, function (req, res) {
    console.log('Gulp is running my app on PORT : ', port);
});             