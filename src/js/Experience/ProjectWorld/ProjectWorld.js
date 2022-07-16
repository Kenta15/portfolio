import Experience from '../Experience.js'

import Particles from './Particles.js'
import Sphere from './Sphere.js'
import Screens from './Screens.js'
import Effects from './Effects.js'
import Floating from './Floating.js'
import Smoke from './Smoke.js'
import Earth from './Earth/Earth.js'

export default class ProjectWorld{

    constructor(){

        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene

        this.resources.on('ready', () => {
            // this.particles = new Particles()
            // this.sphere = new Sphere()
            this.earth = new Earth()
            this.screens = new Screens()
            this.effects = new Effects()
            this.floating = new Floating()
            // this.smoke = new Smoke()
            
            this.scene.background = this.resources.items.backgroundTexture
            console.log(this.resources.items.backgroundTexture)
        })
    }

    update(){
        
        // if(this.particles)
        //     this.particles.update()
        // if(this.sphere)
        //     this.sphere.update()
        if(this.earth)
            this.earth.update()
        if(this.screens)
            this.screens.update()
        if(this.effects)
            this.effects.update()
        if(this.floating)
            this.floating.update() 
        // if(this.smoke)
        //     this.smoke.update()
        
    }
}