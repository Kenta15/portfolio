import * as THREE from 'three'

import Experience from '../Experience.js'

let instance = null

export default class Contacts{

    constructor(){

        if(instance){
            return instance
        }

        instance = this
        
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        this.setIcons()
        this.setFloor()
    }

    setIcons(){

        this.contacts = this.resources.items.contacts.scene

        this.contacts.traverse((child) => {
            if(child instanceof THREE.Mesh){
                if(child.name == 'linkedin' || child.name == 'wall2' || child.name == 'text2' || child.name == 'pointer2'){
                    child.position.x += 1.0
                    child.position.z += 0.8
                }
                if(child.name == 'mail' || child.name == 'wall3' || child.name == 'text3' || child.name == 'pointer3'){
                    child.position.x += 2.1
                    child.position.z += 1.5
                }
            }

        })

        // this.contacts.rotation.x = - Math.PI / 2 // wake up
        // this.contacts.rotation.y = Math.PI / 7 // slide
        this.contacts.position.set(-16,-4.0, 0) // z = 5.5
        this.contacts.scale.set(3,3,3)

        this.scene.add(this.contacts)

        this.debug.pane.addInput(this.contacts.position, 'x', {min:-50, max:50, step:0.1})
        this.debug.pane.addInput(this.contacts.position, 'y', {min:-50, max:50, step:0.1})
        this.debug.pane.addInput(this.contacts.position, 'z', {min:-50, max:50, step:0.1})
    }

    setFloor(){

        this.floor = this.resources.items.floor.scene
        this.floor.position.set(-15.4,-4.0,-2.2)
        this.floor.rotation.y = - Math.PI / 6
        this.floor.scale.set(3,3,3)
        this.scene.add(this.floor)

    }

    update(){

        // if(this.contacts.rotation.x < 0){
        //     this.contacts.rotateOnAxis(new THREE.Vector3(1,0,0), 0.01)
        // }

        if(this.time.elapsed * 0.001 < 1.0){

            this.contacts.traverse((child) => {

                if(child instanceof THREE.Mesh){
                    if(child.name == 'linkedin' || child.name == 'wall2' || child.name == 'text2' || child.name == 'pointer2'){
                        child.position.x -= 1.0 * this.time.elapsed * 0.000018
                        child.position.z -= 0.8 * this.time.elapsed * 0.000018
                    }
                    if(child.name == 'mail' || child.name == 'wall3' || child.name == 'text3' || child.name == 'pointer3'){
                        child.position.x -= 2.1 * this.time.elapsed * 0.000018
                        child.position.z -= 1.5 * this.time.elapsed * 0.000018
                    }
                }
    
            })

        }

    }
}