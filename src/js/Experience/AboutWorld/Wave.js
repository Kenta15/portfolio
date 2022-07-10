import * as THREE from 'three'
import waveVertexShader from '../shaders/wave/waveVertex.glsl'
import waveFragmentShader from '../shaders/wave/waveFragment.glsl'
import Experience from '../Experience.js'

export default class Wave{

    constructor(){
        this.experience = new Experience(document.querySelector('canvas.webgl'))
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.camera = this.experience.camera

        this.setGeometry()
        this.setMaterial()
        this.setWave()
        
    }

    setGeometry(){
        this.geometry = new THREE.PlaneGeometry(2, 2, 128, 128)
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
        this.wave.rotation.set(- Math.PI * 0.5,0,Math.PI)
        this.wave.position.set(0,2,0)
        this.wave.scale.set(10,10,10)
        this.scene.add(this.wave)
    }
    update(){
        this.wave.material.uniforms.uTime.value = this.time.elapsed * 0.001

        this.wave.rotateOnAxis(new THREE.Vector3(0,0,1), 0.001)

        // Change opacity
        if(this.wave.material.uniforms.alpha.value < 0.8){
            this.wave.material.uniforms.alpha.value = (this.time.elapsed * 0.001) / 5
        }
    }
}