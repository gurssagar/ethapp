"use client";
import { useEffect, useRef, useState, forwardRef } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import * as THREE from 'three'
import { useThree, Object3DNode, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json";

extend({ ThreeGlobe });

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

const Globe = forwardRef<Object3DNode<ThreeGlobe, typeof ThreeGlobe>, WorldProps>(
  ({ globeConfig, data }, ref) => {
    const { scene, camera } = useThree();
    const globeRef = useRef<ThreeGlobe>(null);

    useEffect(() => {
      if (!globeRef.current) return;

      const defaultProps = {
        pointSize: 1,
        atmosphereColor: "#ffffff",
        showAtmosphere: true,
        atmosphereAltitude: 0.1,
        polygonColor: "rgba(255,255,255,0.7)",
        globeColor: "#1d072e",
        emissive: "#000000",
        emissiveIntensity: 0.1,
        shininess: 0.9,
        arcTime: 2000,
        arcLength: 0.9,
        rings: 1,
        maxRings: 3,
        ...globeConfig,
      };

      globeRef.current.globeMaterial().color = new Color(defaultProps.globeColor);
      
      return () => {
        // Cleanup
        globeRef.current?.dispose();
      };
    }, [globeConfig]);

    return (
      <threeGlobe
        ref={globeRef}
        scene={scene}
        camera={camera}
        pointsData={data}
        hexPolygonsData={countries.features}
        hexPolygonResolution={3}
        hexPolygonMargin={0.7}
        showAtmosphere={globeConfig.showAtmosphere}
        atmosphereColor={globeConfig.atmosphereColor}
        atmosphereAltitude={globeConfig.atmosphereAltitude}
        polygonColor={globeConfig.polygonColor}
        pointColor={(e: any) => e.color}
        pointRadius={globeConfig.pointSize}
      />
    );
  }
);

export function World({ globeConfig, data }: WorldProps) {
  const scene = new Scene();
  const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

  useEffect(() => {
    camera.position.z = 500;
  }, []);

  return (
    <Canvas scene={scene} camera={camera}>
      <ambientLight intensity={0.5} color={globeConfig.ambientLight as string} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <Globe globeConfig={globeConfig} data={data} />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={globeConfig.autoRotate || false}
        autoRotateSpeed={globeConfig.autoRotateSpeed || 1}
      />
    </Canvas>
  );
}

export function hexToRgb(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
