const dict={0:"index",I:"about",II:"projects",III:"skills",IV:"education",V:"contact"};Object.entries(dict).forEach((([t,a])=>{$((function(){$("#"+t).animate({opacity:.5},3e3),"III"==t?$("#"+t).hover((function(){$("#"+a).stop().animate({opacity:1},600)}),(function(){$("#"+a).stop().animate({opacity:0},600)})):$("#"+t).hover((function(){$("#"+t).stop().animate({opacity:1},500),$("#"+a).stop().animate({opacity:1},600)}),(function(){$("#"+t).stop().animate({opacity:.5},500),$("#"+a).stop().animate({opacity:0},600)}))}))})),$((function(){$("#III").stop().animate({opacity:1},3e3),$(".webgl").animate({opacity:1},3e3)}));