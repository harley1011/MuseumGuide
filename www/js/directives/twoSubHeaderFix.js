/* http://ionicinaction.com/blog/ionic-custom-double-subheaders/ */
angular.module('directives')
  .directive('positionBarsAndContent', function($timeout) {

    return {

      restrict: 'AC',

      link: function(scope, element) {

        var offsetTop = 43;

        // Get the parent node of the ion-content
        var parent = angular.element(element[0].parentNode);

        // Get all the headers in this parent
        var headers = parent[0].getElementsByClassName('bar');

        // Iterate through all the headers
        for (x = 0; x < headers.length; x++) {
          // If this is not the main header or nav-bar, adjust its position to be below the previous header
          if (x > 0) {
            headers[x].style.top = offsetTop + 'px';
          }

          // Add up the heights of all the header bars
          offsetTop = offsetTop + headers[x].offsetHeight;
        }

        // Position the ion-content element directly below all the headers
        element[0].style.top = offsetTop + 'px';

      }
    };
  });
