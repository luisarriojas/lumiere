/*
 LumiereFotosDeBoda.com
 Copyright (c) 2015 LumiereFotosDeBoda.com

 Developed by Luis E. Arriojas for LumiereFotosDeBoda.com
 LinkedIn: https://www.linkedin.com/in/luisarriojas
 */

 'use strict';

 var siteControllers = angular.module('siteControllers', []);

 siteControllers.controller('siteCtrl', ['$scope', 'Meta', 'Menu',
    function ($scope, Meta, Menu) {
        $scope.siteMeta = Meta.tags;
        $scope.menu = Menu.tags;

        $scope.menuOpenClose = function () {
            if ($scope.menu.status == false) {
                $scope.menu.status = true;
            } else {
                $scope.menu.status = false;
            }
        };
    }
    ]);

 siteControllers.controller('homeCtrl', ['$scope', 'Meta', 'Menu',
    function ($scope, Meta, Menu) {
        $scope.siteMeta = Meta.tags;
        $scope.siteMeta.description = "";
        $scope.siteMeta.title = "Home";

        $scope.menu = Menu.tags;
        $scope.menu.status = false;
    }
    ]);

 siteControllers.controller('quienesSomosCtrl', ['$scope', 'Meta', 'Menu',
    function ($scope, Meta, Menu) {
        $scope.siteMeta = Meta.tags;
        $scope.siteMeta.description = "";
        $scope.siteMeta.title = "Quienes Somos";

        $scope.menu = Menu.tags;
        $scope.menu.status = false;
    }
    ]);

 siteControllers.controller('contactCtrl', ['$scope', 'Meta', 'Menu', '$http',
    function ($scope, Meta, Menu, $http) {
        $scope.siteMeta = Meta.tags;
        $scope.siteMeta.description = "";
        $scope.siteMeta.title = "Contacto";

        $scope.menu = Menu.tags;
        $scope.menu.status = false;

        $scope.quote = {
            name: '',
            email: '',
            phone: '',
            place: '',
            date: '',
            subject: '',
            message: '',
            result: ''
        };

        $scope.sendQuote = function () {
            if ($scope.quote.name.length > 0 && $scope.quote.email.length > 0 && $scope.quote.phone.length > 0 && $scope.quote.subject.length > 0 && $scope.quote.message.length > 0) {
                $('#quoteName, #quoteEmail, #quotePhone, #quoteSubject, #quoteMessage').css({
                    border: "2px solid #eeeeee"
                });

                $http({
                    method: "POST",
                    url: "scripts/quote.php",
                    data: {
                        name: $scope.quote.name,
                        email: $scope.quote.email,
                        phone: $scope.quote.phone,
                        place: $scope.quote.place,
                        date: $scope.quote.date,
                        subject: $scope.quote.subject,
                        message: $scope.quote.message
                    }
                }).success(function (data) {
                    if (data.result == 'error') {
                        $scope.quote.result = "error";
                    } else if (data.result == 'success') {
                        $scope.quote = {
                            name: '',
                            email: '',
                            phone: '',
                            place: '',
                            date: '',
                            subject: '',
                            message: '',
                            result: 'success'
                        };
                    }
                }).error(function (data) {
                    $scope.quote.result = "error";
                });
            } else {
                $scope.quote.result = 'data';
                $('#quoteName, #quoteEmail, #quotePhone, #quoteSubject, #quoteMessage').css({
                    border: "2px solid red"
                });
            }
        };
    }
    ]);

siteControllers.controller('portfolioCtrl', ['$scope', 'Meta', 'Menu', '$http', '$routeParams', '$location',
    function ($scope, Meta, Menu, $http, $routeParams, $location) {
        $scope.siteMeta = Meta.tags;
        $scope.siteMeta.description = "Portafolio " + $routeParams.title;
        $scope.siteMeta.title = $routeParams.title;

        $scope.id = $routeParams.id;
        $scope.title = $routeParams.title;
        $scope.pagination = {
            page: 0,
            pageSize: 20,
            qPage: 0
        };
        $scope.fullscreen = false;
        $scope.position = 0;

        $http({
            method: "GET",
            url: "scripts/portfolio.php",
            params: {
                id: $routeParams.id
            }
        }).success(function (data) {
            if (data.length > 0) {
                $scope.photos = data;
                $scope.pagination.qPage = Math.ceil($scope.photos.length / $scope.pagination.pageSize);
            } else {
                $location.path("/home");
            }
        });

        $scope.first = function () {
            $scope.pagination.page = 0;
        };

        $scope.previous = function () {
            $scope.pagination.page -= 1;
            if ($scope.pagination.page < 0) {
                $scope.pagination.page = 0;
            }
        };

        $scope.next = function () {
            $scope.pagination.page += 1;
            if ($scope.pagination.page == $scope.pagination.qPage) {
                $scope.pagination.page = $scope.pagination.qPage - 1;
            }
        };

        $scope.last = function () {
            $scope.pagination.page = $scope.pagination.qPage - 1;
        };

        $scope.showPhoto = function (index) {
            $scope.position = ($scope.pagination.page * 20) + index;
            $scope.fullscreen = true;
            $scope.photoBackground = 'url(galleries/banner/' + $scope.id + '/' + $scope.photos[$scope.position].file + ')';
        };

        $scope.closePhoto = function () {
            $scope.fullscreen = false;
            $scope.photoBackground = '';
        };

        $scope.fullPrevious = function () {
            $scope.position -= 1;
            if ($scope.position < 0) {
                $scope.position = 0;
            }
            $scope.photoBackground = 'url(galleries/banner/' + $scope.id + '/' + $scope.photos[$scope.position].file + ')';
        };

        $scope.fullNext = function () {
            $scope.position += 1;
            if ($scope.position > $scope.photos.length - 1) {
                $scope.position = $scope.photos.length - 1;
            }
            $scope.photoBackground = 'url(galleries/banner/' + $scope.id + '/' + $scope.photos[$scope.position].file + ')';
        };
    }
    ]);

siteControllers.controller('galleryStartCtrl', ['$scope', 'Meta', 'Menu', '$http', '$location',
    function ($scope, Meta, Menu, $http, $location) {
        $scope.siteMeta = Meta.tags;
        $scope.siteMeta.description = "";
        $scope.siteMeta.title = "Clientes";

        $scope.menu = Menu.tags;
        $scope.menu.status = false;

        $scope.gallery = {
            id: '',
            password: '',
            result: ''
        };

        $scope.signIn = function () {
            $http({
                method: "POST",
                url: "scripts/galleryStart.php",
                data: {
                    id: $scope.gallery.id,
                    password: $scope.gallery.password
                }
            }).success(function (data) {
                if (data.result == 'error') {
                    $scope.gallery.result = "error";
                } else if (data.result == 'success') {
                    $location.path("/impresiones/" + $scope.gallery.id);
                }
            }).error(function (data) {
                $scope.gallery.result = "serverError";
            });
        };
    }
    ]);

siteControllers.controller('gallerySelectCtrl', ['$scope', 'Meta', 'Menu', '$http', '$routeParams', '$location',
    function ($scope, Meta, Menu, $http, $routeParams, $location) {
        $scope.siteMeta = Meta.tags;
        $scope.siteMeta.description = "";
        $scope.siteMeta.title = "Seleccione sus fotos";

        $scope.menu = Menu.tags;
        $scope.menu.status = false;

        $scope.id = $routeParams.id;
        $scope.pagination = {
            page: 0,
            pageSize: 20,
            qPage: 0
        };
        $scope.fullscreen = false;
        $scope.position = 0;
        $scope.result = '';

        $http({
            method: "GET",
            url: "scripts/gallerySelect.php",
            params: {
                id: $routeParams.id
            }
        }).success(function (data) {
            if (data.result == 'error') {
                $location.path("/home");
            } else if (data.result == 'success') {
                $scope.title = data.title;
                $scope.folder = data.folder;
                $scope.photos = data.photos;
                $scope.pagination.qPage = Math.ceil($scope.photos.length / $scope.pagination.pageSize);
            }
        }).error(function (data) {
            $location.path("/home");
        });

        $scope.first = function () {
            $scope.pagination.page = 0;
        };

        $scope.previous = function () {
            $scope.pagination.page -= 1;
            if ($scope.pagination.page < 0) {
                $scope.pagination.page = 0;
            }
        };

        $scope.next = function () {
            $scope.pagination.page += 1;
            if ($scope.pagination.page == $scope.pagination.qPage) {
                $scope.pagination.page = $scope.pagination.qPage - 1;
            }
        };

        $scope.last = function () {
            $scope.pagination.page = $scope.pagination.qPage - 1;
        };

        $scope.showPhoto = function (index) {
            $scope.position = ($scope.pagination.page * 20) + index;
            $scope.fullscreen = true;
            $scope.photoBackground = 'url(galleries/impresiones/' + $scope.folder + '/' + $scope.photos[$scope.position].file + ')';
        };

        $scope.closePhoto = function () {
            $scope.fullscreen = false;
            $scope.photoBackground = '';
        };

        $scope.fullPrevious = function () {
            $scope.position -= 1;
            if ($scope.position < 0) {
                $scope.position = 0;
            }
            $scope.photoBackground = 'url(galleries/impresiones/' + $scope.folder + '/' + $scope.photos[$scope.position].file + ')';
        };

        $scope.fullNext = function () {
            $scope.position += 1;
            if ($scope.position > $scope.photos.length - 1) {
                $scope.position = $scope.photos.length - 1;
            }
            $scope.photoBackground = 'url(galleries/impresiones/' + $scope.folder + '/' + $scope.photos[$scope.position].file + ')';
        };

        $scope.savePhotos = function () {
            $http({
                method: "POST",
                url: "scripts/gallerySavePhotos.php",
                data: {
                    id: $scope.id,
                    files: $scope.photos
                }
            }).success(function (data) {
                if (data.result == 'error') {
                    $scope.result = "error";
                } else if (data.result == 'success') {
                    $scope.result = "success";
                }
            }).error(function (data) {
                $scope.result = "error";
            });
        };
    }
    ]);

siteControllers.controller('bodasCtrl', ['$scope', 'Meta', 'Menu', '$http', '$routeParams', '$location',
    function ($scope, Meta, Menu, $http, $routeParams, $location) {
        if ($routeParams.categoria == 'preboda') {
            $scope.title = 'Pre-boda';
        } else if ($routeParams.categoria == 'boda') {
            $scope.title = 'Boda';
        } else if ($routeParams.categoria == 'postboda') {
            $scope.title = 'Post-boda';
        }

        $scope.siteMeta = Meta.tags;
        $scope.siteMeta.description = "Fotos de " + $scope.title;
        $scope.siteMeta.title = "Fotos de " + $scope.title;

        $scope.menu = Menu.tags;
        $scope.menu.status = false;

        $scope.pagination = {
            page: 0,
            pageSize: 20,
            qPage: 0
        };
        $scope.fullscreen = false;
        $scope.position = 0;
        $scope.categoria = $routeParams.categoria;

        $http({
            method: "GET",
            url: "scripts/bodas.php",
            params: {
                categoria: $routeParams.categoria
            }
        }).success(function (data) {
            if (data.length > 0) {
                $scope.photos = data;
                $scope.pagination.qPage = Math.ceil($scope.photos.length / $scope.pagination.pageSize);
            } else {
                $location.path("/home");
            }
        });

        $scope.first = function () {
            $scope.pagination.page = 0;
        };

        $scope.previous = function () {
            $scope.pagination.page -= 1;
            if ($scope.pagination.page < 0) {
                $scope.pagination.page = 0;
            }
        };

        $scope.next = function () {
            $scope.pagination.page += 1;
            if ($scope.pagination.page == $scope.pagination.qPage) {
                $scope.pagination.page = $scope.pagination.qPage - 1;
            }
        };

        $scope.last = function () {
            $scope.pagination.page = $scope.pagination.qPage - 1;
        };

        $scope.showPhoto = function (index) {
            $scope.position = ($scope.pagination.page * 20) + index;
            $scope.fullscreen = true;
            $scope.photoBackground = 'url(galleries/' + $scope.categoria + '/' + $scope.photos[$scope.position].file + ')';
        };

        $scope.closePhoto = function () {
            $scope.fullscreen = false;
            $scope.photoBackground = '';
        };

        $scope.fullPrevious = function () {
            $scope.position -= 1;
            if ($scope.position < 0) {
                $scope.position = 0;
            }
            $scope.photoBackground = 'url(galleries/' + $scope.categoria + '/' + $scope.photos[$scope.position].file + ')';
        };

        $scope.fullNext = function () {
            $scope.position += 1;
            if ($scope.position > $scope.photos.length - 1) {
                $scope.position = $scope.photos.length - 1;
            }
            $scope.photoBackground = 'url(galleries/' + $scope.categoria + '/' + $scope.photos[$scope.position].file + ')';
        };
    }
    ]);