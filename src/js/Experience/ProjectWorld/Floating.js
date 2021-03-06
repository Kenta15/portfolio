import * as THREE from 'three'
import floatingVertexShader from '../shaders/floating/floatingVertex.glsl'
import floatingFragmentShader from '../shaders/floating/floatingFragment.glsl'

import Experience from '../Experience.js'

export default class Floating{

    constructor(){

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.camera = this.experience.camera
        this.resources = this.experience.resources
        this.resource = this.resources.items.particleTexture
        this.debug = this.experience.debug

        this.count = 500

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
            blending:THREE.AdditiveBlending,
            depthTest: false,
            uniforms:{
                uTime:{value:0},
                uSize:{value:200},
                uTexture:{value:this.resource},
                uSpeed:{value:0.00003},
                alpha:{value:0},
            }
        })
    }

    setPoints(){

        this.points = new THREE.Points(this.geometry, this.material)
        this.points.position.y = -10
        this.points.position.z = -1
        this.scene.add(this.points)
        // this.debugFolder = this.debug.pane.addInput(this.points.position, 'y', {min:0, max:100, step:1})
    }

    setDebug(){
        // const gui = new dat.GUI()
        // gui.add(this.points.position, 'x').min(- 100).max(100).step(0.001)
        // gui.add(this.points.position, 'y').min(- 100).max(100).step(0.001)
        // gui.add(this.points.position, 'z').min(- 100).max(100).step(0.001)

        // gui.add(this.camera.instance.position, 'x').min(- 100).max(100).step(0.001)
        // gui.add(this.camera.instance.position, 'y').min(- 100).max(100).step(0.001)
        // gui.add(this.camera.instance.position, 'z').min(- 100).max(100).step(0.001)
    }

    update(){

        this.material.uniforms.uTime.value = this.time.elapsed

        if(this.material.uniforms.alpha.value < 0.1){
            this.material.uniforms.alpha.value = this.time.elapsed * 0.00001
        }
        else{
            this.material.uniforms.alpha.value = 0.1
        }
    }
}