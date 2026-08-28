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
    const camera = new THREE.PerspectiveCamera(35, containerWidth / containerHeight, 0.1, 1000);
    camera.position.set(0, 0.1, 8.2);

    // 2. WebGL Renderer Setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(containerWidth, containerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    container.appendChild(renderer.domElement);

    // 3. Studio Multi-directional Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);

    // Key Light (Top Right)
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.6);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Gold Rim Light (Back Left)
    const rimLight = new THREE.SpotLight(0xd4af37, 5.5, 25, Math.PI / 4, 0.4);
    rimLight.position.set(-6, 6, -5);
    scene.add(rimLight);

    // Warm Accent Fill Light (Bottom)
    const fillLight = new THREE.PointLight(0xe88a25, 2.2, 10);
    fillLight.position.set(0, -2.5, 3.5);
    scene.add(fillLight);

    // 4. Create 3D Flacon Master Group
    const bottleGroup = new THREE.Group();

    // Aspect Ratio & Dimensions based on oad50.png (2044 x 4220 -> aspect = 0.48436)
    const totalHeight = 3.8;
    const totalWidth = totalHeight * 0.48436; // ~1.84
    const bottleDepth = 0.72; // Volumetric 3D depth

    // A. Load Full High-Resolution Bottle Image for Front Face
    const textureLoader = new THREE.TextureLoader();
    const frontTexture = textureLoader.load(imageSrc, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
    });

    // B. Rounded 3D Obsidian Glass Body Geometry
    const rWidth = totalWidth * 0.94;
    const rHeight = totalHeight * 0.58; // Rectangular bottle body height
    const cornerRadius = 0.12;

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

    const bodyShape = createRoundedRectShape(rWidth, rHeight, cornerRadius);
    const extrudeSettings = {
      depth: bottleDepth,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    };
    const bodyGeo = new THREE.ExtrudeGeometry(bodyShape, extrudeSettings);
    bodyGeo.center();

    // High-Gloss Dark Obsidian Glass Material for 3D body
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x08090e,
      roughness: 0.08,
      metalness: 0.25,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      reflectivity: 0.9,
    });

    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMaterial);
    bodyMesh.position.y = -totalHeight * 0.16; // Align body below neck/cap
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    bottleGroup.add(bodyMesh);

    // C. Gold Metallic Accent Trim along top shoulder bevels
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.98,
      roughness: 0.12,
    });

    const shoulderBarGeo = new THREE.BoxGeometry(rWidth * 0.92, 0.04, bottleDepth * 0.9);
    const shoulderBarMesh = new THREE.Mesh(shoulderBarGeo, goldMaterial);
    shoulderBarMesh.position.y = bodyMesh.position.y + rHeight / 2 + 0.02;
    bottleGroup.add(shoulderBarMesh);

    // D. Gold Atomizer Neck Collar
    const neckGeo = new THREE.CylinderGeometry(0.34, 0.36, 0.42, 32);
    const neckMesh = new THREE.Mesh(neckGeo, goldMaterial);
    neckMesh.position.y = bodyMesh.position.y + rHeight / 2 + 0.24;
    bottleGroup.add(neckMesh);

    // E. 3D Volumetric Spherical Cap (Obsidian / Black Onyx)
    const capRadius = totalWidth * 0.38;
    const capSphereGeo = new THREE.SphereGeometry(capRadius, 64, 64);
    const capMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x07070a,
      roughness: 0.04,
      metalness: 0.3,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      reflectivity: 0.95,
    });

    const capMesh = new THREE.Mesh(capSphereGeo, capMaterial);
    capMesh.position.y = bodyMesh.position.y + rHeight / 2 + 0.42 + capRadius;
    capMesh.castShadow = true;
    bottleGroup.add(capMesh);

    // Gold Accent Ring at base of 3D sphere cap
    const capRingGeo = new THREE.TorusGeometry(capRadius * 0.65, 0.03, 16, 64);
    const capRingMesh = new THREE.Mesh(capRingGeo, goldMaterial);
    capRingMesh.rotation.x = Math.PI / 2;
    capRingMesh.position.y = capMesh.position.y - capRadius + 0.02;
    bottleGroup.add(capRingMesh);

    // F. FRONT FACE: Full High-Resolution Image Mesh (Fitted Perfectly)
    const frontPlaneGeo = new THREE.PlaneGeometry(totalWidth, totalHeight);
    const frontPlaneMat = new THREE.MeshBasicMaterial({
      map: frontTexture,
      transparent: true,
      alphaTest: 0.02,
      side: THREE.FrontSide,
    });
    const frontPlaneMesh = new THREE.Mesh(frontPlaneGeo, frontPlaneMat);
    frontPlaneMesh.position.set(0, 0, bottleDepth / 2 + 0.025);
    bottleGroup.add(frontPlaneMesh);

    // G. BACK FACE: Luxury Engraved Plaque for 180° Back View
    const extractNameFromAlt = (alt: string) => {
      if (alt.includes('On A Date')) return 'ON A DATE';
      if (alt.includes('Heritage Oud')) return 'HERITAGE OUD';
      if (alt.includes('Tobacco & Whiskey')) return 'TOBACCO & WHISKEY';
      if (alt.includes('Pure Nuit')) return 'PURE NUIT';
      if (alt.includes('Oud Rouge')) return 'OUD ROUGE';
      return alt.toUpperCase().replace('3D FLACON', '').trim() || 'FRASMETICS';
    };
    const titleText = extractNameFromAlt(altText);

    const createBackLabelCanvas = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      if (!ctx) return canvas;

      // Matte Black Finish
      ctx.fillStyle = '#07080c';
      ctx.fillRect(0, 0, 1024, 1024);

      // Outer Gold Border
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 12;
      ctx.strokeRect(32, 32, 960, 960);

      // Inner Gold Border
      ctx.lineWidth = 4;
      ctx.strokeRect(48, 48, 928, 928);

      // Emblem
      ctx.fillStyle = '#d4af37';
      ctx.font = '900 64px serif';
      ctx.textAlign = 'center';
      ctx.fillText('⚜', 512, 180);

      ctx.font = '900 44px sans-serif';
      ctx.letterSpacing = '10px';
      ctx.fillText('F R A S M E T I C S', 512, 270);

      ctx.fillStyle = '#a0a0a0';
      ctx.font = '600 24px sans-serif';
      ctx.letterSpacing = '12px';
      ctx.fillText('P A R I S', 512, 320);

      ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(256, 370);
      ctx.lineTo(768, 370);
      ctx.stroke();

      // Title
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 56px serif';
      ctx.letterSpacing = '4px';
      ctx.fillText(titleText, 512, 470);

      // Details Box
      ctx.fillStyle = 'rgba(255,255,255,0.04)';
      ctx.fillRect(128, 520, 768, 280);

      ctx.fillStyle = '#cccccc';
      ctx.font = '500 22px sans-serif';
      ctx.letterSpacing = '2px';
      ctx.fillText('HAUTE PARFUMERIE DE GRASSE', 512, 570);
      ctx.fillText('EAU DE PARFUM · 50ML / 1.7 FL. OZ.', 512, 620);
      ctx.fillText('ALCOHOL DENAT., PARFUM, AQUA, OUD.', 512, 670);

      ctx.fillStyle = '#d4af37';
      ctx.font = '700 22px monospace';
      ctx.fillText('BATCH N° 2026-FR50 · LOT 01', 512, 740);

      ctx.fillStyle = '#d4af37';
      ctx.font = '600 20px sans-serif';
      ctx.letterSpacing = '6px';
      ctx.fillText('MADE IN FRANCE · FABRIQUÉ EN FRANCE', 512, 880);

      return canvas;
    };

    const backTexture = new THREE.CanvasTexture(createBackLabelCanvas());
    backTexture.colorSpace = THREE.SRGBColorSpace;

    const backPlaqueWidth = rWidth * 0.88;
    const backPlaqueHeight = rHeight * 0.75;
    const backPlaqueGeo = new THREE.PlaneGeometry(backPlaqueWidth, backPlaqueHeight);

    const backPlaqueMat = new THREE.MeshStandardMaterial({
      map: backTexture,
      roughness: 0.2,
      metalness: 0.15,
    });
    const backPlaqueMesh = new THREE.Mesh(backPlaqueGeo, backPlaqueMat);
    backPlaqueMesh.position.set(0, bodyMesh.position.y, -bottleDepth / 2 - 0.025);
    backPlaqueMesh.rotation.y = Math.PI; // Face outwards to the back
    bottleGroup.add(backPlaqueMesh);

    // Gold Bezel Frame behind Back Plaque
    const backFrameGeo = new THREE.PlaneGeometry(backPlaqueWidth + 0.04, backPlaqueHeight + 0.04);
    const backFrameMesh = new THREE.Mesh(backFrameGeo, goldMaterial);
    backFrameMesh.position.set(0, bodyMesh.position.y, -bottleDepth / 2 - 0.021);
    backFrameMesh.rotation.y = Math.PI;
    bottleGroup.add(backFrameMesh);

    scene.add(bottleGroup);

    // H. Dark Obsidian Mirror Pedestal Base
    const pedestalGeo = new THREE.CylinderGeometry(2.3, 2.4, 0.16, 64);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x070b18,
      roughness: 0.08,
      metalness: 0.9,
    });
    const pedestalMesh = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestalMesh.position.y = -totalHeight / 2 - 0.12;
    pedestalMesh.receiveShadow = true;
    scene.add(pedestalMesh);

    // Soft Ground Contact Shadow
    const shadowGeo = new THREE.RingGeometry(0.1, 2.2, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.65,
      side: THREE.DoubleSide,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = Math.PI / 2;
    shadowMesh.position.y = pedestalMesh.position.y + 0.08;
    scene.add(shadowMesh);

    // 5. Pointer Drag Logic (Smooth 360 Rotation & Tilt)
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

    // Mobile Touch Handlers
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

    // 6. Animation Loop (Smooth Interp & Continuous Idle Rotation)
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        targetRotationY += 0.005; // Smooth continuous 360 degree rotation when idle
        targetRotationX *= 0.95;
      }

      bottleGroup.rotation.y += (targetRotationY - bottleGroup.rotation.y) * 0.08;
      bottleGroup.rotation.x += (targetRotationX - bottleGroup.rotation.x) * 0.08;

      // Gentle levitation
      bottleGroup.position.y = Math.sin(Date.now() * 0.0018) * 0.04;

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
