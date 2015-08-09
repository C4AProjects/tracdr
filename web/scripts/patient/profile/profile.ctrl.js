/**
 * Project: tracdr
 * Created by Haythem Horbit on 09/08/15.
 */
/**
 * Project: tracdr
 * Created by Haythem Horbit on 06/08/15.
 */
APP.controller('patientProfileCtrl', function ($scope, $state,$rootScope,$animate,registerService,Notification,$http,ngDialog) {


    $scope.updateProfile=function(){
        $http.put(serverApi + '/secured/patient/'+$rootScope.USER.patient._id,$rootScope.USER.patient).success(function (res) {
            if (!res.error) {

                Notification({message:"Profile Info Updated"})
            }
            else {
                Notification.error({message:res.error})
            }
        }).error(function (data, status, headers, config) {
        })
    }
})