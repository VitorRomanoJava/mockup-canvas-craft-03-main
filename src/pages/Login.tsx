import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import { 
  Sparkles, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Chrome,
  Github,
  Apple
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
    acceptTerms: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast({
        title: "Senhas não coincidem",
        description: "As senhas devem ser iguais",
        variant: "destructive"
      });
      return;
    }

    if (!isLogin && !formData.acceptTerms) {
      toast({
        title: "Aceite os termos",
        description: "Você deve aceitar os termos para continuar",
        variant: "destructive"
      });
      return;
    }

    // Simulate authentication
    toast({
      title: isLogin ? "Login realizado!" : "Conta criada!",
      description: isLogin 
        ? "Bem-vindo de volta ao MockupCraft" 
        : "Sua conta foi criada com sucesso"
    });
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `Login com ${provider}`,
      description: "Redirecionando para autenticação..."
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto">
          
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="font-heading font-bold text-2xl">MockupCraft</span>
            </Link>
            <h1 className="font-heading font-bold text-3xl mb-2">
              {isLogin ? "Bem-vindo de Volta" : "Criar Conta"}
            </h1>
            <p className="text-muted-foreground">
              {isLogin 
                ? "Entre na sua conta para continuar criando" 
                : "Junte-se a milhares de criadores"}
            </p>
          </div>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-center">
                {isLogin ? "Fazer Login" : "Criar Conta Grátis"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Social Login */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSocialLogin("Google")}
                >
                  <Chrome className="w-4 h-4 mr-2" />
                  Continuar com Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSocialLogin("GitHub")}
                >
                  <Github className="w-4 h-4 mr-2" />
                  Continuar com GitHub
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSocialLogin("Apple")}
                >
                  <Apple className="w-4 h-4 mr-2" />
                  Continuar com Apple
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Ou continue com email
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name (only for register) */}
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required={!isLogin}
                    />
                  </div>
                )}

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Sua senha"
                      className="pl-10 pr-10"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password (only for register) */}
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirme sua senha"
                        className="pl-10"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                {/* Checkboxes */}
                {isLogin ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="rememberMe"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) => handleInputChange("rememberMe", checked)}
                      />
                      <Label htmlFor="rememberMe" className="text-sm">
                        Lembrar de mim
                      </Label>
                    </div>
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      Esqueci minha senha
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) => handleInputChange("acceptTerms", checked)}
                    />
                    <Label htmlFor="acceptTerms" className="text-sm">
                      Concordo com os{" "}
                      <Link to="/terms" className="text-primary hover:underline">
                        Termos de Uso
                      </Link>{" "}
                      e{" "}
                      <Link to="/privacy" className="text-primary hover:underline">
                        Política de Privacidade
                      </Link>
                    </Label>
                  </div>
                )}

                {/* Submit Button */}
                <Button type="submit" className="w-full btn-primary">
                  {isLogin ? "Entrar" : "Criar Conta"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>

              {/* Switch Mode */}
              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
                </span>{" "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary hover:underline font-medium"
                >
                  {isLogin ? "Criar conta" : "Fazer login"}
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Ao se registrar, você ganha acesso a:
            </p>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 gradient-primary rounded-full"></div>
                <span>Gerador de mockups ilimitado</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 gradient-primary rounded-full"></div>
                <span>Biblioteca de templates premium</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 gradient-primary rounded-full"></div>
                <span>Exportação em alta qualidade</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;