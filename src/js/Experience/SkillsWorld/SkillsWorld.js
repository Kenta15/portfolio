import Texts from './Texts.js'
import RayCaster from './RayCater.js'

export default class SkillsWorld{

    constructor(){

        this.texts = new Texts()
        this.rayCaster = new RayCaster()
    }

    update(){

        if(this.texts)
            this.texts.update()
        
    }
}