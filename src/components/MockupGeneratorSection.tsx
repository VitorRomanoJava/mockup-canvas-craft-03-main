import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Save,
  Type,
  Sparkles,
  Palette
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MockupGeneratorSection = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [selectedProduct, setSelectedProduct] = useState("mug");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [customText, setCustomText] = useState("");
  const [designPosition, setDesignPosition] = useState({ x: 50, y: 50 });
  const [designSize, setDesignSize] = useState([70]);
  const [designRotation, setDesignRotation] = useState([0]);
  const [textPosition, setTextPosition] = useState({ x: 50, y: 70 });
  const [textSize, setTextSize] = useState([24]);
  const [textColor, setTextColor] = useState("#000000");
  const [textFont, setTextFont] = useState("Poppins");

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

  const brandColors = [
    { name: "Preto", value: "#000000" },
    { name: "Primário", value: "#4A00E0" },
    { name: "Branco", value: "#FFFFFF" },
    { name: "Accent", value: "#8E2DE2" },
    { name: "Vermelho", value: "#EF4444" }
  ];

  const googleFonts = [
    "Poppins",
    "Inter", 
    "Montserrat",
    "Lato",
    "Roboto",
    "Oswald",
    "Playfair Display"
  ];

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

  const handleExport = async () => {
    const previewElement = document.querySelector('.mockup-preview') as HTMLElement;
    if (!previewElement) return;

    try {
      // Import html2canvas dynamically
      const html2canvas = (await import('html2canvas')).default;
      
      const canvas = await html2canvas(previewElement, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true
      });

      // Create download link
      const link = document.createElement('a');
      const timestamp = new Date().toISOString().split('T')[0];
      link.download = `mockup_${products[selectedProduct].name.toLowerCase()}_${timestamp}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      toast({
        title: "Mockup exportado!",
        description: "Seu mockup foi baixado em alta qualidade"
      });
    } catch (error) {
      toast({
        title: "Erro ao exportar",
        description: "Tente novamente em alguns segundos",
        variant: "destructive"
      });
    }
  };

  const handleSave = () => {
    toast({
      title: "Mockup salvo!",
      description: "Projeto salvo na sua biblioteca"
    });
  };

  const resetDesign = () => {
    setDesignPosition({ x: 50, y: 50 });
    setDesignSize([70]);
    setDesignRotation([0]);
    setTextPosition({ x: 50, y: 70 });
    setTextSize([24]);
    setTextColor("#000000");
    setTextFont("Poppins");
    setCustomText("");
  };

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl">
              Experimente Agora
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Crie seu primeiro mockup diretamente aqui. Upload, personalize e exporte em segundos!
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Controls Panel */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Product Selection */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-lg">Escolha o Produto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
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
                             <div className="font-semibold text-sm">{product.name}</div>
                             <div className="text-xs text-muted-foreground">{product.description}</div>
                           </div>
                         </div>
                       </button>
                     );
                   })}
                   
                    {/* Ver mais produtos button */}
                    <Link 
                      to="/seu-ambiente"
                      className="w-full p-4 rounded-lg gradient-primary text-white hover:shadow-glow transition-smooth text-center hover:scale-105 font-semibold"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm">Ver mais produtos</span>
                      </div>
                    </Link>
                </CardContent>
              </Card>

              {/* Upload Section */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <Upload className="w-5 h-5" />
                    <span>Upload do Design</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-smooth cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {uploadedImage ? (
                      <div className="space-y-3">
                        <img 
                          src={uploadedImage} 
                          alt="Design preview" 
                          className="w-16 h-16 object-cover rounded-lg mx-auto"
                        />
                        <p className="text-xs text-muted-foreground">
                          Clique para alterar
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto">
                          <Upload className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm mb-1">Faça upload</p>
                          <p className="text-xs text-muted-foreground">PNG, JPG até 10MB</p>
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

              {/* Text Section */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <Type className="w-5 h-5" />
                    <span>Texto Personalizado</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Digite seu texto..."
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    className="mb-4"
                  />
                   {customText && (
                     <div className="space-y-4">
                       <div className="space-y-2">
                         <Label>Tamanho: {textSize[0]}px</Label>
                         <Slider
                           value={textSize}
                           onValueChange={setTextSize}
                           min={12}
                           max={48}
                           step={2}
                         />
                       </div>
                       
                       <div className="space-y-2">
                         <Label>Posição X: {textPosition.x}%</Label>
                         <Slider
                           value={[textPosition.x]}
                           onValueChange={(value) => setTextPosition(prev => ({ ...prev, x: value[0] }))}
                           min={0}
                           max={100}
                           step={5}
                         />
                       </div>
                       
                       <div className="space-y-2">
                         <Label>Posição Y: {textPosition.y}%</Label>
                         <Slider
                           value={[textPosition.y]}
                           onValueChange={(value) => setTextPosition(prev => ({ ...prev, y: value[0] }))}
                           min={0}
                           max={100}
                           step={5}
                         />
                       </div>
                       
                       <div className="space-y-2">
                         <Label className="flex items-center space-x-2">
                           <Palette className="w-4 h-4" />
                           <span>Cor do Texto</span>
                         </Label>
                         <div className="flex gap-2 flex-wrap">
                           {brandColors.map((color) => (
                             <button
                               key={color.value}
                               onClick={() => setTextColor(color.value)}
                               className={`w-8 h-8 rounded-lg border-2 transition-smooth hover:scale-110 ${
                                 textColor === color.value ? 'border-primary' : 'border-border'
                               }`}
                               style={{ backgroundColor: color.value }}
                               title={color.name}
                             />
                           ))}
                           <input
                             type="color"
                             value={textColor}
                             onChange={(e) => setTextColor(e.target.value)}
                             className="w-8 h-8 rounded-lg border-2 border-border cursor-pointer"
                           />
                         </div>
                       </div>
                       
                       <div className="space-y-2">
                         <Label>Fonte</Label>
                         <Select value={textFont} onValueChange={setTextFont}>
                           <SelectTrigger>
                             <SelectValue />
                           </SelectTrigger>
                           <SelectContent>
                             {googleFonts.map((font) => (
                               <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                                 {font}
                               </SelectItem>
                             ))}
                           </SelectContent>
                         </Select>
                       </div>
                     </div>
                   )}
                </CardContent>
              </Card>

              {/* Design Controls */}
              {(uploadedImage || customText) && (
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-lg">
                      <div className="flex items-center space-x-2">
                        <Move className="w-5 h-5" />
                        <span>Ajustes</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={resetDesign}>
                        <RotateCw className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {uploadedImage && (
                      <>
                        <div className="space-y-2">
                          <Label>Tamanho: {designSize[0]}%</Label>
                          <Slider
                            value={designSize}
                            onValueChange={setDesignSize}
                            min={20}
                            max={150}
                            step={5}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Rotação: {designRotation[0]}°</Label>
                          <Slider
                            value={designRotation}
                            onValueChange={setDesignRotation}
                            min={-180}
                            max={180}
                            step={15}
                          />
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              {(uploadedImage || customText) && (
                <div className="space-y-3">
                  <Button onClick={handleSave} variant="outline" className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Salvar
                  </Button>
                  <Button onClick={handleExport} className="w-full btn-primary">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar PNG
                  </Button>
                </div>
              )}
            </div>

            {/* Preview Panel */}
            <div className="lg:col-span-2">
              <Card className="card-elevated h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Preview do Mockup</CardTitle>
                </CardHeader>
                 <CardContent className="p-6">
                   <div className="aspect-square bg-gradient-subtle rounded-xl p-6 shadow-strong relative overflow-hidden mockup-preview">
                     <div className="w-full h-full bg-background rounded-lg flex items-center justify-center relative">
                      
                      {!uploadedImage && !customText ? (
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
                                Faça upload ou adicione texto para começar
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="relative w-full h-full">
                          {/* Canvas for export functionality */}
                          <canvas
                            ref={canvasRef}
                            width={800}
                            height={800}
                            className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
                          />
                          
                          {/* Product Base */}
                          <img 
                            src={products[selectedProduct].mockup} 
                            alt={`Mockup de ${products[selectedProduct].name}`}
                            className="w-full h-full object-contain"
                          />
                          
                          {/* Uploaded Design Overlay */}
                          {uploadedImage && (
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
                          )}
                          
                          {/* Text Overlay */}
                          {customText && (
                            <div 
                              className="absolute inset-0 flex items-center justify-center pointer-events-none"
                              style={{
                                transform: `translate(${textPosition.x - 50}%, ${textPosition.y - 50}%)`
                              }}
                            >
                               <div
                                 className="font-bold text-center drop-shadow-lg select-none"
                                 style={{
                                   fontSize: `${textSize[0]}px`,
                                   color: textColor,
                                   fontFamily: textFont,
                                   textShadow: textColor === '#FFFFFF' ? '2px 2px 4px rgba(0,0,0,0.8)' : '2px 2px 4px rgba(0,0,0,0.3)'
                                 }}
                               >
                                 {customText}
                               </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Preview Info */}
                  <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Especificações:</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Produto: {products[selectedProduct].name}</li>
                      <li>• Qualidade: 4K (800x800px preview)</li>
                      <li>• Formato: PNG com transparência</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MockupGeneratorSection;