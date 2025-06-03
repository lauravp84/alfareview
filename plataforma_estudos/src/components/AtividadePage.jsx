import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from './ui/card';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, HelpCircle, Trophy } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const AtividadePage = () => {
  const { trimestre, disciplina, id } = useParams();
  const navigate = useNavigate();
  const [atividade, setAtividade] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    const fetchAtividade = async () => {
      try {
        const response = await fetch(`/src/data/${trimestre}/${disciplina.toLowerCase()}.json`);
        if (!response.ok) {
          throw new Error(`Erro ao carregar atividade: ${response.status}`);
        }
        const data = await response.json();
        const atividadeEncontrada = data.find(a => a.id === parseInt(id));
        
        if (!atividadeEncontrada) {
          throw new Error('Atividade não encontrada');
        }
        
        setAtividade(atividadeEncontrada);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao carregar atividade:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchAtividade();
  }, [trimestre, disciplina, id]);
  
  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    });
  };
  
  const handleTextAnswer = (questionIndex, text) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: text
    });
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < atividade.questoes.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleSubmit = () => {
    let correctAnswers = 0;
    
    atividade.questoes.forEach((questao, index) => {
      if (questao.resposta_correta !== undefined && selectedAnswers[index] === questao.resposta_correta) {
        correctAnswers++;
      }
    });
    
    const finalScore = Math.round((correctAnswers / atividade.questoes.length) * 100);
    setScore(finalScore);
    setShowResults(true);
  };
  
  const handleTryAgain = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setScore(0);
  };
  
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
        <h2 className="text-xl font-bold text-red-600 mb-4">Erro ao carregar atividade</h2>
        <p>{error}</p>
        <Button className="mt-4" asChild>
          <Link to={`/trimestre/${trimestre}/${disciplina}`}>Voltar</Link>
        </Button>
      </div>
    );
  }
  
  if (!atividade) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-bold text-red-600 mb-4">Atividade não encontrada</h2>
        <Button className="mt-4" asChild>
          <Link to={`/trimestre/${trimestre}/${disciplina}`}>Voltar</Link>
        </Button>
      </div>
    );
  }
  
  if (showResults) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{atividade.titulo}</h1>
          <Button variant="outline" asChild>
            <Link to={`/trimestre/${trimestre}/${disciplina}`}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar às atividades
            </Link>
          </Button>
        </div>
        
        <Card className="border-2 border-blue-100">
          <CardHeader className="bg-blue-50 border-b">
            <div className="flex justify-between items-center">
              <CardTitle>Resultados</CardTitle>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="font-bold">{score}%</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-6">
              <h3 className="text-sm font-medium text-slate-500 mb-2">Seu desempenho</h3>
              <Progress value={score} className="h-2" />
              <div className="flex justify-between mt-1 text-xs text-slate-500">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
            
            <div className="space-y-6">
              {atividade.questoes.map((questao, index) => {
                const isCorrect = questao.resposta_correta !== undefined && 
                                 selectedAnswers[index] === questao.resposta_correta;
                
                return (
                  <div key={index} className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                    <div className="flex gap-3">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <h4 className="font-medium mb-2">{questao.pergunta}</h4>
                        
                        {questao.opcoes ? (
                          <div className="ml-2">
                            <p className="text-sm font-medium mb-1">Sua resposta:</p>
                            <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                              {questao.opcoes[selectedAnswers[index]]}
                            </p>
                            
                            {!isCorrect && (
                              <>
                                <p className="text-sm font-medium mt-3 mb-1">Resposta correta:</p>
                                <p className="text-sm text-green-700">
                                  {questao.opcoes[questao.resposta_correta]}
                                </p>
                              </>
                            )}
                          </div>
                        ) : (
                          <div className="ml-2">
                            <p className="text-sm font-medium mb-1">Sua resposta:</p>
                            <p className="text-sm">{selectedAnswers[index] || "Sem resposta"}</p>
                          </div>
                        )}
                        
                        {questao.explicacao && (
                          <div className="mt-3 p-3 bg-white rounded border border-slate-200">
                            <p className="text-sm text-slate-700">{questao.explicacao}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4 bg-slate-50">
            <Button variant="outline" onClick={handleTryAgain}>
              Tentar novamente
            </Button>
            <Button asChild>
              <Link to={`/trimestre/${trimestre}/${disciplina}`}>
                Voltar às atividades
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  const currentQuestion = atividade.questoes[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / atividade.questoes.length) * 100;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{atividade.titulo}</h1>
        <Button variant="outline" asChild>
          <Link to={`/trimestre/${trimestre}/${disciplina}`}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar às atividades
          </Link>
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between text-sm text-slate-500 mb-2">
          <span>Questão {currentQuestionIndex + 1} de {atividade.questoes.length}</span>
          <span>{formatarDisciplina(disciplina)} - {formatarTrimestre(trimestre)}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      <Card className="border-2 border-blue-100">
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle className="text-lg">{currentQuestion.pergunta}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {currentQuestion.opcoes ? (
            <RadioGroup 
              value={selectedAnswers[currentQuestionIndex]?.toString()} 
              onValueChange={(value) => handleAnswerSelect(currentQuestionIndex, parseInt(value))}
              className="space-y-4"
            >
              {currentQuestion.opcoes.map((opcao, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="text-base font-normal">
                    {opcao}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <div className="space-y-4">
              <textarea
                className="w-full min-h-[150px] p-3 border rounded-md"
                placeholder="Digite sua resposta aqui..."
                value={selectedAnswers[currentQuestionIndex] || ''}
                onChange={(e) => handleTextAnswer(currentQuestionIndex, e.target.value)}
              />
              
              {currentQuestion.dica && (
                <Alert>
                  <HelpCircle className="h-4 w-4" />
                  <AlertTitle>Dica</AlertTitle>
                  <AlertDescription>
                    {currentQuestion.dica}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4 bg-slate-50">
          <Button 
            variant="outline" 
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
          </Button>
          
          {currentQuestionIndex < atividade.questoes.length - 1 ? (
            <Button 
              onClick={handleNextQuestion}
              disabled={selectedAnswers[currentQuestionIndex] === undefined}
            >
              Próxima <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={Object.keys(selectedAnswers).length < atividade.questoes.length}
            >
              Finalizar
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AtividadePage;
