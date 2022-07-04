import './css/style.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import backgroundVertexShader from './shaders/test/backgroundVertex.glsl'
import backgroundFragmentShader from './shaders/test/backgroundFragment.glsl'
import weirdVertexShader from './shaders/test/weirdVertex.glsl'
import weirdFragmentShader from './shaders/test/weirdFragment.glsl'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const particleTexture = textureLoader.load('/textures/particles/window.png')


// Light
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
// scene.add(ambientLight)

// const directionalLight = new THREE.DirectionalLight(0xffffff,1.5)
// directionalLight.position.set( 5, 5, 3.5 )
// scene.add(directionalLight)

// Particles Geometry
const particlesGeometry = new THREE.BufferGeometry()
const count = 1000

const positions = new Float32Array(count * 3)

for(let i=0;i<count;i++){
    positions[i] = Math.random() * 4.5
}

particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions,3)
)

// Particles Material
const particlesMaterial = new THREE.PointsMaterial({
    size:0.05,
    map:particleTexture,
    transparent:true,
    alphaMap:particleTexture,
    alphaTest:0.001,
    blending:THREE.AdditiveBlending,
    vertexColors:false,
})

// Particles
const particles = new THREE.Points(particlesGeometry,particlesMaterial)
// scene.add(particles)

// background
const background = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1,32,32),
    new THREE.ShaderMaterial({
        vertexShader: backgroundVertexShader,
        fragmentShader : backgroundFragmentShader,
        blending:THREE.AdditiveBlending,
        side:THREE.DoubleSide,
        uniforms:{
            uTime:{value:0},
            random:{value: 0.2},
        },
    })
)
background.position.set(2,2,0)
background.scale.set(30,25,0)
scene.add(background)

// weird
const weird = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1,32,32),
    new THREE.ShaderMaterial({
        vertexShader: weirdVertexShader,
        fragmentShader: weirdFragmentShader,
        blending:THREE.AdditiveBlending,
        side:THREE.DoubleSide,
        uniforms:{
            uTime:{value:0},
            random:{value: 0.2},
        },
    })
)
weird.position.set(2,7,0)
weird.scale.set(10,10,0)
// scene.add(weird)

gui.add(weird.position, 'x').min(- 10).max(10).step(0.001)
gui.add(weird.position, 'y').min(- 10).max(10).step(0.001)
gui.add(weird.position, 'z').min(- 10).max(10).step(0.001)
gui.add(weird.material.uniforms.random, 'value').min(0).max(100).step(0.1)

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
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 2
camera.position.y = 3
camera.position.z = 10
scene.add(camera)

gui.add(camera.position, 'x').min(- 10).max(10).step(0.001)
gui.add(camera.position, 'y').min(- 10).max(10).step(0.001)
gui.add(camera.position, 'z').min(- 10).max(10).step(0.001)

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

        if(event.target.id != '0'){
            $(".text").stop().animate({'opacity': 0}, 1500)
            // $('#0').animate({'opacity': 0.5},1000)

            const clickFunction = () => {
                const clickTime = clickClock.getElapsedTime()
                camera.position.z = 10 - clickTime * 5
            
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
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    background.material.uniforms.uTime.value = elapsedTime

    weird.material.uniforms.uTime.value = elapsedTime

    // Update controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'lil-gui'
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
// import vertexShader from './shaders/test/vertex.glsl'
// import fragmentShader from './shaders/test/fragment.glsl'
// import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
// import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js'

// /**
//  * Base
//  */
// // Debug
// const gui = new dat.GUI()

// // Canvas
// const canvas = document.querySelector('canvas.webgl')

// // Scene
// const scene = new THREE.Scene()

// /**
//  * Textures
//  */
// const textureLoader = new THREE.TextureLoader()

// const earthColorTexture = textureLoader.load('/textures/earth/earthMap.jpeg')
// const earthBumpTexture = textureLoader.load('/textures/earth/earthbump.jpeg')
// const earthCloudTexture = textureLoader.load('textures/earth/earthCloud.png')

// const galaxyTexture = textureLoader.load('textures/earth/galaxy.png')

// const matcapTexture = textureLoader.load('/textures/matcaps/2.png')

// const rocketColorTexture = textureLoader.load('/textures/rocket/color.png')
// const rocketMetalnessTexture = textureLoader.load('/textures/rocket/metalness.png')
// const rocketRoughnessTexture = textureLoader.load('/textures/rocket/roughness.png')
// const rocketNormalTexture = textureLoader.load('/textures/rocket/normal.png')

// // Globe
// const globe = new THREE.Group()
// scene.add(globe)

// // Geometry

// const geometry = new THREE.SphereGeometry(1.5,32,32)

// // Material

// const material = new THREE.MeshPhongMaterial({
//     map: earthColorTexture,
//     bumpMap: earthBumpTexture,
//     bumpScale:0.2,
// })

// const earth = new THREE.Mesh(geometry,material)

// globe.add(earth)

// const atmosphere = new THREE.Mesh(
//     new THREE.SphereGeometry(1.5,32,32),
//     new THREE.ShaderMaterial({
//         vertexShader,
//         fragmentShader,
//         blending:THREE.AdditiveBlending,
//         side:THREE.BackSide,
//     })
// )
// atmosphere.scale.set(1.05,1.05,1.05)
// atmosphere.position.set(3.6,1,-0.3)
// atmosphere.rotation.z = Math.PI
// scene.add(atmosphere)

// gui.add(atmosphere.position, 'x').min(- 10).max(10).step(0.001)
// gui.add(atmosphere.position, 'y').min(- 10).max(10).step(0.001)
// gui.add(atmosphere.position, 'z').min(- 10).max(10).step(0.001)

// // CloudGeometry
// const cloudGeometry = new THREE.SphereGeometry(1.52, 32, 32)

// // CloudMaterial

// const cloudMaterial = new THREE.MeshPhongMaterial({
//     map: earthCloudTexture,
//     transparent: true,
// })

// const cloud = new THREE.Mesh(cloudGeometry,cloudMaterial)
// globe.add(cloud)

// globe.position.set(3.5,1,-0.5)
// globe.rotation.z = (Math.PI / 4)


// // Light
// const earthLight = new THREE.PointLight('white',-1,20)
// earthLight.position.set(-6.5,10,-5)
// scene.add(earthLight)

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
// scene.add(ambientLight)

// const directionalLight = new THREE.DirectionalLight(0xffffff,1.5)
// directionalLight.position.set( 5, 5, 3.5 )
// scene.add(directionalLight)


// // const parameters = {
// //     color: 0xff0000
// // }

// // gui.add(directionalLight.position, 'z').min(- 10).max(10).step(0.001)
// // gui.add(directionalLight.position, 'x').min(- 10).max(10).step(0.001)
// // gui.add(directionalLight.position, 'y').min(- 10).max(10).step(0.001)
// // gui.add(directionalLight, 'intensity').min(- 10).max(10).step(0.001)
// // gui
// //     .addColor(parameters, 'color')
// //     .name('directColor')
// //     .onChange(() =>
// //     {
// //         directionalLight.color.set(parameters.color)
// //     })

// // gui.add(earthLight.position, 'z').min(- 20).max(20).step(0.001)
// // gui.add(earthLight.position, 'x').min(- 20).max(20).step(0.001)
// // gui.add(earthLight.position, 'y').min(- 20).max(20).step(0.001)
// // gui.add(earthLight, 'intensity').min(- 20).max(20).step(0.001)
// // gui.add(ambientLight, 'intensity').min(- 20).max(20).step(0.001)

// /**
//  * Fonts
//  */
// // const fontLoader = new FontLoader()
// // const text_array = ['Welcome']

// //  fontLoader.load(
// //      '/fonts/helvetiker_regular.typeface.json',
// //      (font) =>
// //      {
// //         for(let i=0;i<text_array.length;i++){
// //             const textGeometry = new TextGeometry(
// //                 text_array[i],
// //                 {
// //                     font: font,
// //                     size: 2,
// //                     height: 0.2,
// //                     curveSegments:5,
// //                     bevelEnabled: true,
// //                     bevelThickness:0.03,
// //                     bevelSize:0.02,
// //                     bevelOffset:0,
// //                     bevelSegments:4,

// //                 }
// //             )
// //             textGeometry.center()
// //             const material = new THREE.MeshMatcapMaterial({matcap: matcapTexture})
// //             const text = new THREE.Mesh(textGeometry,material)
// //             // text.position.x = 1.5 * Math.sin(i * (Math.PI/2))
// //             // text.rotation.y = i * (Math.PI / 2)
// //             // text.position.z = 1.65 * Math.cos(i * (Math.PI/2))
// //             text.position.x = 0
// //             text.position.y = 5.5
// //             text.position.z = -5
// //             text.rotation.y = Math.PI / 20
// //             // scene.add(text)
// //         }
// //     }
// //  )

// // galaxy geometry
// const galaxyGeometry = new THREE.SphereGeometry(80, 64, 64)

// // galaxy material
// const galaxyMaterial = new THREE.MeshBasicMaterial({
//     map : galaxyTexture,
//     side: THREE.BackSide
// })


// // galaxy mesh
// const galaxy = new THREE.Mesh(galaxyGeometry, galaxyMaterial)
// scene.add(galaxy)

// // Particles Geometry
// // const particlesGeometry = new THREE.BufferGeometry()
// // const count = 10000

// // const positions = new Float32Array(count * 3)

// // for(let i=0;i<count;i++){
// //     positions[i] = Math.random() * 4.5
// // }

// // particlesGeometry.setAttribute(
// //     'position',
// //     new THREE.BufferAttribute(positions,3)
// // )

// // // Particles Material
// // const particlesMaterial = new THREE.PointsMaterial({
// //     // size:0.02,
// //     map:particleTexture,
// //     transparent:true,
// //     alphaMap:particleTexture,
// //     alphaTest:0.001,
// //     blending:THREE.AdditiveBlending,
// //     vertexColors:false,
// // })

// // // Particles
// // const particles = new THREE.Points(particlesGeometry,particlesMaterial)
// // // scene.add(particles)

// // particles.position.x = -2
// // particles.position.y = -2
// // particles.position.z = -1

// // Rocket

// // let gltfLoader = new GLTFLoader()
// // const new_mat = new THREE.MeshStandardMaterial()

// // gltfLoader.load(
// //     '/models/scene.gltf',
// //     (gltf) =>
// //     {
// //         for(const child of gltf.scene.children)
// //         {
// //             child.material = new_mat
// //             child.material.map = rocketColorTexture
// //             child.material.metalness = 0.6
// //         }
// //         scene.add(gltf.scene)
// //     }
// // )

// let loader = new OBJLoader()
// const new_material = new THREE.MeshStandardMaterial()

// loader.setPath('/models/')
// loader.load( 'Rocket.obj',
//   (rocket) => {
//     rocket.traverse(child => {
//         if(child instanceof THREE.Mesh){
//             child.material = new_material
//             child.material.map = rocketColorTexture
//             child.material.metalness = 0.6
//             // child.material.metalnessMap = rocketMetalnessTexture
//             child.material.roughness = 0.2
//             // child.material.normalMap = rocketNormalTexture
//             // child.material.normalScale = new THREE.Vector2(0.5,0.5)
//         }
//     })
//     rocket.position.x = -5
//     rocket.position.y = -4.5
//     rocket.rotation.z = - Math.PI / 8
//     rocket.scale.set(0.04,0.04,0.04)
//     scene.add(rocket)

//     const rocketFloatClock = new THREE.Clock()
    
//     const rotateRocket = () => {

//         const rocketFloatTime = rocketFloatClock.getElapsedTime()
//         rocket.position.x = -5 + (Math.sin((rocketFloatTime) / 10))
//         rocket.position.y = -4.5 + (Math.sin(rocketFloatTime) / 10) 

//         window.requestAnimationFrame(rotateRocket)
//     }
//     rotateRocket()

//     const rocketClock = new THREE.Clock({
//         autoStart: false,
//     })

//     startBtn.addEventListener('click',() => {
//         const rocketMove = () => {
//             const rocketTime = rocketClock.getElapsedTime()
//             if(rocketTime < 5){
//                 rocket.position.x = -5 + (Math.sin((rocketTime / 4)) * 9)
//                 rocket.position.y = -4.5 + (Math.sin(rocketTime / 1.8) * 8)
//                 rocket.position.z = 0 + (rocketTime / 3)

//                 if(rocketTime < 3){
//                     rocket.rotateOnAxis(new THREE.Vector3(-1,0,-1),rocketTime / 500)
//                     // rocket.rotateOnAxis(new THREE.Vector3(-1,0,-1),0.001)
//                 }
//                 else{
//                     rocket.rotateOnAxis(new THREE.Vector3(-1,0,-1),0.002)
//                 }
//             }
//             // const rocketScale = 0.04 - ((1/rocketTime) / 100)
//             const rocketScale = -0.96 + Math.pow(0.9902,rocketTime)
//             if(rocket.scale.x > 0){
//                 rocket.scale.set(rocketScale,rocketScale,rocketScale)
//             }
//             else{
//                 rocket.scale.set(0,0,0)
//             }

//             window.requestAnimationFrame(rocketMove)
//         }
//         rocketMove()
//     })
//   }
// )

// /**
//  * Sizes
//  */
// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }

// window.addEventListener('resize', () =>
// {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.x = 0.3
// camera.position.y = 0.5
// camera.position.z = 5.5
// scene.add(camera)

// // Change Camera Position
// const startBtn = document.getElementById('start-button')
// const clickClock = new THREE.Clock({
//     autoStart: false,
// })

// startBtn.addEventListener('click',() => {
//     startBtn.style.display = 'none'
//     const delayTime = 2.5
//     const cameraMove = () => {
//         const countTime = clickClock.getElapsedTime()
        
//         if(countTime > delayTime && countTime < delayTime + 2){
//             camera.position.x = 0.3 + countTime - delayTime
//             camera.position.y = 0.5 + (countTime - delayTime) / 2
//             camera.position.z = 5.5 + (countTime - delayTime) / 2
//             camera.rotation.y = - Math.sin((countTime - delayTime) / 7)
//             globe.rotateOnAxis(new THREE.Vector3(1,1,0), (Math.abs(Math.cos((countTime - delayTime) / 3) / 850)))
//             atmosphere.position.set(3.6 - (countTime - delayTime) / 100 , 1 - (countTime - delayTime) / 40, -0.3 + (countTime - delayTime) / 50)
//             atmosphere.rotateOnAxis(new THREE.Vector3(0,-1,0),(countTime - delayTime) / 850)
//             galaxy.rotateOnAxis(new THREE.Vector3(0,1,0),(Math.abs(Math.cos((countTime - delayTime) / 2) / 800)))
//         }
//         else if(countTime > delayTime + 2 && countTime < delayTime + 2.35){
//             camera.position.x = camera.position.x + (countTime - delayTime) / 100
//             camera.position.z = camera.position.z - (Math.pow((countTime - delayTime),4)) / 130
//         }
//         else if(countTime > delayTime + 2.35){
//             window.location.pathname = "/home.html"
//         }

//         window.requestAnimationFrame(cameraMove)
//     }
//     cameraMove()
// })

// // Controls
// // const controls = new OrbitControls(camera, canvas)
// // controls.enableDamping = true

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas
// })
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// /**
//  * Animate
//  */
// const clock = new THREE.Clock()

// const tick = () =>
// {
//     const elapsedTime = clock.getElapsedTime()

//     globe.rotateOnAxis(new THREE.Vector3(0,1,0),-0.0003)

//     cloud.rotateOnAxis(new THREE.Vector3(0,1,0),-0.0002)

//     galaxy.rotateOnAxis(new THREE.Vector3(0,1,0),-0.00005)

//     // Update controls
//     // controls.update()

//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()
