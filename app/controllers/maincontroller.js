angular.module('todolist-controllers', []).controller('mainController', function($scope, $http){
    $scope.formData = {};
    function addSuccessAndErrorToReguest(request) {
        request.success(function(data) {
            $scope.formData = {}; // clear the form so our user is ready to enter another
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    }

    // when landing on the page, get all todos and show them
    addSuccessAndErrorToReguest($http.get('/api/todos'));

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        addSuccessAndErrorToReguest($http.post('/api/todos', $scope.formData));
    };

    // delete a todo after checking it
    $scope.changeTodo = function(todo) {
        addSuccessAndErrorToReguest($http.put('/api/todos/' + todo.id, todo));
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        addSuccessAndErrorToReguest($http.delete('/api/todos/' + id));
    };
});