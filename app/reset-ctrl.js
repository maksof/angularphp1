app.controller('resetCtrl', ['Api', '$scope', '$rootScope', '$http', '$state', '$window', '$timeout', '$interval', '$rootScope', '$filter', '$location', 'fileUpload', 'UserStorageService', 'Common', function(Api, $scope, $rootScope, $http, $state, $window, $timeout, $interval, $rootScope, $filter, $location, fileUpload, UserStorageService, Common) {
		
		$scope.data = {};
		
	   	$scope.reset = function(){
	   		if($scope.data.email != '' && $scope.data.email != undefined ){
	   			
	   			if($scope.checkemail($scope.data.email)) {
		   			$scope.data.code = 	$scope.getRandomCode();
		   			Api.post('user/sendEmail', $scope.data).then(function(data){
		   				if(data == '"OK"'){
		   					$.growl.notice({ title: "Success!", message: "We have sent you an email to reset your password, Please follow the instruction in it to continue." });
		   					$state.go('signIn');
		   				}else{
		   					$.growl.error({ title: "Error!", message: "This email does not exist." });
		   				}
		   			});
	   			} else {
	   				$.growl.error({ title: "Error!", message: "Invalid email address." });
	   			}
	   		} else {
	   			$.growl.error({ title: "Error!", message: "Please enter the email." });
	   		}
	   	}

	   	$scope.checkemail = function(email){
	        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
			if(email.match(mailformat)){  
				return true;
			} else{
				return false;
			}
	    }

		$scope.getRandomCode = function() {

			var text = "";
			var possible = "ABCDEFGHIJ0123456789";
			for (var i = 0; i < 10; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

			return text;
		}	

}]);