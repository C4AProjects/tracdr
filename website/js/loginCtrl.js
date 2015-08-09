/**
 * Created by haythem on 15/03/2015.
 */
trackDr.controller('loginCtrl', function ($scope, Auth, $state,Notification) {
    $scope.user = {email: "", password: ""}
    $scope.loginError = {}

    $scope.login = function () {
        $scope.loginError = {}
        Auth.login($scope.user, function (res) {
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