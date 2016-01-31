angular.module('directives')
    .directive('mapLine', function() {
        return {
            restrict: 'A',
            scope: {
                line: '=line'
            },
            link: function (scope, element, attrs) {
                var lineDiv = element;
                lineDiv.css('left', scope.line["position"]["x"] + 'px');
                lineDiv.css('top', scope.line["position"]["y"] + 'px');
                lineDiv.css('width', scope.line["magnitude"] + 'px');
                lineDiv.css('border-top', scope.line["height"] + " solid " + scope.line["color"]);
                lineDiv.css({
                    '-moz-transform': 'rotate(' + scope.line["angle"] + 'deg)',
                    '-webkit-transform': 'rotate(' + scope.line["angle"] + 'deg)',
                    '-o-transform': 'rotate(' + scope.line["angle"] + 'deg)',
                    '-ms-transform': 'rotate(' + scope.line["angle"] + 'deg)',
                    'transform': 'rotate(' + scope.line["angle"] + 'deg)'
                });
                lineDiv.css('transform-origin', 'center left');
            }

        }
    })
