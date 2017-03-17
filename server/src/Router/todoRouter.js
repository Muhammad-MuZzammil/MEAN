var express = require("express");

var app = express();


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
// module.exports = todoRouter;