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
        })
        .state('dashboard.notifications', {
            url: '/notifications',
            templateUrl: 'dashboard/views/notifications.html'
        })
        .state('dashboard.calendar', {
            url: '/calendar',
            templateUrl: 'dashboard/views/calendar.html'
        });
  }
]);
