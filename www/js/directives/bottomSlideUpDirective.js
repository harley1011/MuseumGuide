angular.module('directives')
    .directive('bottomSlideUp', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/bottom-slide-up.html',
            link: function (scope, element, attrs) {
            }
        }
    });
