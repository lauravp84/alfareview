import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button } from './ui/button';
import { 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  Home, 
  LogIn, 
  Menu, 
  User 
} from 'lucide-react';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap size={32} />
            <h1 className="text-xl font-bold">Plataforma de Estudos</h1>
          </Link>
          
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="flex items-center gap-1 hover:text-blue-200">
              <LogIn size={18} />
              <span>Entrar</span>
            </Link>
            <Button variant="outline" className="bg-white text-blue-600 hover:bg-blue-100">
              <User className="mr-2 h-4 w-4" /> Cadastrar
            </Button>
          </div>
          
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-blue-700 py-2">
            <div className="container mx-auto px-4 flex flex-col gap-2">
              <Link 
                to="/login" 
                className="flex items-center gap-2 py-2 px-3 hover:bg-blue-800 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn size={18} />
                <span>Entrar</span>
              </Link>
              <Link 
                to="/register" 
                className="flex items-center gap-2 py-2 px-3 hover:bg-blue-800 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={18} />
                <span>Cadastrar</span>
              </Link>
            </div>
          </div>
        )}
      </header>
      
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-2 gap-4">
            <Link to="/" className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-slate-100">
              <Home size={18} />
              <span>Início</span>
            </Link>
            <Link to="/trimestre/A" className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-slate-100">
              <BookOpen size={18} />
              <span>2º Trimestre A</span>
            </Link>
            <Link to="/trimestre/B" className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-slate-100">
              <BookOpen size={18} />
              <span>2º Trimestre B</span>
            </Link>
            <Link to="/calendario" className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-slate-100">
              <Calendar size={18} />
              <span>Calendário</span>
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-800 text-slate-300 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Plataforma de Estudos</h3>
              <p className="text-sm">
                Uma plataforma interativa para alunos do 5º ano do Ensino Fundamental,
                com atividades alinhadas à BNCC.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Links Rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-white">Início</Link></li>
                <li><Link to="/trimestre/A" className="hover:text-white">2º Trimestre A</Link></li>
                <li><Link to="/trimestre/B" className="hover:text-white">2º Trimestre B</Link></li>
                <li><Link to="/calendario" className="hover:text-white">Calendário Escolar</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Contato</h3>
              <p className="text-sm">
                Email: contato@plataformaestudos.com.br<br />
                Telefone: (00) 0000-0000
              </p>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-slate-700 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Plataforma de Estudos. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
