angular.module('getRepositoriesService', []).service('getRepositories', getListFnc);

getListFnc.$inject=['$http','$q'];

function getListFnc($http, $q) {
	
	var fncContainer={
        getListFnc:getListFnc
	};

	function getListFnc(username){
		var deferred = $q.defer();

		var URL_Connection = "https://api.github.com/users/" + username + "/repos";
		$http.get(URL_Connection)
   			.then(function successCallback(response) {
    				return deferred.resolve(response.data);
  				}, function errorCallback(response) {
    				return deferred.reject(response.status);
  			});
		
		return deferred.promise;

    }
    return fncContainer;

}