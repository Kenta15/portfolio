import {Pane} from 'tweakpane'

export default class Debug{

    constructor(isActivate){

        this.pane = new Pane()

        if(isActivate != true)
            this.pane.dispose()
    }

}