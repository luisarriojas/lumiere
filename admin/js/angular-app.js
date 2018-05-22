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
    function($routeProvider) {
        $routeProvider.
        when('/banner/list', {
            templateUrl: 'templates/bannerList.html',
            controller: 'bannerListCtrl'
        }).
        when('/banner/edit/:id/:title?/:subtitle?/:status', {
            templateUrl: 'templates/bannerEdit.html',
            controller: 'bannerEditCtrl'
        }).
        when('/quienesSomos/list', {
            templateUrl: 'templates/quienesSomosList.html',
            controller: 'quienesSomosListCtrl'
        }).
        when('/quienesSomos/create', {
            templateUrl: 'templates/quienesSomosCreate.html',
            controller: 'quienesSomosCreateCtrl'
        }).
        when('/quienesSomos/update/:id', {
            templateUrl: 'templates/quienesSomosUpdate.html',
            controller: 'quienesSomosUpdateCtrl'
        }).
        when('/impresiones/list', {
            templateUrl: 'templates/galleriesList.html',
            controller: 'galleriesListCtrl'
        }).
        when('/impresiones/create', {
            templateUrl: 'templates/galleriesCreate.html',
            controller: 'galleriesCreateCtrl'
        }).
        when('/impresiones/read/:id', {
            templateUrl: 'templates/galleriesRead.html',
            controller: 'galleriesReadCtrl'
        }).
        when('/impresiones/update/:id', {
            templateUrl: 'templates/galleriesUpdate.html',
            controller: 'galleriesUpdateCtrl'
        }).
        when('/blog/list', {
            templateUrl: 'templates/blogList.html',
            controller: 'blogListCtrl'
        }).
        when('/blog/create', {
            templateUrl: 'templates/blogCreate.html',
            controller: 'blogCreateCtrl'
        }).
        when('/blog/read/:id', {
            templateUrl: 'templates/blogRead.html',
            controller: 'blogReadCtrl'
        }).
        when('/blog/update/:id', {
            templateUrl: 'templates/blogUpdate.html',
            controller: 'blogUpdateCtrl'
        }).
        when('/sugerenciasImagenes', {
            templateUrl: 'templates/sugerenciasImagenes.html',
            controller: 'sugerenciasImagenesCtrl'
        }).
        when('/signIn', {
            templateUrl: 'templates/signIn.html',
            controller: 'signInCtrl'
        }).
        otherwise({
            redirectTo: '/banner/list'
        });
    }
]);

/* fix to crawlers */
siteApp.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.html5Mode(false).hashPrefix('!');
    }
]);

/* services */
var siteServices = angular.module('siteServices', []);
siteServices.factory('Meta', [
    function() {
        return {
            tags: {
                description: '',
                title: ''
            }
        }
    }
]);
siteServices.factory('Menu', [
    function() {
        return {
            tags: {
                status: false,
                isSignedIn: false
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
