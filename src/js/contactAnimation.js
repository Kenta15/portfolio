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

        if(key == "V"){
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
    $("#V").stop().animate({'opacity': 1}, 3000);
})