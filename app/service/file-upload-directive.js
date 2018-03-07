app.directive('toggle', function(){
  return {
    restrict: 'A',
    link: function(scope, element, attrs){
      if (attrs.toggle=="tooltip"){
        $(element).tooltip();
      }
      if (attrs.toggle=="popover"){
        var options = {
            placement: "top",
            html: true
        };
        $(element).popover(options);
      }
    }
  };
});

app.directive('autoSubmitForm', ['$interpolate', function($interpolate) {
  return {
    replace: true,
    scope: {
      formData: '='
    },
    template: '',
    link: function($scope, element, $attrs) {
      $scope.$on($attrs['event'], function(event, data) {
        var form = $interpolate('<form target="_blank" action="{{formData.redirectUrl}}" method="{{formData.redirectMethod}}"><div>'+
          '<input type="hidden" name="PAYEE_ACCOUNT" value="{{formData.redirectData.PAYEE_ACCOUNT}}">'+
          '<input type="hidden" name="PAYEE_NAME" value="{{formData.redirectData.PAYEE_NAME}}" >'+
          '<input type="hidden" name="PAYMENT_AMOUNT" value="{{formData.redirectData.PAYMENT_AMOUNT}}"> '+
          '<input type="hidden" name="PAYMENT_UNITS" value="USD"> '+
          '<input type="hidden" name="PAYMENT_URL" value="{{formData.redirectData.PAYMENT_URL}}"> '+
          '<input type="hidden" name="PAYMENT_URL_METHOD" value="GET"> '+
          '<input type="hidden" name="NOPAYMENT_URL" value="{{formData.redirectData.NOPAYMENT_URL}}"> '+
          '<input type="hidden" name="NOPAYMENT_URL_METHOD" value="GET"> '+
          '<input type="hidden" name="SUGGESTED_MEMO" value="">'+ 
          '<input type="hidden" name="BAGGAGE_FIELDS" value="">'+
          '</div></form>')($scope);
        jQuery(form).appendTo('body').submit();
      })
    }
  }
}]);

app.directive('fileModel', ['$parse', function ($parse) {
    return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
            scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
            });
        });
    }
   };
}]);

app.directive('numberMask', function() {
    return function(scope, element, attrs) {
        var min = parseInt(attrs.min, 10) || 0,
            max = parseInt(attrs.max, 10) || 100000, 
            value = element.val();
        element.on('keyup', function(e) {
            if (!between(element.val(), min, max)) {
              element.val(value);
            } else {
              value = element.val();
            }
        });

        function between(n, min, max) { return n >= min && n <= max; }
    }
});

app.directive('alphaNumeric', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/\W+/g, "");

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});

app.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});

// We can write our own fileUpload service to reuse it in the controller
app.service('fileUpload', ['$rootScope', '$http', 'Api', function ($rootScope, $http, Api) {
    this.uploadFileToUrl = function(file, uploadUrl, data){
         var fd = new FormData();
         fd.append('file', file);
         fd.append('name', data.name);
         $http.post(uploadUrl, fd, {
             transformRequest: angular.identity,
             headers: {'Content-Type': undefined,'Process-Data': false}
         })
         .success(function(){
            var params="?name="+data.name+"&parentId="+data.parentId+"&filePath="+data.path+"&size="+data.size;
            Api.get('insertNewFile.php'+params).then(function(data) {
                if (data.status == "OK") {
                    $rootScope.$broadcast('fileUploadSuccess', { data: data });
                } else {
                    $.growl.error({ title: "Error!", message: "Internal Server Error. Please try again later" });
                }
            });
         })
         .error(function(err){
            console.log("Error", err);
         });
     }
 }]);