document.addEventListener('DOMContentLoaded', function(){ 
	var userFeed = new Instafeed({
        get: 'user',
        userId: '20278509',
        resolution: 'standard_resolution',
        accessToken: '20278509.467ede5.a92c1a1ef9964bb0b0abbaa39fe8c038',
        limit: 15,
        template: '<a href="{{link}}"><img src="{{image}}" /></a><p>{{caption}}</p>',
        filter: function(image) {
    		return image.tags.indexOf('100days100photos') >= 0;
  }
    });
    userFeed.run();
}, false);
