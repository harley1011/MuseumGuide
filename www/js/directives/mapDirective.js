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
                loadImage(scope.level.map.url);

                scope.$watch('level', function(newValue, oldValue) {
                    loadImage(scope.level.map.url);
                });

                function loadImage(url){
                    console.log('loading img'+ url);
                    var img = new Image();
                    img.src = url;
                    img.onload = function () {
                        angular.element(mapImageDiv).css('height', mapDiv.offsetHeight + 'px');
                        angular.element(mapImageDiv).css('width', mapDiv.offsetHeight * (img.width / img.height) + 'px');
                        $rootScope.$broadcast('mapLoaded');
                    }
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
