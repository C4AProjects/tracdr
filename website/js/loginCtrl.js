/**
 * Created by haythem on 15/03/2015.
 */
trackDr.controller('loginCtrl', function ($scope,Auth){
    $scope.user={email:"",password:""}
    $scope.loginError={}

    $scope.login = function () {
        $scope.loginError={}
        Auth.login($scope.user, function (res) {

            console.log(res)
        },    function (err) {
            $scope.loginError={}
            $scope.loginError.errorMessage=err.error;
            console.log(err.error)
        })
    }
    var loginError=function(err){

    }
})