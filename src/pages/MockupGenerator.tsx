// src/pages/MockupGenerator.tsx

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MockupGeneratorSection from "@/components/MockupGeneratorSection"; // Importe a seção!

const MockupGenerator = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-3xl md:text-4xl mb-2">
            Gerador de Mockups
          </h1>
          <p className="text-muted-foreground text-lg">
            Crie mockups profissionais em minutos
          </p>
        </div>

        {/* AQUI ESTÁ A MÁGICA:
          Em vez de replicar toda a lógica, simplesmente renderizamos 
          o componente que já tem tudo pronto.
        */}
        <MockupGeneratorSection />

      </main>

      <Footer />
    </div>
  );
};

export default MockupGenerator;