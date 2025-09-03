import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Download, 
  Trash2, 
  Coffee, 
  Shirt, 
  HardHat,
  Calendar,
  Star,
  Grid3X3,
  List,
  TrendingUp,
  Users,
  Clock
} from "lucide-react";

const Dashboard = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Simulated user data
  const user = {
    name: "Marina Silva",
    email: "marina@exemplo.com",
    plan: "Profissional",
    mockupsThisMonth: 127,
    totalMockups: 1834
  };

  // Simulated mockups data
  const mockups = [
    {
      id: 1,
      name: "Logo Café Premium",
      type: "mug",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
      thumbnail: "/mockup-mug.jpg",
      downloads: 15,
      favorite: true
    },
    {
      id: 2,
      name: "Camiseta Band Rock",
      type: "tshirt", 
      createdAt: "2024-01-14",
      updatedAt: "2024-01-14",
      thumbnail: "/mockup-tshirt.jpg",
      downloads: 8,
      favorite: false
    },
    {
      id: 3,
      name: "Boné Streetwear",
      type: "cap",
      createdAt: "2024-01-13",
      updatedAt: "2024-01-14",
      thumbnail: "/mockup-cap.jpg",
      downloads: 23,
      favorite: true
    },
    {
      id: 4,
      name: "Caneca Corporativa", 
      type: "mug",
      createdAt: "2024-01-12",
      updatedAt: "2024-01-12",
      thumbnail: "/mockup-mug.jpg",
      downloads: 12,
      favorite: false
    },
    {
      id: 5,
      name: "T-shirt Motivacional",
      type: "tshirt",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-11", 
      thumbnail: "/mockup-tshirt.jpg",
      downloads: 31,
      favorite: true
    },
    {
      id: 6,
      name: "Boné Esportivo",
      type: "cap",
      createdAt: "2024-01-09",
      updatedAt: "2024-01-09",
      thumbnail: "/mockup-cap.jpg",
      downloads: 6,
      favorite: false
    }
  ];

  const getProductIcon = (type: string) => {
    const icons = {
      mug: Coffee,
      tshirt: Shirt,
      cap: HardHat
    };
    return icons[type] || Coffee;
  };

  const getProductName = (type: string) => {
    const names = {
      mug: "Caneca",
      tshirt: "Camiseta", 
      cap: "Boné"
    };
    return names[type] || "Produto";
  };

  const filteredMockups = mockups.filter(mockup =>
    mockup.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    {
      title: "Mockups Este Mês",
      value: user.mockupsThisMonth,
      icon: TrendingUp,
      description: "+23% vs mês anterior"
    },
    {
      title: "Total de Mockups",
      value: user.totalMockups,
      icon: Grid3X3,
      description: "Desde o início"
    },
    {
      title: "Downloads",
      value: mockups.reduce((sum, m) => sum + m.downloads, 0),
      icon: Download,
      description: "Total de downloads"
    },
    {
      title: "Favoritos",
      value: mockups.filter(m => m.favorite).length,
      icon: Star,
      description: "Mockups favoritos"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-3xl md:text-4xl mb-2">
            Olá, {user.name}! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Bem-vindo de volta ao seu painel. Continue criando mockups incríveis!
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="card-elevated">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-2xl mb-1">
                    {stat.value.toLocaleString()}
                  </h3>
                  <p className="text-sm font-medium mb-1">{stat.title}</p>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Actions & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/generator">
              <Button className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Novo Mockup
              </Button>
            </Link>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
          
          <div className="flex items-center space-x-4 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar mockups..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex rounded-lg border border-border p-1">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mockups Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMockups.map((mockup) => {
              const Icon = getProductIcon(mockup.type);
              return (
                <Card key={mockup.id} className="card-elevated group hover:scale-105 transition-smooth">
                  <CardContent className="p-0">
                    {/* Thumbnail */}
                    <div className="aspect-square bg-gradient-subtle p-4 rounded-t-lg">
                      <div className="w-full h-full bg-muted/30 rounded-lg flex items-center justify-center relative">
                        <Icon className="w-16 h-16 text-muted-foreground" />
                        
                        {/* Actions Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-smooth rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="secondary">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="secondary">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Favorite */}
                        {mockup.favorite && (
                          <div className="absolute top-2 right-2">
                            <Star className="w-4 h-4 fill-primary text-primary" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Info */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold truncate mr-2">{mockup.name}</h3>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <Badge variant="secondary" className="text-xs">
                          {getProductName(mockup.type)}
                        </Badge>
                        <span>{mockup.downloads} downloads</span>
                      </div>
                      
                      <div className="flex items-center space-x-1 mt-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(mockup.createdAt).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Meus Mockups</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {filteredMockups.map((mockup) => {
                  const Icon = getProductIcon(mockup.type);
                  return (
                    <div key={mockup.id} className="p-6 hover:bg-muted/30 transition-smooth">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-subtle rounded-lg flex items-center justify-center">
                            <Icon className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <div>
                            <h3 className="font-semibold flex items-center space-x-2">
                              <span>{mockup.name}</span>
                              {mockup.favorite && (
                                <Star className="w-4 h-4 fill-primary text-primary" />
                              )}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <Badge variant="secondary" className="text-xs">
                                {getProductName(mockup.type)}
                              </Badge>
                              <span className="flex items-center space-x-1">
                                <Download className="w-3 h-3" />
                                <span>{mockup.downloads}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3" />
                                <span>{new Date(mockup.createdAt).toLocaleDateString('pt-BR')}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {filteredMockups.length === 0 && (
          <Card className="card-elevated">
            <CardContent className="p-16 text-center">
              <div className="w-20 h-20 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-2">
                Nenhum mockup encontrado
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm 
                  ? `Nenhum resultado para "${searchTerm}"`
                  : "Você ainda não criou nenhum mockup"
                }
              </p>
              <Link to="/generator">
                <Button className="btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Primeiro Mockup
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="font-heading font-bold text-2xl mb-6">Ações Rápidas</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="card-elevated hover:scale-105 transition-smooth cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Novo Projeto</h3>
                <p className="text-sm text-muted-foreground">
                  Comece um novo mockup do zero
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-elevated hover:scale-105 transition-smooth cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Biblioteca</h3>
                <p className="text-sm text-muted-foreground">
                  Explore templates prontos
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-elevated hover:scale-105 transition-smooth cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Recentes</h3>
                <p className="text-sm text-muted-foreground">
                  Continue projetos anteriores
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;