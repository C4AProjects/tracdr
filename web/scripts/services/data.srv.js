/**
 * Project: tracdr
 * Created by Haythem Horbit on 06/08/15.
 */
APP.factory('DataService', function ($window,$state,$location,$rootScope) {
    var service={};
    var user= {}

    var token;
    var loggedIn=false;
    $rootScope.loggedIn=false
console.log("testing if session existx")
    if ($window.sessionStorage.token &&  $window.sessionStorage.user){

        user= JSON.parse($window.sessionStorage.user);
        $rootScope.USER=user
        $rootScope.loggedIn=true
        loggedIn=true
      //  $location.path("/dashboard");
        console.log("logged in")
        //$state.go('dashboard')
    }


    service.getUser=function(){
        return user
    }
    service.setUser=function(usr){
        // $window.sessionStorage.user = usr;
        user=usr;
    }


    service.getToken=function(){
        return token
    }
    service.setToken=function(tkn){
        token=tkn;
    }
    service.setLogged=function(logged){
        loggedIn=logged;
        $rootScope.loggedIn=logged
    }
    service.isLogged=function(){
        return loggedIn;
    }






    return service;
})