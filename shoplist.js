
var myList = []; 
$(document).ready(function(){
    
    $("#addButton").on("click", function(){ 
        event.preventDefault();
        var inputVal = $("#add").val().trim();
        myList.push(inputVal);
        console.log(myList);
        $(".button").empty()
        for(var i=0; i<myList.length; i++){
            $(".button").append(`
               <div class="row">
                <img class="avaibility" id="redArrow" src="redArrow.jpg" alt="redArrow">
                <button class= "items">${myList[i]}</button>             
                <img class="avaibility" id="greenArrow" src="valideArrow.jpg" alt="greenArrow">
               </div>
           `);
           $(".avaibility").attr("value", myList[i]);
            $(".items").css({"border": "3px solid yellow", 
            "background-color": "blue", 
            "color": "white",
            "width": "200px",
            "text-align": "center",
            "height": "40px",
            "margin-top": "5px"
            });
        
           
        }
    });

    // Green arrow effects...............................

});


