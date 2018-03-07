app.controller('emailVerificationCtrl', ['Api', '$scope', '$rootScope', '$http', '$state', '$window', '$timeout', '$interval', '$rootScope', '$filter', '$location', 'fileUpload', 'UserStorageService', 'Common','md5', function(Api, $scope, $rootScope, $http, $state, $window, $timeout, $interval, $rootScope, $filter, $location, fileUpload, UserStorageService, Common,md5) {
		
		$scope.user = {};
		$scope.user.code = $state.params.code;
		$scope.user.userid = $state.params.userid;

		$scope.checkUser = function(){
			Api.post('user/checkEmailVerifyCode',$scope.user).then(function(data){
				if(data){
					$.growl.notice({title : "Congratulations" , message : "Your registration is complete, you can now use your login credentials to get logged in."});
					$state.go('signIn');
				}else{
					$.growl.error({title : "Error" , message : "Invalid Request. Please try again later."})
					$state.go('signIn');
				}
			});
		}
		$scope.checkUser();

}]);