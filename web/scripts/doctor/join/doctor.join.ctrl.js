/**
 * Project: tracdr
 * Created by Haythem Horbit on 06/08/15.
 */
APP.controller('doctorJoinCtrl', function ($scope, $state,$rootScope,$animate,registerService,Notification) {
    $scope.registerDoctor=function(){
        registerService.registerDoctor($scope.user, function (res) {



            $state.go("index")
            Notification({message: "Account created, please check your email to validate inscription"});
        },    function (err) {

            Notification.error({message: err.error});
        })
    }
})