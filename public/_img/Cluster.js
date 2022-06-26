

var container, scene, camera, renderer, group, particle;

var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
  
  container = document.createElement('div');
  document.body.appendChild(container);

  
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x000000 ); //000000 is set to transparent



  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 650;
  scene.add(camera);

  var light = new THREE.PointLight(0xff0f0f, 1);
  camera.add(light);
  var light2 = new THREE.PointLight(0xff90ff, 1);
  light2.position.y = 500;
  light2.position.x = 100;
  camera.add(light2);

  group = new THREE.Group();
  group.position.y = -50;
  scene.add(group);

//Particles
particle = new THREE.Object3D();
scene.add(particle);

var geometry = new THREE.TetrahedronGeometry(2, 0);
var material = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  shading: THREE.FlatShading
});

for (var i = 0; i < 1000; i++) {
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
  mesh.position.multiplyScalar(190 + (Math.random() * 350));
  mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  particle.add(mesh);
}


  function addShape(shape, extrudeSettings, color, x, y, z, rx, ry, rz, s) {
    var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    var meshMaterial = new THREE.MeshPhongMaterial({
      color     : 0x0683fb,
      emissive  : 0x283681,
      specular  : 0xFF900F,
      shading   :  THREE.FlatShading,
      shininess : 25,
      transparent: 1,
      opacity:  0.85
    });
    var mesh = new THREE.Mesh(geometry, meshMaterial);

    mesh.position.set(x, y, z);
    mesh.rotation.set(rx, ry, rz);
    mesh.scale.set(s, s, s);
    group.add(mesh);
  }

  var hexShape = new THREE.Shape();
  hexShape.moveTo(0, 0.8);
  hexShape.lineTo(0.4, 0.5);
  hexShape.lineTo(0.3, 0);
  hexShape.lineTo(-0.3, 0);
  hexShape.lineTo(-0.4, 0.5);
  hexShape.lineTo(0, 0.8);

  var numberOfCrystals = 100;
  for (i = 0; i < numberOfCrystals; i++) {
    var extrudeSettings = {
      amount: Math.random() * 200,
      bevelEnabled: true,
      bevelSegments: 1,
      steps: 1,
      bevelSize: (Math.random() * 10) + 15,
      bevelThickness: (Math.random() * 10) + 25
    };

    addShape(
      hexShape,
      extrudeSettings,
      0xff3333, // color
      0, // x pos
      0, // y pos
      0, // z pos
      Math.random() * 2 * Math.PI, // x rotation
      Math.random() * 2 * Math.PI, // y rotation
      Math.random() * 2 * Math.PI, // z rotation
      1
    );
  }

  //Define the renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true, alpha: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  /*
  document.addEventListener('mousedown', onDocumentMouseDown, false);
  document.addEventListener('touchstart', onDocumentTouchStart, false);
  document.addEventListener('touchmove', onDocumentTouchMove, false);
*/
  window.addEventListener('resize', onWindowResize, false);
}
/*
function onDocumentMouseDown(event) {
  event.preventDefault();
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  document.addEventListener('mouseup', onDocumentMouseUp, false);
  document.addEventListener('mouseout', onDocumentMouseOut, false);
  mouseXOnMouseDown = event.clientX - windowHalfX;
  targetRotationOnMouseDown = targetRotation;
}

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.02;
}

function onDocumentMouseUp(event) {
  document.removeEventListener('mousemove', onDocumentMouseMove, false);
  document.removeEventListener('mouseup', onDocumentMouseUp, false);
  document.removeEventListener('mouseout', onDocumentMouseOut, false);
}

function onDocumentMouseOut(event) {
  document.removeEventListener('mousemove', onDocumentMouseMove, false);
  document.removeEventListener('mouseup', onDocumentMouseUp, false);
  document.removeEventListener('mouseout', onDocumentMouseOut, false);
}

function onDocumentTouchStart(event) {
  if (event.touches.length == 1) {
    event.preventDefault();
    mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
    targetRotationOnMouseDown = targetRotation;
  }
}


function onDocumentTouchMove(event) {
  if (event.touches.length == 1) {
    event.preventDefault();
    mouseX = event.touches[0].pageX - windowHalfX;
    targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.05;
  }
}
*/

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  targetRotation += 0.01;
  particle.rotation.y -= 0.0040;
  requestAnimationFrame(animate);
  render();
}

function render() {
  group.rotation.y += ( targetRotation - group.rotation.y ) * 0.05;
  
  renderer.render(scene, camera);
}