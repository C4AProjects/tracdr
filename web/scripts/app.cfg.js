/**
 * Project: tracdr
 * Created by Haythem Horbit on 05/08/15.
 */
APP.config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/index");
    //
    // Now set up the states
    $stateProvider
        .state('index', {
            url: '/index',
            templateUrl: './scripts/index/index.tpl.html',
            controller: "indexCtrl"
        }).state('about', {
            url: "/about",
            templateUrl: "./scripts/about/about.html"
        }).state('contact_us', {
            url: "/contact_us",
            templateUrl: "./scripts/contact_us/contact_us.html"
        }).state('faq', {
            url: "/faq",
            templateUrl: "./scripts/faq/faq.html"
        }).state('join', {
            url: "/join",
            templateUrl: "./scripts/join/join.tpl.html"
        }).state('doctor', {
            url: "/doctor",
            templateUrl: "./scripts/doctor/doctor.tpl.html",

            abstract:true
        }).state('doctor.join', {
            url: "/join",
            templateUrl: "./scripts/doctor/join/doctor.join.tpl.html",
            controller: "doctorJoinCtrl"
        })
})
    .factory('authInterceptor', function ($rootScope, $q, $window) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                }
                return config;
            },
            response: function (response) {

                console.log("status  "+response)
                if (response.status === 401) {
                    // handle the case where the user is not authenticated

                }
                return response || $q.when(response);
            }
        };
    }).factory('ajax-loader', function ($rootScope, $q, $window,usSpinnerService) {
        var requests = 0;

        function show() {
            if (!requests) {
                $rootScope.$broadcast("ajax-start");
                usSpinnerService.spin('spinner-1');
            }
            requests++;
        }

        function hide() {
            requests--;
            if (!requests) {
                $rootScope.$broadcast("ajax-stop");
                usSpinnerService.stop('spinner-1');
            }
        }

        return {
            'request': function (config) {
                show();
                return $q.when(config);
            }, 'response': function (response) {
                hide();
                return $q.when(response);
            }, 'responseError': function (rejection) {
                hide();
                return $q.reject(rejection);
            }
        };
    }).config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');

        $httpProvider.interceptors.push('ajax-loader');
    })