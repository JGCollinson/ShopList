TESTER = document.getElementById('tester');
Plotly.plot( TESTER, [{
x: [1, 2, 3, 4, 5],
y: [1, 2, 4, 8, 16] }], {
margin: { t: 0 } } );

var myList = []; 
$(document).ready(function(){
    
    $("#addButton").on("click", function(){ 
        event.preventDefault();
        var inputVal = $("#add").val().trim();
        myList.push(inputVal);
        console.log(myList);
        $(".uderList").empty()
        for(var i=0; i<myList.length; i++){
            $(".uderList").append(`
               <div class="row">
                <img class="avaibility" id="redArrow" src="https://storage.googleapis.com/coding-bc-projects/ShopList/redArrow.jpg" alt="redArrow">
                <button class= "items">${myList[i]}</button>             
                <img class="avaibility" id="greenArrow" src="https://storage.googleapis.com/coding-bc-projects/ShopList/valideArrow.jpg" alt="greenArrow">
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


