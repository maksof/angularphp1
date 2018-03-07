app.controller('landingCtrl', ['Api', '$scope', '$rootScope', '$http', '$state', '$window', '$timeout', '$interval', '$rootScope', '$filter', '$location', 'fileUpload', 'UserStorageService', 'Common', function(Api, $scope, $rootScope, $http, $state, $window, $timeout, $interval, $rootScope, $filter, $location, fileUpload, UserStorageService, Common) {
	
    $scope.l_header = "partials/templates/landing_header.html";
    $scope.footer = "partials/templates/footer.html";
	
    $scope.gotoico = function(){
        $state.go('qtc');
    }

    $scope.openPdf = function() {
		$window.open('assets/whitepaper.pdf', '_blank');		
	}

    $scope.starttimer = function(){
        $("#DateCountdown").TimeCircles({
            "animation": "smooth",
            "bg_width": 1.2,
            "fg_width": 0.00667,
            "circle_bg_color": "#60686F",
            "time": {
                "Days": {
                    "text": "Days",
                    "color": "#ffd700",
                    "show": true
                },
                "Hours": {
                    "text": "Hours",
                    "color": "#ffe033",
                    "show": true
                },
                "Minutes": {
                    "text": "Minutes",
                    "color": "#ffe866",
                    "show": true
                },
                "Seconds": {
                    "text": "Seconds",
                    "color": "#fff4b3",
                    "show": true
                }
            }
        });
    }
    $scope.starttimer();

}]);