angular.module('services')
    .service('beaconMediaSrvc', function($translate, $ionicPopup, pointSrvc, storylineSrvc, mediaSrvc, textSrvc) {

        var BeaconMedia = {};

        /*
         * Extract media  for current point
         */
        BeaconMedia.fetchMedia = function() {
            var point = pointSrvc.getCurrentPoint();
            var story = storylineSrvc.getCurrentStoryline();
            var uuids;
            var data;
            var media;

            if (story === undefined) {
                uuids = point.getMedia().none;
				return undefined;
            } else {
                uuids = point.getMedia()[story.getUUID()];
            }

			if(uuids === undefined){
				return undefined;
			}else{
            	return mediaSrvc.getMediaByLanguage(uuids, $translate.use());
			}
        };

        /**
         * Get first video for current point
         */
        BeaconMedia.video = function() {
            var media = BeaconMedia.fetchMedia();
			if(media === undefined){
				return undefined;
			}

            for (var i = 0; i < media.length; i++) {
                if (media !== undefined && media[i].getType() === "video") {
                    return {
                        path: media[i].getPath(),
                        caption: media[i].getCaption()
                    };
                }
            }
        };

        /**
         * Get first audio for current point
         */
        BeaconMedia.audio = function() {
            var media = BeaconMedia.fetchMedia();
			if(media === undefined){
				return undefined;
			}

            for (var i = 0; i < media.length; i++) {
                if (media !== undefined && media[i].getType() === "audio") {
                    return {
                        path: media[i].getPath(),
                        caption: media[i].getCaption()
                    };
                }
            }
        };

        return BeaconMedia;
});
