angular.module('services')
  .service('JSONFactorySrvc', function(transferProtocolSrvc) {
    var tps = transferProtocolSrvc;
    var Factory = {
      /**
       * The store is kept to keep track of whether or not the type has been
       * only parsed or if it has been also loaded.
       * This is a mechanism put in place to avoid having to parse through every
       * object of a type if the said type embeds another type (e.g. Points
       * embed Media and Beacon)
       **/
      store: {
        points: [],
        beacons: [],
        storylines: [],
        storylinePoints: {},
        floors: [],
        media: [],
        texts: {},
      },
      getPoints: function(transmission) {
        var raw = transmission.point,
          points = [],
          beacons = [],
          pt;
        //Checks if points have not already been loaded
        if (this.store.points.length === 0) {
          //If not loads them
          for (var i = 0; i < raw.length; i++) {
            switch (raw[i].type) {
              case "poi":
                this.extractBeaconFromPoint(raw[i]);
                this.extractMediaFromPoint(raw[i]);
                this.extractTextFromPoint(raw[i]);
                this.compileStorylinePoints(raw[i]);
                pt = new PointOfInterest(raw[i]);
                points.push(pt);
                break;
              case "dir":
                raw[i].subtype = "intersection";
              case "fac":
                points.push(new PointOfTransition(raw[i]));
                break;
              default:
                break;
            }
          }
          this.store.points = points;
        } else {
          //else simply gives a shallow copy of array
          points = this.store.points.slice();
        }
        return points;
      },
      extractBeaconFromPoint: function(raw) {
        if (raw.beacon_id != 'undefined') {
          this.store.beacons.push(new Beacon(raw));
        }
      },
      extractMediaFromPoint: function(raw) {
        //new media property
        var media = {};
        //extract media uuids from point and assign to storyline "none"
        media.none = this.extractMediaFromMediaProperty(raw);
        if (raw.storyPoint) {
          for (var i = 0; i < raw.storyPoint.length; i++) {
            //extract media uuids from point and assign to storyline ID
            media[raw.storyPoint[i].storylineID] = this.extractMediaFromMediaProperty(raw.storyPoint[i]);
            raw.storyPoint[i].media = null;
          }
        }
        raw.media = media;
      },
      extractMediaFromMediaProperty: function(raw) {
        var uuids = [],
          myMedia;
        if (raw.media) {
          for (type in raw.media) {
            for (var i = 0; i < raw.media[type].length; i++) {
              //Adds type to the raw media for the Media constructor
              raw.media[type][i]["type"] = type;
              myMedia = new Media(raw.media[type][i]);
              uuids.push(myMedia.getUUID());
              //Pushes the media to the global datastructure
              this.store.media.push(myMedia);
            }
          }
        }
        return uuids;
      },
      extractTextFromPoint: function(raw) {
        var texts = {};
        //extract media uuids from point and assign to storyline "none"
        texts.none = this.extractTextFromTextProperties(raw);
        if (raw.storyPoint) {
          for (var i = 0; i < raw.storyPoint.length; i++) {
            //extract media uuids from point and assign to storyline ID
            texts[raw.storyPoint[i].storylineID] = this.extractTextFromTextProperties(raw.storyPoint[i]);
            raw.storyPoint[i].title = null;
            raw.storyPoint[i].description = null;
          }
        }
        this.store.texts[raw.id] = texts;
      },
      extractTextFromTextProperties: function(raw){
        var title = {}, description = {};
        for(var i = 0 ; i < raw.title.length ; i++){
          title[raw.title[i].language] = raw.title[i].title;
        }
        for(var i = 0 ; i < raw.description.length ; i++){
          description[raw.description[i].language] = raw.description[i].description;
        }
        return {title: title, description: description};
      },
      compileStorylinePoints: function(raw) {
        if (raw.storyPoint) {
          for (var i = 0; i < raw.storyPoint.length; i++) {
            //Add the point id to the storyline point store.
            if (this.store.storylinePoints[raw.storyPoint[i].storylineID] === undefined) {
              this.store.storylinePoints[raw.storyPoint[i].storylineID] = [raw.id];
            } else {
              this.store.storylinePoints[raw.storyPoint[i].storylineID].push(raw.id);
            }
          }
        }
      },
      getStorylines: function(transmission) {
        var raw = transmission.storyline,
          storylines = [];
        //Checks if storylines have not already been loaded
        if (this.store.storylines.length === 0) {
          //Check if points have been loaded, if not load them.
          //Allows to map the points to storylines.
          if (this.store.points.length === 0) {
            this.getPoints(transmission);
          }
          //If not loads them
          for (var i = 0; i < raw.length; i++) {
            //Load the points
            raw[i].points = this.store.storylinePoints[raw[i].id];
            storylines.push(new Storyline(raw[i]));
          }
          this.store.storylines = storylines.slice();
        } else {
          //else simply gives a shallow copy of array
          storylines = this.store.storylines.slice();
        }
        return storylines;
      },
      getBeacons: function(transmission) {
        //Check if points have not been loaded already
        var beacons = [];
        if (this.store.points.length === 0) {
          this.getPoints(transmission);
          beacons = this.store.beacons.slice();
        } else {
          //else simply gives a shallow copy of array
          beacons = this.store.beacons.slice();
        }
        return beacons;
      },
      getFloors: function(transmission) {
        var raw = transmission.floorPlan,
          floors = [];
        //Checks if storylines have not already been loaded
        if (this.store.floors.length === 0) {
          //If not loads them
          for (var i = 0; i < raw.length; i++) {
            floors.push(new Floor(raw[i]));
          }
          this.store.floors = floors.slice();
        } else {
          //else simply gives a shallow copy of array
          floors = this.store.floors.slice();
        }
        return floors;
      },
      getMedia: function(transmission) {
        if (this.store.media.length === 0) {
          this.getPoints(transmission);
          return this.store.media.slice();
        } else {
          return this.store.media.slice();
        }
      },
      getTexts: function(transmission) {
        var count = 0;
        for(key in this.store.texts){
          count++;
        }
        if (count === 0) {
          this.getPoints(transmission);
          return this.store.texts;
        } else {
          return this.store.texts;
        }
      }
    };
    return {
      load: function(str) {
        var q;
        switch (str) {
          case "points":
            q = Factory.getPoints(tps.read("mapData"));
            break;
          case "storylines":
            q = Factory.getStorylines(tps.read("mapData"));
            break;
          case "beacons":
            q = Factory.getBeacons(tps.read("mapData"));
            break;
          case "floors":
            q = Factory.getFloors(tps.read("mapData"));
            break;
          case "media":
            q = Factory.getMedia(tps.read("mapData"));
            break;
          case "texts":
            q = Factory.getTexts(tps.read("mapData"));
            break;
          default:
            q = undefined;
        }
        return q;
      },
    };
  });
