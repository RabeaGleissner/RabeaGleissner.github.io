document.addEventListener('DOMContentLoaded', function(){ 
    nextButtonClickHandler();
    feed.run();
}, false);

function nextButtonClickHandler() {
    var loadButton = document.getElementById('load-more');
    loadButton.addEventListener('click', function() {
        feed.next();
    });
}

var feed = new Instafeed({
    get: 'user',
    userId: '20278509',
    resolution: 'standard_resolution',
    accessToken: '20278509.467ede5.a92c1a1ef9964bb0b0abbaa39fe8c038',
    limit: 10,
    template: '<li><h2 class="day-number"></h2><a href="{{link}}"><img src="{{image}}" /></a><p>{{caption}}</p></li>',
    filter: function(image) {
        return image.tags.indexOf('100days100photos') >= 0;
    },
    after: function() {
        addDayNumber();
    }
});

function addDayNumber() {
    var numberOfDays = calculateDayNumber();
    var allVisiblePhotos = document.getElementsByClassName("day-number");

    for (var i = 0; i <= allVisiblePhotos.length-1; i++) {
        allVisiblePhotos[i].innerHTML = "Day " + (numberOfDays-i);
    }
}

function calculateDayNumber() {
    var oneDay = 24*60*60*1000;
    var endDate = new Date(2016,04,27);
    var today = new Date();
    var firstDate;

    if (today < endDate) {
        firstDate = today;
    } else {
        //probably have to fiddle with this at the end of the project
        firstDate = endDate;
    }

    var diffDays = Math.round(Math.abs((firstDate.getTime() - endDate.getTime())/(oneDay)));
    // no idea why minus 100 isn't enough but it seems to be 8 days off
    return diffDays - 108;
}
