// api ---------------------------------------------------------------------
module.exports = function(app, localStorage) {
    
    // Get all todos from local storage
    function getAllTodos() {
        var todos = [];
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            todos[i] = JSON.parse(localStorage.getItem(key));
        }
        
        return todos;
    }
    
    function editTodo(id, text, done) {
        var todo = {
            id: id,
            text: text,
            done: done,
        };
        localStorage.setItem(id, JSON.stringify(todo));
    }

    // Get all todos endpoint
    app.get('/api/todos', function(req, res) {
        var todos = getAllTodos();
        res.json(todos);
    });

    app.post('/api/todos', function(req, res) {
        editTodo(localStorage.length + 1, req.body.text, false);
        var todos = getAllTodos();
        res.json(todos);
    });

    app.put('/api/todos/:todo_id', function(req, res) {
        editTodo(req.body.id, req.body.text, req.body.done);
        var todos = getAllTodos();
        res.json(todos);
    });
    
    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        localStorage.removeItem(req.params.todo_id);
        
        var todos = getAllTodos();
        res.json(todos);
    });
    
    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
}