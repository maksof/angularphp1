app.factory('UserStorageService', ['localStorageService', function(localStorageService) {

	function UserStorageService() {
        
	}

    /**
     * get user
     *
     * @param 
     * @return data
     */
    UserStorageService.prototype.getUser = function () {
        return localStorageService.get('user') || '';
    }

    /**
     * set user
     *
     * @param user json data
     * @return boolean
     */
    UserStorageService.prototype.setUser = function (data) {
        return localStorageService.set('user',data);
    }

    /**
     * remove user data
     *
     * @param 
     * @return boolean
     */
    UserStorageService.prototype.removeUser = function () {
        return localStorageService.remove('user');
    }

    /**
     * get user
     *
     * @param 
     * @return data
     */
    UserStorageService.prototype.getLogin = function () {
        return localStorageService.get('af648889b959fbf') || '';
    }

    /**
     * set user
     *
     * @param user json data
     * @return boolean
     */
    UserStorageService.prototype.setLogin = function (data) {
        return localStorageService.set('af648889b959fbf',data);
    }

    /**
     * remove user data
     *
     * @param 
     * @return boolean
     */
    UserStorageService.prototype.removeLogin = function () {
        return localStorageService.remove('af648889b959fbf');
    }



	return new UserStorageService();

}]);