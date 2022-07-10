import * as THREE from 'three'
import backParticlesVertexShader from '../shaders/backParticles/backParticlesVertex.glsl'
import backParticlesFragmentShader from '../shaders/backParticles/backParticlesFragment.glsl'

import Experience from '../Experience.js'

export default class Particles{

    constructor(){

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.camera = this.experience.camera
        this.resources = this.experience.resources
        this.resource = this.resources.items.particleTexture
        this.debug = this.experience.debug

        this.count = 10000

        this.setGeometry()
        this.setMaterial()
        this.setPoints()
    }

    setGeometry(){

        this.geometry = new THREE.BufferGeometry()

        const position_array = new Float32Array(this.count * 3)
        const progress_array = new Float32Array(this.count)
        const size_array = new Float32Array(this.count)

        for(let i = 0; i < this.count; i++){

            position_array[i * 3] = (Math.random() - 0.5) * 300
            position_array[i * 3 + 1] = (Math.random() - 0.5) * 300
            position_array[i * 3 + 2] = (Math.random() - 0.5) * 30

            progress_array[i] = Math.random()
            size_array[i] = Math.random()

        }
        
        this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(position_array, 3))
        this.geometry.setAttribute('aProgress', new THREE.Float32BufferAttribute(progress_array, 1))
        this.geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(size_array, 1))
    }


    setMaterial(){

        this.material = new THREE.ShaderMaterial({
            vertexShader:backParticlesVertexShader,
            fragmentShader:backParticlesFragmentShader,
            transparent:true,
            blending:THREE.AdditiveBlending,
            depthTest: false,
            uniforms:{
                uTime:{value:0},
                uSize:{value:600},
                uTexture:{value:this.resource},
                alpha:{value:0.8},
            }
        })
    }

    setPoints(){

        this.points = new THREE.Points(this.geometry, this.material)
        this.points.position.y = -60
        this.points.position.z = -80
        this.scene.add(this.points)
    }


    update(){

        this.material.uniforms.uTime.value = this.time.elapsed
    }
}