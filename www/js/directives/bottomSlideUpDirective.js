angular.module('directives')
    .directive('bottomSlideUp', function () {
        return {
            require: ['^ionTabs'],
            restrict: 'E',
            templateUrl: 'templates/bottom-slide-up.html',
            link: function (scope, element, attrs, ctrls) {
                scope.storyLines = [
                    {
                        title: 'Storyline 1',
                        id: 1
                    },
                    {
                        title: 'Storyline 2',
                        id: 2
                    },
                    {
                        title: 'Storyline 3',
                        id: 3
                    },
                    {
                        title: 'Storyline 4',
                        id: 4
                    },
                    {
                        title: 'Storyline 5',
                        id: 5
                    },
                    {
                        title: 'Storyline 6',
                        id: 6
                    },
                    {
                        title: 'Storyline 7',
                        id: 7
                    }
                ];
                ctrls[0].subMenuActive = false;

                ctrls[0].backToMenu = function () {
                    ctrls[0].subMenuActive = false;
                    ctrls[0].changeIconForTab('ion-qr-scanner');
                    angular.element(element[0].querySelector('.sub-menu-list')).removeClass('slide-sub-menu-list');
                    console.log('back to menu');
                }
                scope.choseStoryLines = function () {
                    ctrls[0].subMenuActive = true;
                    ctrls[0].changeIconForTab('ion-log-out');
                    angular.element(element[0].querySelector('.sub-menu-list')).addClass('slide-sub-menu-list');
                }

                scope.findFacilities = function () {

                }

                scope.choseStoryLine = function (storyLine) {
                    console.log(storyLine);
                }
            }
        }
    });
