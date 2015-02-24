'use strict';

angular.module('mean.dashboard').controller('DashboardController', ['$scope', 'Global', 'Dashboard',
  function($scope, Global, Dashboard) {
    $scope.global = Global;
    $scope.package = {
      name: 'dashboard'
    };
      $scope.eventSources = [];
      /* config object */
      $scope.uiConfig = {
          calendar:{
              height: 450,
              editable: true,
              header:{
                  left: 'month basicWeek basicDay agendaWeek agendaDay',
                  center: 'title',
                  right: 'today prev,next'
              },
              dayClick: $scope.alertEventOnClick,
              eventDrop: $scope.alertOnDrop,
              eventResize: $scope.alertOnResize
          }
      };
  }
]);
