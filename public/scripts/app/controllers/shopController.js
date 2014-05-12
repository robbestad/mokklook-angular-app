(function () {
    var data;
    mokklookNs.mokklookApp.controller('shopController', ['$scope', 'httpProductDataService',
        function productService($scope, shopService) {
            shopService.getProduct(1, function (product){
                $scope.product=product;
            })
        }]);
        mokklookNs.mokklookApp.controller('shopController',["$scope", "$rootScope", "$timeout", "$locale", "$route",
            function shopController($scope, $rootScope, $timeout, $locale, $route) {
                $rootScope.nextPage = "/workplace";
                $rootScope.headerText = "Butikk";

            }]);

})();



