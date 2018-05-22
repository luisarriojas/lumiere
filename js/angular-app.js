/*
LumiereFotosDeBoda.com
Copyright (c) 2015 LumiereFotosDeBoda.com

Developed by Luis E. Arriojas for LumiereFotosDeBoda.com
LinkedIn: https://www.linkedin.com/in/luisarriojas
*/

'use strict';

var siteApp = angular.module('siteApp', ['ngRoute', 'ngSanitize', 'siteControllers', 'siteServices', 'siteFilters']);

/* router */
siteApp.config(['$routeProvider',
function ($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'templates/home.php',
        controller: 'homeCtrl'
    }).
    when('/quienesSomos', {
        templateUrl: 'templates/quienesSomos.html',
        controller: 'quienesSomosCtrl'
    }).
    when('/contacto', {
        templateUrl: 'templates/contact.html',
        controller: 'contactCtrl'
    }).
    when('/portafolio/:id/:title', {
        templateUrl: 'templates/portfolio.html',
        controller: 'portfolioCtrl'
    }).
    when('/clientes', {
        templateUrl: 'templates/galleryStart.html',
        controller: 'galleryStartCtrl'
    }).
    when('/impresiones/:id', {
        templateUrl: 'templates/gallerySelect.html',
        controller: 'gallerySelectCtrl'
    }).
    when('/bodas/preferidas', {
        templateUrl: 'templates/bodasPreferidas.html',
        controller: 'bodasPreferidasCtrl'
    }).
    when('/bodas/:categoria', {
        templateUrl: 'templates/bodas.html',
        controller: 'bodasCtrl'
    }).
    when('/blog/list', {
        templateUrl: 'templates/blogList.html',
        controller: 'blogListCtrl'
    }).
    when('/blog/read/:id', {
        templateUrl: 'templates/blogRead.html',
        controller: 'blogReadCtrl'
    }).
    otherwise({
        redirectTo: '/home'
    });
}
]);

/* fix to crawlers */
siteApp.config(['$locationProvider',
function ($locationProvider) {
    $locationProvider.html5Mode(false).hashPrefix('!');
}
]);

/* services */
var siteServices = angular.module('siteServices', []);
siteServices.factory('Meta', [
    function () {
        return {
            tags: {
                description: '',
                title: ''
            }
        }
    }
]);
siteServices.factory('Menu', [
    function () {
        return {
            tags: {
                status: false
            }
        }
    }
]);

/* filters */
var siteFilters = angular.module('siteFilters', []);
siteFilters.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
