import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

import Experience from '../Experience.js'
import Screens from './Screens.js'

export default class Effects{

    constructor(){

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.sizes = this.experience.sizes
        this.time = this.experience.time
        this.renderer = this.experience.renderer
        this.camera = this.experience.camera
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug

        this.screens = new Screens()

        this.raycaster = null

        this.setOrbitControls()
        this.setPostProcessing()
        this.setRayCaster()
    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.camera.instance, this.canvas)
        this.controls.enableDamping = true
    }

    setPostProcessing(){
        const renderTarget = new THREE.WebGLRenderTarget(
            800,
            600,
            {
                samples: this.renderer.instance.getPixelRatio() === 1 ? 2 : 0
            }
        )
        
        // Post Processing
        this.effectComposer = new EffectComposer(this.renderer.instance)
        this.effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.effectComposer.setSize(this.sizes.width, this.sizes.height)
        
        // Render Pass
        const renderPass = new RenderPass(this.scene,this.camera.instance)
        this.effectComposer.addPass(renderPass)
        
        // UnrealBloom Pass
        this.unrealBloomPass = new UnrealBloomPass()
        this.effectComposer.addPass(this.unrealBloomPass)
        
        // GammaCorrectionPass
        const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader)
        this.effectComposer.addPass(gammaCorrectionPass)
        
        // SMAA Pass
        if(this.renderer.instance.getPixelRatio() === 1 && !this.renderer.capabilities.isWebGL2)
        {
            const smaaPass = new SMAAPass()
            this.effectComposer.addPass(smaaPass)
        }

        this.unrealBloomPass.enabled = true
        this.unrealBloomPass.strength = 1.3
        this.unrealBloomPass.radius = 1
        this.unrealBloomPass.threshold = 1.6

        // this.debug.pane.addInput(this.unrealBloomPass, 'strength', {min:-50, max:50, step:0.1})
        // this.debug.pane.addInput(this.unrealBloomPass, 'radius', {min:-50, max:50, step:0.1})
        // this.debug.pane.addInput(this.unrealBloomPass, 'threshold', {min:-50, max:50, step:0.1})
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
            
            this.isDragging = true

            this.mousedown.x = event.clientX / this.sizes.width * 2 - 1

            console.log(this.screens.projects.rotation)

        })
        window.addEventListener('mouseup', () => {
            
            this.isDragging = false
        })

        window.addEventListener('mousemove', event =>{

            this.cursor.x = event.clientX / this.sizes.width * 2 - 1
            this.cursor.y = - (event.clientY / this.sizes.height) * 2 + 1

            if(this.isDragging == true){

                this.delta.x = this.mousedown.x - this.cursor.x
                this.mousedown.x = this.cursor.x

                if(this.screens.projects.rotation.z <= 0)
                    this.screens.projects.rotation.y -= this.delta.x
                else
                    this.screens.projects.rotation.y += this.delta.x
            }

            if(this.currIntersect){
                $('body').css('cursor', 'pointer')
            }
        })

        window.addEventListener('click', () => {

            // console.log(this.currIntersect.object.id)
            
            if(this.currIntersect){
                console.log(this.currIntersect.object)
                console.log(this.currIntersect.object.id)
                console.log(this.currIntersect.object.name)

                if(this.currIntersect.object.name == 'ecommerce'){
                    $('#ecommerce').stop().animate({'opacity': 0.8},1000)
                    $('#movie').stop().animate({'opacity': 0},1000)
                    $('#portfolio').stop().animate({'opacity': 0},1000)
                    $('#none').stop().animate({'opacity': 0},1000)
                }
                else if(this.currIntersect.object.name == 'movie'){
                    $('#ecommerce').stop().animate({'opacity': 0},1000)
                    $('#movie').stop().animate({'opacity': 0.8},1000)
                    $('#portfolio').stop().animate({'opacity': 0},1000)
                    $('#none').stop().animate({'opacity': 0},1000)
                }
                else if(this.currIntersect.object.name == 'portfolio'){
                    $('#ecommerce').stop().animate({'opacity': 0},1000)
                    $('#movie').stop().animate({'opacity': 0},1000)
                    $('#portfolio').stop().animate({'opacity': 0.8},1000)
                    $('#none').stop().animate({'opacity': 0},1000)
                }
                else if(this.currIntersect.object.name == 'animated'){
                    $('#ecommerce').stop().animate({'opacity': 0},1000)
                    $('#movie').stop().animate({'opacity': 0},1000)
                    $('#portfolio').stop().animate({'opacity': 0},1000)
                    $('#none').stop().animate({'opacity': 0.8},1000)
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

        if(this.isDragging == false){
            this.screens.projects.rotateOnAxis(new THREE.Vector3(0,1,0), -0.001)
        }

        // Update controls
        this.controls.enabled = false
        this.controls.update()

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

        // this.effectComposer.render()
    }
}