import { Link } from "react-router-dom";
import { Sparkles, Mail, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Como Funciona", href: "/#how-it-works" },
    { name: "Preços", href: "/pricing" },
    { name: "Gerador", href: "/generator" },
    { name: "Sobre", href: "/about" }
  ];

  const legalLinks = [
    { name: "Política de Privacidade", href: "/privacy" },
    { name: "Termos de Uso", href: "/terms" },
    { name: "Suporte", href: "/support" }
  ];

  const socialLinks = [
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "Instagram", href: "#", icon: Instagram },
    { name: "LinkedIn", href: "#", icon: Linkedin }
  ];

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl">MockupCraft</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4 max-w-xs">
              Crie mockups profissionais de produtos em segundos. 
              Canecas, camisetas e bonés com qualidade premium.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-9 h-9 rounded-md bg-background border border-border flex items-center justify-center hover:bg-accent transition-smooth"
                    aria-label={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="font-heading font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-1">
            <h3 className="font-heading font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h3 className="font-heading font-semibold mb-4">Contato</h3>
            <div className="space-y-3">
              <a
                href="mailto:contato@mockupcraft.com"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-smooth"
              >
                <Mail className="w-4 h-4" />
                <span>contato@mockupcraft.com</span>
              </a>
              <p className="text-sm text-muted-foreground">
                Suporte: Segunda a Sexta<br />
                9h às 18h (BRT)
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} MockupCraft. Todos os direitos reservados.
            </p>
            <p className="text-sm text-muted-foreground mt-2 md:mt-0">
              Desenvolvido com 💚 pela <a 
                href="https://devnocorner.com.br/institucional" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-smooth font-medium"
              >
                DevnoCorner
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;