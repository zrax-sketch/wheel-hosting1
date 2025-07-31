
import * as THREE from 'https://unpkg.com/three@0.150.1/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.150.1/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);

const loader = new GLTFLoader();
let wheel;

loader.load('https://zrax-sketch.github.io/wheel-hosting1/wheel.glb', (gltf) => {
  wheel = gltf.scene;
  wheel.scale.set(1.5, 1.5, 1.5);
  wheel.position.set(0, 0, 0);
  scene.add(wheel);
}, undefined, (error) => {
  console.error('Failed to load model:', error);
});

function animate() {
  requestAnimationFrame(animate);

  if (wheel) {
    const scrollY = window.scrollY || window.pageYOffset;
    wheel.rotation.y = scrollY * 0.002;
    wheel.rotation.x = 0.1 + Math.sin(scrollY * 0.002) * 0.05;
  }

  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
