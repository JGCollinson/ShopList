


var myList = [];
$(document).ready(function(){
    
    var data = [{
        values: [19, 26, 55],
        labels: ['Residential', 'Non-Residential', 'Utility'],
        type: 'pie'
    }];
    
    //---------------PLOTLY-----------------------
    Plotly.newPlot('tester', data);
    //--------------------------------------------  
    $("#addButtons").on("click", function(){ 
        event.preventDefault();
        var inputVal = $("#addNumber").val().trim();
        myList.push(inputVal);
        console.log(myList);
        $(".userList").empty()
        for(var i=0; i<myList.length; i++){
            $("#addNumber").val("");
            $(".userList").append(`
               <div class="row">
                <img class="avaibility" id="redArrow" src="https://storage.googleapis.com/coding-bc-projects/ShopList/redArrow.jpg" alt="redArrow">
                <h6 class="itemNames"></h6>
                <button class= "numbers">${myList[i]}</button>
                <h6 class="listCategory"></h6>       
                
               </div>
           `);
        
            $(".numbers").css({
            "border": "3px solid yellow", 
            "background-color": "blue", 
            "color": "white",
            "width": "50px",
            "text-align": "center",
            "height": "40px",
            "margin-top": "5px"
            });
    
            $(".itemNames").css({
            "border": "3px solid yellow", 
            "background-color": "blue", 
            "color": "white",
            "width": "180px",
            "text-align": "center",
            "height": "40px",
            "margin-top": "5px",
            "margin-right": "10px"
            });
    
            $(".listCategory").css({
            "border": "3px solid yellow", 
            "background-color": "blue", 
            "color": "white",
            "width": "180px",
            "text-align": "center",
            "height": "40px",
            "margin-top": "5px",
            "margin-left": "10px"
            });  
        }
    });
    });
    
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
        latitude = Number(response.lat);
        longitude  = Number(response.lng);
        console.log(latitude);
        console.log(longitude);

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