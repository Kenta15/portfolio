import Particles from './Particles.js'
import Sphere from './Sphere.js'
import Screens from './Screens.js'
import Effects from './Effects.js'
import Floating from './Floating.js'
import Smoke from './Smoke.js'

export default class ProjectWorld{

    constructor(){

        this.particles = new Particles()
        this.sphere = new Sphere()
        this.screens = new Screens()
        this.effects = new Effects()
        this.floating = new Floating()
        this.smoke = new Smoke()
    }

    update(){
        if(this.particles)
            this.particles.update()
        if(this.sphere)
            this.sphere.update()
        if(this.screens)
            this.screens.update()
        if(this.effects)
            this.effects.update()
        if(this.floating)
            this.floating.update() 
        if(this.smoke)
            this.smoke.update()
        
    }
}