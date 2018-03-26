'use strict';
angular.module('myApp.login', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/login', {
		templateUrl: 'pages/login/login.html',
		controller: 'loginCtrl',
		resolve:{
		    "check":function($rootScope,$location){
		        $rootScope.authenticate();
		    }
    	}
	});
}])
.controller('loginCtrl', [ '$scope', '$rootScope','$location','mplayerAPIservice','$window', function($scope, $rootScope, $location, mplayerAPIservice, $window) {

	$scope.login = function(){
		var username = document.getElementById('username').value
		var password = document.getElementById('password').value
		mplayerAPIservice.login(username,password).then(function(response){
			if(response.status == 200 && "OK" == response.statusText){
				$window.localStorage.setItem("user_id",response.data.user_id);
				$window.localStorage.setItem("token",response.data.token);
				$location.path("/playlist/");
			}
			else {
				document.getElementById('wrong').style.display = "block";
				console.log(response);
			}
		}, function(response){
				document.getElementById('wrong').style.display = "block";
				console.log("error "+JSON.stringify(response));
			});
	}
}]);