/**
 * Created by haythem on 15/03/2015.
 */
trackDr.controller('joinCtrl', function ($scope,Auth,$state,$http){
    $scope.user={}
    $scope.join={};
    $scope.doctor={}
    $scope.join.notfound=false;
    $scope.registerPAtient = function () {

        Auth.registerPAtient($scope.user, function (res) {

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
$scope.selectDoctor=function(doc){
    $scope.doctor={}
    $scope.doctor._id=doc._id;
    $scope.join.notfound=false;
}

})