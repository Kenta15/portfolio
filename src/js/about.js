import '../css/about.css'
import '../css/header.css'
import * as dat from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Animations from './animationExport.js'
import Experience from './Experience/Experience.js'

// Debug
// const gui = new dat.GUI()

class About{

    constructor(){

        this.experience = new Experience(document.querySelector('canvas.webgl'))
        this.camera = this.experience.camera
        this.canvas = this.experience.canvas

        this.setCamera()
        this.setOrbitControls()
    }

    setCamera(){
        this.camera.instance.position.set(2,3,9)
    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.camera.instance, this.canvas)
        this.controls.enableDamping = true

        window.addEventListener('mouseup',() => {
            this.controls.reset()
        })
    }
}
const about = new About()

// HTML Animations

class AboutAnimations extends Animations{
    
    constructor(index){

        super(index)
        this.experience = new Experience(document.querySelector('canvas.webgl'))
        this.camera = this.experience.camera
    }

    customAnimation(index,key){
        setTimeout(function(){
            $("#" + index).stop().animate({'opacity': 1}, 3000);
            $('#' + key).animate({'opacity': 0.5}, 3000);
        }, 1);
    }

    threeTransition(clickTime){
        this.camera.instance.position.z = 10 - Math.pow(10,clickTime)
    }
}

const animations = new AboutAnimations("I")