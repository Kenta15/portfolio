import * as THREE from'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js'

import Experience from '../Experience.js'

export default class Bloom{

    constructor(){

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.renderer = this.experience.renderer
        this.sizes = this.experience.sizes
        this.time = this.experience.time
        this.camera = this.experience.camera
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug

        this.setPostProcessing()
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
        
        // Bloom Pass
        this.bloomPass = new UnrealBloomPass()
        this.effectComposer.addPass(this.bloomPass)
        this.bloomPass.strength = 0.3
        this.bloomPass.radius = 1
        this.bloomPass.threshold = 1.0
        
        // GammaCorrectionPass
        const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader)
        this.effectComposer.addPass(gammaCorrectionPass)
        
        // SMAA Pass
        if(this.renderer.instance.getPixelRatio() === 1 && !this.renderer.capabilities.isWebGL2)
        {
            const smaaPass = new SMAAPass()
            this.effectComposer.addPass(smaaPass)
        }
    }

    update(){
        
        this.effectComposer.render()
    }
}