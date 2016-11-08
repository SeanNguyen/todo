'use strict';

/**
 * @ngdoc overview
 * @name zenTodoApp
 * @description
 * # zenTodoApp
 *
 * Main module of the application.
 */
angular
  .module('zenTodoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ui.sortable',
    'angular-storage',
    'ngMaterial'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
