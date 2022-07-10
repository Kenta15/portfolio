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

        this.experience = new Experience(document.querySelector('canvas.webgl'))
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.camera = this.experience.camera

        this.projects = new THREE.Group()
        this.scene.add(this.projects)

        this.setGeometry()
        this.setMaterial()
        this.setSphere()
        
    }

    setGeometry(){
        this.geometry = new THREE.SphereGeometry(1.5,32,32)
    }
    setMaterial(){
        this.material = new THREE.ShaderMaterial({
            vertexShader:sphereVertexShader,
            fragmentShader: sphereFragmentShader,
            blending:THREE.AdditiveBlending,
            uniforms:{
                uTime:{value:0},
                alpha:{value:0},
            }
        })
    }
    setSphere(){
        this.sphere = new THREE.Mesh(this.geometry, this.material)
        this.projects.add(this.sphere)
    }
    update(){
        this.sphere.material.uniforms.uTime.value = this.time.elapsed * 0.001

        if((this.time.elapsed * 0.001) > 5.0 && (this.time.elapsed * 0.001) < 6.0){
            this.sphere.material.uniforms.alpha.value = (this.time.elapsed * 0.001) / 10
        }
    }
}