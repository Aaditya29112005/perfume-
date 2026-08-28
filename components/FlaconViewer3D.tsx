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

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, containerWidth / containerHeight, 0.1, 1000);
    camera.position.set(0, 0.2, 8.5);

    // 2. WebGL Renderer Setup with High Fidelity Tone Mapping
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(containerWidth, containerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    container.appendChild(renderer.domElement);

    // 3. Studio Environment Setup for Photorealistic Glass Reflections
    const envCanvas = document.createElement('canvas');
    envCanvas.width = 512;
    envCanvas.height = 256;
    const envCtx = envCanvas.getContext('2d');
    if (envCtx) {
      const grad = envCtx.createLinearGradient(0, 0, 0, 256);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.3, '#888899');
      grad.addColorStop(0.7, '#111118');
      grad.addColorStop(1, '#050508');
      envCtx.fillStyle = grad;
      envCtx.fillRect(0, 0, 512, 256);

      // Studio softbox highlights for sphere cap reflection
      envCtx.fillStyle = '#ffffff';
      envCtx.beginPath();
      envCtx.ellipse(380, 70, 70, 35, -Math.PI / 6, 0, Math.PI * 2);
      envCtx.fill();

      envCtx.beginPath();
      envCtx.ellipse(120, 90, 50, 25, Math.PI / 6, 0, Math.PI * 2);
      envCtx.fill();
    }
    const envTexture = new THREE.CanvasTexture(envCanvas);
    envTexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = envTexture;

    // 4. Studio Multi-directional Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    // Primary Softbox Key Light (Top Right)
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(4, 7, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    // Silver Specular Rim Light (Back Left)
    const rimLight = new THREE.DirectionalLight(0xe0e8ff, 2.5);
    rimLight.position.set(-5, 5, -4);
    scene.add(rimLight);

    // Warm Ambient Fill (Bottom)
    const fillLight = new THREE.PointLight(0xffeedd, 1.8, 12);
    fillLight.position.set(0, -3, 4);
    scene.add(fillLight);

    // 5. Build 3D Flacon Master Group
    const bottleGroup = new THREE.Group();

    // Dimensional proportions based on oad50.png flacon spec
    const bodyWidth = 1.95;
    const bodyHeight = 2.45;
    const bodyDepth = 0.82;
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
      bevelSize: 0.03,
      bevelThickness: 0.03,
    };
    const bodyGeo = new THREE.ExtrudeGeometry(bodyShape, extrudeSettings);
    bodyGeo.center();

    // Jet Black Obsidian Glass Material
    const obsidianGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x070709,
      roughness: 0.03,
      metalness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.015,
      reflectivity: 0.95,
      envMapIntensity: 1.4,
    });

    const bodyMesh = new THREE.Mesh(bodyGeo, obsidianGlassMaterial);
    bodyMesh.position.y = -0.45;
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    bottleGroup.add(bodyMesh);

    // B. Atomizer Neck Collar (Black Obsidian Cylinder)
    const neckRadiusTop = 0.22;
    const neckRadiusBottom = 0.24;
    const neckHeight = 0.28;
    const neckGeo = new THREE.CylinderGeometry(neckRadiusTop, neckRadiusBottom, neckHeight, 32);
    const neckMesh = new THREE.Mesh(neckGeo, obsidianGlassMaterial);
    neckMesh.position.y = bodyMesh.position.y + bodyHeight / 2 + neckHeight / 2 + 0.02;
    bottleGroup.add(neckMesh);

    // C. 3D Spherical Cap (Polished Black Onyx / Glossy Glass Sphere)
    const capRadius = 0.65;
    const capSphereGeo = new THREE.SphereGeometry(capRadius, 64, 64);
    const capMesh = new THREE.Mesh(capSphereGeo, obsidianGlassMaterial);
    capMesh.position.y = neckMesh.position.y + neckHeight / 2 + capRadius - 0.04;
    capMesh.castShadow = true;
    bottleGroup.add(capMesh);

    // D. Extract Clean Title for Front & Back Labels
    const extractNameFromAlt = (alt: string) => {
      if (alt.includes('On A Date') || alt.includes('ON A DATE')) return 'ON A DATE';
      if (alt.includes('Heritage Oud') || alt.includes('HERITAGE OUD')) return 'HERITAGE OUD';
      if (alt.includes('Tobacco') || alt.includes('TOBACCO')) return 'TOBACCO & WHISKEY';
      if (alt.includes('Pure Nuit') || alt.includes('PURE NUIT')) return 'PURE NUIT';
      if (alt.includes('Oud Rouge') || alt.includes('OUD ROUGE')) return 'OUD ROUGE';
      return alt.toUpperCase().replace('3D FLACON', '').trim() || 'ON A DATE';
    };
    const titleText = extractNameFromAlt(altText);

    // E. Create High-Resolution Front Label Canvas Texture (2048 x 2048)
    const createFrontLabelCanvas = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 2048;
      const ctx = canvas.getContext('2d');
      if (!ctx) return canvas;

      // Transparent Background (Text printed directly on black bottle face)
      ctx.clearRect(0, 0, 2048, 2048);

      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';

      // 1. Brand Name: FRASMETICS
      ctx.font = '900 130px "Inter", "Helvetica Neue", sans-serif';
      ctx.letterSpacing = '14px';
      ctx.fillText('FRASMETICS', 1024, 520);

      // 2. Sub-brand: FRANCE
      ctx.font = '600 52px "Inter", "Helvetica Neue", sans-serif';
      ctx.letterSpacing = '20px';
      ctx.fillText('F R A N C E', 1024, 620);

      // 3. Product Title: ON A DATE
      ctx.font = '900 150px "Inter", "Helvetica Neue", sans-serif';
      ctx.letterSpacing = '8px';
      ctx.fillText(titleText, 1024, 940);

      // 4. Volume / Concentration Bar
      ctx.font = '700 44px "Inter", "Helvetica Neue", sans-serif';
      ctx.letterSpacing = '4px';
      ctx.textAlign = 'left';
      ctx.fillText('EAU DE PARFUM', 260, 1140);

      ctx.textAlign = 'right';
      ctx.fillText('50ML / 1.7 FL.OZ.', 1788, 1140);

      // 5. Gender / Line Divider ——— MAN ———
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(260, 1220);
      ctx.lineTo(820, 1220);
      ctx.stroke();

      ctx.font = '700 40px "Inter", "Helvetica Neue", sans-serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '10px';
      ctx.fillText('MAN', 1024, 1232);

      ctx.beginPath();
      ctx.moveTo(1228, 1220);
      ctx.lineTo(1788, 1220);
      ctx.stroke();

      // 6. Manifesto lines
      ctx.font = '700 38px "Inter", "Helvetica Neue", sans-serif';
      ctx.letterSpacing = '4px';
      ctx.fillText('FRASMETICS CRAFTS NICHE FRAGRANCES.', 1024, 1370);

      ctx.font = '600 34px "Inter", "Helvetica Neue", sans-serif';
      ctx.letterSpacing = '4px';
      ctx.fillText('MODERN ARTISTRY. TIMELESS LUXURY.', 1024, 1435);

      return canvas;
    };

    const frontTexture = new THREE.CanvasTexture(createFrontLabelCanvas());
    frontTexture.colorSpace = THREE.SRGBColorSpace;
    frontTexture.needsUpdate = true;

    // Front Label Plane (Flush with front face of bottle body)
    const frontPlaneGeo = new THREE.PlaneGeometry(bodyWidth * 0.92, bodyHeight * 0.92);
    const frontPlaneMat = new THREE.MeshBasicMaterial({
      map: frontTexture,
      transparent: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const frontPlaneMesh = new THREE.Mesh(frontPlaneGeo, frontPlaneMat);
    frontPlaneMesh.position.set(0, bodyMesh.position.y, bodyDepth / 2 + 0.032);
    bottleGroup.add(frontPlaneMesh);

    // F. Create High-Resolution Back Label Canvas Texture (2048 x 2048)
    const createBackLabelCanvas = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 2048;
      const ctx = canvas.getContext('2d');
      if (!ctx) return canvas;

      ctx.clearRect(0, 0, 2048, 2048);

      // Matte Plaque Background
      ctx.fillStyle = 'rgba(15, 16, 22, 0.95)';
      ctx.roundRect(150, 150, 1748, 1748, 40);
      ctx.fill();

      // Metallic Gold Border
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

    const backPlaqueWidth = bodyWidth * 0.88;
    const backPlaqueHeight = bodyHeight * 0.78;
    const backPlaqueGeo = new THREE.PlaneGeometry(backPlaqueWidth, backPlaqueHeight);
    const backPlaqueMat = new THREE.MeshStandardMaterial({
      map: backTexture,
      transparent: true,
      roughness: 0.15,
      metalness: 0.2,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const backPlaqueMesh = new THREE.Mesh(backPlaqueGeo, backPlaqueMat);
    backPlaqueMesh.position.set(0, bodyMesh.position.y, -bodyDepth / 2 - 0.032);
    backPlaqueMesh.rotation.y = Math.PI; // Face outwards to back
    bottleGroup.add(backPlaqueMesh);

    scene.add(bottleGroup);

    // G. Obsidian Dark Pedestal Base
    const pedestalGeo = new THREE.CylinderGeometry(2.3, 2.4, 0.16, 64);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x060810,
      roughness: 0.06,
      metalness: 0.95,
      envMapIntensity: 1.2,
    });
    const pedestalMesh = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestalMesh.position.y = -2.1;
    pedestalMesh.receiveShadow = true;
    scene.add(pedestalMesh);

    // Soft Contact Shadow
    const shadowGeo = new THREE.RingGeometry(0.1, 2.2, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = Math.PI / 2;
    shadowMesh.position.y = pedestalMesh.position.y + 0.085;
    scene.add(shadowMesh);

    // 6. Smooth Pointer Drag & Touch Controls (360° rotation & tilt with Damping)
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;

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

    // 7. Render Animation Loop (Smooth Interp & Idle Floating Animation)
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        targetRotationY += 0.005; // Idle 360 degree rotation
        targetRotationX *= 0.95;
      }

      bottleGroup.rotation.y += (targetRotationY - bottleGroup.rotation.y) * 0.08;
      bottleGroup.rotation.x += (targetRotationX - bottleGroup.rotation.x) * 0.08;

      // Gentle levitation oscillation
      bottleGroup.position.y = Math.sin(Date.now() * 0.0018) * 0.035;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
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
    <div className={`relative w-full h-full flex flex-col items-center justify-center ${className}`}>
      {/* 3D WebGL Mount Canvas */}
      <div
        ref={mountRef}
        className="w-full h-full min-h-[460px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      />
    </div>
  );
};
