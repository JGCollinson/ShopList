


var myList = [];
var itemList =[];
var categories = [];
$(document).ready(function(){


//---------------PLOTLY-----------------------
    var data = [{
        values: [19, 26, 55],
        labels: ['Residential', 'Non-Residential', 'Utility'],
        type: 'pie'
      }];

      Plotly.newPlot('tester', data);
//--------------------------------------------  
    $(".category").on("click", function(){
       categories.push($(this).val());
       console.log($(this).val());
    })
    $("#addButtons").on("click", function(){ 
        event.preventDefault();
        var inputVal = $("#addNumber").val().trim();
        var itemVal = $(".addItems").val().trim();
        myList.push(inputVal);
        itemList.push(itemVal);
        
        console.log(myList);
        $(".userList").empty()
        $(".addItems").empty()
        for(var i=0; i<myList.length; i++){
            $("#addNumber").val("");
            for (var x=0; x <itemList.length; x++){
                $(".addItems").val();
            }
            $(".userList").append(`
               <div class="row">
                <img class="avaibility" id="redArrow" src="https://storage.googleapis.com/coding-bc-projects/ShopList/redArrow.jpg" alt="redArrow">
                <h6 class="itemNames">${itemList[i]}</h6>
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


