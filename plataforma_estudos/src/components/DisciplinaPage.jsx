import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ChevronRight, BookOpen, ArrowLeft } from 'lucide-react';

const DisciplinaPage = () => {
  const { trimestre, disciplina } = useParams();
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchAtividades = async () => {
      try {
        const response = await fetch(`/src/data/${trimestre}/${disciplina.toLowerCase()}.json`);
        if (!response.ok) {
          throw new Error(`Erro ao carregar atividades: ${response.status}`);
        }
        const data = await response.json();
        setAtividades(data);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao carregar atividades:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchAtividades();
  }, [trimestre, disciplina]);
  
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
        <h2 className="text-xl font-bold text-red-600 mb-4">Erro ao carregar atividades</h2>
        <p>{error}</p>
        <Button className="mt-4" asChild>
          <Link to={`/trimestre/${trimestre}`}>Voltar</Link>
        </Button>
      </div>
    );
  }
  
  // Formatar nome da disciplina para exibição
  const formatarDisciplina = (nome) => {
    const nomes = {
      'matematica': 'Matemática',
      'portugues': 'Português',
      'ciencias': 'Ciências',
      'historia': 'História',
      'geografia': 'Geografia',
      'ingles': 'Inglês'
    };
    return nomes[nome.toLowerCase()] || nome;
  };
  
  // Formatar nome do trimestre para exibição
  const formatarTrimestre = (trim) => {
    return trim === 'A' ? '2º Trimestre A' : '2º Trimestre B';
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <Link to="/" className="hover:text-blue-600">Início</Link>
        <ChevronRight size={16} />
        <Link to={`/trimestre/${trimestre}`} className="hover:text-blue-600">
          {formatarTrimestre(trimestre)}
        </Link>
        <ChevronRight size={16} />
        <span className="font-medium text-slate-700">{formatarDisciplina(disciplina)}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{formatarDisciplina(disciplina)} - {formatarTrimestre(trimestre)}</h1>
        <Button variant="outline" asChild>
          <Link to={`/trimestre/${trimestre}`}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Link>
        </Button>
      </div>
      
      {atividades.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {atividades.map((atividade) => (
            <Card key={atividade.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle>{atividade.titulo}</CardTitle>
                <CardDescription>{atividade.tipo.charAt(0).toUpperCase() + atividade.tipo.slice(1)}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-slate-600 mb-4">{atividade.descricao}</p>
                <div className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full inline-block">
                  {atividade.questoes ? `${atividade.questoes.length} questões` : 'Atividade interativa'}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4 bg-slate-50">
                <div className="text-xs text-slate-500">
                  BNCC: {atividade.bncc && atividade.bncc[0]?.codigo}
                </div>
                <Button size="sm" asChild>
                  <Link to={`/atividade/${trimestre}/${disciplina}/${atividade.id}`}>
                    Iniciar <BookOpen className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-slate-50 rounded-lg">
          <h2 className="text-xl font-semibold text-slate-700 mb-2">Nenhuma atividade encontrada</h2>
          <p className="text-slate-600">Não há atividades disponíveis para esta disciplina no momento.</p>
        </div>
      )}
      
      {/* Seção de BNCC */}
      <div className="mt-8 pt-6 border-t">
        <h2 className="text-xl font-bold mb-4">Habilidades da BNCC</h2>
        <Tabs defaultValue="habilidades" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="habilidades">Habilidades Trabalhadas</TabsTrigger>
            <TabsTrigger value="info">Sobre a BNCC</TabsTrigger>
          </TabsList>
          <TabsContent value="habilidades" className="space-y-4">
            {atividades.length > 0 && atividades[0].bncc ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {atividades[0].bncc.map((hab, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">{hab.codigo}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600">{hab.descricao}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-slate-600">Informações sobre habilidades da BNCC não disponíveis.</p>
            )}
          </TabsContent>
          <TabsContent value="info">
            <Card>
              <CardContent className="pt-6">
                <p className="text-slate-600 mb-4">
                  A Base Nacional Comum Curricular (BNCC) é um documento que define o conjunto de aprendizagens essenciais que todos os alunos devem desenvolver ao longo da Educação Básica.
                </p>
                <p className="text-slate-600">
                  As atividades desta plataforma foram cuidadosamente desenvolvidas para estarem alinhadas com as habilidades previstas na BNCC para o 5º ano do Ensino Fundamental.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DisciplinaPage;
