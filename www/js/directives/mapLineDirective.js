angular.module('directives')
    .directive('mapLine', function() {
        return {
            restrict: 'A',
            scope: {
                line: '=line'
            },
            link: function (scope, element, attrs) {
                var lineDiv = element;
                lineDiv.css('left', scope.line.getCoordinates().x + '%');
                lineDiv.css('top', scope.line.getCoordinates().y + '%');
                lineDiv.css('width', scope.line.getMagnitude() + '%');
                lineDiv.css('border-top', "4px" + " solid " + scope.line.getColor());
                lineDiv.css({
                    '-moz-transform': 'rotate(' + scope.line.getAngle() + 'deg)',
                    '-webkit-transform': 'rotate(' + scope.line.getAngle() + 'deg)',
                    '-o-transform': 'rotate(' + scope.line.getAngle() + 'deg)',
                    '-ms-transform': 'rotate(' + scope.line.getAngle() + 'deg)',
                    'transform': 'rotate(' + scope.line.getAngle() + 'deg)'
                });
                lineDiv.css('transform-origin', 'center left');
            }

        };
    });
