'use strict';

//Setting up route
angular.module('mean.users').config(['$meanStateProvider',
  function($meanStateProvider) {
    // Check if the user is not connected
    var checkLoggedOut = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') {
          $timeout(deferred.reject);
          $location.url('/dashboard');
        }
        // Not Authenticated
        else $timeout(deferred.resolve);
      });

      return deferred.promise;
    };


    // states for my app
    $meanStateProvider
      .state('join', {
            url: '/join',
            templateUrl: 'users/views/join.html'
      })
      .state('join.doctor', {
            url: '/doctor',
            templateUrl: 'users/views/doctor.html',
            resolve: {
                loggedin: checkLoggedOut
            }
      })
      .state('join.patient', {
            url: '/patient',
            templateUrl: 'users/views/patient.html',
            resolve: {
                loggedin: checkLoggedOut
            }
      })
      .state('join.patient.step2', {
            url: '/2',
            templateUrl: 'users/views/patient-step2.html',
            resolve: {
                loggedin: checkLoggedOut
            }
      })
      .state('join.patient.step3', {
            url: '/3',
            templateUrl: 'users/views/patient-step3.html',
            resolve: {
                loggedin: checkLoggedOut
            }
      })
      .state('join.patient.step4', {
            url: '/4',
            templateUrl: 'users/views/patient-step4.html',
            resolve: {
                loggedin: checkLoggedOut
            }
      })
      .state('auth', {
            url: '/auth',
            templateUrl: 'system/views/index.html'
      })
      .state('auth.login', {
            url: '/login',
            templateUrl: 'users/views/login.html',
            resolve: {
                loggedin: checkLoggedOut
            }
      })
      .state('auth.register', {
        url: '/register',
        templateUrl: 'users/views/register.html',
        resolve: {
          loggedin: checkLoggedOut
        }
      })
      .state('forgot-password', {
        url: '/forgot-password',
        templateUrl: 'users/views/forgot-password.html',
        resolve: {
          loggedin: checkLoggedOut
        }
      })
      .state('reset-password', {
        url: '/reset/:tokenId',
        templateUrl: 'users/views/reset-password.html',
        resolve: {
          loggedin: checkLoggedOut
        }
      });
  }
]);
