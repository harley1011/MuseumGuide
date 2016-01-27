angular.module('directives')
    .directive('map', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/map.html',
            link: function (scope, element, attrs) {
                console.log(element.find('canvas'));
                console.log(element.find('div')[0].offsetHeight);
                // element.find('canvas').offsetHeight = element.find('div')[0].offsetHeight;

                var canvas = document.getElementById("myCanvas"),
                    ctx = canvas.getContext("2d");
                //canvas.width = element.find('div')[0].offsetWidth;   /// use integer values
                canvas.height = element.find('div')[0].offsetHeight;
                var img = new Image();
                img.src = "img/one-small.png";
                img.onload = function(){
                    console.log("image loaded");
                    scope.draw();
                }
                scope.zoom = function(){
                    console.log("zoom");
                    ctx.scale(2, 2);
                }
                scope.draw = function() {
                    canvas.width = canvas.height * (img.width / img.height);

                    ctx.drawImage(img, 0,0, canvas.width, canvas.height);
                    /// step 1 - resize to 50%
                  /*  var oc = document.createElement('canvas'),
                        octx = oc.getContext('2d');

                    oc.width = img.width * 0.5;
                    oc.height = img.height * 0.5;
                    octx.drawImage(img, 0, 0, oc.width, oc.height);

                    /// step 2 - resize 50% of step 1
                    octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);

                    /// step 3, resize to final size
                    ctx.imageSmoothingEnabled = false;
                    ctx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5,
                        0, 0, canvas.width, canvas.height);*/
                }
            }

        }
    });
