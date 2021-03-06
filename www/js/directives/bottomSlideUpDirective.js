angular.module('directives')
	.directive('bottomSlideUp', function (JSONFactorySrvc, $rootScope, $translatePartialLoader, storylineSrvc, $translate) {

		return {
			require: ['^ionTabs'],
			restrict: 'E',
			templateUrl: 'templates/bottom-slide-up.html',
			link: function (scope, element, attrs, ctrls) {
				$rootScope.$on('changeLanguage', function(e, language)
				{
					scope.language = $translate.use();
					updateLanguage();
				});
				$translatePartialLoader.addPart('bottomSlideUp');
				scope.language = $translate.use();
				updateLanguage();
               
                scope.isFacility = false;
				var tabsCtrl = ctrls[0];
				var subMenuElement = angular.element(element[0].querySelector('.sub-menu-list'));
				tabsCtrl.subMenuActive = false;

				tabsCtrl.backToMenu = function () {
					tabsCtrl.subMenuActive = false;
					tabsCtrl.changeIconForTab('icon-arrowDown');
					subMenuElement.removeClass('slide-sub-menu-list');
				};

				scope.choseStoryLines = function () {
					tabsCtrl.subMenuActive = true;
                    scope.isFacility = false;
					tabsCtrl.changeIconForTab('icon-arrowBack');
					subMenuElement.addClass('slide-sub-menu-list');
					subMenuElement.removeClass('orange-list');
				};

				scope.choseStoryLine = function (storyLine) {
					storylineSrvc.storylinePopup(storyLine, $translate.use(), function(){
						tabsCtrl.closeMenuIfOpen();
						$rootScope.$broadcast('storyLineChosen', storyLine);
					})
				};

				scope.freeRoam = function () {
					$rootScope.$broadcast('freeRoam');
                    tabsCtrl.closeMenuIfOpen();
				};

				scope.findFacilities = function () {
                    scope.isFacility = true;
                    tabsCtrl.subMenuActive = true;
					tabsCtrl.changeIconForTab('icon-arrowBack');
					subMenuElement.addClass('slide-sub-menu-list');
                    subMenuElement.addClass('orange-list');
                    
                 if($translate.use() === "en") {
                    scope.facilities = [{name: "Washroom"}, 
                                        {name: "Stairs"}, 
                                        {name: "Elevator"}, 
                                        {name: "Front Desk"}];

                } else if($translate.use() === "fr") {
                    scope.facilities = [{name: "Salle de Bain"}, 
                                        {name: "Escalier"}, 
                                        {name: "Ascenseur"}, 
                                        {name: "Bureau d'information"}];

                }
				};
                
                scope.findFacility = function (facility) {
                    $rootScope.$broadcast('findFacilities', facility.name);
                    tabsCtrl.closeMenuIfOpen();
                };
                
                

				function updateLanguage()
				{
					scope.storyLines = JSONFactorySrvc.load("storylines");
                    

					for(var i = scope.storyLines.length; i < 3; i++)
					{
						scope.storyLines.push({empty: true});
					}
				}
			}


		};
	});
