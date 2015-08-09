/**
 * Project: tracdr
 * Created by Haythem Horbit on 06/08/15.
 */
APP.controller('headerCtrl', function ($scope, $state,$rootScope,$animate,LoginService) {

$scope.logout=function(){
    LoginService.logout();
    $state.go("index")
}
})