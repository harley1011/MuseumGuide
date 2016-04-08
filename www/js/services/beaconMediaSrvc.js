angular.module('services')
    .service('beaconMediaSrvc', function($translate, $ionicPopup, pointSrvc, storylineSrvc, mediaSrvc, textSrvc) {

        var BeaconMedia = {};
        BeaconMedia.media = {};

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
            } else {
                uuids = point.getMedia()[story.getUUID()];
            }
            media = mediaSrvc.getMediaByLanguage(uuids, $translate.use());

			for (var i = 0; i < media.length; i++) {
				if (media !== undefined && media[i].getType() === "video" && !("video" in BeaconMedia.media)) {
					BeaconMedia.media.video = {path: media[i].getPath(), caption: media[i].getCaption()};
				}

				if (media !== undefined && media[i].getType() === "audio" && !("audio" in BeaconMedia.media)) {
					BeaconMedia.media.audio = {path: media[i].getPath(), caption: media[i].getCaption()};
				}

				if(("video" in BeaconMedia.media) && ("audio" in BeaconMedia.media)){
					break;
				}
			}
			return BeaconMedia.media;
        };

        /**
         * Get first video for current point
         */
        BeaconMedia.video = function() {
			BeaconMedia.fetchMedia();

            return BeaconMedia.media.video;
        };

		/**
         * Get first audio for current point
         */
		BeaconMedia.audio = function() {
			BeaconMedia.fetchMedia();

			return BeaconMedia.media.audio;
		};

        return BeaconMedia;
});
