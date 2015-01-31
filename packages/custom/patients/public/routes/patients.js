'use strict';

angular.module('mean.patients').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('patients example page', {
      url: '/patients/example',
      templateUrl: 'patients/views/index.html'
    });
  }
]);
