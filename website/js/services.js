/**
 * Created by haythem on 15/03/2015.
 */
angular.module('trackDr-services', [])
    .factory('Auth', function ($http,$window) {

        var user = {};

        function changeUser(user1) {
            angular.extend(user, user1);
        }

        return {

            login: function (user, success, error) {

                $http.post(serverApi + '/signin/', user).success(function (res) {
                    if (!res.error) {
                        changeUser(res);
                        $window.sessionStorage.token = res.token;
                        window.localStorage.setItem("user", JSON.stringify(res));
                        success(res);
                    }
                    else {
                        success(res);
                    }
                }).error(function (data, status, headers, config) {
                    // Erase the token if the user fails to log in

                    delete $window.sessionStorage.token; error();})
            }


        };
    })