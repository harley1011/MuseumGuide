angular.module('directives')
    .directive('pointDetails', function($translate, pointSrvc, storylineSrvc, mediaSrvc, textSrvc) {
        var linker = function (scope, element, attrs) {
          //Can't get more hacky~~~~ aaaaaaa yeeaaaa
          scope.$on('changeLanguage', function(event, language){
            element[0].innerHTML = '';
            //directive rerender faster than $translate changes, so I need to introduce this
            attrs.language = language;
            linker(scope, element, attrs);
          });

          //Getting the content
          var point = pointSrvc.getCurrentPoint(),
              story = storylineSrvc.getCurrentStoryline(),
              texts, media, uuids;
          texts = textSrvc.getTexts(
          {
            uuid: point.getUUID(),
            //Hacky!~~~~~
            language: (attrs.language) ? attrs.language : $translate.use(),
            storyline: story === undefined? 'none' : story.getUUID()
          });
          if(attrs.language) delete attrs.language;
          if(story === undefined){
            uuids = point.getMedia().none;
          }else{
            uuids = point.getMedia()[story.getUUID()];
          }
          media = mediaSrvc.getMediaByLanguage(uuids, $translate.use());
          //Preparing the HTML
          var titleChild, titleHTML, contentChildren = [], contentChild, contentHTML;

          titleHTML =
          '    <div class="item item-divider">'+ texts.title +'</div>' +
          '    <div class="item item-text-wrap">'+ texts.description +'</div>';
          titleChild = document.createElement('div');
          titleChild.classList.add('card');
          titleChild.innerHTML = titleHTML;
          contentChildren.push(titleChild);

          var mediaStr;
          for(var i = 0 ; i < media.length ; i++){
            switch(media[i].getType()){
              case 'video':
                mediaStr = '       <video class="full-image" src="'+ media[i].getPath()+ '" preload controls></video>';
                break;
              case 'image':
                mediaStr = '       <img class="full-image" src="'+ media[i].getPath()+ '" />';
                break;
              case 'audio':
                mediaStr = '       <audio class="full-image" src="'+ media[i].getPath()+ '" control></audio>';
                break;
              default:
                break;
            }
            contentHTML =
            '    <div class="item item-divider"></div>' +
            '    <div class="item item-body">' +
                 mediaStr +
            '        <p>'+ media[i].getCaption()+ '</p>' +
            '    </div>';
            contentChild = document.createElement('div');
            contentChild.classList.add('card');
            contentChild.innerHTML = contentHTML;
            contentChildren.push(contentChild);
          }
          //Adding content to directive element
          for(var j = 0 ; j < contentChildren.length; j++){
            element.append(contentChildren[j]);
          }
        };

        return {
            restrict: 'A',
            scope: {},
            link: linker
        };
    });
