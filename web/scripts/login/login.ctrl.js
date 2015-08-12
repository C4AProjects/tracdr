/**
 * Project: tracdr
 * Created by Haythem Horbit on 05/08/15.
 */
APP.controller('loginCtrl', function ($scope, $state,$rootScope,$animate,LoginService,Notification) {
    $scope.login = function () {
        $scope.loginError = {}
        LoginService.login($scope.user, function (res) {
            if (res.doctor)
                $state.go("doctor.patient")
            else if (res.patient)   $state.go("patient.doctor")
        }, function (err) {
            $scope.loginError = {}
            //$scope.loginError.errorMessage = err.error;
            Notification.error({message: err.error});
            console.log(err.error)
        })
    }


    $scope.forgetpass = function () {

        Auth.forget($scope.user, function (res) {

            Notification.error({message: "Mail Sent"});
            $scope.forget=false
        }, function (err) {
            $scope.loginError = {}
            //  $scope.loginError.errorMessage = err.error;
            Notification.error({message:  err.error});
            console.log(err.error)
        })
    }

})