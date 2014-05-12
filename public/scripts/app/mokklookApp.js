"use strict";

var mokklookNs = mokklookNs || {};

mokklookNs.mokklookApp = angular.module('mokklookApp', ['ngRoute', 'ngResource'],
    function ($routeProvider) {
        $routeProvider.when('/',
            {
                controller: 'mainController',
                templateUrl: 'pages/start.html'
            });
        $routeProvider.when('/workplace',
            {
                controller: 'workplaceController',
                templateUrl: 'pages/workplace.html'
            });
        $routeProvider.when('/shop',
            {
                controller: 'shopController',
                templateUrl: 'pages/butikk.html'
            });
        $routeProvider.when('/contact',
            {
                controller: 'contactController',
                templateUrl: 'pages/kontakt.html'
            });
        $routeProvider.when('/portfolio',
            {
                controller: 'portfolioController',
                templateUrl: 'pages/portfolio.html'
            });
        $routeProvider.when('/resume',
            {
                controller: 'resumeController',
                templateUrl: 'pages/resume.html'
            });
        $routeProvider.when('/about',
            {
                controller: 'aboutController',
                templateUrl: 'pages/om.html'
            });

        $routeProvider.when('/recipe/:id', {
            templateUrl: 'pages/recipeDetails.html',
            controller: 'recipeController',
            resolve: {
                recipe: ['$route', 'resourceRecipeDataService', function ($route, dataService) {
                    return dataService.getRecipe($route.current.pathParams.id).$promise;
                }]
            }
        });
});


mokklookNs.mokklookApp.run(function ($rootScope) {
//    $rootScope.appName="Mokklook super app";
    console.log("running");
});

