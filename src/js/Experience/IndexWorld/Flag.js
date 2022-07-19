import * as THREE from 'three'

import flagVertexShader from '../shaders/flag/flagVertex.glsl'
import flagFragmentShader from '../shaders/flag/flagFragment.glsl'

import Experience from '../Experience.js'

export default class Flag{

    constructor(){

        this.experience = new Experience()
        this.time = this.experience.time
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setGeometry()
        this.setMaterial()
        this.setFlag()
    }

    setGeometry(){
        this.geometry = new THREE.PlaneBufferGeometry(1,0.8,32,32)
    }

    setMaterial(){
        this.material = new THREE.ShaderMaterial({

            vertexShader: flagVertexShader,
            fragmentShader: flagFragmentShader,
            uniforms:{
                uTime: {value:0},
                uTexture:{value:this.resources.items.flagTexture},
                uFreq:{value:new THREE.Vector2(10, 5)},
                uAmp:{value:new THREE.Vector2(0.05, 0.05)},
                alpha:{value:0.1},
            }
        })
    }

    setFlag(){

        this.flag = new THREE.Mesh(this.geometry, this.material)
        this.flag.position.set(0.9,0,0)
        this.flag.scale.set(0.15,0.15,0.15)
        this.scene.add(this.flag)
    }

    update(){
        this.material.uniforms.uTime.value = this.time.elapsed * 0.001
    }
}