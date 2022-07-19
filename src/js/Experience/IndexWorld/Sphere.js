import * as THREE from 'three'

import sphereVertexShader from '../shaders/sphere/sphereVertex.glsl'
import sphereFragmentShader from '../shaders/sphere/sphereFragment.glsl'

import Experience from '../Experience.js'

let instance = null

export default class Sphere{

    constructor(){

        if(instance){
            return instance
        }

        instance = this

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        // this.debug = this.experience.debug

        this.setGeometry()
        this.setMaterial()
        this.setSphere()
    }

    setGeometry(){

        this.geometry = new THREE.SphereGeometry(1,512,512)
    }

    setMaterial(){

        this.material = new THREE.ShaderMaterial({

            vertexShader: sphereVertexShader,
            fragmentShader: sphereFragmentShader,
            uniforms:{
                uTime: {value:0},
                uTimeFreq:{value:0.15},
                uDistortionFreq: {value:1.0},
                uDistortionStrength: {value:1.0},
                uDisplacementFreq: {value:2.0},
                uDisplacementStrength: {value:0.2},
                uCursor:{value:new THREE.Vector2(0,0)},
            }
        })

        // this.debug.pane.addInput(
        //     this.material.uniforms.uTimeFreq,
        //     'value',
        //     {label: 'uTimeFreq', min:0, max:1, step:0.001}
        // )
        // this.debug.pane.addInput(
        //     this.material.uniforms.uDistortionFreq,
        //     'value',
        //     {label: 'uDistortionFreq', min:0, max:5, step:0.001}
        // )
        // this.debug.pane.addInput(
        //     this.material.uniforms.uDistortionStrength,
        //     'value',
        //     {label: 'uDistortionStrength', min:0, max:5, step:0.001}
        // )
        // this.debug.pane.addInput(
        //     this.material.uniforms.uDisplacementFreq,
        //     'value',
        //     {label: 'uDisplacementFreq', min:0, max:5, step:0.001}
        // )
        // this.debug.pane.addInput(
        //     this.material.uniforms.uDisplacementStrength,
        //     'value',
        //     {label: 'uDisplacementStrength', min:0, max:1, step:0.001}
        // )
    }

    setSphere(){

        this.sphere = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.sphere)
        this.sphere.visible = false
    }

    update(){
        
        this.material.uniforms.uTime.value = this.time.elapsed * 0.001

    }
}