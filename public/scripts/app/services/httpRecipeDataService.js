mokklookNs.mokklookApp.service('httpRecipeDataService', ['$http',
    function ($http, $error) {

        this.getRecipe = function (id, successFn) {
            $http.get('/api/Recipies/'+id).success(function(data, status, headers, config){
                successFn(data);
            })
            .error(function(data, status, headers, config){
                console.log(status);
            })
        };
        this.getRecipies = function () {
            $http.get('/api/Recipies').success(function(data, status, headers, config){
                successFn(data);
            }).
            error(function(data, status, headers, config){
                console.log(status);
            })
        };

        return this;
    }]);