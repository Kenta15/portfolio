import * as THREE from 'three'
import floatingVertexShader from '../shaders/test/floatingVertex.glsl'
import floatingFragmentShader from '../shaders/test/floatingFragment.glsl'
import * as dat from 'lil-gui'

import Experience from '../Experience.js'
import { AdditiveBlending } from 'three'

export default class Floating{

    constructor(){

        this.experience = new Experience(document.querySelector('canvas.webgl'))
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.camera = this.experience.camera

        this.textureLoader = new THREE.TextureLoader()
        this.particleTexture = this.textureLoader.load('/textures/particles/point.png')

        this.count = 300

        this.setGeometry()
        this.setMaterial()
        this.setPoints()
        this.setDebug()
    }

    setGeometry(){

        this.geometry = new THREE.BufferGeometry()

        const position_array = new Float32Array(this.count * 3)
        const progress_array = new Float32Array(this.count)
        const size_array = new Float32Array(this.count)

        for(let i = 0; i < this.count; i++){

            position_array[i * 3] = (Math.random() - 0.5) * 30
            position_array[i * 3 + 1] = 0
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
            vertexShader:floatingVertexShader,
            fragmentShader:floatingFragmentShader,
            transparent:true,
            blending:AdditiveBlending,
            depthTest: false,
            uniforms:{
                uTime:{value:0},
                uSize:{value:200},
                uTexture:{value:this.particleTexture},
                alpha:{value:0},
            }
        })
    }

    setPoints(){

        this.points = new THREE.Points(this.geometry, this.material)
        this.points.position.y = -10
        this.points.position.z = -1
        this.scene.add(this.points)
    }

    setDebug(){
        const gui = new dat.GUI()
        gui.add(this.points.position, 'x').min(- 100).max(100).step(0.001)
        gui.add(this.points.position, 'y').min(- 100).max(100).step(0.001)
        gui.add(this.points.position, 'z').min(- 100).max(100).step(0.001)

        gui.add(this.camera.instance.position, 'x').min(- 100).max(100).step(0.001)
        gui.add(this.camera.instance.position, 'y').min(- 100).max(100).step(0.001)
        gui.add(this.camera.instance.position, 'z').min(- 100).max(100).step(0.001)
    }

    update(){

        this.material.uniforms.uTime.value = this.time.elapsed

        if((this.time.elapsed * 0.001) > 6.0){

            if(this.material.uniforms.alpha.value < 0.3){
                this.material.uniforms.alpha.value = this.time.elapsed * 0.000002
            }
            
        }
    }
}