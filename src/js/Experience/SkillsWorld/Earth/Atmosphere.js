import * as THREE from 'three'
import atmosphereVertexShader from '../../shaders/atmosphere/atmosphereVertex.glsl'
import atmosphereFragmentShader from '../../shaders/atmosphere/atmosphereFragment.glsl'

import Experience from '../../Experience.js'

export default class Atmosphere{

    constructor(){
        
        this.setGeometry()
        this.setMaterial()
        this.setAtmosphere()
    }

    setGeometry(){

        this.geometry = new THREE.SphereGeometry(1.5,32,32)
    }

    setMaterial(){
        
        this.material = new THREE.ShaderMaterial({
                            vertexShader: atmosphereVertexShader,
                            fragmentShader: atmosphereFragmentShader,
                            blending:THREE.AdditiveBlending,
                            side:THREE.BackSide,
                        })
    }

    setAtmosphere(){

        this.atmosphere = new THREE.Mesh(this.geometry, this.material)
        this.atmosphere.scale.set(1.1,1.1,1.1)
        this.atmosphere.position.set(0.2,-0.5,0)
        this.atmosphere.rotation.z = Math.PI

    }

    update(){

        // this.atmosphere.rotateOnAxis(new THREE.Vector3(0,1,0),-0.001)
    }
}