import Wave from './Wave.js'
import Terminal from './Terminal.js'

import Experience from '../Experience.js'

export default class AboutWorld{

    constructor(){

        this.experience = new Experience()
        this.resources = this.experience.resources


        this.wave = new Wave()
        this.terminal = new Terminal()
    }

    update(){

        if(this.wave)
            this.wave.update()

        if(this.terminal)
            this.terminal.update()
    }
}