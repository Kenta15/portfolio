import '../css/skills.css'
import '../css/header.css'
import * as THREE from 'three'
import Animations from './animationExport.js'
import Experience from './Experience/Experience.js'
import Texts from './Experience/SkillsWorld/Texts.js'

class Skills extends Animations{

    constructor(index){

        super(index)

        this.experience = new Experience(document.querySelector('canvas.webgl'))
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.debug = this.experience.debug

        this.texts = new Texts()

        this.setCamera()
        // this.setLights()
        this.animations()
    }

    setCamera(){
        this.camera.instance.position.set(0,0,30)
    }

    setLights(){
        this.light = new THREE.DirectionalLight(0xffffff,1.5)
        this.light.position.set( 2, 0,  10)
        this.scene.add(this.light)

        this.debugFolder = this.debug.pane.addInput(this.light.position, 'x', {min:-100, max:100, step:1})
        this.debugFolder = this.debug.pane.addInput(this.light.position, 'y', {min:-100, max:100, step:1})
        this.debugFolder = this.debug.pane.addInput(this.light.position, 'z', {min:-100, max:100, step:1})
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
        this.texts.texts.position.y = clickTime * 150
    }

}
const skills = new Skills("III")