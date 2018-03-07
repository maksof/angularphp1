app.controller('resetPasswordCtrl', ['Api', '$scope', '$rootScope', '$http', '$state', '$window', '$timeout', '$interval', '$rootScope', '$filter', '$location', 'fileUpload', 'UserStorageService', 'Common','md5', function(Api, $scope, $rootScope, $http, $state, $window, $timeout, $interval, $rootScope, $filter, $location, fileUpload, UserStorageService, Common,md5) {
		
		$scope.user = {};
		$scope.user.code = $state.params.code;
		$scope.user.userid = $state.params.userid;

		$scope.checkUser = function(){
			Api.post('user/checkUser',$scope.user).then(function(data){
				if(data.length > 0 ){
					if($scope.user.code != data[0].code) $state.go('signIn');
				}else{
					$.growl.error({title : "Error" , message : "Invalid Request, Please try again."})
					$state.go('signIn');
				}
				
			});
		}
		$scope.checkUser();
			
		$scope.resetPassword = function(){
			if( $scope.data.pass != '' && $scope.data.pass !=undefined && $scope.data.conPass != '' && $scope.data.conPass != undefined){
				if($scope.data.pass == $scope.data.conPass){
				 	var pass =  md5.createHash($scope.data.pass);
				 	$scope.user.pass = pass;
					Api.post('user/updatePassword',$scope.user).then(function(data){
						if(data){
							$.growl.notice({title : "Success" , message : "Your Password is updated successfully!"});
							$state.go('signIn');
						} 
					})
				} else {
					$.growl.error({title : "Error" , message : "Both passwords need to be same"});
				}
			} else {
				$.growl.error({title : "Error" , message : "Invalid Request, Please try again."})
			}

		}



}]);