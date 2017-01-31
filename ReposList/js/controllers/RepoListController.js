angular.module('repoListApp').controller('repoListCtrl',repoListCrtFnt);

repoListCrtFnt.$inject=['$scope','$log','$window', '$localStorage','$sessionStorage', 'repoParser'];

function repoListCrtFnt($scope, $log, $window, $localStorage, $sessionStorage, repoParser){

    $log.info("in List Repos controller");
    $sessionStorage.sync;
    $localStorage.sync;
    $log.info($localStorage.repolist.length);
    //nbContacts = $localStorage.repolist.length;
    $scope.items = [];

    try {
        $scope.username = $sessionStorage.user['username'];
    }catch (e){
        $log.info(e);
        $window.location.href = '../ResearchUserRepo/index.html';
    }


    try {
        for (var i=0; i<$localStorage.repolist.length ; i+=1){
            repToAdd = repoParser.parseRepo($localStorage.repolist[i], i);
            if (repToAdd != null) {
                $scope.items.push(repToAdd);
            }


        }
        //$scope.items = repoParser.parseRepo($localStorage.repolist);
    }catch (e){
        $log.error(e);
        //$window.location.href = '../ResearchUserRepo/index.html';

    }
    $scope.itemClicked = function (index) {
        $log.info(index);
        $window.open($scope.items[index]['html_url'], '_blank');

    };

    $scope.logout = function () {
        $log.info("logging out");
            $sessionStorage.$reset();
            $localStorage.$reset();
            $window.location.href = '../ResearchUserRepo/index.html';
    }
    
}
