function productInfo() {}

function latLongLookup(zip) {
  var queryURL =
    "https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/ycSGL95P7qvqRje1BBye5ASSV4LaYIrbGOJzDF1yP6Me5yQmG9YGPneweDWslVM5/info.json/" +
    zip +
    "degrees";
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

var itemList = [];
var categories = [];
$(document).ready(function() {
  //---------------PLOTLY-----------------------
  var trace1 = {
    values: [],
    labels: [],
    type: "pie"
  };

  var data = [trace1];

  var layout = {
    title: "Redraw"
  };

  Plotly.newPlot(graphDiv, data, layout);
  //--------------------------------------------
  $(document).on("click", "#addZip", function() {
    var zip = $("#zipInput")
    .val()
    .trim();
    console.log("Zip is:" + zip);
    latLongLookup(zip);
  });
  $(document).on("click", "a.dropdown-item.upc", function() {
    category = $(this).text();
  });
  function appendProductList(x, y, z, b, u) {
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
      "</td><td> $" +
      // salePrice
      u +
      "</td><td> $" +
      // salePrice
      b +
      "</td></tr>"
    );
  }
  $(document).on("click", "a.dropdown-item.upc", function() {
    category = $(this).text();
    categoryVal = $(this).attr("value");
  });
  var PriceArray = [];
  var totalArray = [];
  
  productInfo();
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
        PriceArray.push(salePrice);
        var totalSalePrice = salePrice * qty;
        totalArray.push(totalSalePrice);
        var pieVals = trace1.values
        var pieLabels = trace1.labels
        pieVals.push(parseInt(qty));
        pieLabels.push(category);
        Plotly.redraw(graphDiv);
        var unitPriceTotal = PriceArray.reduce((acc, val) => acc + val, 0);
        var qtypriceTotal = totalArray.reduce((acc, val) => acc + val, 0);
        var roundqtypriceTotal = qtypriceTotal;
        $("#qtyPriceTotal").text("$" + roundqtypriceTotal);
        console.log(qtypriceTotal);
        appendProductList(
          productName,
          qty,
          category,
          totalSalePrice,
          salePrice
        );
        event.preventDefault();
      });
    }
  });
});
$(document).on("click", "tr", function() {
  event.preventDefault();
  $(this).remove();
});

// var arr = [1,2,3,4,6];
//  var sum = arr.reduce((acc, val) => acc + val, 0);
// console.log("Sun is :" + sum);

//  var data = [
//      {
//          country: 'China',
//          pop: 1409517397,
//        },
//        {
//            country: 'India',
//            pop: 1339180127,
//          },
//          {
//              country: 'USA',
//              pop: 324459463,
//            },
//            {
//                country: 'Indonesia',
//                pop: 263991379,
//              }
//            ]
//  var sum = data.reduce((acc, val) => {
//      return val.country == 'China' ? acc : acc + val.pop;
//    }, 0);
//    let sum = data
//      .filter(val => val.country !== 'China')
//      .reduce((acc, val) => acc + val.pop, 0);
