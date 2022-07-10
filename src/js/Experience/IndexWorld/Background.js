import * as THREE from 'three'
import backgroundFragmentShader from '../shaders/background/backgroundFragment.glsl'
import backgroundVertexShader from '../shaders/background/backgroundVertex.glsl'
import Experience from '../Experience.js'

export default class Background{

    constructor(){
        this.experience = new Experience(document.querySelector('canvas.webgl'))
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.camera = this.experience.camera
        this.sizes = this.experience.sizes

        this.setGeometry()
        this.setMaterial()
        this.setBackground()
        
    }

    setGeometry(){
        this.geometry = new THREE.PlaneGeometry(1,1,2,2)
    }
    setMaterial(){
        this.material = new THREE.ShaderMaterial({
            vertexShader: backgroundVertexShader,
            fragmentShader : backgroundFragmentShader,
            blending:THREE.AdditiveBlending,
            side:THREE.DoubleSide,
            uniforms:{
                uTime:{value:0},
                uSize:{value: new THREE.Vector2(this.sizes.width, this.sizes.height)},
                random:{value: 0.2},
            },
        })
    }
    setBackground(){
        this.background = new THREE.Mesh(this.geometry, this.material)
        this.background.position.set(2,2,0)
        this.background.scale.set(30,25,0)
        this.scene.add(this.background)
    }

    resize(){
        this.material.uniforms.uSize.value.set(this.sizes.width, this.sizes.height)
    }

    update(){
        this.background.material.uniforms.uTime.value = this.time.elapsed * 0.001
    }
}