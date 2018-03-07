app.controller('dashboardCtrl', ['Api', '$scope', '$rootScope', '$http', '$state', '$window', '$timeout', '$interval', '$rootScope', '$filter', '$location', 'fileUpload', 'UserStorageService', 'Common', 'md5', function(Api, $scope, $rootScope, $http, $state, $window, $timeout, $interval, $rootScope, $filter, $location, fileUpload, UserStorageService, Common, md5) {
	
	$scope.password = {};
    $scope.logout = function () {
		Api.get('user/logout').then(function(data) {		    		
			UserStorageService.removeLogin();
			$state.go('signIn');
		});
	}

	$scope.getdata = function(){
    	var url = "user/getDetails";
    	Api.get(url).then(function(output){
    		if (output) {
    			$scope.details = output;
    		}
    	});
    }
    $scope.getdata();

	$scope.updatepass = function(){
        if (Common.required($scope.password.cur) && Common.required($scope.password.new) && Common.required($scope.password.con)) {
            if ($scope.password.new == $scope.password.con) {
                var data = {
                    cur: md5.createHash($scope.password.cur),
                    new: md5.createHash($scope.password.new),
                    userid: $scope.details.userid
                }
                var url = 'user/updateProfilePassword';
                Api.post(url, data).then(function(output) {             
                    output = output.replace(/\s/g, "");
                    if (output == 'true') {
                        $.growl.notice({ title: "Congratulations!", message: "Your password has been changed."});
                    }else if(output == '"InvalidPassword"'){
                        $.growl.error({ title: "Sorry!", message: "Incorrect current password"});
                    }else if(output == '"SessionEnd"'){
                        $.growl.error({ title: "Sorry!", message: "Your login session is expired"});
                        $scope.sessionexpire();
                    }else{
                        $.growl.error({ title: "Sorry!", message: "Something went wrong. Please try again later"});
                    }
                    $scope.password = {};                    
                });
                
            }else{
                $.growl.error({ title: "Error!", message: "Your new password did not match"});
            }
        }else{
            $.growl.error({ title: "Error!", message: "Please fill all required fields"});
        }
    }

}]);