angular.module('directives')
    .directive('mapPoint', function () {
        return {
            restrict: 'A',
            scope: {
                point: '=point'
            },
            link: function (scope, element, attrs) {
                console.log(scope.point);
                var pointDiv = element;
                pointDiv.css('left', scope.point.left + '%');
                pointDiv.css('top', scope.point.top + '%');
            }

        }
    });
