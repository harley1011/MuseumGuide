angular.module('directives')
    .directive('ionTabSlideButton', function () {
        return {
            restrict: 'E',
            replace: true,
            require: ['^ionTabs'],
            template: '<a ng-class="{\'tab-item-active\': isTabActive()}" ' +
            ' ng-disabled="disabled()" class="tab-item">' +
            '<i class="icon {{icon}}" ng-if="getIconOn() && isTabActive()"></i>' +
            '<i class="icon {{icon}}" ng-if="getIconOff() && !isTabActive()"></i>' +
            '</a>',
            scope: {
                icon: '@',
            },
            link: function ($scope, $element, $attrs, ctrls) {
                var tabsCtrl = ctrls[0];
                tabsCtrl.subMenuActive = false;
                $scope.slideMenuOpen = false;
                tabsCtrl.changeIconForTab = function (icon) {
                    $scope.icon = icon;
                }
                tabsCtrl.closeMenuIfOpen = function () {
                    if ($scope.slideMenuOpen) {
                        if (tabsCtrl.subMenuActive) {
                            tabsCtrl.backToMenu();
                        }
                        $scope.icon = 'icon-arrowUp';
                        tabsCtrl.$tabsContainerElement.removeClass('bottom-container-top');
                        tabsCtrl.$tabsContainerElement.addClass('bottom-container-bottom');
                        $scope.slideMenuOpen = false;
                    }

                }

                if (!$attrs.ngClick) {
                    $element.on('click', function (event) {
                        $scope.$apply(function () {
                            slideUpMenu();
                        });
                    });
                }

                $scope.slideUpMenu = slideUpMenu;

                function slideUpMenu() {
                    if (tabsCtrl.subMenuActive) {
                        tabsCtrl.backToMenu();
                    }
                    else if ($scope.slideMenuOpen) {
                        $scope.icon = 'icon-arrowUp';
                        tabsCtrl.$tabsContainerElement.removeClass('bottom-container-top');
                        tabsCtrl.$tabsContainerElement.addClass('bottom-container-bottom');
                        $scope.slideMenuOpen = false;
                    }
                    else {
                        $scope.icon = 'icon-arrowDown';
                        tabsCtrl.$tabsContainerElement.removeClass('bottom-container-bottom');
                        tabsCtrl.$tabsContainerElement.addClass('bottom-container-top');
                        $scope.slideMenuOpen = true;
                    }
                }

                $scope.getIconOn = function () {
                    return $scope.icon;
                };
                $scope.getIconOff = function () {
                    return $scope.icon;
                };

                $scope.isTabActive = function () {
                    return $scope.slideMenuOpen;
                };
            }
        };
    });
