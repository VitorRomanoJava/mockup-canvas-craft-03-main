import * as THREE from 'three';
import { useGLTF, Decal } from '@react-three/drei';

interface MugModelProps {
  texture: THREE.Texture | null;
  designSize: number;
  designPosition: { x: number; y: number };
  designRotation: number;
}

export function MugModel({ texture, designSize, designPosition, designRotation }: MugModelProps) {
  const { nodes } = useGLTF('/mug.glb');

  // ✅ CORREÇÃO DEFINITIVA USANDO O NOME EXATO DO CONSOLE
  // Usamos colchetes ['...'] porque o nome contém hífens.
  const mugMesh = nodes['tripo_node_4a5d8195-32f3-455f-8a5b-690a656928d3'] as THREE.Mesh;

  const rotationRad = THREE.MathUtils.degToRad(designRotation);

  const position = new THREE.Vector3(
    (designPosition.x - 50) / 100 * 0.15,
    (designPosition.y - 50) / 100 * 0.2 + 0.1,
    0.1
  );

  const scale = designSize / 100 * 0.18;

  return (
    <mesh
      geometry={mugMesh.geometry}
      material={mugMesh.material}
      castShadow
      receiveShadow
    >
      {texture && (
        <Decal
          position={position}
          rotation={[0, 0, rotationRad]}
          scale={[scale, scale, scale]}
          map={texture}
        />
      )}
    </mesh>
  );
}

useGLTF.preload('/mug.glb');