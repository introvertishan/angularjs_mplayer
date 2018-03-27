angular.module('myApp.playlist', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/playlist/', {
		templateUrl: 'pages/playlist/playlist.html',
		controller: 'playlistCtrl',
		resolve:{
		    "check":function($rootScope,$location){
		        $rootScope.authenticate();
		    }
    	}
	});
}])

.controller('playlistCtrl', [ '$scope', 'mplayerAPIservice','$routeParams', '$location','$rootScope','$window','$compile', function($scope, mplayerAPIservice, $routeParams, $location,$rootScope,$window,$compile) {

	$scope.activeList = 0;
	$scope.activeListName = "";
	var	names_of_playlist = [];

	$("#myTab a").click(function (e) {
    	e.preventDefault();
	});

	$scope.logout = function(){
		mplayerAPIservice.logout().then(function(response){
		  if(response.status == 200 && "OK" == response.statusText){
				$window.localStorage.setItem("token","");
				$location.path("/login");
			}
			else {
				console.log(response);
			}
		}, function(response){
				console.log("error "+JSON.stringify(response));
			});
	}

	mplayerAPIservice.getAllSongs().then(function(response){
	  if(response.status == 200 && "OK" == response.statusText){
			$scope.paginate = response.data;
			$scope.all_songs = response.data.results;
			let temp = Math.ceil((response.data.count)/10)
			createbtns(temp);
		}
		else {
			console.log(response);
		}
	}, function(response){
			console.log("error "+JSON.stringify(response));
		});

	mplayerAPIservice.getAllPlaylist().then(function(response){
		  	if(response.status == 200 && "OK" == response.statusText){
				$scope.playlistList = response.data;
				for (var i = 0; i < $scope.playlistList.length; i++) {
					names_of_playlist.push($scope.playlistList[i].name);
				}
			}
			else {
				console.log(response);
			}
	}, function(response){
			console.log("error "+JSON.stringify(response));
		});

	$scope.addItemToPlaylist = function(){
		var name = $('#playlistName').val()
		if(names_of_playlist.indexOf(name) == -1){
			mplayerAPIservice.addItemToPlaylist(name).then(function(response){
	  			if(response.status == 201 && "Created" == response.statusText){
					$scope.result = response.data;
					refresh($scope.result);
					document.getElementById("etc").click();
				}
				else {
					console.log(response);
				}
			}, function(response){
				console.log("error "+JSON.stringify(response));
			});
		}
		else{
			alert("You have a playlist with the same name");
		}
	}

	function refresh(b){
		$scope.playlistList.push(b);
		names_of_playlist.push(b.name)

	}

	$scope.playSong = function(a,b){
		if(a == 1){
			var audio = document.getElementById("audioId");
			audio.src=b.song_url;
			document.getElementById('song-title').innerHTML = b.title
			document.getElementById('song-band').innerHTML = b.artists
		}
		else {
			var audio = document.getElementById("audioId1");
			audio.src=b.song_id.song_url;
			document.getElementById('song-title1').innerHTML = b.song_id.title
			document.getElementById('song-band1').innerHTML = b.song_id.artists
		}
		audio.play();
	}

	$scope.addtoList = function(p,q){
		mplayerAPIservice.addToPlaylist(p,q).then(function(response){
			if(response.status == 201 && "Created" == response.statusText){
	  			console.log("added succeess");
			}
			else {
				console.log(response);
			}
		}, function(response){
			console.log("error "+JSON.stringify(response));
		});
	}

	$scope.getSongForList =function(song){
		document.getElementById('list_loader').style.display = "block";
		$scope.activeList = song.id;
		$scope.activeListName = song.name;

		mplayerAPIservice.getSongFromPlaylist(song.id).then(function(response){
			if(response.status == 200 && "OK" == response.statusText){
		  		$scope.list_result = response.data;
			}
			else {
				console.log(response);
			}
		}, function(response){
				console.log("error "+JSON.stringify(response));
			});
	}

	$scope.deleteList =function(id){
		mplayerAPIservice.deleteFromPlaylist(id).then(function(response){
			if(response.status == 200 && "OK" == response.statusText){
		  		for (var i = 0; i < $scope.playlistList.length; i++) {
					if ($scope.playlistList[i].id == id) {
						var b = $scope.playlistList.indexOf($scope.playlistList[i]);
					}
				}
				var z = names_of_playlist.indexOf($scope.activeListName);
				names_of_playlist.splice(z,1);
				$scope.playlistList.splice(b,1);
				$scope.activeList = 0;
				$scope.activeListName = "";
				$scope.list_result= "";
				document.getElementById('list_loader').style.display = "none";
			}
			else {
				console.log(response);
			}
		}, function(response){
				console.log("error "+JSON.stringify(response));
			});
	}

	function createbtns(x) {

		for(var i=0;i<x;i++) {
    		(function (i) {
    			var node = document.createElement("button");
    			node.className += "abc";
    			var textnode = document.createTextNode(i+1);
        		$(node).click(function(){
            		$scope.getMore(i+1)
        		});
        		node.appendChild(textnode);
        		document.getElementById("page_list").appendChild(node);
    		}(i));
		}
		}	

	

	$scope.getMore = function(x){

		mplayerAPIservice.getMoreSongs(x).then(function(response){
	  		if(response.status == 200 && "OK" == response.statusText){
				$scope.all_songs = response.data.results;
			}
			else {
				console.log(response);
			}
		}, function(response){
				console.log("error "+JSON.stringify(response));
			});
	}

	document.addEventListener('play', function(e){
    	var audios = document.getElementsByTagName('audio');
    	for(var i = 0, len = audios.length; i < len;i++){
       		if(audios[i] != e.target){
           		audios[i].pause();
       		}
    	}
	}, true);
}]);