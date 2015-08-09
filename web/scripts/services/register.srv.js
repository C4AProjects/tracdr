/**
 * Project: tracdr
 * Created by Haythem Horbit on 06/08/15.
 */

APP .factory('registerService', function ($http,$window,ApiServer,$rootScope,DataService) {
    var service={};
    service.registerDoctor= function (user, success, error) {

        $http.post(serverApi + '/register/doctor/', user).success(function (res) {
            console.log("hhhhh")
            if (!res.error) {


                success(res);
            }
            else {
                error(res);
            }
        }).error(error);
    }
    service.registerPAtient= function (user, success, error) {

        $http.post(serverApi + '/register/patient/', user).success(function (res) {
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