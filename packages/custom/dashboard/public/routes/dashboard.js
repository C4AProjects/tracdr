'use strict';

angular.module('mean.dashboard').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('dashboard', {
      url: '/dashboard',
      templateUrl: 'dashboard/views/index.html'
    })
        .state('dashboard.appointments', {
            url: '/appointments',
            templateUrl: 'dashboard/views/appointments.html'
        });
  }
]);
