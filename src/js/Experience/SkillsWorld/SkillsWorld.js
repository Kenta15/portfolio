import Texts from './Texts.js'
import RayCaster from './RayCater.js'
import Portal from './Portal/Portal.js'
import Earth from './Earth/Earth.js'
import Particles from './Particles.js'

import Experience from '../Experience.js'

export default class SkillsWorld{

    constructor(){

        this.experience = new Experience()
        this.resources = this.experience.resources

        this.resources.on('ready', () => {
            this.texts = new Texts()
            this.portal = new Portal()
            this.earth = new Earth()
            this.particles = new Particles()
        })

    }

    update(){

        if(this.texts)
            this.texts.update()
        if(this.portal)
            this.portal.update()
        if(this.earth)
            this.earth.update()
        if(this.particles)
            this.particles.update()

    }
}