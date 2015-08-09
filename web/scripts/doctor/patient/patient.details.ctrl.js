/**
 * Project: tracdr
 * Created by Haythem Horbit on 08/08/15.
 */
APP.controller('patientDetailsCtrl', function ($scope, $state,$rootScope,$animate,registerService,Notification,$http,$stateParams) {
//$stateParams
    $scope.patient={}


    $scope.loadPatient=function(){
        $http.get(serverApi + '/secured/patient/'+$stateParams.ID).success(function (res) {
            if (!res.error) {

                $scope.patient=res;
            }
            else {
                Notification.error({message:res.error})
            }
        }).error(function (data, status, headers, config) {
        })
    }
    $scope.loadPatient()



    $scope.loadAppointment=function(){
        $http.get(serverApi + '/secured/appointment/patient/' +$stateParams.ID).success(function (res) {
            if (!res.error) {


                $scope.appointments = res;
                $scope.appointments.forEach(function(app){
                    app.fromNow= moment(app.startTime).endOf('day').fromNow();
                })




            }
            else {
                //error(res);
            }
        }).error(function (data, status, headers, config) {
        })
    }
    $scope.loadAppointment()
})