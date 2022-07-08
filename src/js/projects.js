import '../css/projects.css'
import '../css/header.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js'
import Animations from './animationExport.js'
import Experience from './Experience/Experience.js'

/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

class Projects{

    constructor(){

        this.experience = new Experience(document.querySelector('canvas.webgl'))
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.setCamera()
        this.setLights()
    }

    setCamera(){
        this.camera.instance.position.set(5.5,1,8)
    }

    setLights(){
        const directionalLight = new THREE.DirectionalLight(0xffffff,1.5)
        directionalLight.position.set( 5, 5, 3.5 )
        this.scene.add(directionalLight)
    }

}
const projs = new Projects()


// // HTML Animations

class ProjectsAnimations extends Animations{
    
    constructor(index){
        
        super(index)
        
    }

    customAnimation(index,key){

        setTimeout(function(){

            $("#" + index).stop().animate({'opacity': 1}, 3000);
            $('#' + key).animate({'opacity': 0.5}, 3000);
            $('.container').animate({'opacity': 1},3000);

        }, 6000);
    }

    customClickAnimation(){
        $('#ecommerce').css('display','none')
        $('#movie').css('display','none')
        $('#portfolio').css('display','none')
        $('#none').css('display','none')

        $('body').animate({'opacity':0}, 1000)
    }
}

const animations = new ProjectsAnimations("II")