angular.module('services')
  .service('pointSrvc', function(JSONFactorySrvc) {
    var points = {},
        currentPoint, beaconInRangePoint;
    var pointSrvc = {
      getPointsByUUID: function(uuids){
        var arr = [];
        for(var i = 0 ; i < uuids.length; i++){
          if(points[uuids[i]] !== undefined)
            arr.push(points[uuids[i]]);
        }
        return arr;
      },
      getCurrentPoint: function() {
        return currentPoint !== undefined? points[currentPoint] : undefined;
      },
      isCurrent: function(uuid) {
        return currentPoint !== undefined? currentPoint === uuid : false;
      },
      setCurrentPoint: function(point) {
        if(point instanceof Point){
          currentPoint = point.getUUID();
        }
      },
      getPointInRange: function() {
        return beaconInRangePoint !== undefined? points[beaconInRangePoint] : undefined;
      },
      setPointInRange: function(point) {
        if(point instanceof Point){
          beaconInRangePoint = point.getUUID();
        }
      },
      isInRange: function(uuid) {
        return beaconInRangePoint !== undefined? beaconInRangePoint === uuid : false;
      },
      getNonGraphicalPoint: function(point){
        if(point instanceof GraphicalPoint){
					return points[point.getUUID()] !== undefined ? points[point.getUUID()] : undefined;
				}else if(point instanceof Point){
					return point;
				}
      },
      getPoints: function() {
        var arr = [];
        for(key in points){
          arr.push(points[key]);
        }
        return arr;
      },
      loadPoints: function() {
        var arr = JSONFactorySrvc.load("points"),
            point;
        for (var i = 0 ; i < arr.length; i++) {
          point = arr[i];
          if(point instanceof Point)
            points[point.getUUID()] = point;
        }
      }
    };
    pointSrvc.loadPoints();
    return pointSrvc;
  });
