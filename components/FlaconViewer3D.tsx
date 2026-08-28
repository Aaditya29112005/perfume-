'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface FlaconViewer3DProps {
  imageSrc?: string;
  altText?: string;
  liquidColor?: string;
  className?: string;
}

export const FlaconViewer3D: React.FC<FlaconViewer3DProps> = ({
  imageSrc = '/oad50.png',
  altText = 'On A Date 3D Flacon',
  liquidColor = '#C87D32',
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mountRef.current) return;

    let animationFrameId: number;
    const container = mountRef.current;
    const containerWidth = container.clientWidth || 500;
    const containerHeight = container.clientHeight || 500;

    // 1. Scene & Camera Setup (Offset camera X=-2.2 so 3D model sits even further to the right)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, containerWidth / containerHeight, 0.1, 1000);
    const isDesktop = containerWidth > 768;
    const cameraOffsetX = isDesktop ? -2.2 : 0;
    camera.position.set(cameraOffsetX, -0.4, 11.2);

    // 2. WebGL Renderer Setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(containerWidth, containerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // 3. Studio Environment Map - Deep Dark Background with Precision White Softbox Highlights for Specular Glints
    const envCanvas = document.createElement('canvas');
    envCanvas.width = 1024;
    envCanvas.height = 512;
    const envCtx = envCanvas.getContext('2d');
    if (envCtx) {
      envCtx.fillStyle = '#020204';
      envCtx.fillRect(0, 0, 1024, 512);

      // Key Softbox Reflection (Top Right)
      envCtx.fillStyle = '#ffffff';
      envCtx.beginPath();
      envCtx.ellipse(750, 120, 110, 55, -Math.PI / 8, 0, Math.PI * 2);
      envCtx.fill();

      // Rim Light Reflection (Left Edge)
      envCtx.fillStyle = '#e5e8ff';
      envCtx.beginPath();
      envCtx.ellipse(220, 180, 70, 35, Math.PI / 6, 0, Math.PI * 2);
      envCtx.fill();
    }
    const envTexture = new THREE.CanvasTexture(envCanvas);
    envTexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = envTexture;

    // 4. Multi-directional Studio Lighting (Low Ambient for Deep Pitch Black Glass)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambientLight);

    // Primary Directional Light (Top Right)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(4, 6, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Specular Rim Light (Back Left)
    const rimLight = new THREE.DirectionalLight(0xffffff, 2.0);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    // Soft Bottom Fill Light
    const fillLight = new THREE.PointLight(0xffffff, 0.8, 10);
    fillLight.position.set(0, -3, 4);
    scene.add(fillLight);

    // 5. Build 3D Flacon Master Group
    const bottleGroup = new THREE.Group();

    // Dimensions matching oad50.png flacon proportions perfectly
    const bodyWidth = 2.15;
    const bodyHeight = 2.90;
    const bodyDepth = 0.88;
    const cornerRadius = 0.08;

    // A. Extruded Rounded Rectangular Glass Body
    const createRoundedRectShape = (w: number, h: number, r: number) => {
      const shape = new THREE.Shape();
      const x = -w / 2;
      const y = -h / 2;
      shape.moveTo(x + r, y);
      shape.lineTo(x + w - r, y);
      shape.quadraticCurveTo(x + w, y, x + w, y + r);
      shape.lineTo(x + w, y + h - r);
      shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      shape.lineTo(x + r, y + h);
      shape.quadraticCurveTo(x, y + h, x, y + h - r);
      shape.lineTo(x, y + r);
      shape.quadraticCurveTo(x, y, x + r, y);
      return shape;
    };

    const bodyShape = createRoundedRectShape(bodyWidth, bodyHeight, cornerRadius);
    const extrudeSettings = {
      depth: bodyDepth,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    };
    const bodyGeo = new THREE.ExtrudeGeometry(bodyShape, extrudeSettings);
    bodyGeo.center();

    // Deep Pitch Black Obsidian Glass Material (Pure Black `#010103`)
    const obsidianGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x010103,
      roughness: 0.02,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.01,
      reflectivity: 1.0,
      envMapIntensity: 1.5,
    });

    const bodyMesh = new THREE.Mesh(bodyGeo, obsidianGlassMaterial);
    bodyMesh.position.y = -0.55;
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    bottleGroup.add(bodyMesh);

    // B. Sleek Short Atomizer Neck Collar (Black Obsidian Cylinder)
    const neckRadiusTop = 0.23;
    const neckRadiusBottom = 0.25;
    const neckHeight = 0.23;
    const neckGeo = new THREE.CylinderGeometry(neckRadiusTop, neckRadiusBottom, neckHeight, 32);
    const neckMesh = new THREE.Mesh(neckGeo, obsidianGlassMaterial);
    neckMesh.position.y = bodyMesh.position.y + bodyHeight / 2 + neckHeight / 2 + 0.01;
    bottleGroup.add(neckMesh);

    // C. Glossy Sphere Cap
    const capRadius = 0.68;
    const capSphereGeo = new THREE.SphereGeometry(capRadius, 64, 64);
    const capMesh = new THREE.Mesh(capSphereGeo, obsidianGlassMaterial);
    capMesh.position.y = neckMesh.position.y + neckHeight / 2 + capRadius * 0.72;
    capMesh.castShadow = true;
    bottleGroup.add(capMesh);

    // D. Front Face Material / Texture (Covers 100% of the front face seamlessly)
    const frontPlaneGeo = new THREE.PlaneGeometry(bodyWidth * 0.99, bodyHeight * 0.99);
    const frontPlaneMat = new THREE.MeshBasicMaterial({
      transparent: true,
      depthWrite: false,
    });
    const frontPlaneMesh = new THREE.Mesh(frontPlaneGeo, frontPlaneMat);
    frontPlaneMesh.position.set(0, bodyMesh.position.y, bodyDepth / 2 + 0.021);
    bottleGroup.add(frontPlaneMesh);

    // Load actual PNG image & crop body portion to map seamlessly onto front face
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;

      const isFullBottle = img.height / img.width > 1.4;
      const cropYStart = isFullBottle ? Math.floor(img.height * 0.34) : 0;
      const cropHeight = img.height - cropYStart;

      canvas.height = cropHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, cropYStart, img.width, cropHeight, 0, 0, img.width, cropHeight);

        const tex = new THREE.CanvasTexture(canvas);
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.needsUpdate = true;
        frontPlaneMat.map = tex;
        frontPlaneMat.needsUpdate = true;
      }
    };

    // E. Back Face Texture for 180° Back View
    const extractNameFromAlt = (alt: string) => {
      if (alt.includes('On A Date') || alt.includes('ON A DATE')) return 'ON A DATE';
      if (alt.includes('Heritage Oud') || alt.includes('HERITAGE OUD')) return 'HERITAGE OUD';
      if (alt.includes('Tobacco') || alt.includes('TOBACCO')) return 'TOBACCO & WHISKEY';
      if (alt.includes('Pure Nuit') || alt.includes('PURE NUIT')) return 'PURE NUIT';
      if (alt.includes('Oud Rouge') || alt.includes('OUD ROUGE')) return 'OUD ROUGE';
      return alt.toUpperCase().replace('3D FLACON', '').trim() || 'ON A DATE';
    };
    const titleText = extractNameFromAlt(altText);

    const createBackLabelCanvas = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 2048;
      const ctx = canvas.getContext('2d');
      if (!ctx) return canvas;

      ctx.clearRect(0, 0, 2048, 2048);

      ctx.fillStyle = 'rgba(6, 7, 10, 0.95)';
      ctx.roundRect(150, 150, 1748, 1748, 40);
      ctx.fill();

      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 14;
      ctx.roundRect(170, 170, 1708, 1708, 30);
      ctx.stroke();

      ctx.fillStyle = '#D4AF37';
      ctx.textAlign = 'center';
      ctx.font = '900 110px serif';
      ctx.fillText('⚜', 1024, 380);

      ctx.font = '900 70px "Inter", sans-serif';
      ctx.letterSpacing = '12px';
      ctx.fillText('F R A S M E T I C S', 1024, 520);

      ctx.fillStyle = '#A0A0A0';
      ctx.font = '600 40px "Inter", sans-serif';
      ctx.letterSpacing = '16px';
      ctx.fillText('P A R I S', 1024, 600);

      ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(400, 680);
      ctx.lineTo(1648, 680);
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 90px serif';
      ctx.letterSpacing = '6px';
      ctx.fillText(titleText, 1024, 840);

      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      ctx.fillRect(300, 930, 1448, 480);

      ctx.fillStyle = '#CCCCCC';
      ctx.font = '600 38px "Inter", sans-serif';
      ctx.letterSpacing = '4px';
      ctx.fillText('HAUTE PARFUMERIE DE GRASSE', 1024, 1020);
      ctx.fillText('EAU DE PARFUM · 50ML / 1.7 FL. OZ.', 1024, 1110);
      ctx.fillText('ALCOHOL DENAT., PARFUM, AQUA, OUD.', 1024, 1200);

      ctx.fillStyle = '#D4AF37';
      ctx.font = '700 38px monospace';
      ctx.fillText('BATCH N° 2026-FR50 · LOT 01', 1024, 1330);

      ctx.fillStyle = '#D4AF37';
      ctx.font = '600 36px "Inter", sans-serif';
      ctx.letterSpacing = '8px';
      ctx.fillText('MADE IN FRANCE · FABRIQUÉ EN FRANCE', 1024, 1620);

      return canvas;
    };

    const backTexture = new THREE.CanvasTexture(createBackLabelCanvas());
    backTexture.colorSpace = THREE.SRGBColorSpace;
    backTexture.needsUpdate = true;

    const backPlaqueWidth = bodyWidth * 0.95;
    const backPlaqueHeight = bodyHeight * 0.95;
    const backPlaqueGeo = new THREE.PlaneGeometry(backPlaqueWidth, backPlaqueHeight);
    const backPlaqueMat = new THREE.MeshStandardMaterial({
      map: backTexture,
      transparent: true,
      roughness: 0.15,
      metalness: 0.2,
      depthWrite: false,
    });
    const backPlaqueMesh = new THREE.Mesh(backPlaqueGeo, backPlaqueMat);
    backPlaqueMesh.position.set(0, bodyMesh.position.y, -bodyDepth / 2 - 0.021);
    backPlaqueMesh.rotation.y = Math.PI;
    bottleGroup.add(backPlaqueMesh);

    scene.add(bottleGroup);

    // 6. Page Scroll-Driven 3D Model Rotation & Drag Controls
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;
    let scrollRotationY = 0;

    const handleScroll = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight || 800;

      // Progress as section passes through viewport
      const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
      const clampedProgress = Math.max(0, Math.min(1, progress));

      // Rotate model dynamically from -0.5 to +1.2 radians as user scrolls down the page
      scrollRotationY = (clampedProgress - 0.45) * Math.PI * 1.5;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;

      targetRotationY += deltaX * 0.012;
      targetRotationX = Math.max(-0.35, Math.min(0.35, targetRotationX + deltaY * 0.006));
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch Handlers
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMouseX = e.touches[0].clientX;
        previousMouseY = e.touches[0].clientY;
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMouseX;
      const deltaY = e.touches[0].clientY - previousMouseY;
      previousMouseX = e.touches[0].clientX;
      previousMouseY = e.touches[0].clientY;

      targetRotationY += deltaX * 0.012;
      targetRotationX = Math.max(-0.35, Math.min(0.35, targetRotationX + deltaY * 0.006));
    };
    const handleTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    // 7. Render Loop (Page Scroll Driven Rotation + Hover Float)
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        targetRotationY = scrollRotationY;
        targetRotationX *= 0.95;
      }

      bottleGroup.rotation.y += (targetRotationY - bottleGroup.rotation.y) * 0.08;
      bottleGroup.rotation.x += (targetRotationX - bottleGroup.rotation.x) * 0.08;

      bottleGroup.position.y = Math.sin(Date.now() * 0.0018) * 0.035;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      const isDesk = w > 768;
      camera.position.x = isDesk ? -2.2 : 0;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      handleScroll();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isClient, imageSrc, altText, liquidColor]);

  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-center outline-none border-none select-none ${className}`}>
      <div
        ref={mountRef}
        className="w-full h-full min-h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none outline-none border-none"
      />
    </div>
  );
};
