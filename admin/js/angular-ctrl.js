/*
LumiereFotosDeBoda.com
Copyright (c) 2015 LumiereFotosDeBoda.com

Developed by Luis E. Arriojas for LumiereFotosDeBoda.com
LinkedIn: https://www.linkedin.com/in/luisarriojas
*/

'use strict';

var siteControllers = angular.module('siteControllers', []);

siteControllers.controller('siteCtrl', ['$scope', 'Meta', 'Menu', '$http', '$location',
    function($scope, Meta, Menu, $http, $location) {
        $scope.siteMeta = Meta.tags;
        $scope.menu = Menu.tags;

        $http({
            method: "GET",
            url: "scripts/isSignIn.php"
        }).success(function(data) {
            if (data.result == 'error') {
                $location.path("/signIn");
            } else if (data.result == 'success') {
                $scope.menu.isSignedIn = true;
            }
        }).error(function(data) {
            $location.path("/signIn");
        });

        $scope.menuOpenClose = function() {
            if ($scope.menu.status == false) {
                $scope.menu.status = true;
            } else {
                $scope.menu.status = false;
            }
        };

        $scope.signOut = function() {
            $http({
                method: "GET",
                url: "scripts/signOut.php"
            }).success(function(data) {
                if (data.result == 'success') {
                    $scope.menu.isSignedIn = false;
                    $location.path("/signIn");
                }
            }).error(function(data) {
                $location.path("/signIn");
            });
        };
    }
]);

siteControllers.controller('homeCtrl', ['$scope', 'Meta', 'Menu',
    function($scope, Meta, Menu) {
        $scope.siteMeta = Meta.tags;
        $scope.siteMeta.description = "";
        $scope.siteMeta.title = "Home";

        $scope.menu = Menu.tags;
        $scope.menu.status = false;
    }
]);

siteControllers.controller('signInCtrl', ['$scope', 'Meta', 'Menu', '$http', '$location',
    function($scope, Meta, Menu, $http, $location) {
        $scope.siteMeta = Meta.tags;
        $scope.siteMeta.description = "";
        $scope.siteMeta.title = "Iniciar sesión";

        $scope.menu = Menu.tags;
        $scope.menu.status = false;

        $scope.signIn = {
            user: '',
            password: '',
            result: ''
        };

        $scope.signIn = function() {
            $http({
                method: "POST",
                url: "scripts/signIn.php",
                data: {
                    user: $scope.signIn.user,
                    password: $scope.signIn.password
                }
            }).success(function(data) {
                if (data.result == 'error') {
                    $scope.signIn.result = "error";
                } else if (data.result == 'success') {
                    $scope.menu.isSignedIn = true;
                    $location.path("/banner/list");
                }
            }).error(function(data) {
                $scope.signIn.result = "serverError";
            });
        };
    }
]);

siteControllers.controller('bannerListCtrl', ['$scope', 'Meta', 'Menu', '$http',
    function($scope, Meta, Menu, $http) {
        $scope.siteMeta = Meta.tags;
        $scope.siteMeta.description = "";
        $scope.siteMeta.title = "Listado del banner";

        $scope.menu = Menu.tags;
        $scope.menu.status = false;

        $scope.banner = {
            result: '',
            slides: []
        };

        $http({
            method: "GET",
            url: "scripts/bannerList.php"
        }).success(function(data) {
            if (data.result == 'serverError') {
                $scope.banner.result = 'serverError';
            } else {
                $scope.banner = data;
            }
        }).error(function(data) {
            $scope.banner.result = 'serverError';
        });
    }
]);

siteControllers.controller('bannerEditCtrl', ['$scope', 'Meta', 'Menu', '$http', '$routeParams', '$location',
    function($scope, Meta, Menu, $http, $routeParams, $location) {
        $scope.siteMeta = Meta.tags;
        $scope.siteMeta.description = "";
        $scope.siteMeta.title = "Editar una lámina";

        $scope.menu = Menu.tags;
        $scope.menu.status = false;

        $scope.slide = {
            id: $routeParams.id,
            title: $routeParams.title,
            subtitle: $routeParams.subtitle,
            status: {
                code: '',
                text: $routeParams.status
            },
            imageTemp: false
        };
        if ($routeParams.status == 'ON') {
            $scope.slide.status.code = 1;
        } else {
            $scope.slide.status.code = 0;
        }

        $scope.imagePreview = $scope.slide.id + '.jpg?token=' + Math.random();
        $scope.result = '';

        $scope.statusAvailable = [
            { code: 1, text: 'ON' },
            { code: 0, text: 'OFF' }
        ];

        $('#image').on('change', function() {
            var imageForm = document.getElementById('imageForm');
            var imageData = new FormData(imageForm);
            $.ajax({
                url: 'scripts/imageTemp.php', //Server script to process data
                type: 'POST',
                // Form data
                data: imageData,
                //Options to tell jQuery not to process data or worry about content-type.
                cache: false,
                contentType: false,
                processData: false,
                success: function(data) {
                    if (data.uploaded == true) {
                        $scope.$apply(function() {
                            $scope.imagePreview = "imageTemp.jpg?token=" + Math.random();
                            $scope.slide.imageTemp = true;
                        });
                    }
                }
            });
        });

        $scope.update = function() {
            $http({
                method: "POST",
                url: "scripts/bannerUpdate.php",
                data: {
                    form: $scope.slide
                }
            }).success(function(data) {
                if (data.result == 'serverError') {
                    $scope.result = "serverError";
                } else if (data.result == 'success') {
                    $location.path("/banner/list");
                }
            }).error(function(data) {
                $scope.result = "serverError";
            });
        };
    }
]);

siteControllers.controller('quienesSomosListCtrl', ['$scope', 'Meta', 'Menu', '$http', '$location',
    function($scope, Meta, Menu, $http, $location) {
        $scope.siteMeta = Meta.tags;
        $scope.siteMeta.description = "";
        $scope.siteMeta.title = "Quienes Somos";

        $scope.menu = Menu.tags;
        $scope.menu.status = false;

        $scope.delete = {
            "dialog": false,
            "id": "",
            "index": ""
        };

        $http({
            method: "GET",
            url: "scripts/quienesSomosList.php"
        }).success(function(data) {
            if (data.result == 'success') {
                $scope.cards = data.cards;
            } else {
                $location.path("/banner/list");
            }
        }).error(function(data) {
            $location.path("/banner/list");
        });

        $scope.deleteDialog = function(id, index) {
            $scope.delete = {
                "dialog": true,
                "id": id,
                "index": index
            };
        };

        $scope.deleteAction = function(action) {
            if (action == true) {
                $http({
                    method: "GET",
                    url: "scripts/quienesSomosDelete.php",
                    params: {
                        id: $scope.delete.id
                    }
                }).success(function(data) {
                    if (data.result == 'success') {
                        $scope.cards.splice($scope.delete.index, 1);
                        $scope.delete = {
                            "dialog": false,
                            "id": "",
                            "index": ""
                        };
                    }
                });
            } else {
                $scope.delete = {
                    "dialog": false,
                    "id": "",
                    "index": ""
                };
            }
        };
    }
]);

siteControllers.controller('quienesSomosCreateCtrl', ['$scope', 'Meta', 'Menu', '$http', '$location',
    function($scope, Meta, Menu, $http, $location) {
        $scope.siteMeta = Meta.tags;
        $scope.siteMeta.description = "";
        $scope.siteMeta.title = "Crear Sección";

        $scope.menu = Menu.tags;
        $scope.menu.status = false;

        $scope.card = {
            order: '',
            title: '',
            content: ''
        };

        $scope.save = function() {
            $http({
                method: "POST",
                url: "scripts/quienesSomosCreate.php",
                data: {
                    card: $scope.card
                }
            }).success(function(data) {
                $location.path("/quienesSomos/list");
            }).error(function(data) {
                $location.path("/quienesSomos/list");
            });
        };
    }
]);

siteControllers.controller('quienesSomosUpdateCtrl', ['$scope', 'Meta', 'Menu', '$http', '$location', '$routeParams',
    function($scope, Meta, Menu, $http, $location, $routeParams) {
        $scope.siteMeta = Meta.tags;
        $scope.siteMeta.description = "";
        $scope.siteMeta.title = "Modificar Sección";

        $scope.menu = Menu.tags;
        $scope.menu.status = false;

        $scope.card = {
            id: '',
            order: '',
            title: '',
            content: ''
        };

        $http({
            method: "GET",
            url: "scripts/quienesSomosUpdateRead.php",
            params: {
                id: $routeParams.id
            }
        }).success(function(data) {
            if (data.result == 'success') {
                $scope.card = data.card;
            } else {
                $location.path("/quienesSomos/list");
            }
        }).error(function(data) {
            $location.path("/quienesSomos/list");
        });

        $scope.save = function() {
            $http({
                method: "POST",
                url: "scripts/quienesSomosUpdateSave.php",
                data: {
                    card: $scope.card
                }
            }).success(function(data) {
                $location.path("/quienesSomos/list");
            }).error(function(data) {
                $location.path("/quienesSomos/list");
            });
        };
    }
]);

siteControllers.controller('galleriesListCtrl', ['$scope', 'Meta', 'Menu', '$http',
    function($scope, Meta, Menu, $http) {
        $scope.siteMeta = Meta.tags;
        $scope.siteMeta.description = "";
        $scope.siteMeta.title = "Lista de Galerías";

        $scope.menu = Menu.tags;
        $scope.menu.status = false;

        $scope.galleries = {
            result: '',
            records: []
        };

        $http({
            method: "GET",
            url: "scripts/galleriesList.php"
        }).success(function(data) {
            if (data.result == 'serverError') {
                $scope.galleries.result = 'serverError';
            } else {
                $scope.galleries = data;
            }
        }).error(function(data) {
            $scope.galleries.result = 'serverError';
        });
    }
]);

siteControllers.controller('galleriesCreateCtrl', ['$scope', 'Meta', 'Menu', '$http', '$location',
    function($scope, Meta, Menu, $http, $location) {
        $scope.siteMeta = Meta.tags;
        $scope.siteMeta.description = "";
        $scope.siteMeta.title = "Crear galería";

        $scope.menu = Menu.tags;
        $scope.menu.status = false;

        /* Generates a new ID */
        var newId = Date.now() * Math.random(); //set a base number
        newId = (newId / 1000000) - Math.floor(newId / 1000000); //gets only its decimal part
        newId = Math.floor(newId * 1000000); //converts decimal to integer
        $scope.gallery = {
            id: newId,
            password: '',
            title: '',
            folder: '',
            status: '1'
        };
        $scope.result = '';

        $scope.save = function() {
            if ($scope.gallery.password != '' && $scope.gallery.title != '' && $scope.gallery.folder != '') {
                $http({
                    method: "POST",
                    url: "scripts/galleriesCreate.php",
                    data: {
                        form: $scope.gallery
                    }
                }).success(function(data) {
                    if (data.result == 'errorPhotos') {
                        $scope.result = "errorPhotos";
                    } else if (data.result == 'serverError') {
                        $scope.result = "serverError";
                    } else if (data.result == 'success') {
                        $location.path("/impresiones/list");
                    }
                }).error(function(data) {
                    $scope.result = "serverError";
                });
            } else {
                $scope.result = "error";
            }
        };
    }
]);

siteControllers.controller('galleriesReadCtrl', ['$scope', 'Meta', 'Menu', '$http', '$routeParams', '$location',
    function($scope, Meta, Menu, $http, $routeParams, $location) {
        $scope.siteMeta = Meta.tags;
        $scope.siteMeta.description = "";
        $scope.siteMeta.title = "Galería " + $routeParams.id;

        $scope.menu = Menu.tags;
        $scope.menu.status = false;

        $scope.id = $routeParams.id;
        $scope.folder = '';
        $scope.pagination = {
            page: 0,
            pageSize: 20,
            qPage: 0
        };
        $scope.fullscreen = false;
        $scope.removeDialog = false;

        $http({
            method: "GET",
            url: "scripts/galleryRead.php",
            params: {
                id: $routeParams.id
            }
        }).success(function(data) {
            if (data.result == 'success') {
                $scope.folder = data.folder;
                $scope.photos = data.photos;

                for (var i = 0; i < $scope.photos.length; i++) {
                    if ($scope.photos[i].status == false) {
                        $scope.photos.splice(i, 1);
                        i--;
                    }
                }

                $scope.pagination.qPage = Math.ceil($scope.photos.length / $scope.pagination.pageSize);
            } else {
                $location.path("/impresiones/list");
            }
        }).error(function(data) {
            $location.path("/impresiones/list");
        });

        $scope.first = function() {
            $scope.pagination.page = 0;
        };

        $scope.previous = function() {
            $scope.pagination.page -= 1;
            if ($scope.pagination.page < 0) {
                $scope.pagination.page = 0;
            }
        };

        $scope.next = function() {
            $scope.pagination.page += 1;
            if ($scope.pagination.page == $scope.pagination.qPage) {
                $scope.pagination.page = $scope.pagination.qPage - 1;
            }
        };

        $scope.last = function() {
            $scope.pagination.page = $scope.pagination.qPage - 1;
        };

        $scope.showPhoto = function(index) {
            $scope.position = ($scope.pagination.page * 20) + index;
            $scope.fullscreen = true;
            $scope.photoBackground = 'url(../galleries/impresiones/' + $scope.folder + '/' + $scope.photos[$scope.position].file + ')';
        };

        $scope.closePhoto = function() {
            $scope.fullscreen = false;
            $scope.photoBackground = '';
        };

        $scope.fullPrevious = function() {
            $scope.position -= 1;
            if ($scope.position < 0) {
                $scope.position = 0;
            }
            $scope.photoBackground = 'url(../galleries/impresiones/' + $scope.folder + '/' + $scope.photos[$scope.position].file + ')';
        };

        $scope.fullNext = function() {
            $scope.position += 1;
            if ($scope.position > $scope.photos.length - 1) {
                $scope.position = $scope.photos.length - 1;
            }
            $scope.photoBackground = 'url(../galleries/impresiones/' + $scope.folder + '/' + $scope.photos[$scope.position].file + ')';
        };

        $scope.removeDialogOpen = function() {
            $scope.removeDialog = true;
        };

        $scope.removeDialogClose = function() {
            $scope.removeDialog = false;
        };

        $scope.remove = function() {
            $http({
                method: "GET",
                url: "scripts/galleryRemove.php",
                params: {
                    id: $routeParams.id
                }
            }).success(function(data) {
                if (data.result == 'success') {
                    $location.path("/impresiones/list");
                }
            });
        };
    }
]);

siteControllers.controller('galleriesUpdateCtrl', ['$scope', 'Meta', 'Menu', '$http', '$location', '$routeParams',
    function($scope, Meta, Menu, $http, $location, $routeParams) {
        $scope.siteMeta = Meta.tags;
        $scope.siteMeta.description = "";
        $scope.siteMeta.title = "Modificar galería";

        $scope.menu = Menu.tags;
        $scope.menu.status = false;

        $scope.gallery = {
            result: null,
            id: $routeParams.id,
            password: null,
            title: null,
            folder: null,
            status: {
                code: null,
                text: null
            }
        };

        $http({
            method: "GET",
            url: "scripts/galleryUpdateRead.php",
            params: {
                id: $routeParams.id
            }
        }).success(function(data) {
            if (data.result == 'success') {
                $scope.gallery = data;
                if ($scope.gallery.status.code == 1) {
                    $scope.gallery.status.text = 'ON';
                } else {
                    $scope.gallery.status.text = 'OFF';
                }
            }
        }).error(function(data) {
            $location.path("/impresiones/read/" + $routeParams.id);
        });

        $scope.statusAvailable = [
            { code: 1, text: 'ON' },
            { code: 0, text: 'OFF' }
        ];

        $scope.update = function() {
            if ($scope.gallery.password != '' && $scope.gallery.title != '' && $scope.gallery.folder != '') {
                $http({
                    method: "POST",
                    url: "scripts/galleriesUpdate.php",
                    data: {
                        form: $scope.gallery
                    }
                }).success(function(data) {
                    if (data.result == 'serverError') {
                        $scope.gallery.result = "serverError";
                    } else if (data.result == 'success') {
                        $location.path("/impresiones/read/" + $routeParams.id);
                    }
                }).error(function(data) {
                    $scope.gallery.result = "serverError";
                });
            } else {
                $scope.result = "error";
            }
        };
    }
]);

siteControllers.controller('blogListCtrl', ['$scope', 'Meta', 'Menu', '$http', '$location',
    function($scope, Meta, Menu, $http, $location) {
        $scope.siteMeta = Meta.tags;
        $scope.siteMeta.description = "";
        $scope.siteMeta.title = "Blog";

        $scope.menu = Menu.tags;
        $scope.menu.status = false;

        $scope.delete = {
            "dialog": false,
            "id": "",
            "index": ""
        };

        $http({
            method: "GET",
            url: "scripts/blogList.php"
        }).success(function(data) {
            if (data.result != 'error') {
                $scope.articles = data.articles;
            }
        }).error(function(data) {
            $location.path("/banner/list");
        });

        $scope.star = function(id) {
            $http({
                method: "POST",
                url: "scripts/blogStar.php",
                data: {
                    id: id
                }
            }).success(function(data) {
                if (data.result != 'error') {
                    for (var i = 0; i < $scope.articles.length; i++) {
                        if ($scope.articles[i].id == id) {
                            $scope.articles[i].star = 1;
                        } else {
                            $scope.articles[i].star = 0;
                        }
                    }
                }
            });
        };

        $scope.deleteDialog = function(id, index) {
            $scope.delete = {
                "dialog": true,
                "id": id,
                "index": index
            };
        };

        $scope.deleteAction = function(action) {
            if (action == true) {
                $http({
                    method: "GET",
                    url: "scripts/blogDelete.php",
                    params: {
                        id: $scope.delete.id
                    }
                }).success(function(data) {
                    if (data.result == 'success') {
                        $scope.articles.splice($scope.delete.index, 1);
                        $scope.delete = {
                            "dialog": false,
                            "id": "",
                            "index": ""
                        };
                    }
                });
            } else {
                $scope.delete = {
                    "dialog": false,
                    "id": "",
                    "index": ""
                };
            }
        };
    }
]);

siteControllers.controller('blogCreateCtrl', ['$scope', 'Meta', 'Menu', '$http', '$location',
    function($scope, Meta, Menu, $http, $location) {
        $scope.siteMeta = Meta.tags;
        $scope.siteMeta.description = "";
        $scope.siteMeta.title = "Crear artículo";

        $scope.menu = Menu.tags;
        $scope.menu.status = false;

        $scope.save = function() {
            var createForm = document.getElementById('createForm');
            var createData = new FormData(createForm);
            $.ajax({
                url: 'scripts/blogCreate.php', //Server script to process data
                type: 'POST',
                // Form data
                data: createData,
                //Options to tell jQuery not to process data or worry about content-type.
                cache: false,
                contentType: false,
                processData: false,
                success: function(data) {
                    $scope.$apply(function() {
                        $location.path("/blog/list");
                    });
                }
            });
        }
    }
]);

siteControllers.controller('blogReadCtrl', ['$scope', 'Meta', 'Menu', '$http', '$routeParams', '$location',
    function($scope, Meta, Menu, $http, $routeParams, $location) {
        $scope.siteMeta = Meta.tags;
        $scope.siteMeta.description = "";
        $scope.siteMeta.title = "Blog";

        $scope.menu = Menu.tags;
        $scope.menu.status = false;

        $http({
            method: "GET",
            url: "scripts/blogRead.php",
            params: {
                id: $routeParams.id
            }
        }).success(function(data) {
            if (data.result != 'error') {
                $scope.article = data.article;
            } else {
                $location.path("/blog/list");
            }
        }).error(function() {
            $location.path("/blog/list");
        });
    }
]);

siteControllers.controller('blogUpdateCtrl', ['$scope', 'Meta', 'Menu', '$http', '$location', '$routeParams',
    function($scope, Meta, Menu, $http, $location, $routeParams) {
        $scope.siteMeta = Meta.tags;
        $scope.siteMeta.description = "";
        $scope.siteMeta.title = "Modificar artículo";

        $scope.menu = Menu.tags;
        $scope.menu.status = false;

        $http({
            method: "GET",
            url: "scripts/blogUpdateRead.php",
            params: {
                id: $routeParams.id
            }
        }).success(function(data) {
            if (data.result != 'error') {
                $('#id').val(data.article.id);
                $('#title').val(data.article.title);
                $('#body').val(data.article.body);
            } else {
                $location.path("/blog/list");
            }
        }).error(function() {
            $location.path("/blog/list");
        });

        $scope.save = function() {
            var updateForm = document.getElementById('updateForm');
            var updateData = new FormData(updateForm);
            $.ajax({
                url: 'scripts/blogUpdate.php', //Server script to process data
                type: 'POST',
                // Form data
                data: updateData,
                //Options to tell jQuery not to process data or worry about content-type.
                cache: false,
                contentType: false,
                processData: false,
                success: function(data) {
                    $scope.$apply(function() {
                        $location.path("/blog/list");
                    });
                }
            });
        }
    }
]);

siteControllers.controller('sugerenciasImagenesCtrl', ['$scope', 'Meta', 'Menu',
    function($scope, Meta, Menu) {
        $scope.siteMeta = Meta.tags;
        $scope.siteMeta.description = "";
        $scope.siteMeta.title = "Sugerencias para las imágenes";

        $scope.menu = Menu.tags;
        $scope.menu.status = false;
    }
]);
