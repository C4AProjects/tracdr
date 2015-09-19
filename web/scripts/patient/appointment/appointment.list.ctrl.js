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
APP.controller('patientAppointmentListCtrl', function ($scope, $state,$rootScope,$animate,registerService,Notification,$http,ngDialog,$timeout) {

    $scope.loadAppointment=function(){
        console.log("j")
        $http.get(serverApi + '/secured/appointment/patient/' + $rootScope.USER.patient._id).success(function (res) {
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

})