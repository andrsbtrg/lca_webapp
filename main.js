import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TorusBufferGeometry } from 'three';
import { PointLight } from 'three';

const scene = new THREE.Scene();

let aspectratio = window.innerWidth/window.innerHeight;

const camera = new THREE.PerspectiveCamera(75, aspectratio, 0.1 , 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render (scene, camera)


const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshToonMaterial({color: 0xFF6347, wireframe: false});

const torus = new THREE.Mesh(geometry,material)

scene.add(torus);

const ambientLight = new THREE.AmbientLight(0xffffff);
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);
scene.add(ambientLight,pointLight);

const lighthelper = new THREE.PointLightHelper(pointLight);
const gridhelper = new THREE.GridHelper(200, 50);
scene.add(lighthelper, gridhelper);

// Create controls after importing from three samples
const controls = new OrbitControls(camera, renderer.domElement);

//  Create random geometry

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff})
  const star = new THREE.Mesh( geometry, material);

  let range_stars = 200
  const [x,y,z] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread(range_stars));
  star.position.set(x,y,z);
  scene.add(star);
}
let num_stars = 200
Array(num_stars).fill().forEach(addStar);


// Game loop
function animate(){
  requestAnimationFrame(animate);

  torus.rotateX(0.01);
  torus.rotateY(0.01);
  torus.rotateZ(0.01);
  // add listener to controls every frame
  controls.update();

  renderer.render(scene, camera);

}

animate()