app.factory('Api', ['$http', '$q', 'host', 'ipCookie', function($http, $q, host, ipCookie) {
    function Api() {

        this.timeOut = 60000;
        this.prefix = 'server/index.php/';
    };

    /**
     * Post
     *
     * @params:
     * data: Object
     **/
    Api.prototype.post = function(url, data) {
        
        var csrfToken = ipCookie('csrf_cookie_name');
        $http.defaults.headers.post['X-Csrf-Token']=csrfToken;
        
        var deferred = $q.defer();
        
        $http.post(host + this.prefix + url, data)
            .success(function(data, status, headers, config) {
                deferred.resolve(data);  
            })
            .error(function(data, status, headers, config) {
                console.log('an error has occured', data, status);
                // execute callback function
                deferred.reject(data);
            });
        return deferred.promise;
    };

    /**
     * Get
     *
     * @params:
     **/
    Api.prototype.get = function(url) {
        
        var deferred = $q.defer();
        
        $http.get(host + this.prefix +url)
            .success(function(data, status, headers, config) {
                deferred.resolve(data);  
            })
            .error(function(data, status, headers, config) {
                console.log('an error has occured', data, status);
                // execute callback function
                deferred.reject(data);
            });
        return deferred.promise;
    };

    Api.prototype.getFromUrl = function(url) {
        
        var deferred = $q.defer();
        $http.get(url)
            .success(function(data, status, headers, config) {
                deferred.resolve(data);  
            })
            .error(function(data, status, headers, config) {
                console.log('an error has occured', data, status);
                // execute callback function
                deferred.reject(data);
            });
        return deferred.promise;
    };
        
    return new Api();
}]);
