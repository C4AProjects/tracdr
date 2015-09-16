/**
 * Project: tracdr
 * Created by Haythem Horbit on 09/08/15.
 */
/**
 * Project: tracdr
 * Created by Haythem Horbit on 06/08/15.
 */
APP.controller('patientProfileCtrl', function ($scope, $state,$rootScope,$animate,registerService,Notification,$http,ngDialog,$window,Upload) {

$scope.xx={}
    $scope.updateProfile=function(){
console.log($scope.xx.filex)
        if ($scope.xx.filex){

            $scope.upload($scope.xx.filex,function(){
                // delete $rootScope.USER.doctor["profilePhoto"]
                $http.put(serverApi + '/secured/patient/'+$rootScope.USER.patient._id,$rootScope.USER.patient).success(function (res) {
                    if (!res.error) {

                        Notification({message:"Profile Info Updated"})
                        if (res.doctor) {

                            $window.sessionStorage.user = JSON.stringify({doctor:res.doctor});
                        }
                        if (res.patient){
                            $window.sessionStorage.user = JSON.stringify({patient:res.patient});
                        }
                    }
                    else {
                        Notification.error({message:res.error})
                    }
                }).error(function (data, status, headers, config) {
                })
            });
            Notification({message:"Profile Photo Uploaded"})
        }
        else{

            $http.put(serverApi + '/secured/patient/'+$rootScope.USER.patient._id,$rootScope.USER.patient).success(function (res) {
                if (!res.error) {

                    Notification({message:"Profile Info Updated"})
                    if (res.doctor) {

                        $window.sessionStorage.user = JSON.stringify({doctor:res.doctor});
                    }
                    if (res.patient){
                        $window.sessionStorage.user = JSON.stringify({patient:res.patient});
                    }
                }
                else {
                    Notification.error({message:res.error})
                }
            }).error(function (data, status, headers, config) {
            })
        }

    }

    $scope.upload = function (file,cb) {
        Upload.upload({
            url: 'http://localhost:3000/api/patient/photo/'+$rootScope.USER.patient._id,
            fields: {'username': $scope.username},
            file: file
        }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        }).success(function (data, status, headers, config) {
            console.dir(data)
            $rootScope.USER.patient.profilePhoto=data.file;
            cb();

        }).error(function (data, status, headers, config) {
            console.log('error status: ' + status);
        })
    };
})