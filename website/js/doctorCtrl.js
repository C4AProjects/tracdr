/**
 * Created by haythem on 20/03/2015.
 */
trackDr.controller('doctorCtrl', function ($scope,Auth,$filter,Patients){
    console.log("doctor")
    $scope.user = Auth.getUser().doctor;

        Patients.getAll(function(res,err){
            if (res){
                $scope.patients =res;
            }
        })
    $scope.selectAppointment = function(id){
        $scope.patient = $filter('filter')($scope.patients, {_id: id}, true)[0];
    };

    $scope.selectNotification = function(id){
        $scope.patient = $filter('filter')($scope.patients, {_id: id}, true)[0];
    };
})