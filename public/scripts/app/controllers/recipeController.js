(function () {
    var data;
    mokklookNs.mokklookApp.controller('recipeController', ['$scope', 'httpRecipeDataService',
        function recipeDateService($scope, recipeDateService) {
            recipeDateService.getRecipe(1, function (recipe){
                $scope.recipe=recipe;
            })
        }]);
})();



