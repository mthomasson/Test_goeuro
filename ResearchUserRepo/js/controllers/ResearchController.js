"use strict";

angular.module('researchApp').controller('researchCtrl',researchCrtFnt);

researchCrtFnt.$inject=['$scope','$log', 'getRepositories','$window', '$localStorage', '$sessionStorage', '$mdToast', '$timeout'];

function researchCrtFnt($scope, $log, getRepositories, $window, $localStorage, $sessionStorage, $mdToast, $timeout){


	$scope.getRepos = function() {


		var futurContent=getRepositories.getListFnc($scope.user.username);
		futurContent.then(
			function(payload){
			    $log.info(payload.length);
			    if (payload.length > 0) { //if repo not empty
                    $timeout($scope.openToastSuccess);
                    $sessionStorage.user = {"username ": $scope.user.username};
                    $log.info(payload);
                    $localStorage.repolist = payload;
                    $log.info($localStorage.repolist);
                    $window.location.href = '../ReposList/index.html';
                }
                else // If the repo list is empty
                {
                    $timeout($scope.openToastErrorEmptyRepo);
                }
            },
			function(errorPayload){
			    $log.info(errorPayload);
			    //invalid username
			    if (errorPayload == 404){
                    $timeout($scope.openToastErrorInvalidUsername);

                }
			});
	};
	$scope.openToastErrorInvalidUsername = function($event) {
        $mdToast.show(
            $mdToast.simple()
                .textContent('This Github user does not exist')
                .position('top left')
        );
    };
    $scope.openToastErrorEmptyRepo = function($event) {
        $mdToast.show(
            $mdToast.simple()
                .textContent('This Github user has no repository')
                .position('top left')
        );
    };
    $scope.openToastSuccess = function($event) {
        $mdToast.show(
            $mdToast.simple()
                .textContent('redirecting ...')
                .position('top left')
        );
    };


}