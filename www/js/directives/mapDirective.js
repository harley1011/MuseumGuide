angular.module('directives')
    .directive('map', function ($rootScope) {
        return {
            restrict: 'E',
            templateUrl: 'templates/map.html',
            link: function (scope, element, attrs) {
                var mapDiv = element.find('div')[0];
                var mapImageDiv = element.find('div')[1];
                loadImage(scope.currentFloor.getPlan().getURL());

                scope.$watch('currentLevel', function(newValue, oldValue) {
                    loadImage(scope.currentFloor.getPlan().getURL());
                });

                scope.zoomIn = function(){
                    $rootScope.$broadcast('zoomIn');
                }
                scope.zoomOut = function(){
                    $rootScope.$broadcast('zoomOut');
                }

                function loadImage(url){
                    var img = new Image();
                    img.src = url;
                    angular.element(mapImageDiv).css('background-image', 'url(' + url + ')');
                    img.onload = function () {
                        angular.element(mapImageDiv).css('height', mapDiv.offsetHeight + 'px');
                        angular.element(mapImageDiv).css('width', mapDiv.offsetHeight * (img.width / img.height) + 'px');
                        angular.element(mapImageDiv).css('background-image', 'url(' + url + ')');
                        $rootScope.$broadcast('mapLoaded');
                    }
                }
            }

        }
    });
