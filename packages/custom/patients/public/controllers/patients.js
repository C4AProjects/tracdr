'use strict';

angular.module('mean.patients').controller('PatientsController', ['$scope', 'Global', 'Patients',
  function($scope, Global, Patients) {
    $scope.global = Global;
    $scope.package = {
      name: 'patients'
    };
  }
]);
