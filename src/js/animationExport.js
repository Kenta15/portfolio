import * as THREE from 'three'

export default class Animations{

    constructor(index){

        const dict = {
                        "0": "index",
                        "I": "about",
                        "II": "projects",
                        "III": "skills",
                        "IV": "contact",
                    }

        this.hoverAnimation(index, dict)
        this.transition(index, dict)
    }

    customAnimation(index, key){}

    hoverAnimation(index, dict){
        Object.entries(dict).forEach(([key,value]) =>{

            this.customAnimation(index, key)
    
            if(key == index){
                $("#" + key).hover(function(){
                    $("#" + value).stop().animate({'opacity': 1}, 600)
                }, function() {
                    $("#" + value).stop().animate({'opacity': 0}, 600)
                })
            }
            else{
                $("#" + key).hover(function(){
                    $("#" + key).stop().animate({'opacity': 1}, 500)
                    $("#" + value).stop().animate({'opacity': 1}, 600)
                }, function() {
                    $("#" + key).stop().animate({'opacity': 0.5}, 500)
                    $("#" + value).stop().animate({'opacity': 0}, 600)
                })
            }
        })
    }

    customClickAnimation(){}

    threeTransition(clickTime){}

    transition(index, dict){

        const clickClock = new THREE.Clock()
        const icons = document.querySelectorAll('div.header a')

        icons.forEach(icon => { 
            icon.addEventListener('click', (event) => {
        
                if(event.target.id != index){

                    this.customClickAnimation()
        
                    const clickFunction = () => {
                        const clickTime = clickClock.getElapsedTime()

                        // Camera move or etc
                        this.threeTransition(clickTime)
                    
                        window.requestAnimationFrame(clickFunction)
                    }
                    clickFunction()
        
                    Object.entries(dict).forEach(([key,value]) =>{

                        $('.header').stop().animate({'opacity': 0},1000)
        
                        setTimeout(() => {
                            $('#' + key).css({"display": "none"})
                            $('#' + value).css({"display": "none"})
                        },1000)
        
                        $('#' + event.target.id).stop().animate({'opacity': 0},1000)
        
                        if(event.target.id == key){
                            setTimeout(myURL, 1200)
                            function myURL(){
                                if(value == 'projects'){
                                    window.location.href = value + '.html'
                                }
                                window.location.href = value + '.html'
                            }
                        }
                    })
                }
            })
        })
    }
}