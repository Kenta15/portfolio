import Particles from './Particles.js'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Experience from '../Experience.js'

export default class Portal{

    constructor(){

        this.experience = new Experience(document.querySelector('canvas.webgl'))
        this.scene = this.experience.scene
        this.renderer = this.experience.renderer
        this.sizes = this.experience.sizes
        this.time = this.experience.time
        this.camera = this.experience.camera
        this.canvas = this.experience.canvas

        this.particles = new Particles()

        this.setOrbitControls()
    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.camera.instance, this.canvas)
        this.controls.enableDamping = true
    }

    update(){

        this.controls.update()
        this.particles.update()
    }
}