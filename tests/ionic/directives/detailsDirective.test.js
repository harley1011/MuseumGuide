describe('details directive tests', function () {
    var $rootScope,
        $compile;

    beforeEach(module('directives')); // load controllers module from project
    beforeEach(module('services'));
    beforeEach(module('my.templates'));

    beforeEach(function () {
        module('services');
        module(function ($provide) {
            $provide.service('$translate', function () {
                return {
                  language: 'en',
                  use: function(language){
                    if(language !== undefined){
                      this.language = language;
                    }else{
                      return this.language;
                    }
                  }
                };
            });
            $provide.service('$ionicPopup', function () {
                return {
                    show: function(data){
                    }
                };
            });
        });

    });

    beforeEach(inject(function (_$rootScope_, _$compile_, $injector, _$translate_,
      _storylineSrvc_, _mediaSrvc_, _pointSrvc_, _floorSrvc_, _textSrvc_, _transferProtocolSrvc_) {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
        $translate = _$translate_;
        storylineSrvc = _storylineSrvc_;
        mediaSrvc = _mediaSrvc_;
        pointSrvc = _pointSrvc_;
        floorSrvc = _floorSrvc_;
        textSrvc = _textSrvc_;
        transferProtocolSrvc = _transferProtocolSrvc_;
        rawPoints = JSON.parse(JSON.stringify(transferProtocolSrvc.read("mapData").node[0].poi));
    }));



    describe('test cases for details directive test', function () {

      //Assumes the structure of StoryPoint title/description details is
      /*
      titleHTML =
      '    <div class="item item-divider">'+ texts.title +'</div>' +
      '    <div class="item item-text-wrap">'+ texts.description +'</div>';
      */
      //Assumes the structure of StoryPoint media details is
      /*
      contentHTML =
      '    <div class="item item-divider"></div>' +
      '    <div class="item item-body">' +
           mediaStr +
      '        <p>'+ media[i].getCaption()+ '</p>' +
      '    </div>';
      */
        it('should produce the correct media for the storyline 1 point 1', function () {
            //Setting the stage
            var scope = $rootScope.$new();
            storylineSrvc.setCurrentStoryline(storylineSrvc.getStorylinesByUUID([1])[0]);
            pointSrvc.setCurrentPoint(pointSrvc.getPointsByUUID([1])[0]);
            //Compiling directive
            var compiledElement = $compile(angular.element('<div point-details></div>'))(scope);
            scope.$digest();
            //Obtaining raw data for comparison
            var rawPoint;
            for(var i = 0 ; i < rawPoints.length ; i++){
              if(rawPoints[i].id === 1){
                rawPoint = rawPoints[i];
                break;
              }
            }
            //Comparing raw data with directive content
            var contentChildren = $(compiledElement).find(".card"),
                contentDivs;
            //Test function checking if src is same as in raw data
            var mediaContentTestFunction = function(div){
              var media = $(div).children()[0],
                  mediaType = ($(media)[0].tagName === 'IMG') ? 'image' : $(media)[0].tagName.toLowerCase();
              return rawPoint.storyPoint[0].media[mediaType][0].path === $(media).attr('src');
            };
            //Checking for all contentChildren
            for(var j = 0 ; j < contentChildren.length; j++){
              //Checks if is title or media
              if($(contentChildren[j]).find('p').length === 0){
                contentDivs = $(contentChildren[j]).children('div');
                expect(contentDivs[0].innerHTML).toEqual(rawPoint.storyPoint[0].title[0].title);
                expect(contentDivs[1].innerHTML).toEqual(rawPoint.storyPoint[0].description[0].description);
              }else{
                contentDivs = $(contentChildren[j]).children('div');
                expect(mediaContentTestFunction(contentDivs[1])).toEqual(true);
              }
            }
        });

        //'should produce the correct media for free roam point 1'

        //'should produce the correct media when language is changed'

    });

    function testDataMapPoints() {
        var dimensions = {
          "width": 809,
          "height": 1715
        };
        var points = [{
            "id": 1, //int or SHA1 hash
            "type": "poi", //string {"poi","fac","dir"}
            "subtype": "", //string {"washroom", "stairs", ...}
            "coordinate": {
                "x": 120, //float, px
                "y": 1506, //float, px
                "z": 1, //int (1-5)
            },
            "neighbours": [2, 3], //int[] or string[] SHA1 hash
            "beacon_id": "undefined", //int or SHA1 hash
            "style": {
                "color": "#00008B", //string, HEX Color
                "diameter": 12, //float, px
            },
        }];

        return [
          new GraphicalPoint(new PointOfInterest(points[0]), dimensions),
        ];
    }
});
