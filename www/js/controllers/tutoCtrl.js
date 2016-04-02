angular.module('controllers')
    .controller('tutoCtrl', function ($scope, $state, $ionicModal, $translatePartialLoader, exploreModeSrvc, $translate, $rootScope, storylineSrvc) {

// s
        $translatePartialLoader.addPart('tutorial');
        $ionicModal.fromTemplateUrl('templates/tutorial-modal.html', {
            scope: $scope,
            animation: 'ease-in'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.language = $translate.use();
        $scope.openModal = function () {
            $scope.modal.show();
        };

        $scope.closeModal = function () {
            $scope.modal.hide();
            $rootScope.$broadcast('loadBeacons');
        };

        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hide', function () {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function () {
            // Execute action
        });
        $scope.$on('modal.shown', function () {
            console.log('Modal is shown!');
        });

        $scope.freeMode = function () {
            $scope.openModal();
            exploreModeSrvc.setMode(2);
            $state.go('tab.level');
        };

        $scope.storyLineMode = function (storyLine) {
            storylineSrvc.storylinePopup(storyLine, $translate.use(), function(){
                $scope.openModal();
                console.log("storyline selected");
                exploreModeSrvc.setMode(1);
                exploreModeSrvc.setStoryline(storyLine);
                $state.go('tab.level');
            })


        };

        $rootScope.$on('changeLanguage', function (e, language) {
            $scope.language = $translate.use();
            $scope.storyLines = exploreModeSrvc.getStorylines();
        });

        $scope.storyLines = exploreModeSrvc.getStorylines();
        // eo

    });
