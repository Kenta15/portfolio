import * as THREE from 'three'
import eventHorizonVertexShader from '../../shaders/eventHorizon/eventHorizonVertex.glsl'
import eventHorizonFragmentShader from '../../shaders/eventHorizon/eventHorizonFragment.glsl'

import Experience from '../../Experience'

export default class EventHorizon{

    constructor(){

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug

        this.setColor()
        this.setGeometry()
        this.setMaterial()
        this.setHorizon()
    }

    setColor(){

        this.colors = {}

        this.colors.start = {}
        this.colors.start.value = '#b5d6ff'
        this.colors.start.instance = new THREE.Color(this.colors.start.value)

        this.colors.end = {}
        this.colors.end.value = '#0028ff'
        this.colors.end.instance = new THREE.Color(this.colors.end.value)

        // for(const color in this.colors){
        //     const col = this.colors[color]
        //     this.debug.pane.addInput(col, 'value').on('change', () => {
        //         col.instance.set(col.value)
        //     })
        // }

    }

    setGeometry(){

        this.geometry = new THREE.PlaneGeometry(5, 5, 1, 1)

    }

    setMaterial(){

        this.material = new THREE.ShaderMaterial({

            vertexShader: eventHorizonVertexShader,
            fragmentShader: eventHorizonFragmentShader,
            transparent:true,
            depthWrite:false,

            uniforms: {
                uTime: {value:0},
                uColorStart: {value: this.colors.start.instance},
                uColorEnd: {value: this.colors.end.instance}
            }
        })
    }

    setHorizon(){

        this.horizon = new THREE.Mesh(this.geometry, this.material)
        // this.scene.add(this.horizon)
    }

    update(){

        this.material.uniforms.uTime.value = this.time.elapsed
    }

}