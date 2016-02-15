var THREE = require('three');
import Stats from './stats';

var stats = new Stats();
document.body.appendChild(stats.domElement);

// global variables

var scene, camera, renderer, initialized = false;

let initialize = () => {

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    scene = new THREE.Scene();
    // create a camera, which defines where we're looking at.
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // create a render, sets the background color and the size
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // add the output of the renderer to the html element
    document.body.appendChild(renderer.domElement);
    // create a cube and add to scene
    var cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
    var cubeMaterial = new THREE.MeshNormalMaterial();
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.name = 'cube';
    scene.add(cube);
    // position and point the camera to the center of the scene
    camera.position.x = 15;
    camera.position.y = 16;
    camera.position.z = 13;
    camera.lookAt(scene.position);

    // call the render function
    !initialized && (() => {
        initialized = true;
        render();
    })();
};

function render() {
    renderer.render(scene, camera);
    scene.getObjectByName('cube').rotation.x += 0.05;
    scene.getObjectByName('cube').rotation.y += 0.05;
    scene.getObjectByName('cube').rotation.z += 0.05;
    requestAnimationFrame(render);
    stats.update();
}

// calls the init function when the window is done loading.
window.onload = window.onresize = initialize;
