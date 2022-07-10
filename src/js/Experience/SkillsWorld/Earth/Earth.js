import * as THREE from 'three'

import Globe from './Globe.js'
import Atmosphere from './Atmosphere.js'
import Cloud from './Cloud.js'

import Experience from '../../Experience.js'

export default class Earth{

    constructor(){

        this.experience = new Experience()
        this.scene = this.experience.scene

        this.globe = new Globe()
        this.atmosphere = new Atmosphere()
        this.cloud = new Cloud()

        this.earth = new THREE.Group()
        this.scene.add(this.earth)

        // this.earth.add(this.globe.globe)
        // this.earth.add(this.atmosphere.atmosphere)
        // this.earth.add(this.cloud.cloud)

        this.setEarth()
    }

    setEarth(){

        this.earth.position.set(-50,40,-50)
        this.earth.rotation.z = (Math.PI / 4)
        this.earth.scale.set(15,15, 15)
    }

    update(){

        this.atmosphere.update()
        this.earth.rotateOnAxis(new THREE.Vector3(0,1,0),-0.0003)

        // this.earth.rotateOnAxis(new THREE.Vector3(0,1,0),-0.001)
    }
}