import * as THREE from 'three';

/**
 * Aplica uma textura a um objeto Mesh dentro de um modelo 3D, utilizando mapeamento UV.
 * A função percorre a cena do modelo e substitui o material do primeiro Mesh
 * que encontrar e que possua coordenadas UV.
 *
 * @param model O objeto Group ou Scene do Three.js que contém o modelo 3D.
 * @param texture A textura (THREE.Texture) já carregada que será aplicada.
 * @param materialConfig Configurações adicionais para o material (opcional).
 * @returns O modelo modificado com a textura aplicada.
 */
export function applyTextureWithUVMapping(
  model: THREE.Object3D,
  texture: THREE.Texture,
  materialConfig?: { color?: THREE.ColorRepresentation; roughness?: number; metalness?: number }
): THREE.Object3D {
  if (!model || !texture) {
    console.warn("Modelo 3D ou textura não fornecidos para `applyTextureWithUVMapping`.");
    return model;
  }

  // Garante que a textura será atualizada na GPU
  texture.needsUpdate = true;

  const newMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    color: materialConfig?.color ?? 0xffffff,
    roughness: materialConfig?.roughness ?? 0.7,
    metalness: materialConfig?.metalness ?? 0.0,
    transparent: true, // Habilita transparência para evitar fundo preto em PNGs com áreas vazias
  });

  let meshFound = false;

  model.traverse((child) => {
    // A condição '!meshFound' impede que a textura seja aplicada a múltiplos meshes.
    // Isso garante que apenas a parte principal da caneca (o primeiro mesh com UV) seja texturizada.
    // Se no futuro o modelo tiver várias partes que precisam da mesma textura, essa lógica pode ser ajustada.
    if (!meshFound && child instanceof THREE.Mesh && child.geometry.attributes.uv) {
      child.material = newMaterial;
      meshFound = true; // Marca que o mesh principal foi encontrado e texturizado
    }
  });

  if (!meshFound) {
    console.warn("Nenhum mesh com coordenadas UV foi encontrado no modelo para aplicar a textura.");
  }

  return model;
}