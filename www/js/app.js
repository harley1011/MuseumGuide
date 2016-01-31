// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'controllers', 'directives'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $ionicConfigProvider.tabs.position('bottom');
        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })
            
            .state('level', {
                url: '/level',
                abstract: true,
                templateUrl: 'templates/menu-level.html'
            })

            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

            .state('tab.levelOne', {
                url: '/levelOne',
                views: {
                    'tab-one': {
                        templateUrl: 'templates/levelOne.html',
                        controller: 'mapCtrl'
                    }
                }
            })

            .state('tab.levelTwo', {
                url: '/levelTwo',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/levelTwo.html',
                        controller: 'mapCtrl'
                    }
                }
            })

            .state('tab.levelThree', {
                url: '/levelThree',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/levelThree.html'
                    }
                }
            })

            .state('tab.levelFour', {
                url: '/levelFour',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/levelFour.html'
                    }
                }
            })

            .state('app.levelFive', {
                url: '/levelOne',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/levelFive.html'
                    }
                }
            })

            .state('app.levelSix', {
                url: '/levelSix',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/levelSix.html'
                    }
                }
            })


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/levelOne');
    });
