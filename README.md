# Plataforma de Estudos Interativa - 5º Ano

## Visão Geral

Esta plataforma interativa foi desenvolvida para alunos do 5º ano do Ensino Fundamental, oferecendo atividades de estudo alinhadas à Base Nacional Comum Curricular (BNCC). A plataforma está organizada por trimestres (A e B) e disciplinas (Português, Matemática, Ciências, História, Geografia e Inglês).

## Estrutura do Projeto

O projeto foi desenvolvido utilizando React para o frontend, com uma estrutura modular e organizada:

### Componentes Principais

- **App.jsx**: Componente principal que define as rotas da aplicação
- **Layout.jsx**: Layout comum para todas as páginas (header, navigation, footer)
- **HomePage.jsx**: Página inicial com visão geral da plataforma
- **TrimestrePage.jsx**: Página de seleção de disciplinas para um trimestre específico
- **DisciplinaPage.jsx**: Página que lista as atividades disponíveis para uma disciplina
- **AtividadePage.jsx**: Página que apresenta uma atividade interativa específica

### Dados

Os dados das atividades estão organizados em ficheiros JSON por disciplina e trimestre:

```
/src/data/
  ├── A/
  │   ├── portugues.json
  │   ├── matematica.json
  │   ├── ciencias.json
  │   ├── historia.json
  │   ├── geografia.json
  │   └── ingles.json
  └── B/
      ├── portugues.json
      ├── matematica.json
      ├── ciencias.json
      ├── historia.json
      ├── geografia.json
      └── ingles.json
```

## Funcionalidades

- **Atividades Interativas**: Quizzes, desafios e exercícios interativos
- **Feedback Imediato**: Respostas com explicações detalhadas
- **Navegação Intuitiva**: Interface amigável e responsiva
- **Alinhamento com a BNCC**: Todas as atividades estão vinculadas a habilidades específicas da BNCC

## Como Executar o Projeto

1. Instale as dependências:
   ```
   cd plataforma_estudos
   npm install
   ```

2. Execute o servidor de desenvolvimento:
   ```
   npm run dev
   ```

3. Para construir a versão de produção:
   ```
   npm run build
   ```

## Expansão Futura

O projeto foi desenvolvido de forma modular para facilitar expansões futuras, como:

- Adição de mais trimestres e disciplinas
- Implementação completa do sistema de login/autenticação
- Integração do calendário escolar interativo
- Adição de mais tipos de atividades interativas

## Alinhamento com a BNCC

Todas as atividades foram desenvolvidas considerando as habilidades específicas da Base Nacional Comum Curricular para o 5º ano do Ensino Fundamental, garantindo que o conteúdo seja pedagogicamente adequado e relevante.
