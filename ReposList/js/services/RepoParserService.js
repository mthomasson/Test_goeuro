/**
 * Created by Maxime on 31/01/17.
 */
angular.module('repoParserService', []).service('repoParser',repoParserFnc);

repoParserFnc.$inject=['$http','$q', '$log'];

function repoParserFnc($http, $q, $log) {

    var fncContainer={
        parseRepo:parseRepo
    };

    function parseRepo(repo, index) {

        var JSONToAddToItem = {};
        JSONToAddToItem['index'] = index;
        if (repo.name != null) {
            JSONToAddToItem["name"] = repo['name'];
            if (repo['owner']['login'] != null){
                JSONToAddToItem['owner'] = repo['owner']['login'];
                if(repo['html_url'] != null){
                    JSONToAddToItem['html_url'] = repo['html_url'];
                }
                else {return null;}
            }
            else{return null;}
        }
        else{return null;}
        //$log.info(JSONToAddToItem);
        return JSONToAddToItem;
    }

    return fncContainer;
    }
