
APP .factory('LoginService', function ($http,$window,ApiServer,$rootScope,DataService) {
    var service={};
    service.login=function (user,success,error){
        $http.post(serverApi+'/login/', user).success(function (res) {
            if (!res.error) {
                $rootScope.USER=res;
                $window.sessionStorage.token = res.token;
                $window.sessionStorage.user = JSON.stringify(res);
                DataService.setLogged(true)
                success(res);
            }
            else {
                error(res);
            }
        }).error(function (data, status, headers, config) {
            // Erase the token if the user fails to log in

            delete $window.sessionStorage.token; })
    }
    service.logout=function(){
        delete $window.sessionStorage.user;
        delete $window.sessionStorage.token;
        DataService.setLogged(false)
    }
    service. forget= function (user, success, error) {

        $http.post(serverApi + '/forget/', user).success(function (res) {
            if (!res.error) {

                success(res);
            }
            else {
                error(res);
            }
        }).error(error);
    }
    return service;

})