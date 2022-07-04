const dict = {
    "0": "index",
    "I": "about",
    "II": "projects",
    "III": "skills",
    "IV": "education",
    "V": "contact",
}

Object.entries(dict).forEach(([key,value]) =>{
    $(function(){

        $('#' + key).animate({'opacity': 0.5}, 3000);

        if(key == "I"){
            $("#" + key).hover(function(){
                $("#" + value).stop().animate({'opacity': 1}, 600);
            }, function() {
                $("#" + value).stop().animate({'opacity': 0}, 600);
            });
        }
        else{
            $("#" + key).hover(function(){
                $("#" + key).stop().animate({'opacity': 1}, 500);
                $("#" + value).stop().animate({'opacity': 1}, 600);
            }, function() {
                $("#" + key).stop().animate({'opacity': 0.5}, 500);
                $("#" + value).stop().animate({'opacity': 0}, 600);
            });
        }
        
    })
})

$(function(){
    $("#I").stop().animate({'opacity': 1}, 3000);
})

// Page Transition
// $(function(){
//     $('#0').animate({'opacity': 0.5}, 1000);
// });
// $(function(){
//     $('#I').animate({'opacity': 0.5}, 1000);
// });
// $(function(){
//     $('#II').animate({'opacity': 0.5}, 1000);
// });
// $(function(){
//     $('#III').animate({'opacity': 0.5}, 1000);
// });
// $(function(){
//     $('#IV').animate({'opacity': 0.5}, 1000);
// });
// $(function(){
//     $('#V').animate({'opacity': 0.5},1000);
// });
// $(function(){
//     $('#I').animate({'opacity': 1},1000);
// });
