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
                pointDiv.css('left', scope.point.left + 'px');
                pointDiv.css('top', scope.point.top + 'px');
                pointDiv.css('border-color', scope.point.color);
                pointDiv.css('width', scope.point.diameter + 'px');
                pointDiv.css('height', scope.point.diameter + 'px');
            }

        }
    });
