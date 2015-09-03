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
        }).state('activation', {
            url: "/activation",

            templateUrl: "./scripts/activation/activation.tpl.html"

        }).state('doctor', {
            url: "/doctor",
            templateUrl: "./scripts/doctor/doctor.tpl.html",

            abstract: true
        }).state('doctor.patient', {
            url: "/patient",
            templateUrl: "./scripts/doctor/patient/doctor.patient.tpl.html",
            controller: 'doctorPatientCtrl'
        }).state('doctor.patientDetails', {
            url: "/pAtient/details/:ID",
            templateUrl: "./scripts/doctor/patient/patient.details.tpl.html",
            controller: 'patientDetailsCtrl'
        }).state('doctor.appointment', {
            url: "/appointment",
            templateUrl: "./scripts/doctor/appointment/doctor.appointment.tpl.html",
controller:'doctorAppointmentCtrl'
        }).state('doctor.appointment.calendar', {
            url: "/calendar",
            controller: 'doctorAppointmentCalendarCtrl',
            templateUrl: "./scripts/doctor/appointment/appointment.calendar.tpl.html"

        }).state('doctor.appointment.list', {
            url: "/list",
            controller: 'doctorAppointmentListCtrl',
            templateUrl: "./scripts/doctor/appointment/appointment.list.tpl.html"

        }).state('doctor.profile', {
            url: "/profile",
            controller: 'doctorProfileCtrl',
            templateUrl: "./scripts/doctor/profile/profile.tpl.html"

        })


        .state('join.doctor', {
            url: "/doctor",
            templateUrl: "./scripts/doctor/join/doctor.join.tpl.html",
            controller: "doctorJoinCtrl"
        }).state('patient', {
            url: "/patient",
            templateUrl: "./scripts/patient/patient.tpl.html",

            abstract: true
        }).state('join.patient', {
            url: "/patient",
            templateUrl: "./scripts/patient/join/patient.join.tpl.html",
            abstract: true,
            controller: "patientJoinCtrl"
        }).state('join.patient.step1', {
            url: "/step1",
            templateUrl: "./scripts/patient/join/patient.join.step1.tpl.html"

        }).state('join.patient.step2', {
            url: "/step2",
            templateUrl: "./scripts/patient/join/patient.join.step2.tpl.html"

        }).state('join.patient.step3', {
            url: "/step3",
            templateUrl: "./scripts/patient/join/patient.join.step3.tpl.html"

        }).state('patient.doctor', {
            url: "/doctor",
            templateUrl: "./scripts/patient/doctor/doctor.tpl.html",
            controller:'PatientCtrl'

        }).state('patient.appointment', {
            url: "/appointment",
            templateUrl: "./scripts/patient/appointment/doctor.appointment.tpl.html",
            controller:'patientAppointmentCtrl'
        }).state('patient.appointment.calendar', {
            url: "/calendar",
            controller: 'patientAppointmentCalendarCtrl',
            templateUrl: "./scripts/patient/appointment/appointment.calendar.tpl.html"

        }).state('patient.appointment.list', {
            url: "/list",
            controller: 'patientAppointmentListCtrl',
            templateUrl: "./scripts/patient/appointment/appointment.list.tpl.html"

        }).state('patient.profile', {
            url: "/profile",
            controller: 'patientProfileCtrl',
            templateUrl: "./scripts/patient/profile/profile.tpl.html"

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

                console.log("status  " + response)
                if (response.status === 401) {
                    // handle the case where the user is not authenticated

                }
                return response || $q.when(response);
            }
        };
    }).factory('ajax-loader', function ($rootScope, $q, $window, usSpinnerService) {
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
    }).run(['$rootScope', '$location', 'DataService', '$state', 'ApiServer', function ($rootScope, $location, DataService, $state, ApiServer) {


        if ($rootScope.USER && $rootScope.USER.doctor) {
            console.log("is doctor")
            ///$state.go("doctor.patient")
            $location.path("doctor/patient");
          //  $state.go("doctor.patient")
        } else if ($rootScope.USER && $rootScope.USER.patient) {

            $location.path("patient/doctor");
        }

    }])    .config(function(NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 10000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'top'
        });
    });