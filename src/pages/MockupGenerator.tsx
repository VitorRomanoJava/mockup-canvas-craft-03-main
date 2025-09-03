import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import mockupMug from "@/assets/mockup-mug.jpg";
import mockupTshirt from "@/assets/mockup-tshirt.jpg";
import mockupCap from "@/assets/mockup-cap.jpg";
import { 
  Upload, 
  Download, 
  Coffee, 
  Shirt, 
  HardHat, 
  RotateCw, 
  Move, 
  ZoomIn,
  ZoomOut,
  Save,
  Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MockupGenerator = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedProduct, setSelectedProduct] = useState("mug");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [designPosition, setDesignPosition] = useState({ x: 50, y: 50 });
  const [designSize, setDesignSize] = useState([70]);
  const [designRotation, setDesignRotation] = useState([0]);

  const products = {
    mug: {
      name: "Caneca",
      icon: Coffee,
      mockup: mockupMug,
      description: "Caneca branca 325ml"
    },
    tshirt: {
      name: "Camiseta",
      icon: Shirt,
      mockup: mockupTshirt, 
      description: "Camiseta básica 100% algodão"
    },
    cap: {
      name: "Boné",
      icon: HardHat,
      mockup: mockupCap,
      description: "Boné trucker ajustável"
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "Arquivo muito grande",
          description: "O arquivo deve ter no máximo 10MB",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        toast({
          title: "Upload realizado!",
          description: "Sua imagem foi carregada com sucesso"
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExport = () => {
    // Simulate export functionality
    toast({
      title: "Mockup exportado!",
      description: "Seu mockup foi salvo em alta qualidade"
    });
  };

  const handleSave = () => {
    // Simulate save functionality
    toast({
      title: "Mockup salvo!",
      description: "Projeto salvo na sua biblioteca"
    });
  };

  const resetDesign = () => {
    setDesignPosition({ x: 50, y: 50 });
    setDesignSize([70]);
    setDesignRotation([0]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-3xl md:text-4xl mb-2">
            Gerador de Mockups
          </h1>
          <p className="text-muted-foreground text-lg">
            Crie mockups profissionais em minutos
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Product Selection */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="w-5 h-5" />
                  <span>Escolha o Produto</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(products).map(([key, product]) => {
                  const Icon = product.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedProduct(key)}
                      className={`w-full p-4 rounded-lg border-2 transition-smooth text-left hover:scale-105 ${
                        selectedProduct === key
                          ? "border-primary bg-primary/5 shadow-glow"
                          : "border-border hover:border-accent"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          selectedProduct === key ? "gradient-primary" : "bg-muted"
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            selectedProduct === key ? "text-white" : "text-muted-foreground"
                          }`} />
                        </div>
                        <div>
                          <div className="font-semibold">{product.name}</div>
                          <div className="text-sm text-muted-foreground">{product.description}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Upload Section */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>Upload do Design</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-smooth cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {uploadedImage ? (
                    <div className="space-y-4">
                      <img 
                        src={uploadedImage} 
                        alt="Design preview" 
                        className="w-20 h-20 object-cover rounded-lg mx-auto"
                      />
                      <p className="text-sm text-muted-foreground">
                        Clique para alterar a imagem
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mx-auto">
                        <Upload className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Faça upload da sua imagem</p>
                        <p className="text-sm text-muted-foreground">
                          PNG, JPG até 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </CardContent>
            </Card>

            {/* Design Controls */}
            {uploadedImage && (
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Move className="w-5 h-5" />
                      <span>Ajustes do Design</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={resetDesign}>
                      <RotateCw className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Size Control */}
                  <div className="space-y-2">
                    <Label className="flex items-center space-x-2">
                      <ZoomIn className="w-4 h-4" />
                      <span>Tamanho: {designSize[0]}%</span>
                    </Label>
                    <Slider
                      value={designSize}
                      onValueChange={setDesignSize}
                      min={20}
                      max={150}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  {/* Rotation Control */}
                  <div className="space-y-2">
                    <Label className="flex items-center space-x-2">
                      <RotateCw className="w-4 h-4" />
                      <span>Rotação: {designRotation[0]}°</span>
                    </Label>
                    <Slider
                      value={designRotation}
                      onValueChange={setDesignRotation}
                      min={-180}
                      max={180}
                      step={15}
                      className="w-full"
                    />
                  </div>

                  {/* Position Controls */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Posição X</Label>
                      <Input
                        type="number"
                        value={designPosition.x}
                        onChange={(e) => setDesignPosition(prev => ({
                          ...prev, 
                          x: Number(e.target.value)
                        }))}
                        min="0"
                        max="100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Posição Y</Label>
                      <Input
                        type="number"
                        value={designPosition.y}
                        onChange={(e) => setDesignPosition(prev => ({
                          ...prev, 
                          y: Number(e.target.value)
                        }))}
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            {uploadedImage && (
              <div className="space-y-3">
                <Button onClick={handleSave} variant="outline" className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Projeto
                </Button>
                <Button onClick={handleExport} className="w-full btn-primary">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Mockup
                </Button>
              </div>
            )}
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-2">
            <Card className="card-elevated h-full">
              <CardHeader>
                <CardTitle>Preview do Mockup</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="aspect-square bg-gradient-subtle rounded-xl p-8 shadow-strong relative overflow-hidden">
                  {/* Mockup Background */}
                  <div className="w-full h-full bg-background rounded-lg border-2 border-dashed border-border flex items-center justify-center relative">
                    
                    {!uploadedImage ? (
                      <div className="w-full h-full relative">
                        <img 
                          src={products[selectedProduct].mockup} 
                          alt={`Mockup de ${products[selectedProduct].name}`}
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-lg text-center">
                            <h3 className="font-heading font-semibold text-lg mb-1">
                              {products[selectedProduct].name}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              Faça upload do seu design para ver o preview
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-full">
                        {/* Product Base */}
                        <img 
                          src={products[selectedProduct].mockup} 
                          alt={`Mockup de ${products[selectedProduct].name}`}
                          className="w-full h-full object-contain"
                        />
                        
                        {/* Uploaded Design Overlay */}
                        <div 
                          className="absolute inset-0 flex items-center justify-center pointer-events-none"
                          style={{
                            transform: `translate(${designPosition.x - 50}%, ${designPosition.y - 50}%)`
                          }}
                        >
                          <img
                            src={uploadedImage}
                            alt="Design overlay"
                            className="max-w-none drop-shadow-lg"
                            style={{
                              width: `${designSize[0]}%`,
                              transform: `rotate(${designRotation[0]}deg)`
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Preview Info */}
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Especificações do Mockup:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Produto: {products[selectedProduct].name}</li>
                    <li>• Qualidade: 4K (4000x4000px)</li>
                    <li>• Formato: PNG com transparência</li>
                    <li>• DPI: 300 (pronto para impressão)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MockupGenerator;