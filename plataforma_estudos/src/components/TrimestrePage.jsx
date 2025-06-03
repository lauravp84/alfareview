import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ChevronRight, BookOpen, ArrowLeft } from 'lucide-react';

const TrimestrePage = () => {
  const { trimestre } = useParams();
  const [disciplinas, setDisciplinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchDisciplinas = async () => {
      try {
        const response = await fetch(`/src/data/${trimestre}/disciplinas.json`).catch(() => {
          // Se não conseguir carregar o arquivo específico, vamos criar manualmente
          return {
            ok: true,
            json: () => Promise.resolve([
              { id: 'portugues', nome: 'Português', cor: 'blue', icone: '📚' },
              { id: 'matematica', nome: 'Matemática', cor: 'green', icone: '🔢' },
              { id: 'ciencias', nome: 'Ciências', cor: 'amber', icone: '🔬' },
              { id: 'historia', nome: 'História', cor: 'red', icone: '🏛️' },
              { id: 'geografia', nome: 'Geografia', cor: 'purple', icone: '🌎' },
              { id: 'ingles', nome: 'Inglês', cor: 'indigo', icone: '🌐' }
            ])
          };
        });
        
        if (!response.ok && response.status !== 404) {
          throw new Error(`Erro ao carregar disciplinas: ${response.status}`);
        }
        
        const data = await response.json();
        setDisciplinas(data);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao carregar disciplinas:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchDisciplinas();
  }, [trimestre]);
  
  // Formatar nome do trimestre para exibição
  const formatarTrimestre = (trim) => {
    return trim === 'A' ? '2º Trimestre A' : '2º Trimestre B';
  };
  
  // Obter cor de fundo para cada disciplina
  const getCorFundo = (cor) => {
    const cores = {
      'blue': 'bg-blue-100',
      'green': 'bg-green-100',
      'amber': 'bg-amber-100',
      'red': 'bg-red-100',
      'purple': 'bg-purple-100',
      'indigo': 'bg-indigo-100'
    };
    return cores[cor] || 'bg-slate-100';
  };
  
  // Obter cor de texto para cada disciplina
  const getCorTexto = (cor) => {
    const cores = {
      'blue': 'text-blue-700',
      'green': 'text-green-700',
      'amber': 'text-amber-700',
      'red': 'text-red-700',
      'purple': 'text-purple-700',
      'indigo': 'text-indigo-700'
    };
    return cores[cor] || 'text-slate-700';
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-bold text-red-600 mb-4">Erro ao carregar disciplinas</h2>
        <p>{error}</p>
        <Button className="mt-4" asChild>
          <Link to="/">Voltar para a página inicial</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <Link to="/" className="hover:text-blue-600">Início</Link>
        <ChevronRight size={16} />
        <span className="font-medium text-slate-700">{formatarTrimestre(trimestre)}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{formatarTrimestre(trimestre)}</h1>
        <Button variant="outline" asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {disciplinas.map((disciplina) => (
          <Card 
            key={disciplina.id} 
            className="hover:shadow-md transition-shadow"
          >
            <CardHeader className={`${getCorFundo(disciplina.cor)} border-b`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{disciplina.icone}</span>
                <div>
                  <CardTitle>{disciplina.nome}</CardTitle>
                  <CardDescription>2º Trimestre {trimestre}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-slate-600 mb-4">
                Acesse as atividades de {disciplina.nome} do {formatarTrimestre(trimestre)}.
              </p>
              <div className={`text-xs ${getCorFundo(disciplina.cor)} ${getCorTexto(disciplina.cor)} px-3 py-1 rounded-full inline-block`}>
                Atividades interativas
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 bg-slate-50">
              <Button asChild>
                <Link to={`/trimestre/${trimestre}/${disciplina.id}`}>
                  Acessar <BookOpen className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
        <h2 className="text-lg font-semibold text-blue-800 mb-3">Sobre o {formatarTrimestre(trimestre)}</h2>
        <p className="text-blue-700 mb-4">
          Este trimestre abrange conteúdos essenciais para o desenvolvimento do aluno do 5º ano, 
          com atividades alinhadas à Base Nacional Comum Curricular (BNCC).
        </p>
        <p className="text-blue-700">
          Todas as atividades foram cuidadosamente elaboradas para proporcionar uma experiência 
          de aprendizado interativa e envolvente, com feedback imediato e explicações detalhadas.
        </p>
      </div>
    </div>
  );
};

export default TrimestrePage;
