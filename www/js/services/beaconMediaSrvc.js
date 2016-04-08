angular.module('services')
	.service('beaconMediaSrvc', function ($translate,$ionicPopup, pointSrvc, storylineSrvc, mediaSrvc, textSrvc) {

		var VideoBeacon = {};

		VideoBeacon.video = function () {
			var point = pointSrvc.getCurrentPoint(),
				story = storylineSrvc.getCurrentStoryline(),
				data, media, uuids;

			if (story === undefined) {
				uuids = point.getMedia().none;
			} else {
				uuids = point.getMedia()[story.getUUID()];
			}
			media = mediaSrvc.getMediaByLanguage(uuids, $translate.use());

			for(var i = 0 ; i < media.length ; i++){
				if(media!== undefined && media[i].getType() === "video"){
					data = {path: media[i].getPath(), caption: media[i].getCaption()};
					break;
				}
			}

			return data;
		};

		return VideoBeacon;
	});
