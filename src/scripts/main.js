$(document).ready(function() {
  console.log('ready!');

  $('button').on('click', function() {

    $.ajax({
      url: 'https://api.ipify.org?format=json',
      method: 'GET',
      dataType: 'json'
    }).done(function (response1) {
      var ipAddress = response1.ip;
      $('#ipAddress').text(ipAddress);
    });

    $.ajax({
      url: 'http://ipinfo.io/' + '#ipAddress',
      method: 'GET',
      dataType: 'json'
    }).done(function (response2) {
      var city = response2.city;
      var state = response2.region;
      var loc = response2.loc.split(',');
      var lat = parseFloat(loc[0]);
      var long = parseFloat(loc[1]);
      console.log(lat, long);
      $('#location').text(city + ', ' + state);

      function initialize(lat, long) {
        var mapProp = {
          center:new google.maps.LatLng(lat, long),
          zoom:15,
          mapTypeId:google.maps.MapTypeId.ROADMAP
        };
        var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
      }
      initialize(lat, long);

    });
  });

});
