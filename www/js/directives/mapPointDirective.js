angular.module('directives')
    .directive('mapPoint', function(pointSrvc) {
        return {
            restrict: 'A',
            scope: {
                point: '=point'
            },
            link: function (scope, element, attrs) {
                //console.log("[mapPointDirective]: Printing Map Points.");
                //console.log(scope.point);

                var pointDiv = element;

        				scope.$on('updateMapPointsBlink', function() {
        					if(pointSrvc.isInRange(scope.point.getUUID()))
        						pointDiv.addClass('current-point');
        					else {
        						pointDiv.removeClass('current-point');
        						pointDiv.removeClass('current-point-light');
        					}
                }, true);

                if(pointSrvc.isInRange(scope.point.getUUID()))
                    pointDiv.addClass('current-point');
                var options = scope.point.getDisplayOptions();
                pointDiv.css('left', options.left + '%');
                pointDiv.css('top', options.top + '%');
                pointDiv.css('background-color', scope.point.getColor());
                pointDiv.css('width', options.diameter.x * 2 + '%');
                pointDiv.css('height', options.diameter.y * 2  + '%');

                if(scope.showID)
                    pointDiv.text(scope.point.getUUID());

                var test = function() {
                    if (pointSrvc.isInRange(scope.point.getUUID())) {
                        if (pointDiv.hasClass('current-point') && pointDiv.hasClass('current-point-light')) {
                            pointDiv.removeClass('current-point-light');
                        }
                        else if (pointDiv.hasClass('current-point')) {
                            pointDiv.addClass('current-point-light');
                        }
                    }
                }

                setInterval(test, 600);
            }

        }
    });
