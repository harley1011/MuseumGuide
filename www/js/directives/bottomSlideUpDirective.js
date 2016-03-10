angular.module('directives')
	.directive('bottomSlideUp', function (JSONFactorySrvc, $rootScope, $translatePartialLoader, $ionicPopup, $translate) {

		return {
			require: ['^ionTabs'],
			restrict: 'E',
			templateUrl: 'templates/bottom-slide-up.html',
			link: function (scope, element, attrs, ctrls) {
				$translatePartialLoader.addPart('bottomSlideUp');

				scope.storyLines = JSONFactorySrvc.load("storylines");
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
					tabsCtrl.changeIconForTab('icon-arrowBack');
					subMenuElement.addClass('slide-sub-menu-list');
				};

				scope.findFacilities = function () {

				};

				scope.choseStoryLine = function (storyLine) {
					console.log(storyLine.getTitle());

					showPopup(null, null, storyLine);
				};


				function showPopup (title, message, storyLine) {
					var titleDisplayed;
					var messageDisplayed;
					if ($translate.use() == 'fr')
					{
						titleDisplayed = storyLine.getTitle().fr_ca;
						messageDisplayed = storyLine.getDescription().fr_ca;
					}
					else
					{
						titleDisplayed = storyLine.getTitle().en_us;
						messageDisplayed = storyLine.getDescription().en_us;
					}


					if(title !== null && title !== "")
						titleDisplayed = title;

					if(message !== null && message !== "")
						messageDisplayed = message;

					$ionicPopup.show({
						template: messageDisplayed,
						title: titleDisplayed,
						custom: true,
						buttons: [
							{ text: '',
								type: 'button-cancel ion-close-circled'},
							{
								text: 'Chose Storyline',
								type: 'button-more-details',
								onTap: function(e) {
									tabsCtrl.closeMenuIfOpen();
									$rootScope.$broadcast('storyLineChosen', storyLine);
								}
							}
						]
					});
				}
			}


		};
	});
