angular.module('directives')
    .directive('mapPoint', function() {
        return {
            restrict: 'A',
            scope: {
                point: '=point'
            },
            link: function (scope, element, attrs) {
                //console.log("[mapPointDirective]: Printing Map Points.");
                //console.log(scope.point);

                var pointDiv = element;

                if(scope.point.current)
                    pointDiv.addClass('current-point');

                pointDiv.css('left', scope.point.left + '%');
                pointDiv.css('top', scope.point.top + '%');
                pointDiv.css('background-color', scope.point.color);
                pointDiv.css('width', scope.point.diameterX + '%');
                pointDiv.css('height', scope.point.diameterY + '%');

                if(scope.showID)
                    pointDiv.text(scope.point.id);

                var test = function() {
                    if(pointDiv.hasClass('current-point') && pointDiv.hasClass('current-point-light')){
                        pointDiv.removeClass('current-point-light');
                    }
                    else if (pointDiv.hasClass('current-point')){
                        pointDiv.addClass('current-point-light');
                    }
                }

                setInterval(test, 600);
            }

        }
    });
