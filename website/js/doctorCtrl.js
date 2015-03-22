/**
 * Created by haythem on 20/03/2015.
 */
trackDr.controller('doctorCtrl', function ($scope,Auth,$filter,Patients,Appointments,uiCalendarConfig, $modal){
    $scope.active='patients',
        $scope.dashboard={};
    $scope.user = Auth.getUser().doctor;

        Patients.getAll(function(res,err){
            if (res){
                $scope.patients =res;
            }
        })

    $scope.events = {
        color: '#0078ba',
        textColor: 'white',
        events: [
        ]
    };
    $scope.eventSources = [  $scope.events];
    Appointments.getAll(function(res,err){
        if (res){
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
          //  $scope.eventSources = [  $scope.events];

        }
    })
    $scope.selectPatient = function(id){
        $scope.patient = $filter('filter')($scope.patients, {_id: id}, true)[0];
    };

    $scope.selectAppointment = function(id){
        $scope.appointment = $filter('filter')($scope.appointments, {_id: id}, true)[0];
    };

    $scope.selectNotification = function(id){
        $scope.patient = $filter('filter')($scope.patients, {_id: id}, true)[0];
    };
    $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       console.log(event)
        console.log(delta)
        var updatedEvent={}
        updatedEvent.endTime=event.end
        updatedEvent.startTime=event.start

        Appointments.update(event.eventId,updatedEvent,function(res){
            console.log("updated");
//
     console.log( $filter('filter')($scope.appointments, {_id: event.eventId}, true)[0])

        },function(err){alert(err)})
    };

    $scope.alertEventOnClick= function(start, end, allDay, jsEvent) {
       $scope. open('lg',start)
    }
    /* alert on eventClick */

    $scope.uiConfig = {
        calendar:{
            height: 450,
            editable: true,
            header:{
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
    $scope.items = ['item1', 'item2', 'item3'];
    /* event sources array*/
    $scope.open = function (size,date) {

        var modalInstance = $modal.open({
            templateUrl: 'views/doctor/add_appointment.html',
           controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                obj: function () {
                    return {itmes:$scope.items,patients:  $scope.patients,date:date};
                }
            }
        });

        modalInstance.result.then(function (event) {
if(event){
    event._doctor=$scope.user._id;

    Appointments.add(event,function(res){
        console.log("added");
        $scope.appointments.push(res.appointment)


        $scope.events.events.push({
            title:res.appointment.subject,
            start: res.appointment.startTime,
            end:  res.appointment.endTime,
            details:  res.appointment.details,

            eventId:res.appointment._id,
            className: ['openSesame'],
            allDay: false
        });

    },function(err){alert(err)})

}
        }, function () {

        });
    };
}).controller('ModalInstanceCtrl', function ($scope, $modalInstance, obj,$filter) {
    $scope.patient={}
    $scope.event={}
    $scope.modal={}
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
    $scope.patients= obj.patients;
    $scope.selected = {
        item: $scope.items[0]
    };
    $scope.selectPatient = function(id){
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

        if ($scope.patient._id){
        $scope.event={}
        $scope.event.startTime=$scope.modal.start;
        $scope.event.endTime=$scope.modal.end;
        $scope.event.details=$scope.modal.details
        $scope.event.subject=$scope.modal.subject
        $scope.event._patient=$scope.patient._id
        $modalInstance.close($scope.event);
        }else{
            alert("Please select a Patient")
        }
    };
});