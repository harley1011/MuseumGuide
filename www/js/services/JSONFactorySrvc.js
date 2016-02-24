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
        floors: [],
      },
      getPoints: function(transmission, gotPoints) {
        var raw = transmission.point,
          points = [],
          beacons = [];
        //Checks if points have not already been loaded
        if (this.store.points.length === 0) {
          //If not loads them
          for (var i = 0; i < raw.length; i++) {
            switch (raw[i].type) {
              case "poi":
                points.push(new PointOfInterest(raw[i]));
                if (raw[i].beacon_id != 'undefined') {
                  beacons.push(new Beacon(raw[i]));
                }
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
      getStorylines: function(transmission) {
        var raw = transmission.storyline,
          storylines = [];
        //Checks if storylines have not already been loaded
        if (this.store.storylines.length === 0) {
          //If not loads them
          for (var i = 0; i < raw.length; i++) {
            storylines.push(new Storyline(raw[i]));
          }
          this.store.storylines = storylines;
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
        } else {
          //else simply gives a shallow copy of array
          beacons = this.store.beacons.slice();
        }
      },
      getFloors: function(transmission) {
        var raw = transmission.level,
          floors = [];
        //Checks if storylines have not already been loaded
        if (this.store.floors.length === 0) {
          //If not loads them
          for (var i = 0; i < raw.length; i++) {
            floors.push(new Floor(raw[i]));
          }
          this.store.floors = floors;
        } else {
          //else simply gives a shallow copy of array
          floors = this.store.floors.slice();
        }
        return floors;
      },
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
          default:
            q = undefined;
        }
        return q;
      },
    };
  });
