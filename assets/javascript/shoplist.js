function productInfo() {
  var itemName = "tomato";
  var itemVal = "976759";
  var queryURL =
    "https://cors-anywhere.herokuapp.com/http://api.walmartlabs.com/v1/search?query=" +
    itemName +
    "&format=json&categoryId=" +
    itemVal +
    "&apiKey=x5k7prwzkqgurwt4n33rt74g";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    var results = response.items;
    var salePrice = results[0].salePrice;
    console.log(results[0].thumbnailImage);
    console.log(results[0].productUrl);
    console.log(results[0].offerType);
  });
}
productInfo();

function latLongLookup(zip) {
  var queryURL =
    "https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/ycSGL95P7qvqRje1BBye5ASSV4LaYIrbGOJzDF1yP6Me5yQmG9YGPneweDWslVM5/info.json/" +
    zip +
    "/degrees";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    var latitude = Number(response.lat);
    var longitude = Number(response.lng);
    console.log(latitude, longitude);
    var mapobject = $("#data");
    mapobject.attr("lat", latitude);
    mapobject.attr("lng", longitude);
    initMap(latitude, longitude);
  });
}
var map;
var infowindow;

function initMap(lat, long) {
  var pyrmont = { lat: lat, lng: long };

  map = new google.maps.Map(document.getElementById("map"), {
    center: pyrmont,
    zoom: 14
  });

  console.log(`Pyrmont is ${JSON.stringify(pyrmont)}`);

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(
    {
      location: pyrmont,
      radius: 2000,
      keyword: ["grocery"],
      type: ["store"]
    },
    callback
  );
}
function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}
function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  google.maps.event.addListener(marker, "click", function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

var myList = [];
var itemList = [];
var categories = [];
$(document).ready(function() {
  //---------------PLOTLY-----------------------
  var data = [
    {
      values: [19, 26, 55],
      labels: ["Residential", "Non-Residential", "Utility"],
      type: "pie"
    }
  ];

  Plotly.newPlot("tester", data);
  //--------------------------------------------
  $(document).on("click", "#addZip", function() {
    var zip = $("#zipInput").val().trim();
    console.log("Zip is:" + zip)
     latLongLookup(zip);
  });
  $(document).on("click", "a.dropdown-item.upc", function() {
    category = $(this).text();
  });
  function appendProductList(x,y,z,b){
    $("#listTable> tbody").append(
      "<tr><td>" +
        // productName
        x +
        "</td><td>" +
        // qty
        y +
        "</td><td>" +
        // category
        z +
        "</td><td>" +
        // salePrice
        b +
        "</td></tr>"
    );
  }
    $(document).on("click", "a.dropdown-item.upc", function() {
      category = $(this).text();
      categoryVal = $(this).attr("value");
    });
    $("#addButtons").on("click", function() {
      var qty = $("#addNumber")
        .val()
        .trim();
      var productName = $("#addProduct")
        .val()
        .trim();
        productInfo(productName, categoryVal);
      function productInfo(y, x) {
        var itemName = y;
        var itemVal = x;
        var queryURL =
        "https://cors-anywhere.herokuapp.com/http://api.walmartlabs.com/v1/search?query=" +
        itemName +
        "&format=json&categoryId=" +
        itemVal +
        "&apiKey=x5k7prwzkqgurwt4n33rt74g";
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
            var results = response.items;
          var salePrice = results[0].salePrice;
          var totalSalePrice = (salePrice * qty);
          console.log(results[0].thumbnailImage);
          console.log(results[0].productUrl);
          console.log(results[0].offerType);
          appendProductList(productName, qty, category, totalSalePrice);
          event.preventDefault();
        });
      }
    });
  });
  $(document).on("click", "tr", function() {
            event.preventDefault();
            $(this).remove();
          });
