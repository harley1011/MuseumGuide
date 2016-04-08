angular.module('services')
	.service('beaconMediaSrvc', function ($translate,$ionicPopup, pointSrvc, storylineSrvc, mediaSrvc, textSrvc) {

		var VideoBeacon = {};

		VideoBeacon.video = function () {
			var point = pointSrvc.getCurrentPoint(),
				story = storylineSrvc.getCurrentStoryline(),
				texts, media, uuids;

			if (story === undefined) {
				uuids = point.getMedia().none;
			} else {
				uuids = point.getMedia()[story.getUUID()];
			}
			media = mediaSrvc.getMediaByLanguage(uuids, $translate.use());

			if(media!== undefined && media[0].getType() === "video"){
				return {path: media[0].getPath(), caption: media[0].getCaption()};
			}else{
				return undefined;
			}
		};

		return VideoBeacon;
	});
