/**
 * Created by haythem on 15/03/2015.
 */
trackDr.controller('joinCtrl', function ($scope,Auth,$state){
    $scope.user={}

    $scope.registerPAtient = function () {

        Auth.registerPAtient($scope.user, function (res) {

            $state.go("patient")
        },    function (err) {
         alert(err.error)
        })
    }

})