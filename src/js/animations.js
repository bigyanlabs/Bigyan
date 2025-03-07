import * as THREE from 'three';

export function initThreeJS() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
 
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
   
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.03,
        transparent: true,
        color: 0xffffff,
        blending: THREE.AdditiveBlending
    });
    
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    window.addEventListener('resize', () => {
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
    
   
    function animate() {
        requestAnimationFrame(animate);
        
       
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        
       
        const body = document.body;
        const theme = body.dataset.theme || 'blue';
        const mode = body.dataset.mode || 'light';
        
        if (theme === 'blue') {
            particlesMaterial.color = new THREE.Color(mode === 'light' ? 0x4A6BFF : 0x6B8AFF);
        } else if (theme === 'purple') {
            particlesMaterial.color = new THREE.Color(mode === 'light' ? 0x9C6BFF : 0xA47CF4);
        } else if (theme === 'green') {
            particlesMaterial.color = new THREE.Color(mode === 'light' ? 0x4ACD8D : 0x60B17A);
        }
        
       
        renderer.render(scene, camera);
    }
    
    animate();
}