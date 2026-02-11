import { Link, useLocation } from 'react-router-dom';
import { Activity } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="w-full bg-background border-b border-secondary/10">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-heading text-3xl tracking-tight text-secondary uppercase">
              AIRA
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            <Link
              to="/"
              className={`font-heading text-sm uppercase tracking-wide transition-colors ${
                isActive('/') 
                  ? 'text-primary' 
                  : 'text-secondary hover:text-primary'
              }`}
            >
              Home
            </Link>
            <Link
              to="/features"
              className={`font-heading text-sm uppercase tracking-wide transition-colors ${
                isActive('/features') 
                  ? 'text-primary' 
                  : 'text-secondary hover:text-primary'
              }`}
            >
              Features
            </Link>
            <Link
              to="/resources"
              className={`font-heading text-sm uppercase tracking-wide transition-colors ${
                isActive('/resources') 
                  ? 'text-primary' 
                  : 'text-secondary hover:text-primary'
              }`}
            >
              Resources
            </Link>
            <Link
              to="/contact"
              className={`font-heading text-sm uppercase tracking-wide transition-colors ${
                isActive('/contact') 
                  ? 'text-primary' 
                  : 'text-secondary hover:text-primary'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-secondary">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
