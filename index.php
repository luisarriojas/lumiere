<!--
LumiereFotosDeBoda.com
Copyright (c) 2015 LumiereFotosDeBoda.com

Developed by Luis E. Arriojas for LumiereFotosDeBoda.com
LinkedIn: https://www.linkedin.com/in/luisarriojas
-->

<!doctype html>
<html ng-app="siteApp" ng-controller="siteCtrl">

<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{{siteMeta.description}}">
    <title ng-bind-template="{{siteMeta.title}} - LumiereFotosDeBoda.com"></title>

    <!--CSS-->
    <link href="css/site.css" rel="stylesheet" type="text/css"/>
    <link href="css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
    <link href="wowSlider/engine1/style.css" rel="stylesheet" type="text/css"/>

    <!--JS-->
    <script src="js/jquery-2.2.0.min.js"></script>
    <script src="js/angular.min.js"></script>
    <script src="js/angular-route.min.js"></script>
    <script src="js/angular-sanitize.min.js"></script>
    <script src="js/angular-app.js"></script>
    <script src="js/angular-ctrl.js"></script>
</head>

<body>
<div class="header">
    <div class="container">
        <div class="menuHor">
            <ul>
                <li class="options">
                    <a href="javascript:void(0);" ng-click="menuOpenClose();"><i class="fa fa-bars"></i> Menú</a>
                </li>
            </ul>
        </div>

        <a href="#!home">
            <div class="logo"></div>
        </a>

        <div class="halfCircle"></div>

        <div class="federations">
            <a href="https://mywed.com/photographer/sandrodisante/" class="federation federation1" target="_blank"></a>
            <a class="federation federation2"></a>

            <div class="break"></div>
        </div>

        <div class="break"></div>
    </div>
</div>

<div class="view" ng-view autoscroll="true"></div>

<div class="footer">
    <div class="container">
        <div class="left">
            <ul>
                <li><a href="https://www.facebook.com/Lumi%C3%A8re-Fotograf%C3%ADa-de-Bodas-1594358424165814/"
                       target="_blank"><i class="fa fa-facebook-square" target="_blank"></i></a></li>
                <li><a href="https://twitter.com/lumierefotoboda" target="_blank"><i class="fa fa-twitter-square"
                                                                                     target="_blank"></i></a></li>
                <li><a href="https://www.instagram.com/lumierefotosdeboda/" target="_blank"><i
                                class="fa fa-instagram"></i></a></li>
                <li><a href="mailto:lumierefotosdeboda@gmail.com"><i class="fa fa-envelope"></i></a></li>
            </ul>
        </div>

        <div class="right">
            <ul>
                <li><i class="fa fa-copyright"></i> 2015 LumiereFotosDeBoda.com</li>
            </ul>
        </div>

        <div class="break"></div>
    </div>
</div>

<div class="menu" ng-show="menu.status==true">
    <div class="left">
        <a href="#!home" class="full"><i class="fa fa-home"></i> Home</a>
        <a href="#!quienesSomos" class="full"><i class="fa fa-camera"></i> Quienes Somos</a>

        <a href="#!blog/list" class="col1"><i class="fa fa-newspaper-o" aria-hidden="true"></i> Blog</a>
        <a href="#!bodas/preboda" class="col2"><i class="fa fa-camera-retro"></i> Pre Bodas</a>
        <div class="break"></div>

        <a href="#!bodas/boda" class="col1"><i class="fa fa-camera-retro"></i> Bodas</a>
        <a href="#!bodas/postboda" class="col2"><i class="fa fa-camera-retro"></i> Post Bodas</a>
        <div class="break"></div>

        <a href="#!bodas/preferidas" class="full"><i class="fa fa-star" aria-hidden="true"></i> Preferidas de
            Lumiere</a>
        <a href="#!clientes" class="full"><i class="fa fa-users"></i> Clientes</a>
        <a href="#!contacto" class="full"><i class="fa fa-phone-square"></i> Contacto</a>

        <h2>Miembro de</h2>
        <a href="https://mywed.com/photographer/sandrodisante/" class="menuFederation federation1" target="_blank"></a>
        <br>
        <a class="menuFederation federation2"></a>
    </div>

    <div class="right" ng-hide="result=='error'">
        <div class="picture" style="background-image : url(img/blog/{{article.id}}.jpg);"></div>
        <div class="title">{{article.title}}</div>
        <div class="break"></div>
        <div class="publishedOn">
            Fecha de publicación: {{article.publishedOn}}
        </div>
        <div class="body" ng-bind-html="article.body"></div>
    </div>

    <div class="break"></div>
</div>

</body>

</html>
