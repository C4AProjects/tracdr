/**
 * Created by haythem on 15/03/2015.
 */
 trackDr = angular.module('trackDr', ['ui.router','trackDr-services','ui.bootstrap','ui.calendar']);

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
        })
        .state('join', {
            url: "/join",
            templateUrl: "views/join.html",
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
        }).state('doctor', {
        url: "/doctor",
        templateUrl: "views/doctor/doctor_dashboard.html",
            controller:"doctorCtrl"
    }).state('doctor.appointments', {
            url: "/appointments",
            templateUrl: "views/doctor/appointments.html"
        }).state('doctor.calendar', {
            url: "/calendar",
            templateUrl: "views/doctor/doctor_calendar.html"
        });

});