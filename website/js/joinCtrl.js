/**
 * Created by haythem on 15/03/2015.
 */
trackDr.controller('joinCtrl', function ($scope,Auth,$state,$http,Doctors){
    $scope.user={}

    $scope.join={};
    $scope.doctor={}
    $scope.join.notfound=false;
    $scope.registerPAtient = function () {

        $scope.user.country= "USA"
        Auth.registerPAtient($scope.user, function (res) {

            if ( $scope.join.notfound){
                //post  $scope.doctor={}
                //add the new doctor

                $http.post(serverApi + '/secured/doctor/'+res.patient._id, $scope.doctor).success(function(data) {
                    console.log(data)
                });
            }else{

                //   app.post("/api/secured/doctor/:docID/patien/:patientID", function(req, res){
                $http.post(serverApi + '/secured/doctor/'  +$scope.doctor._id+'/patien/'+res.patient._id, $scope.doctor).success(function(data) {
                    console.log(data)
                });
            }

            $state.go("patient")
        },    function (err) {
         alert(err.error)
        })
    }
 //   $scope.join.searchStr="oooooooooooooooo"
    $scope.$watch('join.searchStr', function (tmpStr)
    {
        if (!tmpStr || tmpStr.length == 0)
            return 0;
        setTimeout(function() {

            // if searchStr is still the same..
            // go ahead and retrieve the data
            if (tmpStr === $scope.join.searchStr)
            {
                $http.post(serverApi + '/secured/doctor/find/'+tmpStr,{}).success(function(data) {
                    // update the textarea
                    $scope.searchresult=data.doctor;
                });
            }
        }, 1000);
    });

    $scope.registerDoctor=function(){
        Auth.registerDoctor($scope.user, function (res) {



            $state.go("doctor")
        },    function (err) {
            alert(err.error)
        })
    }

    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
$scope.selectDoctor=function(doc){
    $scope.doctor={}
    $scope.doctor._id=doc._id;
    $scope.join.notfound=false;
}

})