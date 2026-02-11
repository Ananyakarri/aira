import { Link } from 'react-router-dom';
import { Activity, Mail, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-secondary text-secondary-foreground">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center">
                <Activity className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-heading text-2xl tracking-tight text-secondary-foreground uppercase">
                AIRA
              </span>
            </div>
            <p className="font-paragraph text-base text-secondary-foreground/80 max-w-md">
              Advanced health monitoring powered by AI. Track your vitals, understand your wellness, and get support when you need it most.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 md:col-start-7">
            <h3 className="font-heading text-sm uppercase tracking-wide text-secondary-foreground mb-4">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="font-paragraph text-base text-secondary-foreground/80 hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/features" className="font-paragraph text-base text-secondary-foreground/80 hover:text-primary transition-colors">
                Features
              </Link>
              <Link to="/resources" className="font-paragraph text-base text-secondary-foreground/80 hover:text-primary transition-colors">
                Resources
              </Link>
              <Link to="/contact" className="font-paragraph text-base text-secondary-foreground/80 hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Connect */}
          <div className="md:col-span-4">
            <h3 className="font-heading text-sm uppercase tracking-wide text-secondary-foreground mb-4">
              Connect With Us
            </h3>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 bg-secondary-foreground/10 hover:bg-primary rounded-sm flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5 text-secondary-foreground" />
              </a>
              <a href="#" className="w-10 h-10 bg-secondary-foreground/10 hover:bg-primary rounded-sm flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5 text-secondary-foreground" />
              </a>
              <a href="#" className="w-10 h-10 bg-secondary-foreground/10 hover:bg-primary rounded-sm flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5 text-secondary-foreground" />
              </a>
              <a href="#" className="w-10 h-10 bg-secondary-foreground/10 hover:bg-primary rounded-sm flex items-center justify-center transition-colors">
                <Mail className="w-5 h-5 text-secondary-foreground" />
              </a>
            </div>
            <p className="font-paragraph text-sm text-secondary-foreground/60">
              Stay updated with the latest health insights and AIRA updates.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-secondary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-secondary-foreground/60">
              © 2026 AIRA Health Monitoring. Designed by Isla.
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-paragraph text-sm text-secondary-foreground/60 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="font-paragraph text-sm text-secondary-foreground/60 hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
