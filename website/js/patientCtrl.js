/**
 * Created by haythem on 15/03/2015.
 */
trackDr.controller('patientCtrl', function ($scope,Auth){
    $scope.user = Auth.getUser();
})