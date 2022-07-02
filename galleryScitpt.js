const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Toruss

// const geometry = new THREE.BoxGeometry(8, 8, 8, 5, 5, 5);
// const material = new THREE.MeshStandardMaterial({ color: 0x00ffff });
// const gallery = new THREE.Mesh(geometry, material);

// scene.add(gallery);
// gallery.position.set(-3, 0, 23);

const zdjecieBeti1 = new THREE.TextureLoader().load(
  "https://media.discordapp.net/attachments/979851960150806548/988775961862504468/IMG_20220610_125956.jpg?width=816&height=612"
);

const geometry2 = new THREE.BoxGeometry(10, 8, 0);
const cube = new THREE.Mesh(
  geometry2,
  new THREE.MeshBasicMaterial({ map: zdjecieBeti1 })
);
scene.add(cube);

cube.position.set(3, -5, 27);
cube.rotation.set(0, -1.2, 0);

const zdjecieBeanz = new THREE.TextureLoader().load(
  "https://media.discordapp.net/attachments/959094440587321444/989981384095449158/unknown.png?width=975&height=613"
);

const cube2 = new THREE.Mesh(
  geometry2,
  new THREE.MeshBasicMaterial({ map: zdjecieBeanz })
);
scene.add(cube2);

cube2.position.set(0, -12, 37);
cube2.rotation.set(0, 0.23, 0);
// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.y = t * 0.005;
  camera.rotation.y = t * 0.0012;
}

window.addEventListener("scroll", () => {
  moveCamera();
});

// Animation Loop

function animate() {
  requestAnimationFrame(animate);
  //szczepan kox
  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  if (window.innerWidth <= 1000) {
    window.location.href = "wynocha.html";
  }
});
// :trollface:  dlaczego mi to robisz?
// :szczepan_normal: why not?
// siquelop
// document.querySelector("body").innerHTML = "";

// document.querySelector("body").innerText =
//   document.querySelector("body").innerHTML;
