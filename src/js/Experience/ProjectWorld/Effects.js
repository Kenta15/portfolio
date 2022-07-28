import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import Experience from '../Experience.js'
import Screens from './Screens.js'

export default class Effects{

    constructor(){

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.sizes = this.experience.sizes
        this.time = this.experience.time
        this.camera = this.experience.camera
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug

        // this.screens = new Screens()
        this.screens = this.experience.projectWorld.screens
        this.projectsList = this.screens.projectsList
        this.projects = this.experience.projectWorld.projects

        this.setOrbitControls()
        this.setRayCaster()
    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.camera.instance, this.canvas)
        this.controls.enabled = false
    }

    setRayCaster(){

        this.raycaster = new THREE.Raycaster()
        this.currIntersect = null
        this.isDragging = false

        // Cursor
        this.cursor = {
            x: 0,
            y: 0
        }

        this.mousedown = {
            x: 0,
            y: 0
        }
        this.delta = {
            x: 0,
            y: 0
        }
        
        window.addEventListener('mousedown', (event) => {
            
            if(this.currIntersect || event.target.tagName == 'A')
                this.isDragging = false
            else
                this.isDragging = true
            
            // this.isDragging = true

            this.mousedown.x = event.clientX / this.sizes.width * 2 - 1
        })
        
        window.addEventListener('mouseup', () => {
            
            this.isDragging = false
        })

        window.addEventListener('mousemove', (event) => {

            this.cursor.x = event.clientX / this.sizes.width * 2 - 1
            this.cursor.y = - (event.clientY / this.sizes.height) * 2 + 1

            // if(this.isDragging == true){

            //     this.delta.x = this.cursor.x - this.mousedown.x
            //     this.mousedown.x = this.cursor.x

            //     if(this.screens.projects.rotation.z == 0)
            //         this.screens.projects.rotation.y += this.delta.x
            //     else
            //         this.screens.projects.rotation.y -= this.delta.x
            //     console.log(this.screens.projects.rotation.x, this.screens.projects.rotation.y, this.screens.projects.rotation.z)

                
            // }

            if(this.currIntersect){
                $('body').css('cursor', 'pointer')
            }
        })

        window.addEventListener('click', () => {
            
            if(this.currIntersect){

                if(this.currIntersect.object.name == 'ecommerce'){

                    for(let i = 0; i < this.projectsList.length; i++){
                        if(this.projectsList[i] == 'ecommerce'){
                            $('#' + this.projectsList[i]).css('display', 'block')
                            $('#' + this.projectsList[i]).stop().animate({'opacity': 0.8},1000)
                        }
                        else{
                            $('#' + this.projectsList[i]).css('display', 'none')
                            $('#' + this.projectsList[i]).stop().animate({'opacity': 0},1000)
                        }
                    }
                }
                else if(this.currIntersect.object.name == 'movie'){

                    for(let i = 0; i < this.projectsList.length; i++){
                        if(this.projectsList[i] == 'movie'){
                            $('#' + this.projectsList[i]).css('display', 'block')
                            $('#' + this.projectsList[i]).stop().animate({'opacity': 0.8},1000)
                        }
                        else{
                            $('#' + this.projectsList[i]).css('display', 'none')
                            $('#' + this.projectsList[i]).stop().animate({'opacity': 0},1000)
                        }
                    }
                }
                else if(this.currIntersect.object.name == 'portfolio'){

                    for(let i = 0; i < this.projectsList.length; i++){
                        if(this.projectsList[i] == 'portfolio'){
                            $('#' + this.projectsList[i]).css('display', 'block')
                            $('#' + this.projectsList[i]).stop().animate({'opacity': 0.8},1000)
                        }
                        else{
                            $('#' + this.projectsList[i]).css('display', 'none')
                            $('#' + this.projectsList[i]).stop().animate({'opacity': 0},1000)
                        }
                    }
                }
                else if(this.currIntersect.object.name == 'none'){

                    for(let i = 0; i < this.projectsList.length; i++){
                        if(this.projectsList[i] == 'none'){
                            $('#' + this.projectsList[i]).css('display', 'block')
                            $('#' + this.projectsList[i]).stop().animate({'opacity': 0.8},1000)
                        }
                        else{
                            $('#' + this.projectsList[i]).css('display', 'none')
                            $('#' + this.projectsList[i]).stop().animate({'opacity': 0},1000)
                        }
                    }
                }
            }
        })

        window.addEventListener('mouseout', () => {   

            if(!this.currIntersect){
                $('body').css('cursor', 'default')
            }
        })
    }

    update(){

        if(this.isDragging == true)
            this.projects.rotateOnAxis(new THREE.Vector3(0,1,0), -0.01)
        else
            this.projects.rotateOnAxis(new THREE.Vector3(0,1,0), -0.001)

        this.raycaster.setFromCamera(this.cursor, this.camera.instance)
        
        const intersects = this.raycaster.intersectObjects(this.screens.screens.children)
        
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