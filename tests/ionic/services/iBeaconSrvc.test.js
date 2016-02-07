describe('iBeaconSrvc', function () {
	var beaconSrvc;
	var scope;

	beforeEach(module('services'));

	beforeEach(module(function ($provide) {
		$provide.value('$ionic');
		$provide.value('$ionicPlatform');
		$provide.value('$cordovaBeacon');
	}));

	beforeEach(inject(function (iBeaconSrvc) {
		beaconSrvc = iBeaconSrvc.BeaconBuilder;
	}));

	it('should have BeaconBuilder to be defined', function () {
		expect(beaconSrvc).toBeDefined();
	});

	it('should have init to be defined', function () {
		expect(beaconSrvc.init).toBeDefined();
	});

	it('should have registerBeaconRegions to be defined', function () {
		expect(beaconSrvc.registerBeaconRegions).toBeDefined();
	});

	it('should have registerBeaconRegions to be defined', function () {
		expect(beaconSrvc.registerBeaconRegions).toBeDefined();
	});

	it('should have an event named $iBeaconSrvc:beaconRangeChange', function () {
		expect(beaconSrvc.notifyEvent).toEqual('$iBeaconSrvc:beaconRangeChange');
	});

});
