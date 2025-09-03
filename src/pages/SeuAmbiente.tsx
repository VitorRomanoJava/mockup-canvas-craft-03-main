import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";

const SeuAmbiente = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-8">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6 text-gradient">
          Seu Ambiente
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Em breve, este será o seu espaço de trabalho personalizado para criar e gerenciar 
          todos os seus projetos. Continue explorando o que nossa plataforma pode fazer por você.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="outline" size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Button>
          </Link>
          <Link to="/pricing">
            <Button size="lg" className="btn-primary">
              Ver Planos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SeuAmbiente;