/**
 * Project: tracdr
 * Created by Haythem Horbit on 09/08/15.
 */
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
APP.controller('doctorAppointmentListCtrl', function ($scope, $state,$rootScope,$animate,registerService,Notification,$http,ngDialog,$timeout) {

    $scope.loadAppointment=function(){
        $scope.appointments=[]
        $http.get(serverApi + '/secured/appointment/doctor1/' + $rootScope.USER.doctor._id).success(function (res) {
            if (!res.error) {


                $scope.appointments = res;
                $scope.appointments.forEach(function(app){
                    app.fromNow= moment(app.startTime).fromNow();

                    var isDate = new Date(app.status) !== "Invalid Date" && !isNaN(new Date(app.status))
                    if(isDate)
                        app.fromStatusNow= moment(app.status).fromNow();
                })




            }
            else {
                //error(res);
            }
        }).error(function (data, status, headers, config) {
        })
    }
    $scope.loadAppointment()

    $scope.getStatus = function(app) {

        var status="ontime"
        if (!app.status){
           if(new Date(app.startTime)< (new Date())){
                status="finished"
            }
        }
        else{
            status="reported"
        }

return status
    };
    $scope.edit=function(doc){
        ngDialog.openConfirm({ template: 'scripts/doctor/appointment/appointment.report.tpl.html',overlay:false ,showClose:false,
            controller: 'appEditCtrl' ,data:{doc:doc}}).then(function (value) {
            console.log(value)
            if (value.status=='reported'){
                doc.status=value.event.date;//value.status
                doc.status.setHours(value.event.start.getHours(),value.event.start.getMinutes());
            }else{
                doc.status=null;
            }

            $http.put(serverApi + '/secured/appointment/'+doc._id,doc).success(function (res) {
                if (!res.error) {

                      $scope.loadAppointment()
                }
                else {
                    alert(res)
                }
            }).error(function (data, status, headers, config) {
            })

        })
    }

})