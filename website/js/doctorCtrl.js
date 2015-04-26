/**
 * Created by haythem on 20/03/2015.
 */
trackDr.controller('doctorCtrl', function ($scope, Auth, $filter, Patients,$timeout, Appointments, uiCalendarConfig, $modal, $http, $state,DTOptionsBuilder, DTColumnBuilder,$dialogs) {
    $scope.active = 'patients',
        $scope.dashboard = {};
    $scope.notifications = {};
    $scope.user = Auth.getUser().doctor;
    if (!Auth.getUser().doctor) $state.go("index");
    Patients.getMesPatient($scope.user._id, function (res, err) {
        if (res) {
            $scope.patients = res;
        }
    })
    $scope.updateProfile=function(){
        $http.put(serverApi + '/secured/doctor/'+$scope.user._id,$scope.user).success(function (res) {
            if (!res.error) {


                console.log("x")
                console.log(res)
            }
            else {
                //error(res);
            }
        }).error(function (data, status, headers, config) {
        })
    }
    $scope.events = {
        color: '#0078ba',
        textColor: 'white',
        events: []
    };
    $scope.eventSources = [$scope.events];
    $scope.logout = function () {
        Auth.logout();
        $state.go("index");
    }
    $scope.removeApp=function(id){
        var       dlg = $dialogs.confirm("Are you sure to delet this Appointment" ,"Are you sure to delet this Appointment" );
        dlg.result.then(function(btn){
            $http.delete(serverApi + '/secured/appointment/' + id).success(function (res) {
                if(res) $scope.loadAppointment();
            })
        },function(btn){
           console.log("cancel delete")
        });

    }
$scope.loadAppointment=function(){
    $http.get(serverApi + '/secured/appointment/doctor1/' + $scope.user._id).success(function (res) {
        if (!res.error) {

            $scope.events.events= []
                    $scope.appointments = res;
                    res.forEach(function (appoint) {
                        console.log("pushing events")
                        $scope.events.events.push({
                            title: appoint.subject,
                            start: appoint.startTime,
                            end: appoint.endTime,
                            details: appoint.details,

                            eventId: appoint._id,
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
}
    $scope.loadAppointment()
    $http.get(serverApi + '/secured/notification/doctor/' + $scope.user._id).success(function (data) {
        // update the textarea
        $scope.notifications = data;
    });
    $scope.selectPatient = function (id) {
        $scope.patient = $filter('filter')($scope.patients, {_id: id}, true)[0];
    };

    $scope.selectAppointment = function (id) {
        $scope.appointment = $filter('filter')($scope.appointments, {_id: id}, true)[0];
    };

    $scope.selectNotification = function (id) {
        $scope.snotif = $filter('filter')($scope.notifications, {_id: id}, true)[0];
    };
    $scope.alertOnDrop = function (event, delta, revertFunc, jsEvent, ui, view) {
        console.log(event)
        console.log(delta)
        var updatedEvent = {}
        updatedEvent.endTime = event.end
        updatedEvent.startTime = event.start

        Appointments.update(event.eventId, updatedEvent, function (res) {
            console.log("updated");
//
            console.log($filter('filter')($scope.appointments, {_id: event.eventId}, true)[0])
            $scope.loadAppointment()
        }, function (err) {
            alert(err)
        })
    };

    $scope.alertEventOnClick = function (start, end, allDay, jsEvent) {
        $scope.open('lg', start)
    }
    /* alert on eventClick */

    $scope.uiConfig = {
        calendar: {
            height: 450,
            editable: true,
            header: {
                left: 'month agendaWeek',
                center: 'title',
                right: 'today prev,next'
            },
            eventClick: $scope.alertOnEventClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnDrop,
            eventRender: $scope.eventRender,
            dayClick: $scope.alertEventOnClick

        }
    };


    $scope.dtOptions = DTOptionsBuilder.fromSource(serverApi+'/secured/patient/doctor/'+$scope.user._id)
        .withPaginationType('full_numbers');
    $scope.dtColumns = [
        DTColumnBuilder.newColumn('firstName').withTitle('First Name'),
        DTColumnBuilder.newColumn('lastName').withTitle('Last name'),
        DTColumnBuilder.newColumn('gender').withTitle('Gender'),
        DTColumnBuilder.newColumn('dateOfBirth').withTitle('Date of Birth'),
        DTColumnBuilder.newColumn('state').withTitle('State'),
            DTColumnBuilder.newColumn('email').withTitle('Email')
    ];


    $scope.items = ['item1', 'item2', 'item3'];
    /* event sources array*/

    $scope.addPatient = function () {
        var modaladd = $modal.open({
            templateUrl: 'views/doctor/add_patient.html',
            controller: 'addPatientCtrl',
            size: 'lg',
            resolve: {
                obj: function () {
                    return {doctor: $scope.user};
                }
            }
        });
        modaladd.result.then(function (event) {
            if (event) {
                $scope.patients.push(event)
            }}
        )
    }
    $scope.open = function (size, date) {

        var modalInstance = $modal.open({
            templateUrl: 'views/doctor/add_appointment.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                obj: function () {
                    return {itmes: $scope.items, patients: $scope.patients, date: date};
                }
            }
        });

        modalInstance.result.then(function (event) {
            if (event) {
                event._doctor = $scope.user._id;

                Appointments.add(event, function (res) {
                    console.log("added");
                  /*  $scope.appointments.push(res.appointment)


                    $scope.events.events.push({
                        title: res.appointment.subject,
                        start: res.appointment.startTime,
                        end: res.appointment.endTime,
                        details: res.appointment.details,

                        eventId: res.appointment._id,
                        className: ['openSesame'],
                        allDay: false
                    });*/
                    $scope.loadAppointment()
                }, function (err) {
                    alert(err)
                })

            }
        }, function () {

        });
    };
}).controller('ModalInstanceCtrl', function ($scope, $modalInstance, obj, $filter) {
    $scope.patient = {}
    $scope.event = {}
    $scope.modal = {}
    $scope.modal.start = new Date();
    $scope.modal.end = new Date();
    $scope.hstep = 1;
    $scope.mstep = 1;

    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };
    $scope.changed = function () {
        //$log.log('Time changed to: ' + $scope.mytime);
    };
    $scope.date = obj.date;
    $scope.items = obj.itmes;
    $scope.patients = obj.patients;
    $scope.selected = {
        item: $scope.items[0]
    };
    $scope.selectPatient = function (id) {
        $scope.patient = $filter('filter')($scope.patients, {_id: id}, true)[0];
    };


    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.ok = function () {

        $scope.modal.start.setFullYear(obj.date.getFullYear())
        $scope.modal.start.setMonth(obj.date.getMonth())
        $scope.modal.start.setDate(obj.date.getDate())

        $scope.modal.end.setFullYear(obj.date.getFullYear())
        $scope.modal.end.setMonth(obj.date.getMonth())
        $scope.modal.end.setDate(obj.date.getDate())

        if ($scope.patient._id) {
            $scope.event = {}
            $scope.event.startTime = $scope.modal.start;
            $scope.event.endTime = $scope.modal.end;
            $scope.event.details = $scope.modal.details
            $scope.event.subject = $scope.modal.subject
            $scope.event._patient = $scope.patient._id
            $modalInstance.close($scope.event);
        } else {
            alert("Please select a Patient")
        }
    };
})
    .controller('addPatientCtrl', function ($scope, $modalInstance, obj, $filter,Auth,$http) {
$scope.nuser={};
    $scope.doctor = obj.doctor;
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.ok = function () {
        $scope.nuser.userName=$scope.nuser.firstName;
        Auth.registerPAtient($scope.nuser, function (res) {



                //   app.post("/api/secured/doctor/:docID/patien/:patientID", function(req, res){
                $http.post(serverApi + '/secured/doctor/'  +$scope.doctor._id+'/patien/'+res.patient._id, $scope.doctor).success(function(data) {
                    console.log(data)
                });


            $modalInstance.close(res.patient);
        },    function (err) {
            alert(err.error)
        })

    }
}).controller('WithAjaxCtrl', WithAjaxCtrl);

function WithAjaxCtrl(DTOptionsBuilder, DTColumnBuilder) {

}