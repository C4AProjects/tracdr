/**
 * Created by haythem on 15/03/2015.
 */
trackDr.controller('patientCtrl', function ($scope,Auth){

    $scope.active='profile'
    $scope.user = Auth.getUser().patient;
    console.log("hhhhhhhh j%",   $scope.user)
})