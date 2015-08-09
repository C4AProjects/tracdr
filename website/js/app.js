/**
 * Created by haythem on 15/03/2015.
 */
 trackDr = angular.module('trackDr',
     [
         'ui.router',
         'trackDr-services',
         'ui.bootstrap',
         'ui.calendar',
         'datatables',
         'dialogs',
         'angularSpinner' ,
         'ui-notification'
     ]);

trackDr.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/index");
    //
    // Now set up the states
    $stateProvider
        .state('index', {
            url: "/index",
            templateUrl: "views/index.html"
        }) .state('about', {
            url: "/about",
            templateUrl: "views/about.html"
        }).state('contact_us', {
            url: "/contact_us",
            templateUrl: "views/contact_us.html"
        }).state('faq', {
            url: "/faq",
            templateUrl: "views/faq.html"
        })

        .state('join', {
            url: "/join",
            templateUrl: "views/join.html",
            controller:"joinCtrl"
        }) .state('join.doctor', {
            url: "/doctor",
            templateUrl: "views/doctor/register.html",
            controller:"joinCtrl"
        })
        .state('join.patient', {
            url: "/patient",
            templateUrl: "views/patient.html"
        })  .state('join.patient2', {
            url: "/patient2",
            templateUrl: "views/patient-step2.html"
        })  .state('join.patient3', {
            url: "/patient3",
            templateUrl: "views/patient-step3.html"
        }).state('join.patient4', {
            url: "/patient4",
            templateUrl: "views/patient-step4.html"
        }).state('patient', {
            url: "/patient",
            templateUrl: "views/patientMain.html",
            controller:"patientCtrl"
        }).state('patient.appointments', {
            url: "/appointments",
            templateUrl: "views/appointment.html"

        }).state('patient.calendar', {
            url: "/calendar",
            templateUrl: "views/calendar.html"

        }).state('patient.notification', {
            url: "/notification",
            templateUrl: "views/notification.html"

        })




        .state('doctor', {
        url: "/doctor",
        templateUrl: "views/doctor/doctor_dashboard.html",
            controller:"doctorCtrl"
    }).state('doctor.appointments', {
            url: "/appointments",
            templateUrl: "views/doctor/appointments.html"
        }).state('doctor.calendar', {
            url: "/calendar",
            templateUrl: "views/doctor/doctor_calendar.html"
        }).state('doctor.notifications', {
            url: "/notification",
            templateUrl: "views/doctor/notifications.html"
        }).state('doctor.profile', {
            url: "/profile",
            templateUrl: "views/doctor/profile.html"
        });

});
trackDr.factory('ajax-loader', function ($rootScope, $q, $window,usSpinnerService) {
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


    $httpProvider.interceptors.push('ajax-loader');
})