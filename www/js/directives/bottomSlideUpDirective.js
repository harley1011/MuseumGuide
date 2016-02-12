angular.module('directives')
    .directive('bottomSlideUp', function () {
        return {
            require: ['^ionTabs'],
            restrict: 'E',
            templateUrl: 'templates/bottom-slide-up.html',
            link: function (scope, element, attrs, ctrls) {
                ctrls[0].subMenuActive = false;


                ctrls[0].backToMenu = function() {
                    ctrls[0].subMenuActive = false;
                    ctrls[0].changeIconForTab('ion-qr-scanner');
                    angular.element(element[0].querySelector('.sub-menu-list')).removeClass('slide-sub-menu-list');
                    console.log('back to menu');
                }   
                scope.choseStoryLine = function() {
                    ctrls[0].subMenuActive = true;
                    ctrls[0].changeIconForTab('ion-log-out');
                    angular.element(element[0].querySelector('.sub-menu-list')).addClass('slide-sub-menu-list');
                }

                scope.findFacilities = function() {

                }
            }
        }
    });
