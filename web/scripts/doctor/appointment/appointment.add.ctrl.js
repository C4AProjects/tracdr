/**
 * Project: tracdr
 * Created by Haythem Horbit on 09/08/15.
 */
APP.controller('doctorAppointmentAddCtrl', function ($scope, $state,$rootScope,$animate,registerService,Notification,$http,ngDialog) {
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
    $scope.results=[]
    $scope.findDoctorPatient=function(typed){
        if (typed && typed.length>0)
            $http.get(serverApi + '/secured/doctor/'+$rootScope.USER.doctor._id +'/patient/find/'+typed,{}).success(function(data) {
                // update the textarea
                $scope.results=data;
                console.log(data)
            });
    }
    $scope.label = function(item) {
        if (!item) return;
        return item.firstName + ' ' +item.lastName + '(' + item.email+ ')';
    };
    $scope.selectedPatient={}
    $scope.selectPatient = function(item) {
        if (!item) return;
        $scope.event._patient=item._id
        $scope.selectedPatient=item
    };
    $scope.deleteSearch=function(){

        $scope.search.query=""
        $scope.event._patient=null;
        $scope.selectedPatient={}
    }
})