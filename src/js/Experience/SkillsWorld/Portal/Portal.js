import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'three'

import Hole from './Hole.js'
import Smoke from './Smoke.js'
import EventHorizon from './EventHorizon.js'
import Lightning from './Lightning.js'

import Experience from '../../Experience.js'

export default class Portal{

    constructor(){

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.renderer = this.experience.renderer
        this.sizes = this.experience.sizes
        this.time = this.experience.time
        this.camera = this.experience.camera
        this.canvas = this.experience.canvas

        this.hole = new Hole()
        this.smoke = new Smoke()
        this.eventHorizon = new EventHorizon()
        this.lightning = new Lightning()

        this.setOrbitControls()
        this.setGroup()
    }

    setOrbitControls(){
        // this.controls = new OrbitControls(this.camera.instance, this.canvas)
        // this.controls.enableDamping = true
        // this.controls.enabled = false
    }

    setGroup(){

        this.portal = new THREE.Group()
        this.scene.add(this.portal)

        this.portal.add(this.hole.hole)
        this.portal.add(this.smoke.smokes)
        this.portal.add(this.eventHorizon.horizon)
        this.portal.add(this.lightning.lightnings)

        this.portal.position.z = -60
        this.portal.scale.set(20,20,20)
    }

    update(){

        this.hole.update()
        this.smoke.update()
        this.eventHorizon.update()
        this.lightning.update()
        // this.controls.update()
    }
}