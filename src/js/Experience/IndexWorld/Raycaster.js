import * as THREE from 'three'

import Experience from '../Experience.js'
import Sphere from './Sphere.js'

let instance = null

export default class Raycaster{

    constructor(){

        if(instance){
            return instance
        }

        instance = this

        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.camera = this.experience.camera

        this.sphere = new Sphere()

        this.setRayCaster()

    }

    setRayCaster(){

        this.cursor = {
            x: 0,
            y: 0
        }

        this.raycaster = new THREE.Raycaster()
        this.currIntersect = null

        window.addEventListener('mousemove', (event) =>{

            this.sphere.sphere.visible = true

            this.cursor.x = event.clientX / this.sizes.width * 2 - 1
            this.cursor.y = - (event.clientY / this.sizes.height) * 2 + 1

            if(this.currIntersect){
                // this.currIntersect.object.material.uniforms.uTimeFreq.value = 0.5
                this.currIntersect.object.material.uniforms.uCursor.value = this.cursor
                $('#start').css('opacity', 1 - (Math.abs(this.cursor.x) + Math.abs(this.cursor.y)))
            }
            else{
                this.sphere.sphere.visible = false
                $('#start').css('opacity', 0)
            }

        })
    }

    update(){

        this.raycaster.setFromCamera(this.cursor, this.camera.instance)
        
        const intersects = this.raycaster.intersectObject(this.sphere.sphere)
        
        if(intersects.length)
        {
            this.currIntersect = intersects[0]
        }
        else
        {
            this.currIntersect = null
        }
    }

}