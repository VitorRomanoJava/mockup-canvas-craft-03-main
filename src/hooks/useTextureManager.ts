import * as THREE from 'three';
import { useState, useEffect } from 'react';

interface UseTextureManagerProps {
  imageSrc: string | null;
  text: string;
  textColor?: string;
  fontFamily?: string;
  fontSize?: number;
}

export function useTextureManager({ imageSrc, text, textColor, fontFamily, fontSize }: UseTextureManagerProps) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    // Se não há imagem nem texto, não há textura.
    if (!imageSrc && !text) {
      setTexture(null);
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas de alta resolução para uma textura nítida
    const canvasSize = 512;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const canvasTexture = new THREE.CanvasTexture(canvas);
    canvasTexture.colorSpace = THREE.SRGBColorSpace;

    if (imageSrc) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        // Desenha a imagem centralizada no canvas
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        
        canvasTexture.needsUpdate = true;
        setTexture(canvasTexture);
      };
      img.src = imageSrc;
    } else if (text) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = textColor || '#000000';
        ctx.font = `${fontSize || 48}px ${fontFamily || 'sans-serif'}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Lógica simples para quebra de linha (pode ser aprimorada)
        const words = text.split(' ');
        let line = '';
        let y = canvasSize / 2;
        const lineHeight = (fontSize || 48) * 1.2;
        y -= (text.split('\n').length -1) * (lineHeight / 2);

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > canvasSize && n > 0) {
                ctx.fillText(line, canvasSize / 2, y);
                line = words[n] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, canvasSize / 2, y);

        canvasTexture.needsUpdate = true;
        setTexture(canvasTexture);
    }

    // Cleanup
    return () => {
      texture?.dispose();
    };

  }, [imageSrc, text, textColor, fontFamily, fontSize]);

  return texture;
}