import '../css/about.css'
import '../css/header.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Animations from './animationExport.js'
import Experience from './Experience/Experience.js'

class About extends Animations{

    constructor(index){

        super(index)

        this.experience = new Experience(document.querySelector('canvas.webgl'))
        this.camera = this.experience.camera
        this.canvas = this.experience.canvas
        this.scene = this.experience.scene
        this.sizes = this.experience.sizes

        this.setCamera()
        // this.setOrbitControls()
    }

    setCamera(){
        this.camera.instance.position.set(0,0,10)
    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.camera.instance, this.canvas)

    }

    customAnimation(index,key){
        setTimeout(() => {
            $('body').stop().animate({'opacity': 1}, 800);
            $("#" + index).stop().animate({'opacity': 1}, 3000);
            $('#' + key).stop().animate({'opacity': 0.5}, 3000);
        }, 1);
    }

    customClickAnimation(){
        // $(".curtainLeft").stop().animate({'left': '0'}, 400);
        // $(".curtainRight").stop().animate({'left': '50vw'}, 400);
    }
}
const about = new About("I")