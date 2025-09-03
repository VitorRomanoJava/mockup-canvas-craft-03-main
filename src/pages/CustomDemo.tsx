import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Users, 
  TrendingUp, 
  DollarSign, 
  FileImage, 
  BarChart3, 
  Settings, 
  User,
  Coffee,
  Shirt,
  HardHat,
  Download
} from "lucide-react";

const CustomDemo = () => {
  const stats = [
    {
      icon: FileImage,
      title: "Mockups Criados",
      value: "1,247",
      change: "+12%"
    },
    {
      icon: Users,
      title: "Usuários Ativos",
      value: "89",
      change: "+5%"
    },
    {
      icon: DollarSign,
      title: "Receita Mensal",
      value: "R$ 24.650",
      change: "+18%"
    },
    {
      icon: TrendingUp,
      title: "Taxa de Conversão",
      value: "3.2%",
      change: "+0.8%"
    }
  ];

  const sidebarItems = [
    { icon: BarChart3, name: "Dashboard", active: true },
    { icon: FileImage, name: "Mockups", count: "1.2k" },
    { icon: Users, name: "Usuários", count: "89" },
    { icon: BarChart3, name: "Relatórios" },
    { icon: Settings, name: "Configurações" }
  ];

  const recentMockups = [
    {
      product: "Caneca",
      icon: Coffee,
      client: "Café Expresso Ltd",
      date: "Hoje, 14:30",
      status: "Aprovado"
    },
    {
      product: "Camiseta",
      icon: Shirt,
      client: "Fashion Brand Co",
      date: "Hoje, 12:15",
      status: "Pendente"
    },
    {
      product: "Boné",
      icon: HardHat,
      client: "Sports Team Inc",
      date: "Ontem, 16:45",
      status: "Aprovado"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Simples */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-smooth">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl">Sistema Personalizado</span>
            </Link>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium">João Silva</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-card border-r border-border h-screen sticky top-16">
          <div className="p-6">
            <nav className="space-y-2">
              {sidebarItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-smooth text-left ${
                      item.active 
                        ? "bg-primary/10 text-primary border border-primary/20" 
                        : "hover:bg-accent text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    {item.count && (
                      <span className="text-xs bg-muted px-2 py-1 rounded-full">
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header do Dashboard */}
            <div className="mb-8">
              <h1 className="font-heading font-bold text-3xl mb-2">
                Dashboard Personalizado
              </h1>
              <p className="text-muted-foreground">
                Visão geral do seu sistema de mockups exclusivo
              </p>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="card-elevated">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {stat.title}
                          </p>
                          <p className="text-2xl font-bold">
                            {stat.value}
                          </p>
                          <p className="text-sm text-success mt-1">
                            {stat.change} vs mês anterior
                          </p>
                        </div>
                        <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Mockups Recentes */}
              <div className="lg:col-span-2">
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Mockups Recentes</span>
                      <Button size="sm" className="btn-primary">
                        <FileImage className="w-4 h-4 mr-2" />
                        Criar Novo
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentMockups.map((mockup, index) => {
                        const Icon = mockup.icon;
                        return (
                          <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-smooth">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-semibold">{mockup.product}</h4>
                                <p className="text-sm text-muted-foreground">{mockup.client}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">{mockup.date}</p>
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                mockup.status === "Aprovado" 
                                  ? "bg-success/10 text-success"
                                  : "bg-warning/10 text-warning"
                              }`}>
                                {mockup.status}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Ações Rápidas */}
              <div>
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle>Ações Rápidas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full btn-primary justify-start">
                      <FileImage className="w-4 h-4 mr-2" />
                      Novo Mockup
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Ver Relatórios
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Exportar Dados
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="w-4 h-4 mr-2" />
                      Configurações
                    </Button>
                  </CardContent>
                </Card>

                {/* Info do Sistema */}
                <Card className="card-elevated mt-6">
                  <CardHeader>
                    <CardTitle>Sistema Personalizado</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Este é um exemplo de como ficaria seu painel exclusivo com funcionalidades customizadas para seu negócio.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Versão:</span>
                        <span className="font-medium">2.1.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Uptime:</span>
                        <span className="font-medium text-success">99.9%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Suporte:</span>
                        <span className="font-medium">24/7</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDemo;