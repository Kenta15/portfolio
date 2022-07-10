import * as THREE from 'three'

import FlowField from './FlowField.js'
import Experience from '../Experience'

export default class Particles{

    constructor(){

        this.experience = new Experience()
        this.scene = this.experience.scene

        this.count = 1000

        this.setFlowField()
        this.setGeometry()
        this.setMaterial()
        this.setPoints()
    }

    setGeometry(){

        const position = new Float32Array(this.count * 3)

        for(let i = 0; i < this.count; i++){

            position[i] = (Math.random() - 0.5) * 10
            position[i + 1] = (Math.random() - 0.5) * 10
            position[i + 2] = (Math.random() - 0.5) * 10
        }

        this.geometry = new THREE.BufferGeometry()
        this.geometry.setAttribute('position', new THREE.BufferAttribute(position, 3))

    }
    setFlowField(){
        this.flowField = new FlowField(this.count)
    }

    setMaterial(){

        this.material = new THREE.PointsMaterial({
            sizeAttenuation: true,
            size: 1,
        })
    }

    setPoints(){

        this.points = new THREE.Points(this.geometry, this.material)
        // this.scene.add(this.points)
    }

    update(){

        this.flowField.update()
    }
}