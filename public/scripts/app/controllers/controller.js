"use strict";

var mokklookNs = mokklookNs || {};

(function () {
    var data;

    mokklookNs.mokklookApp.controller('mainController',["$scope", "$rootScope", "$timeout", "$locale", "$route",
        function mainController($scope, $rootScope, $timeout, $locale, $route) {


            $rootScope.appName = "Mokklook";
            $scope.greeting = "Hello from Controller";
            $scope.greeted = "Name!";

            var promise = $timeout(function () {
                $scope.greeted = "Name is Henry";
            }, 1500)

            $scope.cancel = function () {
                $timeout.cancel(promise);
                console.log("Cancelled the timeout promise!");
            };

            $scope.action = function (hello) {
                console.table($scope.greeting);
                console.table(hello);
            }

            $rootScope.appName = "Mokklook";
            $rootScope.nextPage = "/about";
            $rootScope.headerText = "Fargerik fantasi";

        }]);


})();



(function () {
    var data;
    mokklookNs.mokklookApp.controller('aboutController',["$scope", "$rootScope", "$timeout", "$locale", "$route",
        function aboutController($scope, $rootScope, $timeout, $locale, $route) {
            $rootScope.nextPage = "/resume";
            $rootScope.headerText = "Om meg";
            $rootScope.appName = "Mokklook";

        }]);
})();




(function () {
    var data;
    mokklookNs.mokklookApp.controller('resumeController',["$scope", "$rootScope", "$timeout", "$locale", "$route",
        function resumeController($scope, $rootScope, $timeout, $locale, $route) {
            $rootScope.nextPage = "/portfolio";
            $rootScope.headerText = "Erfaring";
            $rootScope.appName = "Mokklook";

        }]);
})();


(function () {
    var data;
    mokklookNs.mokklookApp.controller('portfolioController',["$scope", "$rootScope", "$timeout", "$locale", "$route",
        function portfolioController($scope, $rootScope, $timeout, $locale, $route) {
            $rootScope.nextPage = "/contact";
            $rootScope.headerText = "Portefølje";
            $rootScope.appName = "Mokklook";

        }]);
})();


(function () {
    var data;
    mokklookNs.mokklookApp.controller('contactController',["$scope", "$rootScope", "$timeout", "$locale", "$route",
        function contactController($scope, $rootScope, $timeout, $locale, $route) {
            $rootScope.nextPage = "/shop";
            $rootScope.headerText = "Kontakt meg";
            $rootScope.appName = "Mokklook";

        }]);
})();


(function () {
    var data;
    mokklookNs.mokklookApp.controller('shopController',["$scope", "$rootScope", "$timeout", "$locale", "$route",
        function shopController($scope, $rootScope, $timeout, $locale, $route) {
            $rootScope.nextPage = "/workplace";
            $rootScope.headerText = "Butikk";
            $rootScope.appName = "Mokklook";

        }]);
})();


(function () {
    var data;
    mokklookNs.mokklookApp.controller('workplaceController',["$scope", "$rootScope", "$timeout", "$locale", "$route",
        function workplaceController($scope, $rootScope, $timeout, $locale, $route) {
            $rootScope.nextPage = "/";
            $rootScope.headerText = "Min arbeidsplass";
            $rootScope.appName = "Mokklook";

        }]);
})();
