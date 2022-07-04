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
        if(key == "0"){
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
    $("#0").stop().animate({'opacity': 1}, 1000);
})

// Page Transition
$(function(){
    $('body').animate({'opacity': 1}, 2500);
});

setTimeout(function(){
    $('.text').animate({'opacity': 1 , 'font-size': '10vw'}, 2000);
}, 4000);

setTimeout(function(){
    $('#0').animate({'opacity': 0.5}, 1000);
}, 1000);
setTimeout(function(){
    $('#I').animate({'opacity': 0.5}, 1000);
}, 1500);
setTimeout(function(){
    $('#II').animate({'opacity': 0.5}, 1000);
}, 2000);
setTimeout(function(){
    $('#III').animate({'opacity': 0.5}, 1000);
}, 2500);
setTimeout(function(){
    $('#IV').animate({'opacity': 0.5}, 1000);
}, 3000);
setTimeout(function(){
    $('#V').animate({'opacity': 0.5},1000);
}, 3500);
setTimeout(function(){
    $('#0').animate({'opacity': 1},1000);
}, 4500);