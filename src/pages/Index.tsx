import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroMockups from "@/assets/hero-mockups.jpg";
import mockupMug from "@/assets/mockup-mug.jpg";
import mockupTshirt from "@/assets/mockup-tshirt.jpg";
import mockupCap from "@/assets/mockup-cap.jpg";
import MockupGeneratorSection from "@/components/MockupGeneratorSection";
import { 
  Sparkles, 
  Zap, 
  Download, 
  Users, 
  Check, 
  Coffee, 
  Shirt, 
  HardHat,
  Upload,
  Settings,
  ArrowRight,
  Star
} from "lucide-react";

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState("mug");

  const products = {
    mug: {
      name: "Caneca",
      icon: Coffee,
      mockup: mockupMug
    },
    tshirt: {
      name: "Camiseta", 
      icon: Shirt,
      mockup: mockupTshirt
    },
    cap: {
      name: "Boné",
      icon: HardHat,
      mockup: mockupCap
    }
  };

  const benefits = [
    {
      icon: Zap,
      title: "Rápido & Fácil",
      description: "Crie mockups profissionais em segundos, não horas"
    },
    {
      icon: Download,
      title: "Alta Qualidade",
      description: "Exportação em até 4K para impressão profissional"
    },
    {
      icon: Users,
      title: "Sem Limitações",
      description: "Use quantas vezes quiser, para qualquer projeto"
    },
    {
      icon: Settings,
      title: "Sistema Personalizado",
      description: "Sistema personalizado, feito exclusivamente para o seu negócio"
    }
  ];

  const steps = [
    {
      icon: Upload,
      title: "Faça Upload",
      description: "Envie seu design ou logo"
    },
    {
      icon: Settings,
      title: "Personalize",
      description: "Ajuste posição e tamanho"
    },
    {
      icon: Download,
      title: "Baixe",
      description: "Exporte em alta qualidade"
    }
  ];

  const testimonials = [
    {
      name: "Marina Silva",
      role: "Designer Freelancer",
      content: "Revolucionou meu workflow! Consigo entregar mockups incríveis para meus clientes em minutos.",
      avatar: "/avatar-1.jpg",
      rating: 5
    },
    {
      name: "Carlos Mendes", 
      role: "E-commerce Owner",
      content: "A qualidade dos mockups é impressionante. Minhas vendas aumentaram 40% após usar o MockupCraft.",
      avatar: "/avatar-2.jpg",
      rating: 5
    },
    {
      name: "Ana Costa",
      role: "Agência de Marketing",
      content: "Ferramenta essencial para nossa agência. Economizamos horas de trabalho toda semana.",
      avatar: "/avatar-3.jpg",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "Posso usar os mockups para fins comerciais?",
      answer: "Sim! Todos os mockups podem ser usados para projetos pessoais e comerciais sem restrições."
    },
    {
      question: "Qual a qualidade máxima de exportação?",
      answer: "Exportamos em até 4K (4000x4000 pixels) com 300 DPI, perfeito para impressão profissional."
    },
    {
      question: "Preciso de conhecimento técnico?",
      answer: "Não! Nossa interface é intuitiva e funciona como um simples arrasta e solta."
    },
    {
      question: "Posso cancelar minha assinatura?",
      answer: "Claro! Você pode cancelar a qualquer momento, sem taxas ou burocracias."
    }
  ];

  const pricingPlans = [
    {
      name: "Básico",
      price: "R$ 29",
      period: "/mês",
      description: "Para freelancers e pequenos projetos",
      features: [
        "50 mockups por mês",
        "Exportação até 2K",
        "3 tipos de produtos",
        "Suporte por email"
      ]
    },
    {
      name: "Profissional",
      price: "R$ 59", 
      period: "/mês",
      description: "Para designers e agências",
      features: [
        "Mockups ilimitados",
        "Exportação até 4K",
        "Todos os produtos",
        "Suporte prioritário",
        "Novos produtos mensalmente"
      ],
      popular: true
    },
    {
      name: "Empresarial",
      price: "R$ 199",
      period: "/mês", 
      description: "Para grandes equipes",
      features: [
        "Tudo do Profissional",
        "Múltiplos usuários",
        "API personalizada",
        "Mockups exclusivos",
        "Gerente de conta dedicado"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        
        {/* Hero Image Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroMockups} 
            alt="Professional mockups showcase" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl mb-6 animate-fade-in">
              Crie Mockups
              <span className="text-gradient"> Profissionais</span>
              <br />em Segundos
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in">
              Transforme suas ideias em apresentações impressionantes com nosso gerador de mockups 
              para canecas, camisetas e bonés. Simples, rápido e profissional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
              <Link to="/generator">
                <Button size="lg" className="btn-primary text-lg px-8 py-4">
                  Começar Grátis
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  Ver Preços
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Por Que MockupCraft?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A ferramenta mais completa e fácil de usar para criação de mockups profissionais
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">{benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="card-elevated hover:scale-105 transition-smooth">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-heading font-semibold text-xl mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mockup Generator */}
      <MockupGeneratorSection />


      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              O Que Nossos Usuários Dizem
            </h2>
            <p className="text-lg text-muted-foreground">
              Milhares de profissionais confiam no MockupCraft
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-elevated">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Planos Para Todo Tipo de Projeto
            </h2>
            <p className="text-lg text-muted-foreground">
              Escolha o plano perfeito para suas necessidades
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`card-elevated ${
                plan.popular ? "border-primary shadow-glow scale-105" : ""
              }`}>
                <CardContent className="p-8 text-center">
                  {plan.popular && (
                    <div className="gradient-primary text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                      Mais Popular
                    </div>
                  )}
                  <h3 className="font-heading font-bold text-2xl mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    {plan.description}
                  </p>
                  <ul className="space-y-3 mb-8 text-left">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-success flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={plan.popular ? "btn-primary w-full" : "btn-secondary w-full"}
                  >
                    Começar Agora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-muted-foreground">
              Esclarecemos suas principais dúvidas
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="card-elevated px-6"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
            Pronto Para Criar Mockups Incríveis?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de designers e empreendedores que já transformaram 
            seus projetos com o MockupCraft
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/generator">
              <Button size="lg" className="btn-primary text-lg px-8 py-4">
                Começar Gratuitamente
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Ver Preços
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;