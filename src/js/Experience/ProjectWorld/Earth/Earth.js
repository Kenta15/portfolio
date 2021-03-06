import * as THREE from 'three'

import Globe from './Globe.js'
import Cloud from './Cloud.js'

import Experience from '../../Experience.js'

let instance = null

export default class Earth{

    constructor(){

        if(instance){
            return instance
        }
        instance = this

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        this.resources.on('ready', () => {
            this.globe = new Globe()
            this.cloud = new Cloud()

            this.earth.add(this.globe.globe)
            this.earth.add(this.cloud.cloud)
        })

        this.earth = new THREE.Group()
        this.scene.add(this.earth)

        this.projects = new THREE.Group()
        this.scene.add(this.projects)

        this.setEarth()
    }

    setEarth(){

        this.earth.position.set(0,1,0)
        this.earth.rotation.z = (Math.PI / 4)
        this.earth.scale.set(1.5,1.5,1.5)

        this.projects.add(this.earth)
    }

    update(){

        this.earth.rotateOnAxis(new THREE.Vector3(0,1,0),-0.0003)

    }
}