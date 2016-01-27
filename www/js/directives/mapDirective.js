angular.module('directives')
    .directive('map', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/map.html',
            link: function (scope, element, attrs) {
                console.log(element.find('canvas'));
                console.log(element.find('div')[0].offsetHeight);
               // element.find('canvas').offsetHeight = element.find('div')[0].offsetHeight;
            }
        }
    });
