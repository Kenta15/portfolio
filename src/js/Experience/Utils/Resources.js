import EventEmitter from './EventEmitter'

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js'
import {TextureLoader} from 'three'

export default class Resources extends EventEmitter{
    
    constructor(sources){

        super()

        this.sources = sources

        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
        
    }

    setLoaders(){

        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.dracoLoader = new DRACOLoader()
        this.loaders.textureLoader = new TextureLoader()
    }

    startLoading(){

        for(const source of this.sources){
            if(source.type == 'texture'){
                this.loaders.textureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    sourceLoaded(source, file){

        this.items[source.name] = file

        this.loaded++

        if(this.loaded == this.toLoad){
            this.trigger('ready')
        }
    }
}