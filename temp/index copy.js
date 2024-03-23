import * as THREE from 'three';
import * as THREEx from '../node_modules/@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js';



function main() {
    const canvas = document.getElementById('canvas1');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const scene = new THREE.Scene();
    //const camera = new THREE.PerspectiveCamera(60, 1.33, 0.1, 10000);
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    const renderer = new THREE.WebGLRenderer({canvas: canvas});

    const arjs = new THREEx.LocationBased(scene, camera);
    const cam = new THREEx.WebcamRenderer(renderer);

    const geom = new THREE.BoxGeometry(20, 20, 20);
    const mtl = new THREE.MeshBasicMaterial({color: 0xff0000});
    const box = new THREE.Mesh(geom, mtl);

    // Create the device orientation tracker
    const deviceOrientationControls = new THREEx.DeviceOrientationControls(camera, true);

    arjs.add(box, 14658394., 0.5); 

    arjs.startGps();

    requestAnimationFrame(render);

    let isfirst = 0;

    function render() {
        if(canvas.width != canvas.clientWidth || canvas.height != canvas.clientHeight) {
            renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
            const aspect = canvas.clientWidth/canvas.clientHeight;
            camera.aspect = aspect;
            camera.updateProjectionMatrix();
        }

        

        // Update the scene using the latest sensor readings
        deviceOrientationControls.update();
        /*
        const onDeviceOrientationChange = (event) => {
            deviceOrientationControls.update(event.alpha, event.beta, event.gamma);
            console.log("kita")
        };
        window.addEventListener("deviceorientation", onDeviceOrientationChange);*/
        console.log(camera.position);
        cam.update();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
}

main();