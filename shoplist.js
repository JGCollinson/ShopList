
// var myObj,
//   i,
//   j,
//   x = "";
// myObj = {
//   name: "John",
//   age: 30,
//   cars: [
//     { name: "Ford", models: ["Fiesta", "Focus", "Mustang"] },
//     { name: "BMW", models: ["320", "X3", "X5"] },
//     { name: "Fiat", models: ["500", "Panda"] }
//   ]
// };

// for (i in response.categories) {
//   x += "<h2>" + response.categories[i].name + "</h2>";
//   for (j in response.categories[i].models) {
//     x += response.categories[i].models[j] + "<br>";
//   }
// }


$.ajax({
    url: "http://crossorigin.me/http://api.walmartlabs.com/v1/taxonomy?format=json&apiKey=x5k7prwzkqgurwt4n33rt74g",
    method: "GET"
}).then(function(response) {
    var i;
    for (i in response.categories) {
         console.log(response.categories[i].name + "|" + response.categories[i].id)
  };
})

var myList = [];
$(document).ready(function() {
  $("#addButton").on("click", function() {
    event.preventDefault();
    var inputVal = $("#add")
      .val()
      .trim();
    myList.push(inputVal);
    console.log(myList);
    $(".uderList").empty();
    for (var i = 0; i < myList.length; i++) {
      $(".uderList").append(`
               <div class="row">
                <img class="avaibility" id="redArrow" src="https://storage.googleapis.com/coding-bc-projects/ShopList/redArrow.jpg" alt="redArrow">
                <button class= "items">${myList[i]}</button>             
                <img class="avaibility" id="greenArrow" src="https://storage.googleapis.com/coding-bc-projects/ShopList/valideArrow.jpg" alt="greenArrow">
               </div>
           `);
      $(".avaibility").attr("value", myList[i]);
      $(".items").css({
        border: "3px solid yellow",
        "background-color": "blue",
        color: "white",
        width: "200px",
        "text-align": "center",
        height: "40px",
        "margin-top": "5px"
      });
    }
  });

  // Green arrow effects...............................
});
