import '../css/projects.css'
import '../css/header.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import Animations from './animationExport.js'
import Experience from './Experience/Experience.js'
import Screens from './Experience/ProjectWorld/Screens.js'

class Projects extends Animations{

    constructor(index){

        super(index)

        this.experience = new Experience(document.querySelector('canvas.webgl'))
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.debug = this.experience.debug

        this.scene.background = new THREE.Color( '#2D3030' );

        this.screens = new Screens()
        this.projects = this.screens.projects

        this.setCamera()
        this.setLights()
    }

    setCamera(){
        this.camera.instance.position.set(8.8,-3,-5)
    }

    setLights(){

        this.lights = {}

        this.lights.a = new THREE.DirectionalLight('#ffffff',0.5)
        this.lights.a.position.set( -8.7, 7.6, -5.4 )
        this.scene.add(this.lights.a)

        this.lights.b = new THREE.DirectionalLight('#ffffff',1.5)
        this.lights.b.position.set( 2.2, 9.0, 3.3 )
        this.scene.add(this.lights.b)

        this.lights.c = new THREE.DirectionalLight('#ffffff',1.5)
        this.lights.c.position.set( -5.4, 1.1, -5.4 )
        this.scene.add(this.lights.c)

        this.debug.pane.addInput(this.lights.a.position, 'x', {min:-50, max:50, step:0.1})
        this.debug.pane.addInput(this.lights.a.position, 'y', {min:-50, max:50, step:0.1})
        this.debug.pane.addInput(this.lights.a.position, 'z', {min:-50, max:50, step:0.1})
        this.debug.pane.addInput(this.lights.a, 'intensity', {min:-50, max:50, step:0.1})

        this.debug.pane.addInput(this.lights.b.position, 'x', {min:-50, max:50, step:0.1})
        this.debug.pane.addInput(this.lights.b.position, 'y', {min:-50, max:50, step:0.1})
        this.debug.pane.addInput(this.lights.b.position, 'z', {min:-50, max:50, step:0.1})

        this.debug.pane.addInput(this.lights.c.position, 'x', {min:-50, max:50, step:0.1})
        this.debug.pane.addInput(this.lights.c.position, 'y', {min:-50, max:50, step:0.1})
        this.debug.pane.addInput(this.lights.c.position, 'z', {min:-50, max:50, step:0.1})
        this.debug.pane.addInput(this.lights.a, 'intensity', {min:-50, max:50, step:0.1})
    }

    customAnimation(index,key){

        setTimeout(function(){

            $(".curtainLeft").animate({'left': '-50vw'}, 400);
            $(".curtainRight").animate({'left': '100vw'}, 400);

            $("#" + index).stop().animate({'opacity': 1}, 3000);
            $('#' + key).animate({'opacity': 0.5}, 3000);
            $('.container').animate({'opacity': 1},3000);

        }, 1000);
    }

    customClickAnimation(){

        $('.webgl').animate({'opacity':0}, 1000)
        $('#main-page').animate({'opacity':0}, 1000)

    }

    threeTransition(clickTime){

        this.projects.position.y = 0.03 + clickTime * 10
        this.projects.rotateOnAxis(new THREE.Vector3(0,1,0), clickTime * 0.02)
    }

}
const projs = new Projects("II")