mokklookNs.mokklookApp.service('httpProductDataService', ['$http',
    function ($http, $error) {

        this.getProduct = function (id, successFn) {
            $http.get('/api/Recipies/'+id).success(function(data, status, headers, config){
                successFn(data);
            })
            .error(function(data, status, headers, config){
                console.log(status);
            })
        };
        this.getProduct = function () {
            $http.get('/api/Recipies').success(function(data, status, headers, config){
                successFn(data);
            }).
            error(function(data, status, headers, config){
                console.log(status);
            })
        };

        return this;
    }]);