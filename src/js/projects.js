import '../css/projects.css'
import '../css/header.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import Animations from './animationExport.js'
import Experience from './Experience/Experience.js'

class Projects extends Animations{

    constructor(index){

        super(index)

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

    customAnimation(index,key){

        setTimeout(function(){

            $("#" + index).stop().animate({'opacity': 1}, 3000);
            $('#' + key).animate({'opacity': 0.5}, 3000);
            $('.container').animate({'opacity': 1},3000);

        }, 6000);
    }

    customClickAnimation(){

        $('body').animate({'opacity':0}, 1000)

        // $('#ecommerce').css('display','none')
        // $('#movie').css('display','none')
        // $('#portfolio').css('display','none')
        // $('#none').css('display','none')
    }

}
const projs = new Projects("II")