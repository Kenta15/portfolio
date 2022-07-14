import * as THREE from 'three'

import Experience from '../../Experience.js'

export default class Globe{

    constructor(){

        this.experience = new Experience()
        this.resources = this.experience.resources

        this.setGeometry()
        this.setMaterial()
        this.setGlobe()
    }

    setGeometry(){

        this.geometry = new THREE.SphereGeometry(1.5,32,32)
    }

    setMaterial(){

        this.material = new THREE.MeshPhongMaterial({
            map: this.resources.items.earthColorTexture,
            bumpMap: this.resources.items.earthBumpTexture,
            bumpScale:0.2,
        })

    }

    setGlobe(){

        this.globe = new THREE.Mesh(this.geometry,this.material)

    }

}