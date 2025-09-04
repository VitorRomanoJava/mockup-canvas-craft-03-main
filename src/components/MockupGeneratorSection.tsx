// src/components/MockupGeneratorSection.tsx

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mug3DViewer } from "@/components/3d/Mug3DViewer";
import { Download } from "lucide-react";
import html2canvas from 'html2canvas';

const MockupGeneratorSection = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [customText, setCustomText] = useState("Seu Texto Aqui");
  const [textColor, setTextColor] = useState("#000000");
  const [textFont, setTextFont] = useState("Arial");
  const [textSize, setTextSize] = useState(48);
  
  // As variáveis de estado para designSize, designPosition e designRotation foram removidas.

  const fileInputRef = useRef<HTMLInputElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  
  // NOVO: Armazena a função de trigger da exportação
  const [exportTrigger, setExportTrigger] = useState<(() => string | undefined) | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    // Verifica se a função de trigger foi registrada pelo Mug3DViewer
    if (exportTrigger) {
      // Chama a função para obter o Data URL da cena 3D
      const image = exportTrigger();
      if (image) {
        // Cria um link temporário e simula o clique para baixar a imagem
        const link = document.createElement('a');
        link.href = image;
        link.download = 'mockup-caneca.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } else {
      console.error("A função de exportação não está pronta.");
    }
  };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Coluna do Visualizador 3D */}
      <div ref={viewerRef} className="lg:col-span-2 h-[400px] md:h-[600px] bg-muted rounded-lg border">
        <Mug3DViewer
          uploadedImage={uploadedImage}
          customText={customText}
          textColor={textColor}
          textFont={textFont}
          textSize={textSize}
          // As props obsoletas foram removidas daqui
          onExportReady={setExportTrigger} // Passa a função para receber o trigger
        />
      </div>

      {/* Coluna de Controles */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Personalize seu Mockup</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="imagem">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="imagem">Imagem</TabsTrigger>
                <TabsTrigger value="texto">Texto</TabsTrigger>
              </TabsList>
              <TabsContent value="imagem" className="pt-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="upload-image">Upload de Imagem</Label>
                    <Input
                      id="upload-image"
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      className="mt-1"
                    />
                  </div>
                  <Button onClick={() => setUploadedImage(null)} variant="outline" className="w-full">
                    Remover Imagem
                  </Button>
                  
                  {/* OS SLIDERS DE CONTROLE DE POSIÇÃO, TAMANHO E ROTAÇÃO FORAM REMOVIDOS */}

                </div>
              </TabsContent>
              <TabsContent value="texto" className="pt-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="custom-text">Texto</Label>
                    <Input
                      id="custom-text"
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="text-color">Cor</Label>
                      <Input
                        id="text-color"
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="p-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="text-font">Fonte</Label>
                      <Select value={textFont} onValueChange={setTextFont}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a fonte" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Arial">Arial</SelectItem>
                          <SelectItem value="Verdana">Verdana</SelectItem>
                          <SelectItem value="Georgia">Georgia</SelectItem>
                          <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                          <SelectItem value="Courier New">Courier New</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="text-size">Tamanho da Fonte</Label>
                    <Slider
                      id="text-size"
                      min={12}
                      max={128}
                      step={1}
                      value={[textSize]}
                      onValueChange={(value) => setTextSize(value[0])}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6">
              <Button onClick={handleDownload} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Baixar Mockup
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MockupGeneratorSection;