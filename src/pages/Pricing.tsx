import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, X, Zap, Crown, Building, ArrowRight, Sparkles } from "lucide-react";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Básico",
      icon: Zap,
      description: "Perfeito para freelancers e projetos pessoais",
      monthlyPrice: 29,
      annualPrice: 290,
      features: [
        { name: "50 mockups por mês", included: true },
        { name: "Exportação até 2K", included: true },
        { name: "3 tipos de produtos", included: true },
        { name: "Suporte por email", included: true },
        { name: "Biblioteca de templates", included: true },
        { name: "Exportação até 4K", included: false },
        { name: "Mockups ilimitados", included: false },
        { name: "Suporte prioritário", included: false },
        { name: "API personalizada", included: false }
      ],
      cta: "Começar Grátis",
      popular: false
    },
    {
      name: "Profissional",
      icon: Crown,
      description: "Ideal para designers e pequenas agências",
      monthlyPrice: 59,
      annualPrice: 590,
      features: [
        { name: "Mockups ilimitados", included: true },
        { name: "Exportação até 4K", included: true },
        { name: "Todos os produtos disponíveis", included: true },
        { name: "Suporte prioritário", included: true },
        { name: "Biblioteca premium", included: true },
        { name: "Novos produtos mensalmente", included: true },
        { name: "Remoção de marca d'água", included: true },
        { name: "Batch export", included: true },
        { name: "API personalizada", included: false }
      ],
      cta: "Mais Popular",
      popular: true
    },
    {
      name: "Empresarial",
      icon: Building,
      description: "Para grandes equipes e empresas",
      monthlyPrice: 199,
      annualPrice: 1990,
      features: [
        { name: "Tudo do plano Profissional", included: true },
        { name: "Usuários ilimitados", included: true },
        { name: "API completa", included: true },
        { name: "Mockups exclusivos", included: true },
        { name: "Gerente de conta dedicado", included: true },
        { name: "Treinamento personalizado", included: true },
        { name: "SLA garantido", included: true },
        { name: "Integrações customizadas", included: true },
        { name: "White label disponível", included: true }
      ],
      cta: "Falar com Vendas",
      popular: false
    }
  ];

  const faqs = [
    {
      question: "Posso trocar de plano a qualquer momento?",
      answer: "Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças entram em vigor imediatamente e você paga apenas a diferença proporcional."
    },
    {
      question: "Existe desconto para estudantes?",
      answer: "Oferecemos 50% de desconto para estudantes e educadores com email institucional válido. Entre em contato conosco para ativar seu desconto."
    },
    {
      question: "Os mockups podem ser usados comercialmente?",
      answer: "Sim! Todos os mockups criados podem ser usados para fins comerciais sem restrições adicionais, desde que você tenha uma assinatura ativa."
    },
    {
      question: "Vocês oferecem reembolso?",
      answer: "Oferecemos garantia de reembolso de 30 dias para todos os planos. Se não estiver satisfeito, devolvemos 100% do valor pago."
    },
    {
      question: "Preciso de conhecimento técnico?",
      answer: "Não! Nossa interface é intuitiva e foi desenvolvida para ser usada por qualquer pessoa, independente do nível técnico."
    },
    {
      question: "Quantos usuários posso adicionar?",
      answer: "O plano Básico é individual, o Profissional inclui até 5 usuários, e o Empresarial oferece usuários ilimitados."
    }
  ];

  const calculateSavings = (monthly: number, annual: number) => {
    const monthlyCost = monthly * 12;
    const savings = ((monthlyCost - annual) / monthlyCost) * 100;
    return Math.round(savings);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-bold text-5xl md:text-6xl mb-6">
            Planos que Crescem
            <span className="text-gradient"> com Você</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Escolha o plano perfeito para suas necessidades. Comece grátis e faça upgrade quando precisar.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`font-medium ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Mensal
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-primary"
            />
            <span className={`font-medium ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Anual
            </span>
            {isAnnual && (
              <div className="gradient-primary text-white text-sm font-semibold px-3 py-1 rounded-full">
                Economize até 50%
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
              const originalYearlyPrice = plan.monthlyPrice * 12;
              
              return (
                <Card 
                  key={index} 
                  className={`relative ${
                    plan.popular 
                      ? "border-primary shadow-glow scale-105 z-10" 
                      : "card-elevated"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="gradient-primary text-white text-sm font-semibold px-4 py-2 rounded-full flex items-center space-x-1">
                        <Sparkles className="w-4 h-4" />
                        <span>Mais Popular</span>
                      </div>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                      plan.popular ? "gradient-primary" : "bg-muted"
                    }`}>
                      <Icon className={`w-8 h-8 ${
                        plan.popular ? "text-white" : "text-muted-foreground"
                      }`} />
                    </div>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <p className="text-muted-foreground text-sm">{plan.description}</p>
                  </CardHeader>
                  
                  <CardContent className="pt-4">
                    {/* Pricing */}
                    <div className="text-center mb-8">
                      <div className="flex items-baseline justify-center mb-2">
                        <span className="text-4xl font-bold">R$ {price}</span>
                        <span className="text-muted-foreground ml-1">
                          {isAnnual ? "/ano" : "/mês"}
                        </span>
                      </div>
                      
                      {isAnnual && (
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground line-through">
                            De R$ {originalYearlyPrice}/ano
                          </p>
                          <p className="text-sm font-medium text-success">
                            Economize {calculateSavings(plan.monthlyPrice, plan.annualPrice)}% 
                            (R$ {originalYearlyPrice - plan.annualPrice})
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center space-x-3">
                          {feature.included ? (
                            <Check className="w-4 h-4 text-success flex-shrink-0" />
                          ) : (
                            <X className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          )}
                          <span className={`text-sm ${
                            feature.included ? "text-foreground" : "text-muted-foreground"
                          }`}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Button 
                      className={`w-full ${
                        plan.popular ? "btn-primary" : "btn-secondary"
                      }`}
                      size="lg"
                    >
                      {plan.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Enterprise Contact */}
          <div className="mt-16 text-center">
            <Card className="card-elevated max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="font-heading font-bold text-2xl mb-4">
                  Precisa de Algo Personalizado?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Oferecemos soluções enterprise com recursos personalizados, 
                  integrações específicas e suporte dedicado para grandes organizações.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/about">
                    <Button size="lg" className="btn-primary">
                      Falar com Especialista
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg">
                    Agendar Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-muted-foreground">
              Esclarecemos suas principais dúvidas sobre nossos planos
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index} className="card-elevated">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
            Comece Sua Jornada Hoje
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de profissionais que já transformaram seus projetos com MockupCraft. 
            Teste grátis por 14 dias, sem compromisso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/generator">
              <Button size="lg" className="btn-primary text-lg px-8 py-4">
                Começar Teste Grátis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Falar com Vendas
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;