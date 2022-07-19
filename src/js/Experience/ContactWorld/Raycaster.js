import * as THREE from 'three'

import Experience from '../Experience.js'
import Contacts from './Contacts.js'

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

        this.contacts = new Contacts()

        this.setRayCaster()

    }

    setRayCaster(){

        this.cursor = {
            x: 0,
            y: 0
        }

        this.raycaster = new THREE.Raycaster()
        this.currIntersect = null
        this.clickedText = null

        window.addEventListener('mousemove', (event) =>{

            this.cursor.x = event.clientX / this.sizes.width * 2 - 1
            this.cursor.y = - (event.clientY / this.sizes.height) * 2 + 1

        })

        window.addEventListener('mousedown', () => {

            if(this.currIntersect){

                if(this.currIntersect.object.name.includes('text')){
                    this.currIntersect.object.position.z -= 0.03
                    this.clickedText = this.currIntersect.object
                }
            }
        })

        window.addEventListener('mouseup', () => {

            if(this.clickedText){
                
                this.clickedText.position.z += 0.03

                if(this.clickedText.name == 'text1')
                    window.setTimeout(() => {window.open('https://github.com/Kenta15')}, 200)
                else if(this.clickedText.name == 'text2')
                    window.setTimeout(() => {window.open('https://www.linkedin.com/in/kenta-tanaka-0a11a0223/')}, 200)
                else if(this.clickedText.name == 'text3')
                    window.setTimeout(() => {window.open('mailto:tkenta2929@gmail.com?')}, 200)
            }
                
            this.clickedText = null
        })
    }

    update(){

        this.raycaster.setFromCamera(this.cursor, this.camera.instance)
        
        const intersects = this.raycaster.intersectObjects(this.contacts.contacts.children)
        
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