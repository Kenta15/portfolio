import * as THREE from 'three'
import particlesVertexShader from '../shaders/particles/particlesVertex.glsl'
import particlesFragmentShader from '../shaders/particles/particlesFragment.glsl'
import Experience from '../Experience.js'

export default class Particles{

    constructor(){
        this.experience = new Experience(document.querySelector('canvas.webgl'))
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.camera = this.experience.camera
        this.renderer = this.experience.renderer

        this.setGeometry()
        this.setMaterial()
        this.setPoints()
        
    }

    setGeometry(){

        const parameters = {}
        parameters.count = 50000
        parameters.radius = 6
        parameters.randomness = 5
        parameters.insideColor = '#ff6030'
        parameters.outsideColor = '#1b3984'

        // this.geometry = null
        // this.material = null
        // this.points = null

        this.geometry = new THREE.BufferGeometry()

        const positions = new Float32Array(parameters.count * 3)
        const scales = new Float32Array(parameters.count)

        for(let i = 0; i < parameters.count; i++)
        {
            const i3 = i * 3

            // Position
            const radius = Math.random() * parameters.radius

            const randomX = Math.random() * 2
            const randomY = Math.random() * 2
            const randomZ = Math.random() * 2

            positions[i3    ] = Math.cos(1) * radius + randomX
            positions[i3 + 1] = randomY
            positions[i3 + 2] = Math.sin(1) * radius + randomZ

            // Scale
            scales[i] = Math.random()
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    }
    setMaterial(){
        this.material = new THREE.ShaderMaterial({
            vertexShader:particlesVertexShader,
            fragmentShader:particlesFragmentShader,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            uniforms:{
                uTime:{value:0},
                uSize:{value:5 * this.renderer.instance.getPixelRatio()},
                // texture:{value:particleTexture},
                alpha:{value:0},
            }
        })
    }
    setPoints(){
        this.points = new THREE.Points(this.geometry, this.material)
        this.scene.add(this.points)
    }
    update(){
        this.material.uniforms.uTime.value = this.time.elapsed * 0.001
        this.material.uniforms.alpha.value = (this.time.elapsed * 0.001) / 10

        this.points.position.x = (this.time.elapsed * 0.001) * 7 * 0.13
        this.points.position.z = (this.time.elapsed * 0.001) * 10 * 0.13

        if((this.time.elapsed * 0.001) > 6.0 && (this.time.elapsed * 0.001) < 6.01){
            this.scene.remove(this.points)
        }

    }
}