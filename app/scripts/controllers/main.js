(function() {
'use strict';

/**
* @ngdoc function
* @name zenTodoApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the zenTodoApp
*/
angular.module('zenTodoApp').controller('MainCtrl', ['$scope', 'store', MainCtrl]);

function MainCtrl($scope, store) {
  // public attribute
  $scope.sortableOptions = {
    connectWith: '.drag-area .list',
    update: onListChange
  };
  $scope.todoList = {
    key: 'zen-todoItems',
    name: 'To Do',
    items: []
  };
  $scope.inProgressList = {
    key: 'zen-inProgressItems',
    name: 'In Progress',
    items: []
  };
  $scope.doneList = {
    key: 'zen-doneItems',
    name: 'Done',
    items: []
  };

  $scope.input = {
    task: null
  };

  //public event
  $scope.addTask = addTask;

  // Activate
  init();

  // private methods
  function init() {
    $scope.todoList.items = store.get($scope.todoList.key) || [];
    $scope.inProgressList.items = store.get($scope.inProgressList.key) || [];
    $scope.doneList.items = store.get($scope.doneList.key) || [];
  }

  function onListChange(event, ui) {
    setTimeout(function() {
      store.set($scope.todoList.key, $scope.todoList.items);
      store.set($scope.inProgressList.key, $scope.inProgressList.items);
      store.set($scope.doneList.key, $scope.doneList.items);
    }, 0);
  }

  function addTask() {
    if (!$scope.input.task) {
      return;
    }
    $scope.todoList.items.push($scope.input.task);
    store.set($scope.todoList.key, $scope.todoList.items);
    $scope.input.task = null;
  }
}
})();