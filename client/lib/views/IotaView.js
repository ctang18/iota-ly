var Marionette = require('backbone.marionette');

var IOTA_TEMPLATES = {
  IMAGE: '#iota-image-view',
  VIDEO: '#iota-video-view',
  URL: '#iota-url-view',
  STRING: '#iota-string-view'
};

var Iota = Marionette.ItemView.extend({
  
  getTemplate: function(){
    return IOTA_TEMPLATES[this.model.get('type')] || '#iota-string-view';
  },
  
  className: 'iota',
  
  events: {
    'click .image-screen': '_expandImage',
    'click .iota-video': '_expandVideo'
  },
  
  _expandImage: function(){
    console.log('expand image');
  },
  
  _expandVideo: function(){
    console.log('expand video');
  },
  
  _closeVideo: function(){
    console.log('close video');
  },
  
  _showIota: function(){
    console.log('show iota');
  },
  
  _editIota: function(){
    console.log('edit iota');
  },
  
  _deleteIota: function(){
    console.log('delete iota');
  }

});

module.exports = Iota;