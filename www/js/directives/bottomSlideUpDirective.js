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
                var tabsCtrl = ctrls[0];
                var subMenuElement = angular.element(element[0].querySelector('.sub-menu-list'));
                tabsCtrl.subMenuActive = false;

                tabsCtrl.backToMenu = function () {
                    tabsCtrl.subMenuActive = false;
                    tabsCtrl.changeIconForTab('icon-arrowDown');
                    subMenuElement.removeClass('slide-sub-menu-list');
                    console.log('back to menu');
                }
                scope.choseStoryLines = function () {
                    tabsCtrl.subMenuActive = true;
                    tabsCtrl.changeIconForTab('icon-arrowBack');
                    subMenuElement.addClass('slide-sub-menu-list');
                }

                scope.findFacilities = function () {

                }

                scope.choseStoryLine = function (storyLine) {
                    console.log(storyLine);
                    tabsCtrl.closeMenuIfOpen();
                }
            }
        }
    });
