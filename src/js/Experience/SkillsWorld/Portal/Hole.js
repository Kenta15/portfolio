import * as THREE from 'three'
import holeVertexShader from '../../shaders/hole/holeVertex.glsl'
import holeFragmentShader from '../../shaders/hole/holeFragment.glsl'

import Experience from '../../Experience'

export default class Hole{

    constructor(){

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug

        this.setColor()
        this.setGeometry()
        this.setMaterial()
        this.setHole()
    }

    setColor(){

        this.colors = {}

        this.colors.start = {}
        this.colors.start.value = '#000000'
        this.colors.start.instance = new THREE.Color(this.colors.start.value)

        this.colors.end = {}
        this.colors.end.value = '#1f67ff'
        this.colors.end.instance = new THREE.Color(this.colors.end.value)

        // for(const color in this.colors){
        //     const col = this.colors[color]
        //     this.debug.pane.addInput(col, 'value').on('change', () => {
        //         col.instance.set(col.value)
        //     })
        // }

    }

    setGeometry(){

        this.geometry = new THREE.PlaneGeometry(6,6,1,1)
    }

    setMaterial(){

        this.material = new THREE.ShaderMaterial({

            vertexShader: holeVertexShader,
            fragmentShader: holeFragmentShader,
            transparent:true,
            depthWrite:false,

            uniforms: {
                uTime: {value:0},
                uColorStart: {value: this.colors.start.instance},
                uColorEnd: {value: this.colors.end.instance}
            }
        })
    }

    setHole(){

        this.hole = new THREE.Mesh(this.geometry, this.material)
        // this.scene.add(this.hole)
    }

    update(){

        this.material.uniforms.uTime.value = this.time.elapsed
    }

}