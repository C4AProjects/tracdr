/**
 * Project: tracdr
 * Created by Haythem Horbit on 05/08/15.
 */
APP.controller('loginCtrl', function ($scope, $state,$rootScope,$animate,LoginService,Notification) {
    $scope.login = function () {
        $scope.loginError = {}
        LoginService.login($scope.user, function (res) {
            if (res.doctor)
                $state.go("doctor")
            else if (res.patient)   $state.go("patient.calendar")
        }, function (err) {
            $scope.loginError = {}
            //$scope.loginError.errorMessage = err.error;
            Notification.error({message: err.error});
            console.log(err.error)
        })
    }


})