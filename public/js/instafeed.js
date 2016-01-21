document.addEventListener('DOMContentLoaded', function(){ 
    userFeed.run();
}, false);

var userFeed = new Instafeed({
    get: 'user',
    userId: '20278509',
    resolution: 'standard_resolution',
    accessToken: '20278509.467ede5.a92c1a1ef9964bb0b0abbaa39fe8c038',
    limit: 15,
    template: '<li><h2 class="day-number"></h2><a href="{{link}}"><img src="{{image}}" /></a><p>{{caption}}</p></li>',
    filter: function(image) {
        return image.tags.indexOf('100days100photos') >= 0;
    },
    after: function() {
        addDayNumber();
    }
});

function addDayNumber() {
    var allDayNumbers = document.getElementsByClassName("day-number");
    var numberOfDays = allDayNumbers.length;
    var index = allDayNumbers.length-1;

    for (var i = 0; i <= index; i++) {
        allDayNumbers[i].innerHTML = "Day " + (numberOfDays-i);
    }
}
