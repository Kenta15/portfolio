import * as THREE from 'three'

import Experience from '../Experience.js'
import explain from './skillsExplanations.js'
import Texts from './Texts.js'

let instance = null

export default class RayCaster{

    constructor(){

        if(instance){
            return instance
        }

        instance = this

        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.camera = this.experience.camera

        this.texts = new Texts()
        this.objectsToUpdate = this.texts.objectsToUpdate

        this.setRayCaster()
        this.dragObject()

    }

    setRayCaster(){

        this.mousedown = new THREE.Vector2()
        this.mousemove = new THREE.Vector2()

        this.raycaster = new THREE.Raycaster()
        this.currIntersect = null
        this.isDragging = false

        window.addEventListener('mousedown', (event) => {

            this.mousedown.x = event.clientX / this.sizes.width * 2 - 1
            this.mousedown.y = - (event.clientY / this.sizes.height) * 2 + 1

            this.raycaster.setFromCamera(this.mousedown, this.camera.instance)
            const intersects = this.raycaster.intersectObjects(this.texts.texts.children)

            if(intersects.length){
                this.currIntersect = intersects[0].object
                
                $('body').css('cursor', 'grabbing')

                // Pop up the explanation
                explain(this.currIntersect.name)
                $('#explanations').stop().animate({'opacity':0.9},500)
                $('.block').stop().animate({'opacity':0.5},800)

                console.log(this.currIntersect.name)
            }

            requestAnimationFrame(() => {
                this.isDragging = true
            })
        })

        window.addEventListener('mousemove', event =>{
            if(this.isDragging == false){
                return
            }
            this.mousemove.x = event.clientX / this.sizes.width * 2 - 1
            this.mousemove.y = - (event.clientY / this.sizes.height) * 2 + 1

        })

        window.addEventListener('mouseup', () => {
            this.isDragging = false
            this.currIntersect = null

            $('body').css('cursor', 'grab')

            // Remove the explanation
            $('#explanations').stop().animate({'opacity':0},1000)
            $('.block').stop().animate({'opacity':0},500)
        })
    }

    dragObject(){

        this.raycaster.setFromCamera(this.mousemove, this.camera.instance)
        const intersects = this.raycaster.intersectObjects(this.texts.texts.children)
    
        if(this.currIntersect != null){
            for(let obj of intersects){

                // body copies text position
                this.currIntersect.position.x = obj.point.x
                this.currIntersect.position.y = obj.point.y
    
                for(const object of this.objectsToUpdate)
                {
                    if(this.currIntersect == object.text){
                        object.body.position.copy(object.text.position)
                        object.body.quaternion.copy(object.text.quaternion)
                    }
                }
            }
        }
    }
}