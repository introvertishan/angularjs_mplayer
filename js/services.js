angular.module('myApp.services', [])
  .factory('mplayerAPIservice', function($http,$rootScope) {

    var ergastAPI = {};
    var rootUrl = "http://127.0.0.1:8000/api/";
    var csrftoken = $rootScope.getCookie('csrftoken');

    ergastAPI.login = function(username,password) {
		return $http({
			method: 'POST',
			data: {
              	username: username,
              	password: password
        	},
			timeout: 30000,
			url: rootUrl+"login"
		});
	}

	ergastAPI.logout = function() {
		return $http({
			method: 'GET',
			headers: {
				'Authorization': "Token "+$rootScope.getToken()
			}, 
			data: {
	        	csrfmiddlewaretoken : csrftoken,
	    	},
			timeout: 30000,
			url: rootUrl+"logout"
		});
	}

   	ergastAPI.getAllSongs = function() {
		return $http({
			method: 'GET',
			headers: {
    			'Authorization': "Token "+$rootScope.getToken()
			}, 
			data: {
            	csrfmiddlewaretoken : csrftoken,
        	},
			timeout: 30000,
			url: rootUrl+"getAllSongs"
		});
   	}

   	ergastAPI.getMoreSongs = function(z) {

		return $http({
			method: 'GET',
			headers: {
    			'Authorization': "Token "+$rootScope.getToken()
			}, 
			data: {
            	csrfmiddlewaretoken : csrftoken,
        	},
			timeout: 30000,
			url: rootUrl+"getAllSongs?page="+z
		});
   	}

   	ergastAPI.getAllPlaylist = function() {
		return $http({
			method: 'GET',
			headers: {
    			'Authorization': "Token "+$rootScope.getToken()
			}, 
			data: {
            	csrfmiddlewaretoken : csrftoken
        	},
			timeout: 30000,
			url: rootUrl+"getAllPlaylist"
		});
   	}

   	   	ergastAPI.addItemToPlaylist = function(name) {
		return $http({
			method: 'POST',
			headers: {
    			'Authorization': "Token "+$rootScope.getToken()
			}, 
			data: {
            	csrfmiddlewaretoken : csrftoken,
              	name: name,
              	user:$rootScope.getUserId()
        	},
			timeout: 30000,
			url: rootUrl+"getAllPlaylist"
		});
   	}

	ergastAPI.addToPlaylist = function(list,song) {
		return $http({
			method: 'POST',
			headers: {
    			'Authorization': "Token "+$rootScope.getToken()
			}, 
			data: {
            	csrfmiddlewaretoken : csrftoken,
              	song_id:song,
              	playlist_id:list
        	},
			timeout: 30000,
			url: rootUrl+"addToPlaylist"
		});
   	}

   	ergastAPI.getSongFromPlaylist = function(list) {
		return $http({
			method: 'GET',
			headers: {
    			'Authorization': "Token "+$rootScope.getToken()
			}, 
			data: {
            	csrfmiddlewaretoken : csrftoken,
            	playlist_id:list
        	},
			timeout: 30000,
			url: rootUrl+"getFromPlaylist/"+list
		});
   	}

   	ergastAPI.deleteFromPlaylist = function(list) {
		return $http({
			method: 'DELETE',
			headers: {
    			'Authorization': "Token "+$rootScope.getToken()
			}, 
			data: {
            	csrfmiddlewaretoken : csrftoken,
            	playlist_id:list
        	},
			timeout: 30000,
			url: rootUrl+"deletePlaylist/"+list
		});
   	}

  return ergastAPI;
});