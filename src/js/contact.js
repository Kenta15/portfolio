import '../css/contact.css'
import '../css/header.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import Animations from './animationExport.js'
import Experience from './Experience/Experience.js'
import Contacts from './Experience/ContactWorld/Contacts.js'

class Contact extends Animations{

    constructor(index){

        super(index)

        this.experience = new Experience(document.querySelector('canvas.webgl'))
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.canvas = this.experience.canvas
        this.renderer = this.experience.renderer
        this.debug = this.experience.debug
        this.resources = this.experience.resources

        this.resources.on('ready', () => {
            this.contacts = new Contacts()
        })

        this.setOrbitControls()
        this.setCamera()
        this.setLights()
    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.camera.instance, this.canvas)

    }

    setCamera(){
        this.camera.instance.position.set(-7.2,-1.14,7.15)
        this.camera.instance.rotation.set(0.16,-0.79,0.113)
    }

    setLights(){
        
        this.light1 = new THREE.DirectionalLight('#ffffff',3.5)
        this.light1.position.set( 6.5, 7.0, 30.5 )
        this.scene.add(this.light1)

        this.light2 = new THREE.DirectionalLight('#ffffff',0.3)
        this.light2.position.set( -3.5, 0.0, 2.5 )
        this.scene.add(this.light2)

        this.light3 = new THREE.AmbientLight('#ffffff',3.3)
        this.light3.position.set( 0.0, 0.0, 0.0 )
        // this.scene.add(this.light3)


        this.debug.pane.addInput(this.light1.position, 'x', {min:-50, max:50, step:0.1})
        this.debug.pane.addInput(this.light1.position, 'y', {min:-50, max:50, step:0.1})
        this.debug.pane.addInput(this.light1.position, 'z', {min:-50, max:50, step:0.1})
        this.debug.pane.addInput(this.light1, 'intensity', {min:-50, max:50, step:0.1})

        this.debug.pane.addInput(this.light2.position, 'x', {min:-50, max:50, step:0.1})
        this.debug.pane.addInput(this.light2.position, 'y', {min:-50, max:50, step:0.1})
        this.debug.pane.addInput(this.light2.position, 'z', {min:-50, max:50, step:0.1})
        this.debug.pane.addInput(this.light2, 'intensity', {min:-50, max:50, step:0.1})

        this.debug.pane.addInput(this.light3, 'intensity', {min:-50, max:50, step:0.1})

        this.renderer.physicallyCorrectLights = true
    }

    customAnimation(index, key){

        setTimeout(function(){
            $('body').stop().animate({'opacity': 1}, 800);
            $('#' + key).stop().animate({'opacity': 0.5}, 3000);
            $("#" + index).stop().animate({'opacity': 1}, 3000);
            $('.thank-you').stop().animate({'opacity': 1}, 3000);
        }, 1);

    }

    customClickAnimation(){
        $('body').stop().animate({'opacity': 0}, 1200);
    }

    threeTransition(clickTime){
        
        if(this.contacts.contacts.children[11].position.x < 5.8){

            this.contacts.contacts.traverse((child) => {

                if(child instanceof THREE.Mesh){
                    if(child.name == 'linkedin' || child.name == 'wall2' || child.name == 'text2' || child.name == 'pointer2'){
                        child.position.x += 1.0 * clickTime * 0.018
                        child.position.z += 0.8 * clickTime * 0.018
                    }
                    if(child.name == 'mail' || child.name == 'wall3' || child.name == 'text3' || child.name == 'pointer3'){
                        child.position.x += 2.1 * clickTime * 0.018
                        child.position.z += 1.5 * clickTime * 0.018
                    }
                }
            })
        }
    }
}

const contact = new Contact("IV")