var app = angular.module('myApp', ['ui.bootstrap', 'ui.router', 'LocalStorageModule', 'vesparny.fancyModal', 'ngRoute', 'ui', 'ipCookie', 'angular-md5','vcRecaptcha']);

app.config(function($stateProvider, $urlRouterProvider, $provide, $locationProvider) {
    
    $provide.decorator('$uiViewScroll', function ($delegate) {
        return function (uiViewElement) {}; 
    });

    $urlRouterProvider.otherwise('/');

    $stateProvider

        .state('landing', {
            url: '/',
            templateUrl: 'partials/landing.html',
            controller: 'landingCtrl'
        })

        .state('signUp', {
            url: '/signUp',
            templateUrl: 'partials/signup.html',
            controller: 'signUpCtrl'
        })
        
        .state('email-verification', {
            url :'/email-verification/:code/:userid',
            templateUrl: 'partials/signin.html',
            controller : 'emailVerificationCtrl'
        })

        .state('signIn', {
            url: '/signIn',
            templateUrl: 'partials/signin.html',
            controller: 'signInCtrl'
        })

        .state('reset', {
            url: '/reset',
            templateUrl: 'partials/reset.html',
            controller: 'resetCtrl'
        })

        .state('resetPassword', {
            url: '/resetPassword/:code/:userid',
            templateUrl: 'partials/reset-password.html',
            controller: 'resetPasswordCtrl'
        })

        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'partials/dashboard.html',
            controller: 'dashboardCtrl'
        });

        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('');
        
});