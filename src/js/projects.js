import './css/projects.css'
import './css/header.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js'
import particlesVertexShader from './shaders/test/particlesVertex.glsl'
import particlesFragmentShader from './shaders/test/particlesFragment.glsl'
import sphereVertexShader from './shaders/test/sphereVertex.glsl'
import sphereFragmentShader from './shaders/test/sphereFragment.glsl'
import { mergeWithCustomize } from 'webpack-merge'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js'

/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const particleTexture = textureLoader.load('/textures/particles/circle.png')
const flagTexture = textureLoader.load('/textures/JapaneseFlag.png')


// particles
const parameters = {}
parameters.count = 50000
parameters.radius = 6
parameters.randomness = 5
parameters.insideColor = '#ff6030'
parameters.outsideColor = '#1b3984'

let geometry = null
let material = null
let points = null

const generateGalaxy = () =>
{
    /**
     * Geometry
     */
    geometry = new THREE.BufferGeometry()

    const positions = new Float32Array(parameters.count * 3)
    const scales = new Float32Array(parameters.count)

    for(let i = 0; i < parameters.count; i++)
    {
        const i3 = i * 3

        // Position
        const radius = Math.random() * parameters.radius

        const randomX = Math.random() * 2
        const randomY = Math.random() * 2
        const randomZ = Math.random() * 2

        positions[i3    ] = Math.cos(1) * radius + randomX
        positions[i3 + 1] = randomY
        positions[i3 + 2] = Math.sin(1) * radius + randomZ

        // Scale
        scales[i] = Math.random()
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    /**
     * Material
     */
    material = new THREE.ShaderMaterial({
        vertexShader:particlesVertexShader,
        fragmentShader:particlesFragmentShader,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        uniforms:{
            uTime:{value:0},
            uSize:{value:5 * renderer.getPixelRatio()},
            texture:{value:particleTexture},
            alpha:{value:0},
        }
    })

    /**
     * Points
     */
    points = new THREE.Points(geometry, material)
    scene.add(points)
}

//

// Projects Group
const projects = new THREE.Group()
scene.add(projects)

// Sphere Material
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1.5,32,32),
    new THREE.ShaderMaterial({
        vertexShader:sphereVertexShader,
        fragmentShader: sphereFragmentShader,
        blending:THREE.AdditiveBlending,
        uniforms:{
            uTime:{value:0},
            alpha:{value:0},
        }
    })
)
projects.add(sphere)

// Projects screens
const screens = new THREE.Group()
projects.add(screens)

const projectsList = ['ecommerce', 'movie', 'portfolio', 'animated']
for(let i=0;i<projectsList.length;i++){

    const gltfLoader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath( '/examples/js/libs/draco/' )
    gltfLoader.setDRACOLoader( dracoLoader )

    gltfLoader.load(
        '/models/' + projectsList[i] + '.glb',
        (gltf) =>
        {
            gltf.scene.position.x = 2.1 * Math.sin(i * (Math.PI/2))
            gltf.scene.position.y = - 1.0
            gltf.scene.position.z = 2.1 * Math.cos(i * (Math.PI/2))

            gltf.scene.rotation.y = i * (Math.PI / 2) - Math.PI / 2
            gltf.scene.rotation.z = - Math.PI / 10

            gltf.scene.visible = false

            screens.add(gltf.scene)
        }
    )
}

screens.scale.set(1.3,1.3,1.3)
projects.scale.set(1.5,1.5,1.5)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Update effect composer
    effectComposer.setSize(sizes.width, sizes.height)
    effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Lights

const directionalLight = new THREE.DirectionalLight(0xffffff,1.5)
directionalLight.position.set( 5, 5, 3.5 )
scene.add(directionalLight)

// gui.add(directionalLight.position, 'x').min(- 20).max(20).step(0.001)
// gui.add(directionalLight.position, 'y').min(- 20).max(20).step(0.001)
// gui.add(directionalLight.position, 'z').min(- 20).max(20).step(0.001)

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 5.5
camera.position.y = 1
camera.position.z = 8
scene.add(camera)

// gui.add(camera.position, 'x').min(- 20).max(20).step(0.001)
// gui.add(camera.position, 'y').min(- 20).max(20).step(0.001)
// gui.add(camera.position, 'z').min(- 20).max(20).step(0.001)

// Transition
const clickClock = new THREE.Clock()

const icons = document.querySelectorAll('a')

const dict = {
    "0": "index",
    "I": "about",
    "II": "projects",
    "III": "skills",
    "IV": "education",
    "V": "contact",
}

icons.forEach(icon =>{ 
    icon.addEventListener('click', (event) => {

        if(event.target.id != 'II'){

            $('#ecommerce').css('display','none')
            $('#movie').css('display','none')
            $('#portfolio').css('display','none')
            $('#none').css('display','none')

            const clickFunction = () => {
                const clickTime = clickClock.getElapsedTime()
                
                $('.webgl').animate({'opacity':0}, 1000)

                window.requestAnimationFrame(clickFunction)
            }
            clickFunction()

            Object.entries(dict).forEach(([key,value]) =>{

                $('#' + key).animate({'opacity': 0},1000)
                $('#' + value).animate({'opacity': 0},1000)

                setTimeout(function(){
                    $('#' + key).css({"display": "none"})
                    $('#' + value).css({"display": "none"})
                },1000)
                
                $('#' + event.target.id).animate({'opacity': 0},1000)

                if(event.target.id == key){
                    setTimeout(myURL, 3000)
                    function myURL(){
                        window.location.href = value + '.html'
                    }
                }
            })
        }
    })
})


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// controls.addEventListener( "change", event => {  
//     console.log( controls.object.position )
// })

// window.addEventListener('mouseup',() => {
//     controls.reset()
// })

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// anti-aliasing
const renderTarget = new THREE.WebGLRenderTarget(
    800,
    600,
    {
        samples: renderer.getPixelRatio() === 1 ? 2 : 0
    }
)

// Generating Particles
generateGalaxy()

// Post Processing
const effectComposer = new EffectComposer(renderer)
effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
effectComposer.setSize(sizes.width, sizes.height)

// Render Pass
const renderPass = new RenderPass(scene,camera)
effectComposer.addPass(renderPass)

// Gilitch Pass
const glitchPass = new GlitchPass()
effectComposer.addPass(glitchPass)

// GammaCorrectionPass
const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader)
effectComposer.addPass(gammaCorrectionPass)

// SMAA Pass
if(renderer.getPixelRatio() === 1 && !renderer.capabilities.isWebGL2)
{
    const smaaPass = new SMAAPass()
    effectComposer.addPass(smaaPass)
}

// Raycaster instantiation
const raycaster = new THREE.Raycaster()
let currIntersect = null

// Cursor
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', event =>{
    cursor.x = event.clientX / sizes.width * 2 - 1
    cursor.y = - (event.clientY / sizes.height) * 2 + 1

    if(currIntersect){
        $('body').css('cursor', 'pointer')
    }
})

window.addEventListener('click', () => {
    if(currIntersect){
        if(currIntersect.object.id == 36){
            $('#ecommerce').stop().animate({'opacity': 0.8},1000)
            $('#movie').stop().animate({'opacity': 0},1000)
            $('#portfolio').stop().animate({'opacity': 0},1000)
            $('#none').stop().animate({'opacity': 0},1000)
        }
        else if(currIntersect.object.id == 33){
            $('#ecommerce').stop().animate({'opacity': 0},1000)
            $('#movie').stop().animate({'opacity': 0.8},1000)
            $('#portfolio').stop().animate({'opacity': 0},1000)
            $('#none').stop().animate({'opacity': 0},1000)
        }
        else if(currIntersect.object.id == 30){
            $('#ecommerce').stop().animate({'opacity': 0},1000)
            $('#movie').stop().animate({'opacity': 0},1000)
            $('#portfolio').stop().animate({'opacity': 0.8},1000)
            $('#none').stop().animate({'opacity': 0},1000)
        }
        else if(currIntersect.object.id == 27){
            $('#ecommerce').stop().animate({'opacity': 0},1000)
            $('#movie').stop().animate({'opacity': 0},1000)
            $('#portfolio').stop().animate({'opacity': 0},1000)
            $('#none').stop().animate({'opacity': 0.8},1000)
        }
    }
})

window.addEventListener('mouseout', () => {   

    if(!currIntersect){
        $('body').css('cursor', 'default')
    }
})

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Particle Opacity
    material.uniforms.uTime.value = elapsedTime
    material.uniforms.alpha.value = elapsedTime / 10

    // Partical Position
    points.position.x = elapsedTime * 7 * 0.13
    points.position.z = elapsedTime * 10 * 0.13

    // Post Processing Update
    glitchPass.enabled = false

    if(elapsedTime > 2.0 && elapsedTime < 4.8){
        glitchPass.enabled = true
    }
    else if(elapsedTime > 4.8 && elapsedTime < 6.0){
        glitchPass.enabled = true
        glitchPass.goWild = true
        sphere.material.uniforms.alpha.value = elapsedTime / 10
    }

    if(elapsedTime > 6.0 && elapsedTime < 6.01){
        for(let i = 0; i < projectsList.length; i++){
            screens.children[i].visible = true
        }
        scene.remove(points)

        camera.position.set(8.8,-3,-5)
    }

    // Projects Animation
    projects.rotateOnAxis(new THREE.Vector3(0,1,0), -0.001)

    // // Update controls
    controls.enabled = true
    controls.update()

    // if(elapsedTime < 6.0){
    //     controls.enabled = false
    // }

    // Render
    // renderer.render(scene, camera)
    effectComposer.render()

    // Ray Casting
    if(elapsedTime > 6.0){
        raycaster.setFromCamera(cursor, camera)
    
        const intersects = raycaster.intersectObjects(screens.children)
        
        if(intersects.length)
        {
            currIntersect = intersects[0]
        }
        else
        {
            currIntersect = null
        }
    }

    

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()