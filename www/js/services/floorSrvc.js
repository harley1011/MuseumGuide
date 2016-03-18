angular.module('services')
  .service('floorSrvc', function(JSONFactorySrvc) {
    var floors = {},
        currentFloor;
    var floorSrvc = {
      getFloorsByNumber: function(numbers) {
        var arr = [];
        for(var i = 0 ; i < numbers.length; i++){
          if(floors[numbers[i]] !== undefined)
            arr.push(floors[numbers[i]]);
        }
        return arr;
      },
      getCurrentFloor: function() {
        return currentFloor !== undefined? floors[currentFloor] : undefined;
      },
      setCurrentFloor: function(floor) {
        if(floor instanceof Floor){
          currentFloor = floor.getNumber();
        }
      },
      getFloors: function() {
        var arr = [];
        for(key in floors){
          arr.push(floors[key]);
        }
        return arr;
      },
      loadFloors: function() {
        var arr = JSONFactorySrvc.load("floors"),
            floor;
        for (var i = 0 ; i < arr.length; i++) {
          floor = arr[i];
          if(floor instanceof Floor)
            floors[floor.getNumber()] = floor;
        }
      }
    };
    floorSrvc.loadFloors();
    return floorSrvc;
  });
