angular.module('directives')
    .directive('bottomSlideUp', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/bottom-slide-up.html',
            link: function (scope, element, attrs) {
                scope.choseStoryLine = function() {
                    angular.element(element[0].querySelector('.sub-menu-list')).addClass('slide-sub-menu-list');
                }

                scope.findFacilities = function() {

                }
            }
        }
    });
