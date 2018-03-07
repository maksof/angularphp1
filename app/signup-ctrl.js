app.controller('signUpCtrl', ['Api','$scope', '$rootScope', '$route', '$http', '$state', '$window', '$timeout', '$interval', '$filter', '$location', 'fileUpload', 'Common', 'UserStorageService', 'md5', 'vcRecaptchaService', function(Api, $scope, $rootScope, $route, $http, $state, $window, $timeout, $interval, $filter, $location, fileUpload, Common, UserStorageService, md5, vcRecaptchaService) {
   
	$scope.signupform = {};
	$scope.captchares = false;
	
	$scope.signupRedirect = function(){
        $state.go('signUp');
    }

    $scope.signinRedirect = function(){
        $state.go('signIn');
    }

    $scope.checkemail = function(email){
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
		if(email.match(mailformat)){  
			return true;
		} else{
			return false;
		}
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

    $scope.register = function(){
        if (Common.required($scope.signupform.email) && Common.required($scope.signupform.username) && Common.required($scope.signupform.pass) && Common.required($scope.signupform.con_pass)) {
        	if ($scope.captchares) {
	        	var validemail = $scope.checkemail($scope.signupform.email);
	        	if (validemail) {
	        		if ($scope.signupform.pass == $scope.signupform.con_pass) {
		        		var pwd = md5.createHash($scope.signupform.pass);
		        		var data = angular.copy($scope.signupform);
		        		data.pass = pwd;
		        		data.con_pass = pwd;
			        	var url = 'User/registration';
						Api.post(url, data).then(function(output) {				
							output = output.replace(/\s/g, "");
							if (output == 'true') {
								$scope.signupform = {};
								$.growl.notice({ title: "Account Registration!", message: "We have sent you an email, please follow the instruction to continue your registration."});
								$scope.signinRedirect();
				    		}else if(output == '"userExist"'){
				    			$.growl.error({ title: "Sorry!", message: "This username is already taken."});
				    		}else if(output == '"userEmailExist"'){
				    			$.growl.error({ title: "Sorry!", message: "This email is already linked with one account. Please use different!"});
				    		}else{
				    			$.growl.error({ title: "Sorry!", message: "Something went wrong. Please try again later"});
				    		}
						});		        		
	        		}else{
	        			$.growl.error({ title: "Sorry!", message: "Password did not match"});		
	        		}
	        	}else{
	        		$.growl.error({ title: "Sorry!", message: "Invalid email address"});	
	        	}
	        }else{
        		$.growl.error({ title: "Sorry!", message: "Incorrect captcha"});	
        	}
        }else{
        	$.growl.error({ title: "Error!", message: "Please fill all required fields"});
        }
    }

    $scope.setResponse = function(response){
    	if (response) {
    		$scope.captchares = true;
    	}
    }

}]);