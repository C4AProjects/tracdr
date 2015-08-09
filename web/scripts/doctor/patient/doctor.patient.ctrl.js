/**
 * Project: tracdr
 * Created by Haythem Horbit on 06/08/15.
 */
APP.controller('doctorPatientCtrl', function ($scope, $state,$rootScope,$animate,registerService,Notification,$http,ngDialog) {
$scope.patiens=[]
    $scope.loadPatients=function(){
        $http.get(serverApi + '/secured/patient/doctor/'+$rootScope.USER.doctor._id).success(function (res) {
            if (!res.error) {

                $scope.patiens=res;
            }
            else {
                Notification.error({message:res.error})
            }
        }).error(function (data, status, headers, config) {
        })
    }

   $scope.loadPatients()

    $scope.results=[]
    $scope.findDoctorPatient=function(typed){
        if (typed && typed.length>0)
            $http.get(serverApi + '/secured/doctor/'+$rootScope.USER.doctor._id +'/patient/find/'+typed,{}).success(function(data) {
                // update the textarea
                $scope.results=data;
                console.log(data)
            });
    }
    $scope.label = function(item) {
        if (!item) return;
        return item.firstName + ' ' +item.lastName + '(' + item.email+ ')';
    };
    $scope.selectPatient = function(item) {
        if (!item) return;
        $state.go("doctor.patientDetails",{ID:item._id})
    };

    $scope.addPatient=function(){
        ngDialog.openConfirm({ template: 'scripts/doctor/patient/patient.add.tpl.html',overlay:false ,showClose:false,
            controller: ['$scope', function($scope) {
            // controller logic
            $scope.title="Delete Driver"
            $scope.message="Are you sure to delete this driver"
        }] }).then(function (value) {


            registerService.registerPAtient(value, function (res) {




                    //   app.post("/api/secured/doctor/:docID/patien/:patientID", function(req, res){
                    $http.post(serverApi + '/secured/doctor/'  +$rootScope.USER.doctor._id+'/patien/'+res.patient._id, $rootScope.USER.doctor).success(function(data) {
                        console.log(data)
                    });

                $scope.loadPatients()

            },    function (err) {

                Notification.error({message:err.error})
            })





        }, function (reason) {

        });
    }
})