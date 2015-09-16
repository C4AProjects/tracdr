/**
 * Project: tracdr
 * Created by Haythem Horbit on 09/08/15.
 */
/**
 * Project: tracdr
 * Created by Haythem Horbit on 06/08/15.
 */
APP.controller('doctorProfileCtrl', function ($scope, $state,$rootScope,$animate,registerService,Notification,$http,ngDialog,$window,Upload) {


    $scope.updateProfile=function(){
        if ($scope.file){
            $scope.upload($scope.file,function(){
              // delete $rootScope.USER.doctor["profilePhoto"]
                $http.put(serverApi + '/secured/doctor/'+$rootScope.USER.doctor._id,$rootScope.USER.doctor).success(function (res) {
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
            $http.put(serverApi + '/secured/doctor/'+$rootScope.USER.doctor._id,$rootScope.USER.doctor).success(function (res) {
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



    // upload on file select or drop
    $scope.upload = function (file,cb) {
        Upload.upload({
            url: 'http://localhost:3000/api/doctor/photo/55cbc2da7c719fec70764a62',
            fields: {'username': $scope.username},
            file: file
        }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        }).success(function (data, status, headers, config) {
console.dir(data)
            $rootScope.USER.doctor.profilePhoto=data.file;
            cb();

        }).error(function (data, status, headers, config) {
            console.log('error status: ' + status);
        })
    };


})