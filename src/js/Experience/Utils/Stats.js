import StatsJs from 'stats.js'

export default class Stats{

    constructor(isActivate){

        this.instance = new StatsJs()
        this.instance.showPanel(2)

        if(isActivate == true){
            this.activate()
        }
    }

    activate(){

        this.active = true
        document.body.appendChild(this.instance.dom)
    }

    deactivate(){

        this.active = false
        document.body.removeChild(this.instance.dom)
    }

    update(){

        this.instance.update()

    }
}