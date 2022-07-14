import * as THREE from 'three'
import waveVertexShader from '../shaders/wave/waveVertex.glsl'
import waveFragmentShader from '../shaders/wave/waveFragment.glsl'
import Experience from '../Experience.js'

export default class Wave{

    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.camera = this.experience.camera

        this.setGeometry()
        this.setMaterial()
        this.setWave()
        
    }

    setGeometry(){
        this.geometry = new THREE.PlaneGeometry(4, 2, 128, 128)
    }
    setMaterial(){
        this.material = new THREE.ShaderMaterial({
            vertexShader: waveVertexShader,
            fragmentShader : waveFragmentShader,
            blending:THREE.AdditiveBlending,
            side:THREE.DoubleSide,
            uniforms:{
                uTime:{value:0},
                waveElevation:{value:0.5},
                waveFrequency:{value: new THREE.Vector2(2,1.5)},
                waveSpeed:{value:0},
                alpha:{value:0},
            },
        })
    }
    setWave(){
        this.wave = new THREE.Mesh(this.geometry, this.material)
        this.wave.rotation.set(0,Math.PI / 15,Math.PI)
        this.wave.position.set(0,0,0)
        this.wave.scale.set(10,10,10)
        this.scene.add(this.wave)
    }
    update(){
        this.wave.material.uniforms.uTime.value = this.time.elapsed * 0.001

        // Change opacity
        this.wave.material.uniforms.alpha.value = (this.time.elapsed * 0.001) / 2
    }
}