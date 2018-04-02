function productInfo() {
    var itemName = "tomato"
    var itemVal = "976759"
    var queryURL =
        "https://cors-anywhere.herokuapp.com/http://api.walmartlabs.com/v1/search?query=" +
        itemName +
        "&format=json&categoryId=" +
        itemVal +"&apiKey=x5k7prwzkqgurwt4n33rt74g";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        var results = response.items;
        console.log(results[0].salePrice);
        console.log(results[0].thumbnailImage);
        console.log(results[0].productUrl);
        console.log(results[0].offerType);
    })
};

var latitued;
var longitude;

function latLongLookup() {
    var zipCode = "30309"
    var queryURL =
        "https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/ycSGL95P7qvqRje1BBye5ASSV4LaYIrbGOJzDF1yP6Me5yQmG9YGPneweDWslVM5/info.json/" +
        zipCode +
        "degrees";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        latitude = response.lat;
        longitude  = response.lng;
        console.log(response.lat);
        console.log(response.lng);
      })
    };
    
    productInfo();
    latLongLookup();
    
    var map;
    var infowindow;
    
    function initMap() {
      var pyrmont = {lat: -33.867, lng: 151.195};
    
      map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 15
      });
    
      infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: pyrmont,
        radius: 500,
        type: ['store']
      }, callback);
    };
    
    function callback(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }
    };
    
    function createMarker(place) {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
    
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    };
    
    
    
    // var myList = [];
    // $(document).ready(function () {

    // $.ajax({
    //     url: "https://cors-anywhere.herokuapp.com/http://api.walmartlabs.com/v1/search?query=paper&format=json&categoryId=1334134&apiKey=x5k7prwzkqgurwt4n33rt74g",
    //     method: "GET"
    // }).then(function(response) {
    //     var i;
    //     for (i in response.categories) {
    //          console.log(response.categories[i].name + "|" + response.categories[i].id)
    //   };
    // })
    // $.ajax({
    //     url: "https://cors-anywhere.herokuapp.com/http://api.walmartlabs.com/v1/search?query=paper&format=json&categoryId=1334134&apiKey=x5k7prwzkqgurwt4n33rt74g",
    //     method: "GET"
    // }).then(function(response) {
    //          console.log(response)
    //   }
    // );




//     $("#addButton").on("click", function () {
//         event.preventDefault();
//         var inputVal = $("#add").val().trim();
//         myList.push(inputVal);
//         console.log(myList);
//         $(".button").empty()
//         for (var i = 0; i < myList.length; i++) {
//             $(".button").append(`
//                <div class="row">
//                 <img class="avaibility" id="redArrow" src="https://storage.googleapis.com/coding-bc-projects/ShopList/redArrow.jpg" alt="redArrow">
//                 <button class= "items">${myList[i]}</button>             
//                 <img class="avaibility" id="greenArrow" src="https://storage.googleapis.com/coding-bc-projects/ShopList/valideArrow.jpg" alt="greenArrow">
//                </div>
//            `);
//             $(".avaibility").attr("value", myList[i]);
//             $(".items").css({
//                 "border": "3px solid yellow",
//                 "background-color": "blue",
//                 "color": "white",
//                 "width": "200px",
//                 "text-align": "center",
//                 "height": "40px",
//                 "margin-top": "5px"
//             });


//         }
//     });

//     // Green arrow effects...............................

// });