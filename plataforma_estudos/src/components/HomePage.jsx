import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { BookOpen, GraduationCap, Calendar, Users, BarChart } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Plataforma de Estudos Interativa</h1>
          <p className="text-lg mb-6">
            Uma plataforma completa para alunos do 5º ano do Ensino Fundamental,
            com atividades interativas alinhadas à BNCC.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
              <Link to="/trimestre/A">Começar a Estudar</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
              <Link to="/login">Entrar</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trimestres Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Segundo Trimestre</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="bg-blue-50">
              <CardTitle>2º Trimestre A</CardTitle>
              <CardDescription>Primeira parte do segundo trimestre</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-slate-600 mb-4">
                Acesse as atividades da primeira parte do segundo trimestre, com conteúdos 
                de Português, Matemática, Ciências, História, Geografia e Inglês.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Português</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Matemática</span>
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">Ciências</span>
                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">História</span>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Geografia</span>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">Inglês</span>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 bg-slate-50">
              <Button asChild>
                <Link to="/trimestre/A">
                  Acessar <BookOpen className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="bg-blue-50">
              <CardTitle>2º Trimestre B</CardTitle>
              <CardDescription>Segunda parte do segundo trimestre</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-slate-600 mb-4">
                Acesse as atividades da segunda parte do segundo trimestre, com conteúdos 
                de Português, Matemática, Ciências, História, Geografia e Inglês.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Português</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Matemática</span>
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">Ciências</span>
                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">História</span>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Geografia</span>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">Inglês</span>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 bg-slate-50">
              <Button asChild>
                <Link to="/trimestre/B">
                  Acessar <BookOpen className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="pt-4">
        <h2 className="text-2xl font-bold mb-6">Recursos da Plataforma</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <GraduationCap className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Atividades Interativas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Quizzes, jogos e desafios interativos para tornar o aprendizado mais divertido e eficaz.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Calendar className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Calendário Escolar</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Acompanhe datas importantes, provas e eventos escolares em um calendário integrado.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Acesso Personalizado</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Sistema de login para alunos e professores, com recursos personalizados para cada perfil.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <BarChart className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Acompanhamento de Progresso</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Visualize seu desempenho e progresso em cada disciplina e atividade realizada.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* BNCC Section */}
      <section className="bg-slate-50 p-6 rounded-lg">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-3">Alinhado à BNCC</h2>
            <p className="text-slate-600 mb-4">
              Todas as atividades da plataforma foram cuidadosamente desenvolvidas para estarem 
              alinhadas com as habilidades previstas na Base Nacional Comum Curricular (BNCC) 
              para o 5º ano do Ensino Fundamental.
            </p>
            <p className="text-slate-600">
              Cada atividade indica quais habilidades da BNCC estão sendo trabalhadas, 
              permitindo um acompanhamento pedagógico completo.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
              <img 
                src="/src/assets/bncc-logo.png" 
                alt="Logo BNCC" 
                className="h-32 w-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/200x150?text=BNCC";
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
