// src/components/3d/Mug3DViewer.tsx

import { useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Stage, OrbitControls } from '@react-three/drei';
import { MugModel } from './MugModel';
import { useTextureManager } from '@/hooks/useTextureManager';

// As props relacionadas ao Decal (designPosition, designSize, designRotation) foram removidas.
interface Mug3DViewerProps {
  uploadedImage: string | null;
  customText: string;
  textColor: string;
  textFont: string;
  textSize: number;
  onExportReady: (trigger: () => string | undefined) => void;
}

// O componente interno Scene foi simplificado. Ele não precisa mais
// receber e repassar as props do Decal.
const Scene = ({ onExportReady, texture }: any) => {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    const triggerExport = () => {
      gl.render(scene, camera);
      return gl.domElement.toDataURL('image/png');
    };

    onExportReady(triggerExport);
  }, [gl, scene, camera, onExportReady]);
  
  return (
    <>
      <Stage environment="city" intensity={0.6} adjustCamera>
        {/* A chamada para MugModel agora passa apenas a textura */}
        <MugModel texture={texture} />
      </Stage>
      <OrbitControls makeDefault minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.5} enableZoom enablePan={false} />
    </>
  );
};

// O componente principal também foi simplificado, removendo o repasse das props {...props}
export function Mug3DViewer({ 
  onExportReady, 
  uploadedImage, 
  customText, 
  textColor, 
  textFont, 
  textSize 
}: Mug3DViewerProps) {
  const texture = useTextureManager({
    imageSrc: uploadedImage,
    text: customText,
    textColor: textColor,
    fontFamily: textFont,
    fontSize: textSize,
  });

  return (
    <Canvas camera={{ fov: 45 }} shadows dpr={[1, 2]}>
      <Scene 
        onExportReady={onExportReady} 
        texture={texture}
      />
    </Canvas>
  );
}