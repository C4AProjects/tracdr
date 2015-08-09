/**
 * Project: tracdr
 * Created by Haythem Horbit on 09/08/15.
 */
/**
 * Project: tracdr
 * Created by Haythem Horbit on 06/08/15.
 */
/**
 * Project: tracdr
 * Created by Haythem Horbit on 06/08/15.
 */
APP.controller('patientAppointmentCalendarCtrl', function ($scope, $state,$rootScope,$animate,registerService,Notification,$http,ngDialog,$timeout) {

    $scope.events = {
        color: '#0078ba',
        textColor: 'white',
        events: [  ]
    };
    $scope.eventSources=[]
    $scope.eventSources = [$scope.events];


    $scope.alertOnDrop = function (event, delta, revertFunc, jsEvent, ui, view) {
        console.log(event)
        console.log(delta)
        var updatedEvent = {}
        updatedEvent.endTime = event.end
        updatedEvent.startTime = event.start
        $http.put(serverApi + '/secured/appointment/'+event.eventId,updatedEvent).success(function (res) {
            if (!res.error) {

              //  $scope.loadAppointment()
            }
            else {
               alert(res)
            }
        }).error(function (data, status, headers, config) {
        })

    };

    $scope.loadAppointment=function(){
        console.log("patientAppointmentCalendarCtrl")
        $http.get(serverApi + '/secured/appointment/patient/' + $rootScope.USER.patient._id).success(function (res) {
            if (!res.error) {

                $scope.events.events= []
                $scope.appointments = res;
                console.dir(res)
                res.forEach(function (appoint) {
                    $timeout(function(){
                        $scope.$apply(function(){
                            console.log("push app")

                            $scope.events.events.push({
                                title: appoint.subject,
                                start: appoint.startTime,
                                end: appoint.endTime,
                                details: appoint.details,

                                eventId: appoint._id,
                                className: ['openSesame'],
                                allDay: true
                            });
                        });

                    });

                })




            }
            else {
                //error(res);
            }
        }).error(function (data, status, headers, config) {
        })
    }
    $scope.loadAppointment()
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