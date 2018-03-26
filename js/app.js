angular.module('myApp', [
	'ngRoute',
	'ngTouch',	
	'ngSanitize',
	'myApp.login',
	'myApp.services',
	'myApp.playlist',
])
.run(function($rootScope, $location,$window){

	$rootScope.getCookie = function(name){
		var cookieValue = null;
      	if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
      	}
    	return cookieValue;
	}

	$rootScope.getUserId = function(){
		return parseInt($window.localStorage.getItem("user_id"));
	}

	$rootScope.getToken = function(){
		return $window.localStorage.getItem("token");
	}

	$rootScope.authenticate = function() {
		if ($rootScope.getToken() == "") {
			$location.path("/login");
		}
		else{
			$location.path("/playlist/");
		}
	}
})

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
		$locationProvider.hashPrefix('!');
		$routeProvider.otherwise({redirectTo: '/login'});
	}])