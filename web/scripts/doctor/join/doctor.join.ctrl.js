/**
 * Project: tracdr
 * Created by Haythem Horbit on 06/08/15.
 */
APP.controller('doctorJoinCtrl', function ($scope, $state,$rootScope,$animate,registerService,Notification) {
    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }
    $scope.registerDoctor=function(){
        if (!validateEmail($scope.user.email)){
            Notification.error({message:"Email invalid"});
            return;
        }

        registerService.registerDoctor($scope.user, function (res) {


            $state.go("index")
            Notification({message: "Account created, please check your email to validate inscription"});
        },    function (err) {

            Notification.error({message: err.error});
        })
    }
})