import Experience from '../Experience.js'

import Screens from './Screens.js'
import Effects from './Effects.js'
import Floating from './Floating.js'
import Smoke from './Smoke.js'
import Earth from './Earth/Earth.js'
import Bloom from './Bloom.js'

export default class ProjectWorld{

    constructor(){

        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene

        this.resources.on('ready', () => {

            // this.earth = new Earth()
            // this.screens = new Screens()
            this.effects = new Effects()
            this.floating = new Floating()
            this.smoke = new Smoke()
            this.bloom = new Bloom()
            
            this.scene.background = this.resources.items.backgroundTexture
        })
    }

    update(){
        
        if(this.earth)
            this.earth.update()
        if(this.screens)
            this.screens.update()
        if(this.effects)
            this.effects.update()
        if(this.floating)
            this.floating.update() 
        if(this.smoke)
            this.smoke.update()
        if(this.bloom)
            this.bloom.update()
        
    }
}