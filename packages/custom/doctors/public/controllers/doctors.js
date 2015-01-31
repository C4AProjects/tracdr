'use strict';

angular.module('mean.doctors').controller('DoctorsController', ['$scope', 'Global', 'Doctors',
  function($scope, Global, Doctors) {
    $scope.global = Global;
    $scope.package = {
      name: 'doctors'
    };
  }
]);
