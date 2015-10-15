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
    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        console.log(re.test(email))
        return re.test(email);
    }
    $scope.goToStep2=function(){
        if (! $scope.user.firstName ){
            Notification.error({message:"Please Fill your First Name"})
            return ;
        }

        if (! $scope.user.lastName ){
            Notification.error({message:"Please Fill your Last Name"})
            return ;
        }

        if (! $scope.user.email ){
            Notification.error({message:"Please Fill your Email"})
            return ;
        }
        if (!validateEmail($scope.user.email)){
            Notification.error({message:"Email invalid"});
            return;
        }

        $state.go('join.patient.step2')
    }
    $scope.registerPAtient=function(){

        if (! $scope.user.password ){
            Notification.error({message:"Please Fill your password"})
            return ;
        }
        if ($scope.user.password!= $scope.user.confirmPassword){
            Notification.error({message:"Please confirm your password"})
            return ;
        }

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