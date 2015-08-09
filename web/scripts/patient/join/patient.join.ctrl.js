/**
 * Project: tracdr
 * Created by Haythem Horbit on 08/08/15.
 */
/**
 * Project: tracdr
 * Created by Haythem Horbit on 06/08/15.
 */
APP.controller('patientJoinCtrl', function ($scope, $state,$rootScope,$animate,registerService,Notification,$http) {
    $scope.search={}
    $scope.user={}
    $scope.join={}
    $scope.doctor={}
    $scope.join.notfound=false;
    $scope.registerPAtient=function(){

        $scope.user.country= "USA"
        registerService.registerPAtient($scope.user, function (res) {

            if ( $scope.join.notfound){
                //post  $scope.doctor={}
                //add the new doctor
                console.log("create nex doc")
                console.log( $scope.doctor)
                $http.post(serverApi + '/secured/doctor/'+res.patient._id, $scope.doctor).success(function(data) {
                    console.log(data)
                });
            }else{


                //   app.post("/api/secured/doctor/:docID/patien/:patientID", function(req, res){
                $http.post(serverApi + '/secured/doctor/'  +$scope.selectedDoctor._id+'/patien/'+res.patient._id, $scope.selectedDoctor).success(function(data) {
                    console.log(data)
                });
            }

            $state.go("index")
        },    function (err) {

            Notification.error({message:err.error})
        })
    }
    $scope.results=[]
    $scope.findDoctor=function(typed){
        if (typed && typed.length>0)
        $http.post(serverApi + '/secured/doctor/find/'+typed,{}).success(function(data) {
            // update the textarea
            $scope.results=data.doctor;
        });
    }

    $scope.label = function(item) {
        if (!item) return;
        return item.firstName + ' ' +item.lastName + '(' + item.specialty+ ')';
    };
    $scope.selectedDoctor={}
$scope.selectDoctor=function(item){

    $scope.selectedDoctor=item;
}
    $scope.deleteSearch=function(){

        $scope.search.query=""
        $scope.selectedDoctor={}
    }


})