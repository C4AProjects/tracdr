/**
 * Created by haythem on 15/03/2015.
 */
trackDr.controller('patientCtrl', function ($scope,Auth,$state,$http,$filter){

    $scope.active='profile'
    $scope.user = Auth.getUser().patient;
    if(! Auth.getUser().patient) $state.go("index");
    $scope.logout = function () {
        Auth.logout();
        $state.go("index");
    }

    $scope.notifications={};
    $scope.events = {
        color: '#0078ba',
        textColor: 'white',
        events: [
        ]
    };
    $scope.mydoctor={};
    $http.get(serverApi + '/secured/doctor/patient/'+$scope.user._id).success(function (res) {
        if (!res.error) {


            $scope.mydoctor=res;
        }
        else {
            //error(res);
        }
    }).error(function (data, status, headers, config) {
    })
    $scope.eventSources = [  $scope.events];
    $http.get(serverApi + '/secured/appointment/patient/'+$scope.user._id).success(function (res) {
        if (!res.error) {

            $scope.appointments =res;
            res.forEach(function(appoint){
                $scope.events.events.push({
                    title:appoint.subject,
                    start: appoint.startTime,
                    end:  appoint.endTime,
                    details:  appoint.details,

                    eventId:appoint._id,
                    className: ['openSesame'],
                    allDay: false
                });
            })
        }
        else {
            //error(res);
        }
    }).error(function (data, status, headers, config) {
    })
    $http.get(serverApi + '/secured/notification/patient/'+$scope.user._id).success(function(data) {
        // update the textarea
        $scope.notifications=data;
    });
    $scope.selectPatient = function(id){
        $scope.patient = $filter('filter')($scope.patients, {_id: id}, true)[0];
    };

    $scope.selectAppointment = function(id){
        $scope.appointment = $filter('filter')($scope.appointments, {_id: id}, true)[0];
    };

    $scope.selectNotification = function(id){
        $scope.snotif = $filter('filter')($scope.notifications, {_id: id}, true)[0];
    };

    $scope.uiConfig = {
        calendar:{
            height: 450,
            editable: false,
            header:{
                left: 'month agendaWeek',
                center: 'title',
                right: 'today prev,next'
            }


        }
    };
})