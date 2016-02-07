// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'controllers', 'directives', 'services'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboards
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

            .state('tab.view', {
                url: '/view',
                views: {
                    'tab-view': {
                        templateUrl: 'templates/view.html',
                        controller: 'viewCtrl'
                    }
                }
            }) 
        
            .state('tab.exploration', {
                url: '/explore',
                views: {
                    'tab-view': {
                        templateUrl: 'templates/exploration.html'
                    }
                }
            }) 
            .state('tab.scan', {
                url: '/scan',
                views: {
                    'tab-scan': {
                        templateUrl: 'templates/scan.html'
                    }
                }
            })
            .state('tab.level', {
                url: '/level',
                views: {
                    'tab-one': {
                        templateUrl: 'templates/level.html',
                        controller: 'mapCtrl'
                    }
                }
            })
        
         .state('tab.settings', {
                url: '/settings',
                views: {
                    'tab-settings': {
                        templateUrl: 'templates/settings.html'
                        
                    }
                }
            })


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/level');
    });
