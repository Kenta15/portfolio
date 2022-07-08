import Particles from './Particles.js'
import Sphere from './Sphere.js'
import Screens from './Screens.js'
import Effects from './Effects.js'

export default class ProjectWorld{

    constructor(){

        this.particles = new Particles()
        this.sphere = new Sphere()
        this.screens = new Screens()
        this.effects = new Effects()
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
        
    }
}