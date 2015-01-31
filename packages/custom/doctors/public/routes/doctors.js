'use strict';

angular.module('mean.doctors').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('doctors example page', {
      url: '/doctors/example',
      templateUrl: 'doctors/views/index.html'
    });
  }
]);
