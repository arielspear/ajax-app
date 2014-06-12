(function() {
  'use strict';

  var loadVenues = function() {
    var fourSquareUrl = 'https://api.foursquare.com/v2/venues/explore';
    var fourSquareOptions = {
      'll': '45.533,-122.69',
      'oauth_token': 'TAM5U5CGI2BMMZYSGGBCM44MMQWP5TGQ3OJ0A4MIVKLNVTMB',
      'v': '20140612',
      'section': 'food',
      'venuePhotos': 1
    };
    $.ajax(fourSquareUrl, { dataType: 'jsonp', data: fourSquareOptions })
    .then(function(data, status, xhr) {
      var venuesArray = data.response.groups[0].items;
      console.log(venuesArray);
      var venueInfo = getRandomVenue(venuesArray);
      populateHTML(venueInfo);
      console.log(venueInfo);
    }, function(xhr, status, error) {
      console.log('failed (promises): ' + error);
    });
  };

  var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomVenue = function(venuesArray) {
    var randomInt = getRandomInt(0, venuesArray.length-1);
    console.log(randomInt);
    var venue = venuesArray[randomInt].venue;
    var name = venue.name;
    var location = venue.location;
    var address = location.address;
    var distance = location.distance;
    var menuURL = venue.menu ? venue.menu.url : null;
    var photoURL = null;
    if (venue.photos.groups.length !== 0){
      var photo = venue.photos.groups[0].items[0];
      var photoHeight = photo.height;
      var photoWidth = photo.width;
      var photoPrefix = photo.prefix;
      var photoSuffix = photo.suffix;
      photoURL = photoPrefix + photoWidth + 'x' + photoHeight + photoSuffix;
      console.log(photoURL);
    }
    var hours = venue.hours.status;
    return {
      name: name,
      hours: hours,
      address: address,
      distance: distance,
      menuURL: menuURL,
      photoURL: photoURL
    };
  };


  var populateHTML = function(venue) {

    $('<p>').text(venue.name).appendTo('body');
    $('<p>').text(venue.address).appendTo('body');
    $('<p>').text(venue.distance + ' meters away.')
      .appendTo('body');

    if (venue.menuURL){
      var $p = $('<p>').appendTo('body');
      $('<a>')
        .attr('href', venue.menuURL)
        .text('Menu')
        .appendTo($p);
    }
    if (venue.hours){
      $('<p>').text(venue.hours).appendTo('body');
    }
  };

  $(function() {
    loadVenues();
  });

})();
