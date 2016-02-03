angular.module('directives')
    .directive('map', function ($rootScope) {
        return {
            restrict: 'E',
            templateUrl: 'templates/map.html',
            scope: {
                level: '=level'
            },
            link: function (scope, element, attrs) {
                var mapDiv = element.find('div')[0];
                var mapImageDiv = element.find('div')[1];
                console.log(scope.level);
                var img = new Image();
                img.src = "img/one-small.png";
                img.onload = function () {
                    angular.element(mapImageDiv).css('height', mapDiv.offsetHeight + 'px');
                    angular.element(mapImageDiv).css('width', mapDiv.offsetHeight * (img.width / img.height) + 'px');
                    $rootScope.$broadcast('mapLoaded');
                }

                scope.zoomIn = function(){
                    $rootScope.$broadcast('zoomIn');
                }
                scope.zoomOut = function(){
                    $rootScope.$broadcast('zoomOut');
                }
            }

        }
    });
