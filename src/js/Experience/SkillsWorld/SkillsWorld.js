import Texts from './Texts.js'
import Portal from './Portal/Portal.js'
import Particles from './Particles.js'
import Glitch from './Glitch.js'

import Experience from '../Experience.js'

export default class SkillsWorld{

    constructor(){

        this.experience = new Experience()
        this.resources = this.experience.resources

        this.resources.on('ready', () => {
            this.texts = new Texts()
            this.portal = new Portal()
            this.particles = new Particles()
            this.glitch = new Glitch()
        })

    }

    update(){

        if(this.texts)
            this.texts.update()
        if(this.portal)
            this.portal.update()
        if(this.particles)
            this.particles.update()
        if(this.glitch)
            this.glitch.update()

    }
}