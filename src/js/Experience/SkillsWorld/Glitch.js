import * as THREE from'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js'

import Experience from '../Experience.js'

export default class Glitch{

    constructor(){

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.renderer = this.experience.renderer
        this.sizes = this.experience.sizes
        this.time = this.experience.time
        this.camera = this.experience.camera
        this.canvas = this.experience.canvas

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
        
        // Gilitch Pass
        this.glitchPass = new GlitchPass()
        this.effectComposer.addPass(this.glitchPass)
        
        // GammaCorrectionPass
        // const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader)
        // this.effectComposer.addPass(gammaCorrectionPass)
        
        // SMAA Pass
        if(this.renderer.instance.getPixelRatio() === 1 && !this.renderer.capabilities.isWebGL2)
        {
            const smaaPass = new SMAAPass()
            this.effectComposer.addPass(smaaPass)
        }
    }

    update(){
        
        this.glitchPass.enabled = false

        if(this.time.elapsed * 0.001 > 2.5 && this.time.elapsed * 0.001 < 2.8){
            this.glitchPass.enabled = true
            this.glitchPass.goWild = true
        }

        // effectComposer render
        if(this.glitchPass.enabled == true){
            this.effectComposer.render()
        }
    }
}