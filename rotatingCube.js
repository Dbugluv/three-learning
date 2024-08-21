import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
	
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 5 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const geometry = new THREE.BoxGeometry( 1, 1, 1 ); // boxWidth, boxHeight, boxDepth
// const material = new THREE.MeshPhongMaterial( { color: '#EF8ABD' } );
// const cube = new THREE.Mesh( geometry, material );
camera.position.z = 3;
// scene.add( cube );

function makeInstance(geomerty, color, x) {
  const material = new THREE.MeshPhongMaterial({color});
  const cube = new THREE.Mesh(geomerty, material);
  scene.add(cube);

  cube.position.x = x;
  return cube;
}

const cubes = [
  makeInstance(geometry, 0x44aa88,  2),
  makeInstance(geometry, '#EF8ABD',  -2),
  makeInstance(geometry, 0x8844aa, 0),
];


const intensity = 3;
const light = new THREE.DirectionalLight( 0xFFFFFF, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

// function animate() {
// 	requestAnimationFrame( animate );
//   cubes.forEach((cube) => {
//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;
//   });
// 	renderer.render( scene, camera );
// }

function render( time ) {

  time *= 0.001; // convert time to seconds
  cubes.forEach( ( cube, ndx ) => {

    const speed = 1 + ndx * .1;
    const rot = time * speed;
    cube.rotation.x = rot;
    cube.rotation.y = rot;

  } );

  renderer.render( scene, camera );

  requestAnimationFrame( render );

}



if ( WebGL.isWebGL2Available() ) {
	// Initiate function or other initializations here
  // animate()
  requestAnimationFrame( render );

} else {
	const warning = WebGL.getWebGL2ErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );
	
}
