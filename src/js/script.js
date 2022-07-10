import '../css/style.css'
import * as dat from 'lil-gui'
import Experience from './Experience/Experience.js'
import Animations from './animationExport.js'

/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

class Script extends Animations{

    constructor(index){

        super(index)
        
        this.experience = new Experience(document.querySelector('canvas.webgl'))
        this.camera = this.experience.camera

        this.animations()
    }

    animations(){

            $(function(){
                $("#0").stop().animate({'opacity': 1}, 1000);
            })
            
            // Page Transition
            $(function(){
                $('body').animate({'opacity': 1}, 2500);
            });
            
            setTimeout(function(){
                $('.text').animate({'opacity': 1 , 'font-size': '10vw'}, 2000);
            }, 4000);
            
            setTimeout(function(){
                $('#0').animate({'opacity': 0.5}, 1000);
            }, 1000);
            setTimeout(function(){
                $('#I').animate({'opacity': 0.5}, 1000);
            }, 1500);
            setTimeout(function(){
                $('#II').animate({'opacity': 0.5}, 1000);
            }, 2000);
            setTimeout(function(){
                $('#III').animate({'opacity': 0.5}, 1000);
            }, 2500);
            setTimeout(function(){
                $('#IV').animate({'opacity': 0.5}, 1000);
            }, 3000);
            setTimeout(function(){
                $('#V').animate({'opacity': 0.5},1000);
            }, 3500);
            setTimeout(function(){
                $('#0').animate({'opacity': 1},1000);
            }, 4500);
        }
    
        customClickAnimation(){
            $(".text").stop().animate({'opacity': 0}, 1000)
        }
    
        threeTransition(clickTime){
            this.camera.instance.position.z = 10 - clickTime * 5
        }

}
const script = new Script("0")


/**
 * Textures
 */
// const textureLoader = new THREE.TextureLoader()

// const particleTexture = textureLoader.load('/textures/particles/window.png')

// weird
// const weird = new THREE.Mesh(
//     new THREE.PlaneGeometry(1,1,32,32),
//     new THREE.ShaderMaterial({
//         vertexShader: weirdVertexShader,
//         fragmentShader: weirdFragmentShader,
//         blending:THREE.AdditiveBlending,
//         side:THREE.DoubleSide,
//         uniforms:{
//             uTime:{value:0},
//             random:{value: 0.2},
//         },
//     })
// )
// weird.position.set(2,7,0)
// weird.scale.set(10,10,0)
// scene.add(weird)


// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true



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
