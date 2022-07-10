import * as THREE from 'three'

import Experience from '../../Experience.js'

export default class Cloud{

    constructor(){

        this.experience = new Experience()
        this.resources = this.experience.resources
        
        this.setGeometry()
        this.setMaterial()
        this.setCloud()
    }

    setGeometry(){

        this.geometry = new THREE.SphereGeometry(1.52, 32, 32)
    }

    setMaterial(){

        this.material = new THREE.MeshPhongMaterial({
            map: this.resources.items.cloudTexture,
            transparent: true,
        })
    }

    setCloud(){

        this.cloud = new THREE.Mesh(this.geometry,this.material)
    }
}