let scene, renderer, cube, light, controls;

//TODO: Сделать слияние вершин через merge

let camera, raycaster, mouse, cameraCenter = new THREE.Vector3(),
cameraHorzLimit = 50, cameraVertLimit = 50;

let test = new THREE.Object3D();

const colors = {
    a: 0x00ff00,
    b: 0x00cc00,
    c: 0xffff00,
    d: 0x00ffcc,
    e: 0xccff00,
    f: 0x00ffee,
    g: 0xeeff00,
    h: 0x00ccee,
}

const init = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color('black');
    camera = new THREE.PerspectiveCamera(
        45, 
        window.innerWidth / window.innerHeight, 
        0.1,
        1000);

    renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    var geometry = new THREE.SphereGeometry( 4, 4, 4 );
    var material = new THREE.MeshBasicMaterial( {color: colors.a, wireframe: false} );

    let sphereA = new THREE.Mesh(geometry, material);
    sphereA.position.set(0, 0, 0);
    let sphereB = new THREE.Mesh(geometry, material);
    sphereB.position.set(0, 0, 40);
    let sphereC = new THREE.Mesh(geometry, material);
    sphereC.position.set(40, 0, 0);    
    let sphereD = new THREE.Mesh(geometry, material);
    sphereD.position.set(40, 0, 40);
    let sphereE = new THREE.Mesh(geometry, material);
    sphereE.position.set(0, 40, 0);
    let sphereF = new THREE.Mesh(geometry, material);
    sphereF.position.set(0, 40, 40);
    let sphereG = new THREE.Mesh(geometry, material);
    sphereG.position.set(40, 40, 0);
    let sphereH = new THREE.Mesh(geometry, material);
    sphereH.position.set(40, 40, 40);

    let group = new THREE.Group();

    let cyl1geometry = new THREE.CylinderGeometry( 1, 1, 40, 40);
    let material2 = new THREE.MeshBasicMaterial({color: 0xffffff});
    let cylinder = new THREE.Mesh( cyl1geometry, material2 );
    cylinder.position.set(0, 20 , 0);
    let cylinder2 = new THREE.Mesh( cyl1geometry, material2 );
    cylinder2.position.set(0, 20 , 40);    
    let cylinder3 = new THREE.Mesh( cyl1geometry, material2 );
    cylinder3.position.set(40, 20 , 0);
    let cylinder4 = new THREE.Mesh( cyl1geometry, material2 );
    cylinder4.position.set(40, 20 , 40);  
    let cylinder5 = new THREE.Mesh( cyl1geometry, material2 );
    cylinder5.position.set(20, 0 , 0);
    cylinder5.rotation.set(Math.PI * 90 / 180, 0, Math.PI * 90 / 180)
    let cylinder6 = new THREE.Mesh( cyl1geometry, material2 );
    cylinder6.position.set(20, 40 , 40);   
    cylinder6.rotation.set(Math.PI * 90 / 180, 0, Math.PI * 90 / 180)
    let cylinder7 = new THREE.Mesh( cyl1geometry, material2 );
    cylinder7.position.set(20, 40 , 0);
    cylinder7.rotation.set(Math.PI * 90 / 180, 0, Math.PI * 90 / 180)
    let cylinder8 = new THREE.Mesh( cyl1geometry, material2 );
    cylinder8.position.set(20, 0, 40);   
    cylinder8.rotation.set(Math.PI * 90 / 180, 0, Math.PI * 90 / 180)
    let cylinder9 = new THREE.Mesh( cyl1geometry, material2 );
    cylinder9.position.set(0, 0, 20);
    cylinder9.rotation.set(Math.PI * 90 / 180, 0, 0)
    let cylinder10 = new THREE.Mesh( cyl1geometry, material2 );
    cylinder10.position.set(0, 40, 20);  
    cylinder10.rotation.set(Math.PI * 90 / 180, 0, 0) 
    let cylinder11 = new THREE.Mesh( cyl1geometry, material2 );
    cylinder11.position.set(40, 0, 20);
    cylinder11.rotation.set(Math.PI * 90 / 180, 0, 0)
    let cylinder12 = new THREE.Mesh( cyl1geometry, material2 );
    cylinder12.position.set(40, 40, 20);   
    cylinder12.rotation.set(Math.PI * 90 / 180, 0, 0)

    group.add(sphereA, sphereB, sphereC, sphereD, 
              sphereE, sphereF, sphereG, sphereH,
              cylinder, cylinder2, cylinder3, cylinder4, 
              cylinder5, cylinder6, cylinder7, cylinder8,
              cylinder9, cylinder10, cylinder11, cylinder12,); 

    
    group.position.set(Math.random() * 100, 
                        Math.random() * 100, 
                        Math.random() * 100);
    group.rotation.y = Math.random() * 2 * Math.PI;
    scene.add(group);         

    camera.position.set(0, 150, 500);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    cameraCenter.x = camera.position.x;
    cameraCenter.y = camera.position.y;
    cameraCenter.z = camera.position.z;

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();


    let gridXZ = new THREE.GridHelper(400, 20);
    gridXZ.setColors( new THREE.Color(0xff0000), new THREE.Color(0x00ffff) );
    scene.add(gridXZ);
    
}

window.addEventListener('click', (event) => {

    onDocumentMouseMove();

    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(scene.children, true);
    
    for (let i = 0; i < intersects.length; i++) {
        intersects[i].material.color.set(0xff0000);
    }
});


const updateCamera = () => {
    camera.position.x = cameraCenter.x + (cameraHorzLimit * mouse.x);
    camera.position.y = cameraCenter.y + (cameraVertLimit * mouse.y);
}

const animate = () => {
    updateCamera();
    requestAnimationFrame(animate);   
    renderer.render(scene, camera);
}

const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

document.addEventListener('mousemove', onDocumentMouseMove, false);
window.addEventListener('resize', onWindowResize, false);

init();
animate();

function newFunction() {
    light = new THREE.SpotLight(0xffffff, 1.5);
    light.position.set(0, 500, 2000);
    scene.add(light);
}

