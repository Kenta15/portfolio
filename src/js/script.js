import '../css/style.css'
import * as dat from 'lil-gui'
import Experience from './Experience/Experience.js'
import Animations from './animationExport.js'

/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

class Script extends Animations{

    constructor(index){

        super(index)
        
        this.experience = new Experience(document.querySelector('canvas.webgl'))
        this.camera = this.experience.camera

        this.animations()
    }

    animations(){

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
        }
    
        customClickAnimation(){
            $(".text").stop().animate({'opacity': 0}, 1000)
        }
    
        threeTransition(clickTime){
            this.camera.instance.position.z = 10 - clickTime * 5
        }

}
const script = new Script("0")
