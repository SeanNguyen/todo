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
  // const
  const KEY_STORAGE_LIST = "zen-lists";

  // public attributes
  $scope.sortableOptions = {
    connectWith: '.drag-area .list',
    update: onListChange
  };
  $scope.lists = [];

  $scope.input = {
    task: null
  };

  //public event
  $scope.addTask = addTask;
  $scope.removeTask = removeTask;
  $scope.getTotalTasks = getTotalTasks;

  // activate
  init();

  // private methods
  function init() {
    var defaultLists = [
      { name: 'To Do', items: [] },
      { name: 'In Progress', items: [] },
      { name: 'Done', items: [] }
    ];
    $scope.lists = angular.fromJson(store.get(KEY_STORAGE_LIST)) || defaultLists;
  }

  function onListChange(event, ui) {
    setTimeout(function() {
      store.set(KEY_STORAGE_LIST, angular.toJson($scope.lists));
    }, 0);
  }

  function addTask() {
    if (!$scope.input.task) {
      return;
    }
    $scope.lists[0].items.push($scope.input.task);
    store.set(KEY_STORAGE_LIST, angular.toJson($scope.lists));
    $scope.input.task = null;
  }

  function removeTask(list, index) {
    list.items.splice(index, 1);
    store.set(KEY_STORAGE_LIST, angular.toJson($scope.lists));
  }

  function getTotalTasks() {
    var count = 0;
    $scope.lists.forEach((list) => {
      count += list.items.length;
    });
    return count;
  }
}
})();