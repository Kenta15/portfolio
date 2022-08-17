import '../css/projects.css'
import '../css/header.css'
import * as THREE from 'three'
import Animations from './animationExport.js'
import Experience from './Experience/Experience.js'

class Projects extends Animations{

    constructor(index){

        super(index)

        this.experience = new Experience(document.querySelector('canvas.webgl'))
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.debug = this.experience.debug

        this.setCamera()
        this.setLights()
    }

    setCamera(){
        this.camera.instance.position.set(8.8,-3,-5)
    }

    setLights(){

        this.lights = {}

        this.lights.b = new THREE.DirectionalLight('#ffffff',1.5)
        this.lights.b.position.set(-6.5, 9.0, 3.3 ) // -6.5
        this.scene.add(this.lights.b)

        this.lights.c = new THREE.DirectionalLight('#ffffff',1.5)
        this.lights.c.position.set( 1.1, 2.2, 0 )
        this.scene.add(this.lights.c)
    }

    customAnimation(index,key){

        window.addEventListener('load', () => {
            $(".curtainLeft").stop().animate({'left': '-50vw'}, 400)
            $(".curtainRight").stop().animate({'left': '100vw'}, 400)

            $("#" + index).stop().animate({'opacity': 1}, 3000)
            $('#' + key).stop().animate({'opacity': 0.5}, 3000)
            $('.container').stop().animate({'opacity': 1},3000)
        })
    }

    customClickAnimation(){

        $('.webgl').stop().animate({'opacity':0}, 1000)
        $('#main-page').stop().animate({'opacity':0}, 1000)

    }

    threeTransition(clickTime){

        $('#descriptions').css('opacity', 0)

        this.projects = this.experience.projectWorld.projects

        this.projects.position.y = 0.03 + clickTime * 10
        this.projects.rotateOnAxis(new THREE.Vector3(0,1,0), clickTime * 0.02)
    }

}
const projs = new Projects("II")