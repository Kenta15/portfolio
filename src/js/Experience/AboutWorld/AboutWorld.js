import Wave from './Wave.js'

import Experience from '../Experience.js'

export default class AboutWorld{

    constructor(){

        this.experience = new Experience()
        this.time = this.experience.time

        // this.wave = new Wave()
    }

    update(){

        // if(this.wave)
        //     this.wave.update()
    }
}