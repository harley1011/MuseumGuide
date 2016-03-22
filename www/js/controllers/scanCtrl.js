angular.module('controllers')
    .controller('scanCtrl', function ($scope, $state, $translatePartialLoader, qrSrvc) {
            $translatePartialLoader.addPart('qr');

            $scope.openQRScanner = function () {

                if (!window.cordova) {
                    qrSrvc.storeQrDetails({
                            "texts": [
                                {
                                    "title": "Text One",
                                    "language": "en",
                                    "content": "This is the text one"
                                },
                                {
                                    "title": "Texte Un",
                                    "language": "fr",
                                    "content": "Ceci est le texte d'une"
                                }
                            ],
                            "images": [
                                {
                                    "url": "img/1a.png",
                                    "language": "en",
                                    "caption": "image one"
                                },
                                {
                                    "url": "img/1a.png",
                                    "language": "fr",
                                    "caption": "l'image d'un"
                                }
                            ]
                        }
                    );
                    $state.go('tab.qrDetails');
                }
                else {
                    cordova.plugins.barcodeScanner.scan(
                        function (result) {
                            alert("We got a barcode\n" +
                                "Result: " + result.text + "\n" +
                                "Format: " + result.format + "\n" +
                                "Cancelled: " + result.cancelled);

                            qrSrvc.storeQrDetails(JSON.parse(result.text));
                            $state.go('tab.qrDetails');
                        },
                        function (error) {
                            alert("Scanning failed: " + error);
                        }
                    );
                }
            }
        }
    );
