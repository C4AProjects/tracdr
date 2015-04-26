/**
 * Created by haythem on 15/03/2015.
 */
trackDr.controller('loginCtrl', function ($scope,Auth,$state){
    $scope.user={email:"",password:""}
    $scope.loginError={}

    $scope.login = function () {
        $scope.loginError={}
        Auth.login($scope.user, function (res) {
if (res.doctor)
            $state.go("doctor")
            else if (res.patient)   $state.go("patient.appointments")
        },    function (err) {
            $scope.loginError={}
            $scope.loginError.errorMessage=err.error;
            console.log(err.error)
        })
    }
  })