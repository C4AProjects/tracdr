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
//http://169.54.30.34:3000
                $http.post(serverApi+'/login/', user).success(function (res) {
                    if (!res.error) {
                        changeUser(res);
                        $window.sessionStorage.token = res.token;
                        window.localStorage.setItem("user", JSON.stringify(res));
                        success(res);
                    }
                    else {
                        error(res);
                    }
                }).error(function (data, status, headers, config) {
                    // Erase the token if the user fails to log in

                    delete $window.sessionStorage.token; })
            }, logout: function ( success, error) {



                    delete $window.sessionStorage.token; ;
            },
            registerPAtient: function (user, success, error) {

                $http.post(serverApi + '/register/patient/', user).success(function (res) {
                    if (!res.error) {
                        changeUser(res);
                        $window.sessionStorage.token = res.token;
                        window.localStorage.setItem("user", JSON.stringify(res));
                        success(res);
                    }
                    else {
                        error(res);
                    }
                }).error(error);
            },
            registerDoctor: function (user, success, error) {

                $http.post(serverApi + '/register/doctor/', user).success(function (res) {
                    if (!res.error) {
                        changeUser(res);
                        $window.sessionStorage.token = res.token;
                        window.localStorage.setItem("user", JSON.stringify(res));
                        success(res);
                    }
                    else {
                        error(res);
                    }
                }).error(error);
            }

            ,getUser:function(){
                return user;
            }


        };
    })   .factory('Patients', function ($http,$window) {

    return {

            getAll: function (success, error) {

                $http.get(serverApi + '/secured/patient/').success(function (res) {
                    if (!res.error) {

                        success(res);
                    }
                    else {
                        error(res);
                    }
                }).error(function (data, status, headers, config) {
                   })
            },       getMesPatient: function (id,success, error) {

            $http.get(serverApi + '/secured/patient/doctor/'+id).success(function (res) {
                if (!res.error) {

                    success(res);
                }
                else {
                    error(res);
                }
            }).error(function (data, status, headers, config) {
            })
        }


        };
    }) .factory('Appointments', function ($http,$window) {

        return {
            getMy: function (id,success, error) {

                $http.get(serverApi + '/secured/appointment/doctor/'+id).success(function (res) {
                    if (!res.error) {

                        success(res);
                    }
                    else {
                        error(res);
                    }
                }).error(function (data, status, headers, config) {
                })
            },
            getAll: function (success, error) {

                $http.get(serverApi + '/secured/appointment/').success(function (res) {
                    if (!res.error) {

                        success(res);
                    }
                    else {
                        error(res);
                    }
                }).error(function (data, status, headers, config) {
                })
            }, update: function (id,app,success, error) {

                $http.put(serverApi + '/secured/appointment/'+id,app).success(function (res) {
                    if (!res.error) {

                        success(res);
                    }
                    else {
                        error(res);
                    }
                }).error(function (data, status, headers, config) {
                })
            }, add: function (app,success, error) {

                $http.post(serverApi + '/secured/appointment/',app).success(function (res) {
                    if (!res.error) {

                        success(res);
                    }
                    else {
                        error(res);
                    }
                }).error(function (data, status, headers, config) {
                })
            }


        };
    }).factory('Doctors', function ($http,$window) {

        return {

            getAll: function (success, error) {

                $http.get(serverApi + '/secured/doctor/').success(function (res) {
                    if (!res.error) {

                        success(res);
                    }
                    else {
                        error(res);
                    }
                }).error(function (data, status, headers, config) {
                })
            }, find: function (name,success, error) {

                $http.post(serverApi + '/secured/doctor/find/'+name,{}).success(function (res) {
                    if (!res.error) {

                        success(res);
                    }
                    else {
                        error(res);
                    }
                }).error(function (data, status, headers, config) {
                })
            }, add: function (app,success, error) {

                $http.post(serverApi + '/secured/doctor/',app).success(function (res) {
                    if (!res.error) {

                        success(res);
                    }
                    else {
                        error(res);
                    }
                }).error(function (data, status, headers, config) {
                })
            }


        };
    }) .factory('Appointments', function ($http,$window) {

        return {

            getAll: function (success, error) {

                $http.get(serverApi + '/secured/appointment/').success(function (res) {
                    if (!res.error) {

                        success(res);
                    }
                    else {
                        error(res);
                    }
                }).error(function (data, status, headers, config) {
                })
            }, update: function (id,app,success, error) {

                $http.put(serverApi + '/secured/appointment/'+id,app).success(function (res) {
                    if (!res.error) {

                        success(res);
                    }
                    else {
                        error(res);
                    }
                }).error(function (data, status, headers, config) {
                })
            }, add: function (app,success, error) {

                $http.post(serverApi + '/secured/appointment/',app).success(function (res) {
                    if (!res.error) {

                        success(res);
                    }
                    else {
                        error(res);
                    }
                }).error(function (data, status, headers, config) {
                })
            }


        };
    }).factory('authInterceptor', function ($rootScope, $q, $window) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                }
                return config;
            },
            response: function (response) {

                console.log("status  "+response)
                if (response.status === 401) {
                    // handle the case where the user is not authenticated
                    console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
                }
                return response || $q.when(response);
            }
        };
    }).config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });