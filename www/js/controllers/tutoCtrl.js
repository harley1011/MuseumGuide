angular.module('controllers')
.controller('tutoCtrl', function($scope, $ionicModal, $translatePartialLoader) {
 
// s
    $translatePartialLoader.addPart('tutorial');
    $ionicModal.fromTemplateUrl('templates/tutorial-modal.html', {
      scope: $scope,
      animation: 'ease-in'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });


   
    // eo
    
});
