app.controller('signInCtrl', ['Api','$scope', '$rootScope', '$route', '$http', '$state', '$window', '$timeout', '$interval', '$filter', '$location', 'fileUpload', 'Common', 'UserStorageService', 'md5','vcRecaptchaService', function(Api, $scope, $rootScope, $route, $http, $state, $window, $timeout, $interval, $filter, $location, fileUpload, Common, UserStorageService, md5, vcRecaptchaService) {
   
	$scope.loginForm = {};
	$scope.captchares = false;

    $scope.signupRedirect = function(){
        $state.go('signUp');
    }

    $scope.signinRedirect = function(){
        $state.go('signIn');
    }

    $scope.checkAndRedirectBack = function () {
		Api.get('user/isLoggedIn').then(function(data) {		    		
			data = data.replace(/\s/g, "");
			if (data == 'LOGGED_IN') {
		    	$state.go('dashboard');
    		}
		});
	}
	$scope.checkAndRedirectBack();

    //login
    $scope.login = function() {
    	if (Common.required($scope.loginForm.username) && Common.required($scope.loginForm.password)) {
    		if ($scope.captchares) {
    			
				var url = 'user/doLogin';
				var pwd = md5.createHash($scope.loginForm.password);
				var data = {
					username: $scope.loginForm.username,
					password: pwd
				}
				Api.post(url, data).then(function(output) {
					if (output.status == 'OK') {
						var session = {
							code: Common.getRandomCode()
						}
						UserStorageService.setLogin(session);
						$state.go('dashboard');
					} else if(output.status == 'EmailNotVerified') {
						$scope.loginForm = {};
						$.growl.warning({ title: "Alert!", message: "Your email is not verified! We have sent you an email, please follow the instruction in email to verify your account." });
		    			grecaptcha.reset();
					}else if (output.status == 'UserDeleted'){
						$scope.loginForm = {};
						$.growl.error({ title: "Sorry!", message: "Your account is currently blocked" });
		    			grecaptcha.reset();
					}else{
						$scope.loginForm = {};
						$.growl.error({ title: "Error!", message: "Incorrect Username or Password" });
		    			grecaptcha.reset();
					}
				});		
	    	} else {
				$.growl.error({ title: "Error!", message: "Incorrect captcha" });
			}    	    	
		} else {
			$.growl.error({ title: "Error!", message: "Please enter username and password to login." });
		}
    }

    $scope.setResponse = function(response){
    	if (response) {
    		$scope.captchares = true;
    	}
    }

}]);