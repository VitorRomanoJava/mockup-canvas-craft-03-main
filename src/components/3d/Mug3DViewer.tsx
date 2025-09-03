// ALTERADO: Adicionado useEffect
import { useEffect } from 'react'; 
// ALTERADO: Adicionado useThree
import { Canvas, useThree } from '@react-three/fiber'; 
import { Stage, OrbitControls } from '@react-three/drei';
import { MugModel } from './MugModel';
import { useTextureManager } from '@/hooks/useTextureManager';

interface Mug3DViewerProps {
  // ... outras props existentes
  uploadedImage: string | null;
  customText: string;
  textColor: string;
  textFont: string;
  textSize: number;
  designPosition: { x: number; y: number };
  designSize: number;
  designRotation: number;
  
  // NOVO: Prop para receber a função de exportação
  onExportReady: (trigger: () => string | undefined) => void;
}

// NOVO: Componente interno que tem acesso ao contexto do R3F
const Scene = ({ onExportReady, texture, ...props }: any) => {
  // Este hook nos dá acesso direto à cena, câmera e renderizador (gl)
  const { gl, scene, camera } = useThree();

  // Usamos useEffect para registrar a função de exportação no componente pai
  useEffect(() => {
    const triggerExport = () => {
      // Forçamos uma renderização para garantir que o estado mais recente seja capturado
      gl.render(scene, camera);
      // Retornamos a imagem do canvas como um Data URL (base64)
      return gl.domElement.toDataURL('image/png');
    };

    // Enviamos a função de trigger para o componente pai
    onExportReady(triggerExport);
  }, [gl, scene, camera, onExportReady]);
  
  return (
    <>
      {/* O conteúdo da cena foi movido para cá */}
      <Stage environment="city" intensity={0.6} adjustCamera>
        <MugModel
          texture={texture}
          designSize={props.designSize}
          designPosition={props.designPosition}
          designRotation={props.designRotation}
        />
      </Stage>
      <OrbitControls makeDefault minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.5} enableZoom enablePan={false} />
    </>
  );
};


export function Mug3DViewer({ onExportReady, uploadedImage, customText, ...props }: Mug3DViewerProps) {
  // O hook customizado para gerar a textura permanece aqui
  const texture = useTextureManager({
    imageSrc: uploadedImage,
    text: customText,
    textColor: props.textColor,
    fontFamily: props.textFont,
    fontSize: props.textSize,
  });

  return (
    // ALTERADO: O Canvas agora renderiza o componente Scene
    <Canvas camera={{ fov: 45 }} shadows dpr={[1, 2]}>
      <Scene 
        onExportReady={onExportReady} 
        texture={texture}
        {...props} 
      />
    </Canvas>
  );
}