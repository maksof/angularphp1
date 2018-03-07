app.controller('mainCtrl', ['Api','$scope', '$rootScope', '$route', '$http', '$state', '$window', '$timeout', '$interval', '$filter', '$location', 'fileUpload', 'Common', 'UserStorageService', 'md5', function(Api, $scope, $rootScope, $route, $http, $state, $window, $timeout, $interval, $filter, $location, fileUpload, Common, UserStorageService, md5) {
    
    $scope.islogin = false;
	$scope.setSession = function() {
		Api.get('user/isLoggedIn').then(function(data) {   		
			data = data.replace(/\s/g, "");
			if (data == 'LOGGED_IN') {
				$scope.islogin = true;
				var data = {
					code: Common.getRandomCode()
				}
				UserStorageService.setLogin(data);
    		} else {
    			UserStorageService.removeLogin();
    		}
		});
	}
	$scope.setSession();
	

	$scope.$on('$locationChangeStart', function(event, next, current) {

    	next = next.split('/');
	    next = next[next.length -1];

	    current = current.split('/');
	    current = current[current.length -1];

	    $scope.session = UserStorageService.getLogin();
	    if ($scope.session.code != undefined && $scope.session.code != null ) {
    		$scope.islogin = true;
    	}else{
    		$scope.islogin = false;
    	}

	    if (next == 'signIn' || isNaN(next) == false || next == 'signUp') {
	    	if ($scope.session.code != undefined && $scope.session.code != null ) {
	    		event.preventDefault();
	    		$state.go('dashboard');
	    	}
	    }

	    if (next == 'dashboard') {
	    	if ($scope.session.code == undefined && $scope.session.code == null ) {
	    		event.preventDefault();
	    		$state.go('landing');
	    	}
	    }

	});
}]);