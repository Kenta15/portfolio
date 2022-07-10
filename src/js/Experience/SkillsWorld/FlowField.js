import * as THREE from 'three'
import flowFieldVertexShader from '../shaders/flowField/flowFieldVertex.glsl'
import flowFieldFragmentShader from '../shaders/flowField/flowFieldFragment.glsl'

import Experience from '../Experience'

export default class FlowField{

    constructor(count){

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.sizes = this.experience.sizes
        this.renderer = this.experience.renderer

        this.count = count
        this.width = 4096
        this.height = Math.ceil(this.count / this.width) // Math.ceil(value): returns minimum integer above value
        // this.texture = null
        // this.seed = Math.random() * 1000

        this.setBaseTexture()
        this.setRenderTargets()
        this.setEnvironment()
        this.setGeometry()
        this.setMaterial()
        this.setMesh()
        this.setDebugPlane()

    }

    setBaseTexture()
    {
        const size = this.width * this.height
        const data = new Float32Array(size * 3)

        for(let i = 0; i < size; i++)
        {
            data[i * 3 + 0] = Math.random()
            data[i * 3 + 1] = Math.random()
            data[i * 3 + 2] = Math.random()
        }

        this.baseTexture = new THREE.DataTexture(
            data,
            this.width,
            this.height,
            THREE.RGBAFormat,
            THREE.FloatType
        )
        this.baseTexture.minFilter = THREE.NearestFilter
        this.baseTexture.magFilter = THREE.NearestFilter
        this.baseTexture.generateMipmaps = false

    }

    setRenderTargets(){
        this.renderTargets = {}
        this.renderTargets.a = new THREE.WebGLRenderTarget(
            this.width,
            this.height,
            {
                minFilter: THREE.NearestFilter,
                magFilter: THREE.NearestFilter,
                generateMipmaps: false,
                format: THREE.RGBAFormat,
                type: THREE.FloatType,
                encoding: THREE.LinearEncoding,
                depthBuffer: false,
                stencilBuffer: false,
            }
        )
        this.renderTargets.b = this.renderTargets.a.clone()
        this.renderTargets.primary = this.renderTargets.a
        this.renderTargets.secondary = this.renderTargets.b
    }

    setEnvironment()
    {
        this.environment = {}

        this.environment.scene = new THREE.Scene()
        this.environment.camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10)
        this.environment.camera.position.z = 30
    }

    setGeometry(){

        this.geometry = new THREE.PlaneGeometry(1,1,1,1)
    }

    setMaterial(){

        this.material = new THREE.ShaderMaterial({
            vertexShader: flowFieldVertexShader,
            fragmentShader: flowFieldFragmentShader,
            uniforms:{
                uBaseTexture:{value:this.baseTexture},
                uTexture:{value:null},
            }

        })
    }

    setMesh(){

        this.field = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.field)
    }

    setDebugPlane()
    {
        this.debugPlane = {}

        // Geometry
        this.debugPlane.geometry = new THREE.PlaneGeometry(1, this.height / this.width, 1, 1)

        // Material
        this.debugPlane.material = new THREE.MeshBasicMaterial({ transparent: true })

        // Mesh
        this.debugPlane.mesh = new THREE.Mesh(this.debugPlane.geometry, this.debugPlane.material)
        // this.debugPlane.mesh.visible = false
        this.scene.add(this.debugPlane.mesh)
        
        // Debug
        if(this.debug)
        {
            this.debugFolder
                .addInput(
                    this.debugPlane.mesh,
                    'visible',
                    { label: 'debugPlaneVisible' }
                )
        }
    }


    update(){
        this.renderer.instance.setRenderTarget(this.renderTargets.primary)
        this.renderer.instance.render(this.environment.scene, this.environment.camera)
        this.renderer.instance.setRenderTarget(null)

        const temp = this.renderTargets.primary
        this.renderTargets.primary = this.renderTargets.secondary
        this.renderTargets.secondary = temp

        this.debugPlane.material.map = this.renderTargets.secondary.texture
    }
}