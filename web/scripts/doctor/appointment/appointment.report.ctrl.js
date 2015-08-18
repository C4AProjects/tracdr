/**
 * Project: tracdr
 * Created by Haythem Horbit on 18/08/15.
 */
/**
 * Project: tracdr
 * Created by Haythem Horbit on 09/08/15.
 */
APP.controller('appEditCtrl', function ($scope, $state,$rootScope,$animate,registerService,Notification,$http,ngDialog) {
$scope.app=$scope.ngDialogData.doc
    $scope. _app={}
    $scope. event={}

    $scope.event = {}
    $scope.event.date=new Date();
    $scope.event.startTime =  new Date();
    $scope.event.endTime =  new Date();
    $scope.event.start =  new Date();
    $scope.event.end =  new Date();

    $scope.event._doctor = $rootScope.USER.doctor._id;



    $scope.hstep = 1;
    $scope.mstep = 1;

    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.getStatus = function() {

        var status="ontime"
        if (!$scope.app.status){
            if(new Date($scope.app.startTime)< (new Date())){
                status="finished"
            }
        }
        else{
            status="reported"
        }

        return status
    };
    $scope. _app.status=$scope.getStatus()
})