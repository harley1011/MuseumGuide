var Media = (function (){

  var privateData = new WeakMap(),
      keySet = [],
      mediaType = new MediaType(),
      lang = new Language();

  //Source
  //http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  function generateUUID(){
    var lut = []; for (var i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
    var d0 = Math.random()*0xffffffff|0;
    var d1 = Math.random()*0xffffffff|0;
    var d2 = Math.random()*0xffffffff|0;
    var d3 = Math.random()*0xffffffff|0;
    return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+
      lut[d1&0xff]+lut[d1>>8&0xff]+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+
      lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
      lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
  }

  //Constructor Function
  function Media(raw) {
    var uuid;
    //To ensure uniqueness of UUID
    do{
      uuid = generateUUID();
    }while(keySet.indexOf(uuid) !== -1);
    var privateMembers = {
      uuid: uuid,
      path: raw.path,
      type: (mediaType.getTypeValue(raw.type)) ? mediaType.getTypeValue(raw.type) : null,
      lang: (lang.getTypeValue(raw.language.toLowerCase())) ? lang.getTypeValue(raw.language.toLowerCase()) : null,
      caption: raw.caption
    };
    privateData.set(this, privateMembers);
  }

  Media.prototype.constructor = Media;

  Media.prototype.getUUID = function(){
    return privateData.get(this).uuid;
  };

  Media.prototype.getPath = function(){
    return privateData.get(this).path;
  };

  Media.prototype.getType = function(){
    return privateData.get(this).type;
  };

  Media.prototype.getLanguage = function(){
    return privateData.get(this).lang;
  };

  Media.prototype.getCaption = function(){
    return privateData.get(this).caption;
  };

  Media.prototype.destructor = function(){
    privateData.delete(this);
  };

  return Media;
}());
