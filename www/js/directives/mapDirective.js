angular.module('directives')
    .directive('map', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/map.html',
            link: function (scope, element, attrs) {
                console.log(element.find('canvas'));
                console.log(element.find('div')[0].offsetHeight);
               // element.find('canvas').offsetHeight = element.find('div')[0].offsetHeight;
                window.onload = function() {
                    var canvas = document.getElementById("myCanvas"),
                        ctx = canvas.getContext("2d");
                    console.log(canvas.width);
                    console.log(canvas.height)
                    var image = new Image();
                    image.src = "img/one.png";
                    console.log(image);
                    ctx.drawImage(image, 0, 0, 200,200);
                }
            }
        }
    });
