import '../css/skills.css'
import '../css/header.css'
import * as THREE from 'three'
import Animations from './animationExport.js'
import Experience from './Experience/Experience.js'

class Skills extends Animations{

    constructor(index){

        super(index)

        this.experience = new Experience(document.querySelector('canvas.webgl'))
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.debug = this.experience.debug

        this.setCamera()
        this.setLights()
        this.animations()
    }

    setCamera(){
        this.camera.instance.position.set(0,0,30)

    }

    setLights(){
        const directionalLight = new THREE.DirectionalLight(0xffffff,1.5)
        directionalLight.position.set( 2, 0,  10)
        this.scene.add(directionalLight)
    }

    animations(){
        setTimeout(function(){
            $('.container').animate({'opacity':1}, 3000);
            $('.webgl').animate({'opacity':1}, 3000);
        }, 1);
    }

    customAnimation(index, key){

        setTimeout(function(){
            $('#' + key).animate({'opacity': 0.5}, 3000);
            $("#" + index).stop().animate({'opacity': 1}, 3000);
        }, 1);

    }

    customClickAnimation(){
        setTimeout(function(){
            $('body').animate({'opacity': 0},1000)
        }, 1);
    }

    threeTransition(clickTime){
        this.camera.instance.position.y = 0 - clickTime * 150
    }

}
const skills = new Skills("III")