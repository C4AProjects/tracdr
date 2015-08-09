/**
 * Project: tracdr
 * Created by Haythem Horbit on 06/08/15.
 */
/**
 * Project: tracdr
 * Created by Haythem Horbit on 06/08/15.
 */
APP.controller('doctorAppointmentCtrl', function ($scope, $state,$rootScope,$animate,registerService,Notification,$http,ngDialog,$timeout) {

    $scope.addAppointment=function(){
        ngDialog.openConfirm({ template: 'scripts/doctor/appointment/appointment.add.tpl.html',overlay:false ,showClose:false,
            controller: 'doctorAppointmentAddCtrl' }).then(function (value) {
            console.log(value)

            if (!value._patient){
                Notification.error({message:"Please Select a Patient"})
            }else{
                value.startTime.setFullYear(value.date.getFullYear())
                value.startTime.setMonth(value.date.getMonth())
                value.startTime.setDate(value.date.getDate())

                value.endTime.setFullYear(value.date.getFullYear())
                value.endTime.setMonth(value.date.getMonth())
                value.endTime.setDate(value.date.getDate())

                $http.post(serverApi + '/secured/appointment/',value).success(function (res) {
                    if (!res.error) {

                        Notification({message:"Appointment Saved"})
                        //    $scope.loadAppointment();



                        $rootScope.$broadcast('appointmenAdded', { message: "" });




                    }
                    else {
                        Notification.error({message:res.error})
                    }
                }).error(function (data, status, headers, config) {
                })
            }






        }, function (reason) {

        });
    }
})