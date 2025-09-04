// src/components/3d/MugModel.tsx

import { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { applyTextureWithUVMapping } from '@/lib/three-utils';

interface MugModelProps {
  texture: THREE.CanvasTexture | null;
}

export function MugModel({ texture }: MugModelProps) {
  // Carrega o modelo 3D da caneca a partir da pasta /public
  const gltf = useLoader(GLTFLoader, '/mug.glb');

  // useMemo é crucial aqui para otimização.
  // Ele garante que a lógica de aplicação da textura só será executada
  // se o modelo (gltf.scene) ou a textura (texture) mudarem.
  // Sem isso, a textura seria reprocessada em cada renderização, causando problemas de performance.
  const texturedModel = useMemo(() => {
    if (!texture) {
      // Se não houver textura, retorna o modelo original sem modificação.
      return gltf.scene.clone();
    }

    // É uma boa prática clonar o modelo. Isso evita modificar o objeto original
    // em cache e permite que você tenha múltiplas instâncias do mesmo modelo com texturas diferentes.
    const clonedModel = gltf.scene.clone();

    // Aplica a textura usando a nossa nova função utilitária
    applyTextureWithUVMapping(clonedModel, texture);

    return clonedModel;
  }, [gltf.scene, texture]);

  // <primitive /> é um componente do React Three Fiber que permite renderizar
  // um objeto Three.js (como nossa cena ou grupo de meshes) diretamente.
  // O `dispose={null}` é importante para evitar que o React descarte a geometria e o material
  // que podem ser compartilhados entre componentes.
  return <primitive object={texturedModel} />;
}