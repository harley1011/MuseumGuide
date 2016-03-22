angular.module('services')
  .service('qrSrvc', function() {
    var storedCodeDetails;

    var qrSrvc = {};

    qrSrvc.storeQrDetails = function(qrDetails)
    {
      storedCodeDetails = qrDetails;
    }

    qrSrvc.getStoredQrDetails = function()
    {
      return storedCodeDetails;
    }
    return qrSrvc;
  });
