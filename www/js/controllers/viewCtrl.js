angular.module('controllers')
.controller('viewCtrl', function($scope, $state, $ionicActionSheet) {

    $scope.explore = function () {
        $state.go('tab.exploration');
    }

    $scope.find = function () {
         
        $ionicActionSheet.show({
            titleText: 'Storylines',
            buttons: [
                { text: '<i class="icon ion-paper-airplane"></i>'
                 + ' Free Exploration' },
                { text: ' Nipper: Searching for his master\'s voice' },
                { text: '<i class="icon ion-trophy"></i>'
                 + ' Kid Quest' }
            ],
//            destructiveText: 'Delete',
            cancelText: 'Cancel',
            cancel: function() {
                console.log('CANCELLED');
            },
            buttonClicked: function(index) {
                console.log('BUTTON CLICKED', index);
                return true;
            },
            destructiveButtonClicked: function() {
                console.log('DESTRUCT');
                return true;
            }
        });

    }
});