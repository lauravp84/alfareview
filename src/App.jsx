import { useState } from "react";

const C = {
  red:"#D32F2F", redLight:"#FFEBEE", redDark:"#B71C1C",
  blue:"#1565C0", blueLight:"#E3F2FD", blueDark:"#0D47A1",
  white:"#FFFFFF", bg:"#F0F4F8", gray:"#607080", grayLight:"#ECEFF1",
  green:"#2E7D32", greenLight:"#E8F5E9",
  orange:"#E65100", orangeLight:"#FFF3E0",
  purple:"#6A1B9A", purpleLight:"#F3E5F5",
  teal:"#00695C", tealLight:"#E0F2F1",
};

function Logo({size=40}){
  return(
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill={C.blueDark}/>
      <text x="20" y="26" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="bold" fontFamily="serif">α</text>
    </svg>
  );
}

// ─────────────── CAP 1 DATA ───────────────
const CAP1_TEORIA = [
  {
    id:"t1", emoji:"⚗️", cor:C.red, titulo:"Substâncias Puras",
    resumo:"Formadas por um único tipo de molécula. Têm propriedades fixas (ponto de fusão, ebulição etc.).",
    topicos:[
      "Substância simples: formada por um único elemento químico. Ex: O₂, Fe, Au.",
      "Substância composta: formada por dois ou mais elementos químicos diferentes. Ex: H₂O, NaCl, CO₂.",
    ],
    destaque:"Substâncias puras têm composição química definida e propriedades constantes.",
    exemplo:"Ouro puro (24K) é uma substância simples. Água (H₂O) é uma substância composta."
  },
  {
    id:"t2", emoji:"🧪", cor:C.blue, titulo:"Misturas",
    resumo:"União de duas ou mais substâncias que NÃO reagem quimicamente entre si. Podem ser separadas.",
    topicos:[
      "Soluto: substância presente em menor quantidade (ex: açúcar no café).",
      "Solvente: substância presente em maior quantidade (ex: água no café).",
      "Solução: mistura formada por soluto + solvente.",
    ],
    destaque:"Nas misturas, as substâncias mantêm suas propriedades e podem ser separadas por métodos físicos.",
    exemplo:"Água + sal, café, ar atmosférico, ligas metálicas."
  },
  {
    id:"t3", emoji:"🔍", cor:C.green, titulo:"Mistura Homogênea vs. Heterogênea",
    resumo:"A classificação depende do número de fases visíveis a olho nu.",
    topicos:[
      "Homogênea: apresenta 1 fase — componentes não são distinguíveis visualmente. Ex: água + sal.",
      "Heterogênea: apresenta 2 ou mais fases visíveis. Ex: água + óleo.",
      "Bifásica (2 fases), Trifásica (3 fases), Polifásica (4+ fases).",
    ],
    destaque:"⚠️ Atenção: Leite e sangue parecem homogêneos, mas são heterogêneos! Suas fases só são visíveis ao microscópio.",
    exemplo:"Água + areia = heterogênea bifásica. Água + óleo + terra = heterogênea trifásica."
  },
  {
    id:"t4", emoji:"💧", cor:C.teal, titulo:"Soluções e Concentração",
    resumo:"Soluções são misturas homogêneas. Podem ser classificadas quanto à concentração e ao estado físico.",
    topicos:[
      "Diluída: pouco soluto em muito solvente.",
      "Concentrada: muito soluto em pouco solvente.",
      "Saturada: soluto em excesso — não dissolve mais. O excesso precipita no fundo.",
      "Soluções sólidas (ligas metálicas): bronze (Cu+Sn), aço (Fe+C), ouro 18K (Au+Cu+Ag).",
    ],
    destaque:"O ouro 18K é uma liga metálica: 75% ouro + 25% outros metais. É uma mistura homogênea sólida!",
    exemplo:"Muito açúcar no copo → saturada (açúcar precipita no fundo)."
  },
  {
    id:"t5", emoji:"🎂", cor:C.orange, titulo:"Mistura × Combinação",
    resumo:"Diferença fundamental: nas misturas não há reação química; nas combinações, sim.",
    topicos:[
      "Mistura: substâncias colocadas juntas sem reagir. Podem ser separadas. Ex: salada, granola.",
      "Combinação: ocorre reação química, formando nova substância. Ex: ingredientes → bolo.",
    ],
    destaque:"Após assar o bolo, NÃO é possível recuperar os ingredientes originais — houve combinação (reação química).",
    exemplo:"Areia + água = mistura (pode separar). Farinha + ovos + calor = bolo (combinação, irreversível)."
  },
];

const CAP1_QUIZ = [
  {src:"PA1 Q1",
   q:"Numa laboratório, alunos misturaram água, óleo, terra e cubos de gelo. Qual é a classificação dessa mistura quanto ao número de fases?",
   opts:["Homogênea — 1 fase","Bifásica — 2 fases","Trifásica — 3 fases","Polifásica — 4 ou mais fases"],
   ans:3,
   fb:"Água, óleo, terra e gelo formam 4 fases visíveis → mistura POLIFÁSICA. Cada substância ocupa camadas separadas."},
  {src:"PA1 Q2",
   q:"Qual das misturas abaixo é HOMOGÊNEA?",
   opts:["Água + areia","Água + óleo","Água + sal","Água + pedras"],
   ans:2,
   fb:"Água + sal forma uma solução homogênea (1 fase). O sal se dissolve completamente na água e não é visível a olho nu."},
  {src:"PA1 Q3",
   q:"O sangue é classificado como:",
   opts:["Substância pura simples","Mistura homogênea","Mistura heterogênea","Combinação química"],
   ans:2,
   fb:"Apesar de parecer homogêneo, o sangue é heterogêneo! Suas fases (glóbulos, plasma, plaquetas) são visíveis ao microscópio e podem ser separadas por centrifugação."},
  {src:"PA1 Q4",
   q:"Um aluno colocou muito açúcar num copo de água e percebeu que parte ficou no fundo. Essa solução é:",
   opts:["Diluída","Concentrada","Saturada","Homogênea"],
   ans:2,
   fb:"Quando o soluto em excesso precipita no fundo, a solução está SATURADA — não consegue dissolver mais soluto."},
  {src:"PA1 Q5",
   q:"O ouro 18K (75% Au + 25% outros metais) é um exemplo de:",
   opts:["Substância pura","Combinação química","Liga metálica (mistura sólida)","Mistura heterogênea"],
   ans:2,
   fb:"O ouro 18K é uma liga metálica — uma solução sólida formada por diferentes metais. É uma mistura homogênea no estado sólido."},
  {src:"PA1 Q6",
   q:"Qual é a diferença entre MISTURA e COMBINAÇÃO?",
   opts:["Mistura tem mais substâncias","Na combinação não há reação; na mistura há","Na mistura não há reação química; na combinação há","São a mesma coisa"],
   ans:2,
   fb:"Na MISTURA as substâncias não reagem (podem ser separadas). Na COMBINAÇÃO ocorre reação química formando nova substância — irreversível. Ex: fazer bolo é uma combinação."},
  {src:"PA1 Q7",
   q:"Um frasco contém serragem, água+sal e pregos. Quantas fases essa mistura apresenta?",
   opts:["1 fase — homogênea","2 fases — bifásica","3 fases — trifásica","4 fases — polifásica"],
   ans:2,
   fb:"Serragem (sólido flutuante), água+sal (líquido) e pregos (sólido no fundo) = 3 fases visíveis → TRIFÁSICA."},
  {src:"PA1 Q8",
   q:"Por que o petróleo flutua na água durante um derramamento no oceano?",
   opts:["O petróleo é mais denso que a água","O petróleo é menos denso que a água e não se mistura","Petróleo e água formam mistura homogênea","O petróleo é uma substância pura"],
   ans:1,
   fb:"O petróleo é MENOS DENSO que a água e é imiscível (não se mistura), por isso flutua formando uma camada separada — mistura heterogênea bifásica."},
];

const CAP1_DISCURSIVAS = [
  {
    n:1,
    q:"Explique por que o leite é considerado uma mistura heterogênea, mesmo parecendo homogêneo a olho nu.",
    resp:"O leite parece homogêneo a olho nu, mas é heterogêneo porque suas fases (gordura, proteínas, água) só são visíveis ao microscópio. Além disso, suas fases podem ser separadas por centrifugação, confirmando sua natureza heterogênea."
  },
  {
    n:2,
    q:"Qual a diferença entre fazer uma salada de frutas e fazer um bolo? Use os conceitos de mistura e combinação.",
    resp:"A salada de frutas é uma MISTURA: as frutas são colocadas juntas sem reagir entre si e podem ser separadas novamente. Já fazer um bolo é uma COMBINAÇÃO: os ingredientes reagem quimicamente ao serem assados, formando uma nova substância (o bolo) que não pode ser desfeita para recuperar os ingredientes originais."
  },
  {
    n:3,
    q:"Por que o ouro 24K é mais caro que o ouro 18K? Use os conceitos de substância pura e mistura.",
    resp:"O ouro 24K é praticamente uma substância pura (99,9% ouro), enquanto o ouro 18K é uma liga metálica (mistura) contendo apenas 75% de ouro mais outros metais como cobre e prata. Por ter maior pureza, o ouro 24K é mais valioso, mas também mais maleável e frágil."
  },
];

const CAP1_MAPA = {
  central: "MATÉRIA",
  nos: [
    {id:"A", label:"Substância Pura", sub:"Composição definida", cor:C.red},
    {id:"B", label:"Mistura", sub:"2+ substâncias sem reação", cor:C.blue},
    {id:"C", label:"Simples", sub:"1 elemento químico / Ex: O₂, Au, Fe", cor:C.redLight, pai:"A", corPai:C.red},
    {id:"D", label:"Composta", sub:"2+ elementos / Ex: H₂O, NaCl", cor:C.redLight, pai:"A", corPai:C.red},
    {id:"E", label:"Homogênea", sub:"1 fase visível / Ex: água+sal", cor:C.blueLight, pai:"B", corPai:C.blue},
    {id:"F", label:"Heterogênea", sub:"2+ fases visíveis / Ex: água+óleo", cor:C.blueLight, pai:"B", corPai:C.blue},
    {id:"G", label:"Solução", sub:"Soluto + Solvente / diluída/concentrada/saturada", cor:C.tealLight, pai:"E", corPai:C.teal},
    {id:"H", label:"Liga Metálica", sub:"Sólida homogênea / Ex: Bronze, Aço, Ouro 18K", cor:C.tealLight, pai:"E", corPai:C.teal},
    {id:"I", label:"Bifásica/Trifásica/
Polifásica", sub:"Classificação por fases", cor:C.blueLight, pai:"F", corPai:C.blue},
    {id:"J", label:"Combinação", sub:"Reação química / Irreversível", cor:C.orangeLight, pai:"B", corPai:C.orange},
  ]
};

// ─────────────── CAP 2 DATA ───────────────
const CAP2_TEORIA = [
  {
    id:"t1", emoji:"🔥", cor:C.red, titulo:"Fenômenos e Transformações",
    resumo:"Fenômenos são transformações que ocorrem com a matéria. Podem ser físicos, químicos ou biológicos.",
    topicos:[
      "Fenômeno: qualquer transformação que ocorre com a matéria.",
      "Todos os dias observamos fenômenos: fósforo acendendo, latinha amassada, metamorfose da borboleta.",
    ],
    destaque:"A questão central: a substância mudou de composição química ou apenas de forma/estado?",
    exemplo:"Palito de fósforo queimando = fenômeno químico. Latinha amassada = fenômeno físico. Lagarta → borboleta = fenômeno biológico."
  },
  {
    id:"t2", emoji:"⚡", cor:C.purple, titulo:"Transformações Químicas",
    resumo:"Alteram a COMPOSIÇÃO da matéria — formam novas substâncias. Geralmente irreversíveis.",
    topicos:[
      "A substância original deixa de existir e forma(m) nova(s) substância(s).",
      "Evidências: mudança de cor, formação de gás, precipitado, chama, odor novo.",
      "Exemplos: ferrugem (Fe → Fe₂O₃), queima (madeira → cinza + CO₂), fotossíntese, cozimento do bolo.",
      "Alisamento químico: desfaz as ligações entre proteínas dos fios — PERMANENTE.",
    ],
    destaque:"Transformações químicas são geralmente IRREVERSÍVEIS. O bolo assado não volta a ser farinha e ovos.",
    exemplo:"Vinagre + bicarbonato → gás (CO₂) + água + sal. Irreversível!"
  },
  {
    id:"t3", emoji:"🧊", cor:C.blue, titulo:"Transformações Físicas",
    resumo:"NÃO alteram a composição química — apenas a forma, tamanho ou estado físico da matéria.",
    topicos:[
      "A substância continua sendo a mesma após a transformação.",
      "Exemplos: derreter, congelar, dissolver, amassar, cortar, triturar.",
      "Mudanças de estado: sólido ↔ líquido ↔ gasoso.",
      "Prancha/secador no cabelo: defaz ligações físicas temporariamente — quando molha, volta ao normal.",
    ],
    destaque:"Transformações físicas são geralmente REVERSÍVEIS. O gelo derrete e pode voltar a congelar.",
    exemplo:"Latinha amassada: mudou de forma, mas continua sendo alumínio. Reversível (em teoria)."
  },
  {
    id:"t4", emoji:"🦋", cor:C.green, titulo:"Transformações Biológicas",
    resumo:"Ocorrem em seres vivos. NÃO alteram a composição química fundamental, mas promovem crescimento e desenvolvimento.",
    topicos:[
      "Envolvem processos vitais dos organismos vivos.",
      "Exemplos: metamorfose (lagarta → borboleta), crescimento de cabelos e unhas, germinação de sementes.",
      "Crescimento de uma criança, fermentação do iogurte.",
    ],
    destaque:"Biológicas ocorrem DENTRO de organismos vivos e seguem programação genética.",
    exemplo:"Uma lagarta forma casulo e emerge como borboleta — transformação biológica completa (holometabolismo)."
  },
];

const CAP2_QUIZ = [
  {src:"PA2 Q1",
   q:"Uma latinha de alumínio foi amassada. Que tipo de transformação ocorreu?",
   opts:["Química — formou nova substância","Física — apenas mudou de forma","Biológica — ocorreu em ser vivo","Combinação irreversível"],
   ans:1,
   fb:"Amassar a latinha é uma transformação FÍSICA: a forma mudou, mas o alumínio continua sendo alumínio. Não houve alteração na composição química."},
  {src:"PA2 Q2",
   q:"Uma lagarta forma um casulo e se transforma em borboleta. Que tipo de fenômeno é esse?",
   opts:["Físico","Químico","Biológico","Combinação"],
   ans:2,
   fb:"A metamorfose da borboleta é um fenômeno BIOLÓGICO. Ocorre em ser vivo e envolve processos vitais controlados geneticamente."},
  {src:"PA2 Q3",
   q:"Qual das opções abaixo é um exemplo de transformação QUÍMICA?",
   opts:["Gelo derretendo","Papel sendo cortado","Madeira pegando fogo","Sal se dissolvendo em água"],
   ans:2,
   fb:"A queima da madeira é uma transformação QUÍMICA: a madeira reage com o oxigênio formando cinzas, CO₂ e vapor — novas substâncias. Irreversível!"},
  {src:"PA2 Q4",
   q:"Por que o alisamento químico é PERMANENTE, enquanto a prancha é temporária?",
   opts:["A prancha usa mais calor","O alisamento químico destrói as ligações químicas das proteínas do cabelo; a prancha apenas as afasta temporariamente","A prancha é mais moderna","O alisamento usa substâncias naturais"],
   ans:1,
   fb:"O alisamento químico causa uma transformação QUÍMICA: desfaz permanentemente as ligações entre proteínas dos fios. A prancha causa transformação FÍSICA: as ligações se refazem quando o cabelo molha."},
  {src:"PA2 Q5",
   q:"Vinagre misturado com bicarbonato de sódio produz gás e espuma. Esse fenômeno é:",
   opts:["Físico — mudou de estado","Biológico — envolve organismos","Químico — formou nova substância (CO₂)","Físico — apenas misturou"],
   ans:2,
   fb:"A produção de gás (CO₂) e a formação de espuma são evidências de transformação QUÍMICA. Novas substâncias foram formadas a partir do vinagre e bicarbonato."},
  {src:"PA2 Q6",
   q:"O crescimento de cabelos e unhas é um exemplo de transformação:",
   opts:["Física","Química","Biológica","Combinação"],
   ans:2,
   fb:"O crescimento de cabelos e unhas é uma transformação BIOLÓGICA: ocorre em ser vivo, é controlado pelo organismo e faz parte dos processos vitais."},
  {src:"PA2 Q7",
   q:"Qual característica distingue uma transformação química de uma física?",
   opts:["A temperatura envolvida","A velocidade da reação","A formação de nova(s) substância(s) com composição diferente","A quantidade de substância usada"],
   ans:2,
   fb:"A principal diferença é que na transformação QUÍMICA há formação de novas substâncias com composição diferente da original. Na física, a composição permanece a mesma."},
  {src:"PA2 Q8",
   q:"A ferrugem que se forma no ferro é um exemplo de transformação:",
   opts:["Física — o ferro mudou de cor","Biológica — causada por fungos","Química — o ferro reagiu com oxigênio e água formando óxido de ferro","Física — mudança de estado"],
   ans:2,
   fb:"A ferrugem (Fe₂O₃) é uma transformação QUÍMICA: o ferro reage com oxigênio e umidade formando óxido de ferro (ferrugem), uma substância completamente diferente."},
];

const CAP2_DISCURSIVAS = [
  {
    n:1,
    q:"Explique por que fazer um bolo é um exemplo de combinação química e não apenas uma mistura.",
    resp:"Fazer um bolo é uma combinação química porque os ingredientes (farinha, ovos, açúcar, fermento) reagem quimicamente ao serem aquecidos, formando uma nova substância — o bolo. Isso é irreversível: não é possível recuperar os ingredientes originais após o cozimento. Há evidências de reação: mudança de textura, cor e aroma. Diferente de uma mistura (como granola), onde os ingredientes apenas se juntam sem reagir."
  },
  {
    n:2,
    q:"Qual a diferença entre o alisamento químico e o uso da prancha no cabelo? Classifique cada processo.",
    resp:"O alisamento químico é uma transformação química: as substâncias presentes no produto (como hidróxido de sódio) destroem permanentemente as ligações químicas entre as proteínas dos fios de cabelo. O cabelo fica liso definitivamente. O uso da prancha é uma transformação física: o calor afasta temporariamente as ligações físicas entre os fios, mas quando o cabelo molha, essas ligações se refazem e o cabelo volta ao estado original."
  },
  {
    n:3,
    q:"Cite 2 exemplos de transformação física, 2 de transformação química e 2 de transformação biológica, justificando cada um.",
    resp:"Físicas: (1) Gelo derretendo — a água muda de estado sólido para líquido, mas continua sendo H₂O; (2) Papel sendo rasgado — muda de forma, mas continua sendo papel. Químicas: (1) Queima de papel — forma cinzas e CO₂, substâncias novas; (2) Ferrugem no ferro — forma óxido de ferro, composição diferente. Biológicas: (1) Metamorfose da borboleta — lagarta se transforma em borboleta por processo biológico; (2) Germinação de sementes — a semente se desenvolve em planta por processos vitais."
  },
];

// ─────────────── CAP 3 DATA ───────────────
const CAP3_TEORIA = [
  {
    id:"t1", emoji:"🤲", cor:C.orange, titulo:"Catação e Tamisação",
    resumo:"Métodos manuais para separar sólidos de diferentes tamanhos.",
    topicos:[
      "Catação: separação manual de sólidos distinguíveis visualmente (com mãos ou pinças). Ex: separar feijão de pedrinhas.",
      "Tamisação (peneiração): separação de sólidos por malha (peneira/tamis). Separa partículas de tamanhos diferentes. Ex: farinha de trigo, areia.",
    ],
    destaque:"Usados quando os sólidos têm tamanhos ou aparências diferentes e podem ser distinguidos visualmente.",
    exemplo:"Catar pedrinhas do feijão = catação. Peneirar farinha = tamisação."
  },
  {
    id:"t2", emoji:"💨", cor:C.teal, titulo:"Ventilação e Levigação",
    resumo:"Separação usando corrente de ar ou corrente de água.",
    topicos:[
      "Ventilação: usa corrente de ar para separar sólidos de densidades diferentes. Ex: separar casca de grãos de cereais (arroz, trigo).",
      "Levigação: usa corrente de água para separar sólidos de densidades diferentes. Ex: garimpagem do ouro — ouro (mais denso) fica no fundo.",
    ],
    destaque:"Ventilação usa AR, levigação usa ÁGUA. Ambas aproveitam a diferença de densidade entre os sólidos.",
    exemplo:"Garimpagem: ouro é mais denso, fica no fundo; areia leve é arrastada pela água."
  },
  {
    id:"t3", emoji:"🧱", cor:C.blue, titulo:"Decantação e Filtração",
    resumo:"Separação de sólidos em líquidos por repouso ou por filtro.",
    topicos:[
      "Decantação: repouso — o sólido mais denso deposita no fundo do líquido. Ex: água barrenta em repouso, separação de óleo e água.",
      "Filtração: uso de filtro (papel, areia, carvão) para reter sólido e deixar passar o líquido. Ex: filtro de água, café coado.",
    ],
    destaque:"Decantação usa TEMPO (repouso). Filtração usa FILTRO (barreira física).",
    exemplo:"Água barrenta deixada em repouso → barro deposita no fundo (decantação). Café coado → filtro retém o pó (filtração)."
  },
  {
    id:"t4", emoji:"🌀", cor:C.purple, titulo:"Centrifugação e Evaporação",
    resumo:"Centrifugação acelera a decantação; evaporação remove o solvente líquido.",
    topicos:[
      "Centrifugação: aparelho que gira em alta velocidade (RPM) separando por diferença de densidade — acelera a decantação. Ex: centrífuga de sangue, máquina de lavar (centrifuga a roupa).",
      "Evaporação: aquecimento evapora o solvente, restando o soluto sólido. Ex: produção de sal marinho nas salinas.",
    ],
    destaque:"O sal de cozinha vem do mar! As salinas aprisionam água do mar e deixam evaporar — o NaCl (sal) cristaliza e fica no fundo.",
    exemplo:"Salinas do RJ e Região Norte: água do mar evapora → sal cristalizado é coletado e embalado."
  },
  {
    id:"t5", emoji:"🔬", cor:C.red, titulo:"Destilação Simples e Fracionada",
    resumo:"Separação de líquidos usando diferença de ponto de ebulição.",
    topicos:[
      "Destilação simples: separa sólido dissolvido em líquido (ou líquidos com pontos de ebulição muito diferentes). Ex: obter água destilada.",
      "Destilação fracionada: separa líquidos com pontos de ebulição próximos. Ex: refinamento do petróleo bruto → gasolina, querosene, diesel, plástico, asfalto.",
      "Fusão fracionada: separa sólidos com diferentes pontos de fusão pelo aquecimento gradual.",
    ],
    destaque:"A destilação fracionada do petróleo é fundamental para a civilização moderna — gera combustíveis, plásticos e outros produtos essenciais.",
    exemplo:"Água destilada usada em hospitais é obtida por destilação simples da água comum."
  },
];

const CAP3_QUIZ = [
  {src:"PA3 Q1",
   q:"Separar pedrinhas do feijão com as mãos é um exemplo de:",
   opts:["Tamisação","Catação","Decantação","Ventilação"],
   ans:1,
   fb:"Catação é a separação manual de sólidos que podem ser distinguidos visualmente, usando mãos ou pinças. É o método mais simples e direto."},
  {src:"PA3 Q2",
   q:"Na garimpagem de ouro, usa-se água corrente para separar o ouro da areia. Esse método é:",
   opts:["Catação","Tamisação","Levigação","Filtração"],
   ans:2,
   fb:"Levigação usa corrente de ÁGUA para separar sólidos de densidades diferentes. O ouro, mais denso, fica no fundo enquanto a areia leve é arrastada."},
  {src:"PA3 Q3",
   q:"O sal de cozinha é obtido do mar por qual método de separação?",
   opts:["Destilação","Filtração","Centrifugação","Evaporação"],
   ans:3,
   fb:"Nas salinas, a água do mar é aprisionada em tanques e aquecida pelo sol. O solvente (água) evapora e o soluto (NaCl — sal) cristaliza e fica no fundo. Método: EVAPORAÇÃO."},
  {src:"PA3 Q4",
   q:"Para separar o sangue em plasma, glóbulos e plaquetas, o laboratório usa:",
   opts:["Filtração","Decantação simples","Centrifugação","Tamisação"],
   ans:2,
   fb:"A centrifugação gira a amostra em alta velocidade, separando os componentes do sangue pela diferença de densidade muito mais rápido que a decantação simples."},
  {src:"PA3 Q5",
   q:"O filtro de água da cozinha funciona com qual método de separação?",
   opts:["Decantação","Filtração","Evaporação","Destilação"],
   ans:1,
   fb:"O filtro de água usa FILTRAÇÃO: a água passa por um filtro (geralmente de cerâmica ou carvão ativado) que retém as impurezas sólidas, deixando a água limpa passar."},
  {src:"PA3 Q6",
   q:"A destilação fracionada do petróleo bruto permite obter:",
   opts:["Apenas gasolina","Apenas água","Gasolina, querosene, diesel, plásticos e asfalto","Apenas gás de cozinha"],
   ans:2,
   fb:"A destilação fracionada separa os componentes do petróleo pelos diferentes pontos de ebulição, produzindo: gás (GLP), gasolina, querosene, diesel, óleos lubrificantes, asfalto e matéria-prima para plásticos."},
  {src:"PA3 Q7",
   q:"Para separar areia de farinha de trigo, o método mais adequado é:",
   opts:["Decantação","Destilação","Tamisação (peneiração)","Centrifugação"],
   ans:2,
   fb:"A tamisação usa uma peneira com malha de tamanho adequado: a farinha (partículas menores) passa pelos furos; a areia (partículas maiores) fica retida. Separa sólidos por tamanho de partícula."},
  {src:"PA3 Q8",
   q:"Água barrenta deixada em repouso por horas faz o barro depositar no fundo. Esse processo é:",
   opts:["Filtração","Centrifugação","Evaporação","Decantação"],
   ans:3,
   fb:"Decantação é a deposição natural de sólidos mais densos no fundo de um líquido, pelo efeito da gravidade e com o tempo. A centrifugação faz o mesmo, mas mais rápido, com força centrífuga."},
];

const CAP3_DISCURSIVAS = [
  {
    n:1,
    q:"Explique como o sal de cozinha é obtido do mar, descrevendo o processo de separação utilizado.",
    resp:"O sal de cozinha é obtido do mar por evaporação. Nas salinas, a água do mar é aprisionada em tanques rasos. O calor do sol aquece a água, fazendo-a evaporar gradualmente. Como o NaCl (cloreto de sódio) tem ponto de ebulição muito mais alto que a água, ele permanece sólido e cristaliza no fundo dos tanques. O sal cristalizado é então coletado, lavado e embalado. As principais salinas brasileiras ficam no Rio Grande do Norte e na região Norte do país."
  },
  {
    n:2,
    q:"Por que é necessário usar centrifugação para separar o sangue em vez de simplesmente deixá-lo em repouso (decantação)?",
    resp:"Embora a decantação simples funcione para separar o sangue, ela levaria muito tempo, pois as partículas (glóbulos, plaquetas) são muito pequenas e leves. A centrifugação resolve esse problema: o aparelho gira a amostra em alta velocidade (milhares de RPM), gerando uma força centrífuga que acelera enormemente a separação por densidade. Em poucos minutos, o sangue se separa em plasma (sobrenadante), glóbulos brancos e plaquetas (camada intermediária) e glóbulos vermelhos (depósito no fundo)."
  },
  {
    n:3,
    q:"Explique a diferença entre destilação simples e destilação fracionada, dando um exemplo de cada.",
    resp:"Destilação simples: separa um sólido dissolvido em líquido, ou líquidos com pontos de ebulição muito diferentes. O líquido é aquecido, evapora, condensa e é coletado separadamente. Ex: obter água destilada pura — a água evapora e é condensada, deixando sais e impurezas para trás. Destilação fracionada: separa misturas de líquidos com pontos de ebulição próximos, usando uma coluna de fracionamento com temperaturas diferenciadas. Ex: refinamento do petróleo bruto — cada fração (gasolina, diesel, querosene) é coletada em temperatura diferente."
  },
];

// ─────────────── COMPONENTS ───────────────

function SectionHeader({titulo, subtitulo, cor}){
  return(
    <div style={{marginBottom:20,paddingBottom:14,borderBottom:`2px solid ${cor}33`}}>
      <div style={{fontSize:20,fontWeight:900,color:cor}}>{titulo}</div>
      {subtitulo && <div style={{fontSize:13,color:C.gray,marginTop:4}}>{subtitulo}</div>}
    </div>
  );
}

function ConceCard({t, open, setOpen}){
  const isOpen = open===t.id;
  return(
    <div onClick={()=>setOpen(isOpen?null:t.id)} style={{
      borderRadius:14, border:`2px solid ${isOpen?t.cor:C.grayLight}`,
      background:isOpen?t.cor+"12":C.white, cursor:"pointer",
      transition:"all 0.25s", overflow:"hidden",
      boxShadow:isOpen?"0 4px 20px "+t.cor+"33":"0 2px 8px rgba(0,0,0,0.06)"
    }}>
      <div style={{display:"flex",alignItems:"center",padding:"14px 18px",gap:14}}>
        <div style={{fontSize:28,flexShrink:0}}>{t.emoji}</div>
        <div style={{flex:1}}>
          <div style={{fontWeight:800,fontSize:15,color:isOpen?t.cor:C.blueDark}}>{t.titulo}</div>
          <div style={{fontSize:12,color:C.gray,marginTop:2}}>{t.resumo}</div>
        </div>
        <div style={{fontSize:20,color:t.cor,transition:"transform 0.25s",transform:isOpen?"rotate(180deg)":"rotate(0deg)"}}>▾</div>
      </div>
      {isOpen && (
        <div style={{padding:"0 18px 18px",animation:"fadeIn 0.25s ease"}}>
          <div style={{background:C.white,borderRadius:10,padding:14,marginBottom:10}}>
            {t.topicos.map((tp,i)=>(
              <div key={i} style={{display:"flex",gap:8,marginBottom:8,alignItems:"flex-start"}}>
                <span style={{color:t.cor,fontWeight:900,fontSize:14,flexShrink:0}}>•</span>
                <span style={{fontSize:13,color:"#212121",lineHeight:1.6}}>{tp}</span>
              </div>
            ))}
          </div>
          <div style={{background:t.cor+"22",borderLeft:`4px solid ${t.cor}`,borderRadius:"0 8px 8px 0",padding:"10px 14px",marginBottom:8}}>
            <span style={{fontSize:12,fontWeight:700,color:t.cor}}>📌 DESTAQUE: </span>
            <span style={{fontSize:13,color:"#212121"}}>{t.destaque}</span>
          </div>
          <div style={{background:"#F5F5F5",borderRadius:8,padding:"8px 12px"}}>
            <span style={{fontSize:12,fontWeight:700,color:C.gray}}>💡 EXEMPLO: </span>
            <span style={{fontSize:13,color:"#444"}}>{t.exemplo}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function QuizComponent({QS, cor}){
  const [cur,setCur]=useState(0);
  const [cho,setCho]=useState(null);
  const [score,setScore]=useState(0);
  const [done,setDone]=useState(false);
  const [hist,setHist]=useState([]);

  function choose(i){
    if(cho!==null)return;
    setCho(i);
    const ok=i===QS[cur].ans;
    if(ok)setScore(s=>s+1);
    setHist(h=>[...h,{q:cur,i,ok}]);
  }
  function next(){
    if(cur+1>=QS.length){setDone(true);return;}
    setCur(c=>c+1);setCho(null);
  }
  function restart(){setCur(0);setCho(null);setScore(0);setDone(false);setHist([]);}

  const pct=Math.round((score/QS.length)*100);
  const q=QS[cur];

  if(done){
    return(
      <div style={{textAlign:"center",padding:"20px 10px",animation:"fadeIn 0.4s ease"}}>
        <div style={{fontSize:60,marginBottom:8}}>{pct>=80?"🏆":pct>=60?"📚":"💪"}</div>
        <div style={{fontSize:26,fontWeight:900,color:cor,marginBottom:4}}>{score} / {QS.length} acertos</div>
        <div style={{fontSize:14,color:C.gray,marginBottom:16}}>
          {pct>=80?"Excelente! Você domina esse conteúdo!":pct>=60?"Bom! Revise os erros abaixo.":"Continue estudando! Veja a Teoria e tente novamente."}
        </div>
        <div style={{margin:"0 auto 20px",width:"100%",maxWidth:300,height:12,background:C.grayLight,borderRadius:8,overflow:"hidden"}}>
          <div style={{width:pct+"%",height:"100%",background:pct>=70?C.green:pct>=50?cor:C.red,borderRadius:8,transition:"width 1.2s ease"}}/>
        </div>
        <div style={{textAlign:"left",display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
          {hist.map((h,i)=>(
            <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",background:h.ok?C.greenLight:C.redLight,borderRadius:10,padding:"10px 14px",border:`1.5px solid ${h.ok?C.green:C.red}`}}>
              <span style={{fontSize:16,flexShrink:0}}>{h.ok?"✅":"❌"}</span>
              <div>
                <div style={{fontSize:12,fontWeight:700,color:h.ok?C.green:C.red}}>Q{i+1}: {QS[h.q].src}</div>
                <div style={{fontSize:12,color:"#333",marginTop:2}}>{QS[h.q].fb}</div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={restart} style={{background:cor,color:"#fff",border:"none",borderRadius:20,padding:"10px 28px",fontWeight:700,fontSize:14,cursor:"pointer"}}>🔄 Tentar novamente</button>
      </div>
    );
  }

  return(
    <div style={{animation:"fadeIn 0.3s ease"}}>
      {/* Barra progresso */}
      <div style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:C.gray,marginBottom:4}}>
          <span>Questão {cur+1} de {QS.length}</span>
          <span>{score} acerto{score!==1?"s":""}</span>
        </div>
        <div style={{height:6,background:C.grayLight,borderRadius:4,overflow:"hidden"}}>
          <div style={{width:((cur)/QS.length*100)+"%",height:"100%",background:cor,borderRadius:4,transition:"width 0.4s ease"}}/>
        </div>
      </div>
      {/* Fonte */}
      <div style={{fontSize:11,color:C.gray,fontWeight:700,marginBottom:8,letterSpacing:1}}>{q.src}</div>
      {/* Pergunta */}
      <div style={{fontSize:15,fontWeight:700,color:C.blueDark,marginBottom:16,lineHeight:1.5}}>{q.q}</div>
      {/* Opções */}
      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:16}}>
        {q.opts.map((op,i)=>{
          let bg=C.white,border=C.grayLight,col="#333";
          if(cho!==null){
            if(i===q.ans){bg=C.greenLight;border=C.green;col=C.green;}
            else if(i===cho&&cho!==q.ans){bg=C.redLight;border=C.red;col=C.red;}
          }
          return(
            <button key={i} disabled={cho!==null} onClick={()=>choose(i)} style={{
              background:bg,border:`2px solid ${border}`,borderRadius:12,
              padding:"12px 16px",textAlign:"left",cursor:cho===null?"pointer":"default",
              color:col,fontWeight:cho!==null&&i===q.ans?700:400,fontSize:14,
              fontFamily:"inherit",transition:"all 0.2s",
            }}>
              <span style={{fontWeight:700,marginRight:8,color:cor}}>{String.fromCharCode(65+i)})</span>{op}
              {cho!==null&&i===q.ans&&<span style={{float:"right"}}>✅</span>}
              {cho!==null&&i===cho&&cho!==q.ans&&<span style={{float:"right"}}>❌</span>}
            </button>
          );
        })}
      </div>
      {/* Feedback */}
      {cho!==null&&(
        <div style={{background:cho===q.ans?C.greenLight:C.redLight,border:`1.5px solid ${cho===q.ans?C.green:C.red}`,borderRadius:10,padding:"12px 16px",marginBottom:16,animation:"fadeIn 0.3s ease"}}>
          <div style={{fontWeight:700,color:cho===q.ans?C.green:C.red,marginBottom:4}}>
            {cho===q.ans?"✅ Correto!":"❌ Incorreto!"}
          </div>
          <div style={{fontSize:13,color:"#333"}}>{q.fb}</div>
        </div>
      )}
      {cho!==null&&(
        <button onClick={next} style={{
          background:cor,color:"#fff",border:"none",borderRadius:20,
          padding:"10px 28px",fontWeight:700,fontSize:14,cursor:"pointer",width:"100%"
        }}>{cur+1<QS.length?"Próxima →":"Ver resultado 🏁"}</button>
      )}
    </div>
  );
}

function DiscursivaComponent({QS, cor}){
  const [open,setOpen]=useState(null);
  const [resps,setResps]=useState({});
  return(
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      {QS.map((dq,i)=>(
        <div key={i} style={{border:`2px solid ${open===i?cor:C.grayLight}`,borderRadius:14,overflow:"hidden",background:C.white,boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
          <div onClick={()=>setOpen(open===i?null:i)} style={{padding:"14px 18px",cursor:"pointer",display:"flex",gap:12,alignItems:"flex-start"}}>
            <div style={{width:28,height:28,borderRadius:"50%",background:cor,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:13,flexShrink:0}}>{dq.n}</div>
            <div style={{flex:1,fontSize:14,fontWeight:600,color:C.blueDark,lineHeight:1.5}}>{dq.q}</div>
            <div style={{fontSize:18,color:cor,transform:open===i?"rotate(180deg)":"none",transition:"transform 0.2s",flexShrink:0}}>▾</div>
          </div>
          {open===i&&(
            <div style={{padding:"0 18px 18px",animation:"fadeIn 0.25s ease"}}>
              <textarea
                placeholder="Escreva sua resposta aqui..."
                value={resps[i]||""}
                onChange={e=>setResps(r=>({...r,[i]:e.target.value}))}
                style={{width:"100%",minHeight:100,borderRadius:10,border:`1.5px solid ${cor}66`,padding:12,fontSize:13,fontFamily:"inherit",resize:"vertical",outline:"none",marginBottom:12,boxSizing:"border-box"}}
              />
              <button onClick={()=>setResps(r=>({...r,[i+"_show"]:!r[i+"_show"]}))} style={{background:cor,color:"#fff",border:"none",borderRadius:16,padding:"8px 20px",fontWeight:700,fontSize:13,cursor:"pointer",marginBottom:resps[i+"_show"]?12:0}}>
                {resps[i+"_show"]?"Ocultar resposta modelo":"Ver resposta modelo"}
              </button>
              {resps[i+"_show"]&&(
                <div style={{background:cor+"12",border:`1.5px solid ${cor}44`,borderRadius:10,padding:"12px 14px",animation:"fadeIn 0.25s ease"}}>
                  <div style={{fontSize:11,fontWeight:700,color:cor,marginBottom:6,letterSpacing:1}}>RESPOSTA MODELO</div>
                  <div style={{fontSize:13,color:"#212121",lineHeight:1.7}}>{dq.resp}</div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function MapaComponent({dados, cor}){
  return(
    <div>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{display:"inline-block",background:cor,color:"#fff",borderRadius:12,padding:"10px 28px",fontWeight:900,fontSize:17,boxShadow:"0 4px 16px "+cor+"44"}}>{dados.central}</div>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center",marginBottom:20}}>
        {dados.nos.filter(n=>!n.pai).map(n=>(
          <div key={n.id} style={{background:n.cor+"22",border:`2px solid ${n.cor}`,borderRadius:12,padding:"10px 18px",textAlign:"center",minWidth:140}}>
            <div style={{fontWeight:800,color:n.cor,fontSize:14}}>{n.label}</div>
            {n.sub&&<div style={{fontSize:11,color:C.gray,marginTop:3}}>{n.sub}</div>}
          </div>
        ))}
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center"}}>
        {dados.nos.filter(n=>n.pai).map(n=>(
          <div key={n.id} style={{background:n.cor,border:`1.5px solid ${n.corPai}`,borderRadius:10,padding:"8px 14px",textAlign:"center",minWidth:120}}>
            <div style={{fontSize:11,color:n.corPai,fontWeight:700,marginBottom:2}}>↳ {n.pai}</div>
            <div style={{fontWeight:700,color:C.blueDark,fontSize:13}}>{n.label}</div>
            {n.sub&&<div style={{fontSize:10,color:C.gray,marginTop:2,whiteSpace:"pre-line"}}>{n.sub}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────── LAB COMPONENTS ───────────────

// LAB CAP 1: Simulador de misturas
const MISTURAS_LAB = {
  "agua+sal":        {tipo:"Homogênea",fases:1,label:"Solução salina",desc:"O sal dissolve-se completamente na água — 1 fase visível.",cor1:"#B3E5FC",cor2:null,cor3:null},
  "agua+oleo":       {tipo:"Heterogênea",fases:2,label:"Bifásica",desc:"Óleo (menos denso) flutua sobre a água — 2 fases.",cor1:"#FFF176",cor2:"#B3E5FC",cor3:null},
  "agua+areia":      {tipo:"Heterogênea",fases:2,label:"Bifásica",desc:"Areia (mais densa) deposita no fundo — 2 fases.",cor1:"#B3E5FC",cor2:"#D7CCC8",cor3:null},
  "agua+oleo+areia": {tipo:"Heterogênea",fases:3,label:"Trifásica",desc:"Areia no fundo, água no meio, óleo em cima — 3 fases.",cor1:"#FFF176",cor2:"#B3E5FC",cor3:"#D7CCC8"},
  "agua+oleo+areia+gelo":{tipo:"Heterogênea",fases:4,label:"Polifásica",desc:"Gelo flutua, óleo abaixo, água no meio, areia no fundo — 4 fases.",cor1:"#E3F2FD",cor2:"#FFF176",cor3:"#B3E5FC"},
  "agua+acucar":     {tipo:"Homogênea",fases:1,label:"Solução açucarada",desc:"Açúcar dissolve-se na água — solução homogênea.",cor1:"#F8F8DC",cor2:null,cor3:null},
  "sangue":          {tipo:"Heterogênea*",fases:3,label:"Aparente homogênea",desc:"Parece homogêneo, mas tem plasma, glóbulos e plaquetas — heterogêneo ao microscópio.",cor1:"#EF9A9A",cor2:"#E57373",cor3:"#FFCDD2"},
  "leite":           {tipo:"Heterogênea*",fases:3,label:"Aparente homogênea",desc:"Parece homogêneo, mas tem gordura, proteínas e água — heterogêneo ao microscópio.",cor1:"#F5F5F5",cor2:"#FFFDE7",cor3:"#F0F0F0"},
};

function LabCap1(){
  const [sel,setSel]=useState([]);
  const [mistura,setMistura]=useState(null);

  const ingredientes=["agua","sal","oleo","areia","gelo","acucar","sangue","leite"];
  const labels={"agua":"💧 Água","sal":"🧂 Sal","oleo":"🫙 Óleo","areia":"🏖 Areia","gelo":"🧊 Gelo","acucar":"🍬 Açúcar","sangue":"🩸 Sangue","leite":"🥛 Leite"};

  function toggleIng(i){
    if(i==="sangue"||i==="leite"){setSel([i]);return;}
    const ns=sel.filter(x=>x!=="sangue"&&x!=="leite");
    if(ns.includes(i))setSel(ns.filter(x=>x!==i));
    else setSel([...ns,i]);
    setMistura(null);
  }
  function analisar(){
    const key=sel.sort().join("+");
    const r=MISTURAS_LAB[key]||{tipo:"Heterogênea",fases:sel.length,label:"Mistura Múltipla",desc:"Mistura com "+sel.length+" componentes — provavelmente heterogênea.",cor1:"#E8EAF6",cor2:"#C5CAE9",cor3:"#9FA8DA"};
    setMistura(r);
  }

  return(
    <div>
      <SectionHeader titulo="🧪 Laboratório Virtual — Misturas" subtitulo="Selecione ingredientes e analise a mistura formada" cor={C.red}/>
      <div style={{marginBottom:16}}>
        <div style={{fontSize:13,fontWeight:700,color:C.gray,marginBottom:10}}>Selecione ingredientes:</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {ingredientes.map(i=>(
            <button key={i} onClick={()=>toggleIng(i)} style={{
              background:sel.includes(i)?C.red:C.white,
              color:sel.includes(i)?"#fff":C.blueDark,
              border:`2px solid ${sel.includes(i)?C.red:C.grayLight}`,
              borderRadius:20,padding:"8px 16px",fontSize:13,fontWeight:700,
              cursor:"pointer",fontFamily:"inherit",transition:"all 0.2s"
            }}>{labels[i]}</button>
          ))}
        </div>
      </div>
      <button onClick={analisar} disabled={sel.length<1} style={{
        background:sel.length>=1?C.blue:"#ccc",color:"#fff",border:"none",
        borderRadius:20,padding:"10px 24px",fontWeight:700,fontSize:14,
        cursor:sel.length>=1?"pointer":"default",fontFamily:"inherit",marginBottom:20
      }}>🔍 Analisar mistura</button>

      {mistura&&(
        <div style={{animation:"fadeIn 0.4s ease"}}>
          {/* Béquer visual */}
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:20}}>
            <div style={{width:100,height:140,borderRadius:"0 0 20px 20px",border:"3px solid #90CAF9",overflow:"hidden",background:"#F5F5F5",position:"relative",flexShrink:0}}>
              {[mistura.cor3,mistura.cor2,mistura.cor1].filter(Boolean).map((c,i,arr)=>(
                <div key={i} style={{
                  position:"absolute",width:"100%",
                  height:Math.floor(130/arr.length)+"px",
                  bottom:i*Math.floor(130/arr.length)+"px",
                  background:c, opacity:0.9
                }}/>
              ))}
              {/* Gelo flutuando */}
              {sel.includes("gelo")&&<div style={{position:"absolute",top:4,left:"50%",transform:"translateX(-50%)",fontSize:18}}>🧊</div>}
            </div>
            <div style={{marginTop:8,fontSize:12,color:C.gray}}>Béquer simulado</div>
          </div>
          {/* Resultado */}
          <div style={{background:C.blueLight,borderRadius:14,padding:16,border:`2px solid ${C.blue}`}}>
            <div style={{fontSize:16,fontWeight:900,color:C.blueDark,marginBottom:8}}>Resultado da análise</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
              <div style={{background:C.white,borderRadius:10,padding:10,textAlign:"center"}}>
                <div style={{fontSize:11,color:C.gray,fontWeight:700}}>TIPO</div>
                <div style={{fontSize:15,fontWeight:900,color:C.red,marginTop:4}}>{mistura.tipo}</div>
              </div>
              <div style={{background:C.white,borderRadius:10,padding:10,textAlign:"center"}}>
                <div style={{fontSize:11,color:C.gray,fontWeight:700}}>FASES</div>
                <div style={{fontSize:15,fontWeight:900,color:C.blue,marginTop:4}}>{mistura.fases} fase{mistura.fases!==1?"s":""} — {mistura.label}</div>
              </div>
            </div>
            <div style={{background:C.white,borderRadius:10,padding:12,fontSize:13,color:"#333"}}>{mistura.desc}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// LAB CAP 2: Classificador de fenômenos
const FENOMENOS=[
  {nome:"Gelo derretendo",tipo:"Física",emoji:"🧊",exp:"Mudança de estado físico — H₂O continua sendo H₂O"},
  {nome:"Madeira pegando fogo",tipo:"Química",emoji:"🔥",exp:"Combustão — forma CO₂, água e cinzas (novas substâncias)"},
  {nome:"Lagarta → Borboleta",tipo:"Biológica",emoji:"🦋",exp:"Metamorfose — processo vital em ser vivo"},
  {nome:"Latinha amassada",tipo:"Física",emoji:"🥤",exp:"Mudança de forma — alumínio continua sendo alumínio"},
  {nome:"Ferrugem no ferro",tipo:"Química",emoji:"🔩",exp:"Fe + O₂ → Fe₂O₃ — nova substância formada"},
  {nome:"Crescimento do cabelo",tipo:"Biológica",emoji:"💇",exp:"Processo vital controlado pelo organismo"},
  {nome:"Sal dissolvendo em água",tipo:"Física",emoji:"🧂",exp:"Mistura física — o sal pode ser recuperado por evaporação"},
  {nome:"Queima do papel",tipo:"Química",emoji:"📄",exp:"Formação de cinzas e gases — novas substâncias"},
  {nome:"Germinação de semente",tipo:"Biológica",emoji:"🌱",exp:"Processo de desenvolvimento vegetal"},
  {nome:"Alisamento químico",tipo:"Química",emoji:"💆",exp:"Destrói ligações químicas das proteínas dos fios — irreversível"},
  {nome:"Gelo se formando",tipo:"Física",emoji:"❄️",exp:"Mudança de estado físico — H₂O continua H₂O"},
  {nome:"Fazer bolo",tipo:"Química",emoji:"🎂",exp:"Reação química ao assar — forma nova substância"},
];

function LabCap2(){
  const [idx,setIdx]=useState(0);
  const [cho,setCho]=useState(null);
  const [pts,setPts]=useState(0);
  const [done,setDone]=useState(false);

  const f=FENOMENOS[idx];
  function guess(t){
    if(cho)return;
    setCho(t);
    if(t===f.tipo)setPts(p=>p+1);
  }
  function next(){
    if(idx+1>=FENOMENOS.length){setDone(true);return;}
    setIdx(i=>i+1);setCho(null);
  }
  function restart(){setIdx(0);setCho(null);setPts(0);setDone(false);}

  if(done){return(
    <div style={{textAlign:"center",padding:30}}>
      <div style={{fontSize:56}}>{pts>=10?"🏆":pts>=7?"📚":"💪"}</div>
      <div style={{fontSize:24,fontWeight:900,color:C.purple,marginTop:8}}>{pts} / {FENOMENOS.length} corretos</div>
      <div style={{fontSize:14,color:C.gray,margin:"12px 0 20px"}}>{pts>=10?"Excelente! Você sabe classificar fenômenos!":pts>=7?"Bom! Revise os tipos de transformação.":"Volte para a Teoria e tente novamente."}</div>
      <button onClick={restart} style={{background:C.purple,color:"#fff",border:"none",borderRadius:20,padding:"10px 28px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>🔄 Jogar novamente</button>
    </div>
  );}

  return(
    <div>
      <SectionHeader titulo="⚡ Laboratório — Classificador de Fenômenos" subtitulo="Classifique cada fenômeno como Físico, Químico ou Biológico" cor={C.purple}/>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:C.gray,marginBottom:8}}>
        <span>{idx+1}/{FENOMENOS.length}</span><span>✅ {pts} correto{pts!==1?"s":""}</span>
      </div>
      <div style={{height:6,background:C.grayLight,borderRadius:4,marginBottom:20,overflow:"hidden"}}>
        <div style={{width:(idx/FENOMENOS.length*100)+"%",height:"100%",background:C.purple,borderRadius:4,transition:"width 0.4s"}}/>
      </div>
      <div style={{textAlign:"center",padding:"20px 10px",background:C.purpleLight,borderRadius:16,marginBottom:20}}>
        <div style={{fontSize:52,marginBottom:8}}>{f.emoji}</div>
        <div style={{fontSize:18,fontWeight:800,color:C.purple}}>{f.nome}</div>
      </div>
      <div style={{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap"}}>
        {["Física","Química","Biológica"].map(t=>{
          let bg=C.white,bord=C.grayLight,col="#333";
          if(cho){
            if(t===f.tipo){bg=C.greenLight;bord=C.green;col=C.green;}
            else if(t===cho&&cho!==f.tipo){bg=C.redLight;bord=C.red;col=C.red;}
          }
          return(
            <button key={t} disabled={!!cho} onClick={()=>guess(t)} style={{
              flex:1,minWidth:80,background:bg,border:`2px solid ${bord}`,borderRadius:12,
              padding:"14px 8px",fontSize:14,fontWeight:700,cursor:cho?"default":"pointer",
              color:col,fontFamily:"inherit",transition:"all 0.2s"
            }}>{t==="Física"?"🧊":t==="Química"?"🔥":"🦋"} {t}</button>
          );
        })}
      </div>
      {cho&&(
        <div style={{background:cho===f.tipo?C.greenLight:C.redLight,border:`1.5px solid ${cho===f.tipo?C.green:C.red}`,borderRadius:10,padding:14,marginBottom:16,animation:"fadeIn 0.3s"}}>
          <div style={{fontWeight:700,color:cho===f.tipo?C.green:C.red,marginBottom:4}}>{cho===f.tipo?"✅ Correto!":"❌ Era "+f.tipo+"!"}</div>
          <div style={{fontSize:13,color:"#333"}}>{f.exp}</div>
        </div>
      )}
      {cho&&<button onClick={next} style={{background:C.purple,color:"#fff",border:"none",borderRadius:20,padding:"10px 28px",fontWeight:700,fontSize:14,cursor:"pointer",width:"100%",fontFamily:"inherit"}}>{idx+1<FENOMENOS.length?"Próximo →":"Ver resultado 🏁"}</button>}
    </div>
  );
}

// LAB CAP 3: Selecionador de método
const SEP_CASOS=[
  {prob:"Separar feijão de pedrinhas",metodo:"Catação",emoji:"🫘",exp:"Sólidos distinguíveis visualmente → catação manual"},
  {prob:"Separar farinha de trigo de areia grossa",metodo:"Tamisação",emoji:"🫙",exp:"Diferentes tamanhos de partícula → peneira (tamis)"},
  {prob:"Obter sal do mar",metodo:"Evaporação",emoji:"🌊",exp:"Evaporar o solvente (água) → soluto (NaCl) cristaliza"},
  {prob:"Separar água barrenta (barro + água)",metodo:"Decantação",emoji:"💧",exp:"Sólido mais denso deposita no fundo pelo repouso"},
  {prob:"Separar sangue em plasma e glóbulos",metodo:"Centrifugação",emoji:"🩸",exp:"Força centrífuga separa por densidade rapidamente"},
  {prob:"Separar componentes do petróleo bruto",metodo:"Destilação Fracionada",emoji:"⛽",exp:"Diferentes pontos de ebulição → separação por temperatura"},
  {prob:"Filtrar água turva (remover impurezas sólidas)",metodo:"Filtração",emoji:"🚰",exp:"Filtro retém sólidos, líquido passa — como filtro de água"},
  {prob:"Separar ouro da areia por corrente d'água",metodo:"Levigação",emoji:"⛏️",exp:"Ouro mais denso fica, areia leve é arrastada pela água"},
  {prob:"Separar grãos de arroz das cascas (palha)",metodo:"Ventilação",emoji:"🌾",exp:"Corrente de ar arrasta as cascas leves, grãos pesados ficam"},
  {prob:"Obter água pura destilada para hospital",metodo:"Destilação Simples",emoji:"🏥",exp:"Água evapora, condensa e é coletada pura — sem sais ou impurezas"},
];

const METODOS=["Catação","Tamisação","Evaporação","Decantação","Centrifugação","Destilação Fracionada","Filtração","Levigação","Ventilação","Destilação Simples"];

function LabCap3(){
  const [idx,setIdx]=useState(0);
  const [cho,setCho]=useState(null);
  const [pts,setPts]=useState(0);
  const [done,setDone]=useState(false);

  const c=SEP_CASOS[idx];
  function guess(m){
    if(cho)return;
    setCho(m);
    if(m===c.metodo)setPts(p=>p+1);
  }
  function next(){
    if(idx+1>=SEP_CASOS.length){setDone(true);return;}
    setIdx(i=>i+1);setCho(null);
  }
  function restart(){setIdx(0);setCho(null);setPts(0);setDone(false);}

  if(done){return(
    <div style={{textAlign:"center",padding:30}}>
      <div style={{fontSize:56}}>{pts>=9?"🏆":pts>=6?"📚":"💪"}</div>
      <div style={{fontSize:24,fontWeight:900,color:C.orange,marginTop:8}}>{pts} / {SEP_CASOS.length} corretos</div>
      <div style={{fontSize:14,color:C.gray,margin:"12px 0 20px"}}>{pts>=9?"Excelente!":pts>=6?"Bom! Revise os métodos.":"Estude a Teoria e tente novamente."}</div>
      <button onClick={restart} style={{background:C.orange,color:"#fff",border:"none",borderRadius:20,padding:"10px 28px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>🔄 Jogar novamente</button>
    </div>
  );}

  return(
    <div>
      <SectionHeader titulo="🔬 Laboratório — Método de Separação" subtitulo="Escolha o método correto para cada situação" cor={C.orange}/>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:C.gray,marginBottom:8}}>
        <span>{idx+1}/{SEP_CASOS.length}</span><span>✅ {pts} correto{pts!==1?"s":""}</span>
      </div>
      <div style={{height:6,background:C.grayLight,borderRadius:4,marginBottom:20,overflow:"hidden"}}>
        <div style={{width:(idx/SEP_CASOS.length*100)+"%",height:"100%",background:C.orange,borderRadius:4,transition:"width 0.4s"}}/>
      </div>
      <div style={{textAlign:"center",padding:"18px 10px",background:C.orangeLight,borderRadius:16,marginBottom:20,border:`2px solid ${C.orange}44`}}>
        <div style={{fontSize:48,marginBottom:8}}>{c.emoji}</div>
        <div style={{fontSize:15,fontWeight:700,color:C.orange}}>{c.prob}</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
        {METODOS.map(m=>{
          let bg=C.white,bord=C.grayLight,col="#333";
          if(cho){
            if(m===c.metodo){bg=C.greenLight;bord=C.green;col=C.green;}
            else if(m===cho&&cho!==c.metodo){bg=C.redLight;bord=C.red;col=C.red;}
          }
          return(
            <button key={m} disabled={!!cho} onClick={()=>guess(m)} style={{
              background:bg,border:`1.5px solid ${bord}`,borderRadius:10,
              padding:"10px 8px",fontSize:12,fontWeight:700,cursor:cho?"default":"pointer",
              color:col,fontFamily:"inherit",transition:"all 0.2s",textAlign:"center"
            }}>{m}</button>
          );
        })}
      </div>
      {cho&&(
        <div style={{background:cho===c.metodo?C.greenLight:C.redLight,border:`1.5px solid ${cho===c.metodo?C.green:C.red}`,borderRadius:10,padding:14,marginBottom:16,animation:"fadeIn 0.3s"}}>
          <div style={{fontWeight:700,color:cho===c.metodo?C.green:C.red,marginBottom:4}}>
            {cho===c.metodo?"✅ Correto!":"❌ O método correto é: "+c.metodo}
          </div>
          <div style={{fontSize:13,color:"#333"}}>{c.exp}</div>
        </div>
      )}
      {cho&&<button onClick={next} style={{background:C.orange,color:"#fff",border:"none",borderRadius:20,padding:"10px 28px",fontWeight:700,fontSize:14,cursor:"pointer",width:"100%",fontFamily:"inherit"}}>{idx+1<SEP_CASOS.length?"Próximo →":"Ver resultado 🏁"}</button>}
    </div>
  );
}

// ─────────────── TEORIA WRAPPERS ───────────────
function TeoriaCap1(){
  const [open,setOpen]=useState(null);
  return(
    <div>
      <SectionHeader titulo="📖 Teoria — Cap. 1: Misturas Homogêneas e Heterogêneas" subtitulo="Clique em cada card para expandir o conteúdo" cor={C.red}/>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {CAP1_TEORIA.map(t=><ConceCard key={t.id} t={t} open={open} setOpen={setOpen}/>)}
      </div>
    </div>
  );
}
function TeoriaCap2(){
  const [open,setOpen]=useState(null);
  return(
    <div>
      <SectionHeader titulo="📖 Teoria — Cap. 2: Transformações Físicas, Químicas e Biológicas" subtitulo="Clique em cada card para expandir o conteúdo" cor={C.purple}/>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {CAP2_TEORIA.map(t=><ConceCard key={t.id} t={t} open={open} setOpen={setOpen}/>)}
      </div>
    </div>
  );
}
function TeoriaCap3(){
  const [open,setOpen]=useState(null);
  return(
    <div>
      <SectionHeader titulo="📖 Teoria — Cap. 3: Separação de Misturas" subtitulo="Clique em cada card para expandir o conteúdo" cor={C.orange}/>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {CAP3_TEORIA.map(t=><ConceCard key={t.id} t={t} open={open} setOpen={setOpen}/>)}
      </div>
    </div>
  );
}

// ─────────────── QUIZ WRAPPERS ───────────────
function QuizCap1(){ return <QuizComponent QS={CAP1_QUIZ} cor={C.red}/>; }
function QuizCap2(){ return <QuizComponent QS={CAP2_QUIZ} cor={C.purple}/>; }
function QuizCap3(){ return <QuizComponent QS={CAP3_QUIZ} cor={C.orange}/>; }

// ─────────────── DISCURSIVA WRAPPERS ───────────────
function DiscursivaCap1(){ return(
  <div>
    <SectionHeader titulo="✍️ Discursivas — Cap. 1" subtitulo="Escreva sua resposta e compare com o modelo" cor={C.red}/>
    <DiscursivaComponent QS={CAP1_DISCURSIVAS} cor={C.red}/>
  </div>
);}
function DiscursivaCap2(){ return(
  <div>
    <SectionHeader titulo="✍️ Discursivas — Cap. 2" subtitulo="Escreva sua resposta e compare com o modelo" cor={C.purple}/>
    <DiscursivaComponent QS={CAP2_DISCURSIVAS} cor={C.purple}/>
  </div>
);}
function DiscursivaCap3(){ return(
  <div>
    <SectionHeader titulo="✍️ Discursivas — Cap. 3" subtitulo="Escreva sua resposta e compare com o modelo" cor={C.orange}/>
    <DiscursivaComponent QS={CAP3_DISCURSIVAS} cor={C.orange}/>
  </div>
);}

// ─────────────── MAPA WRAPPERS ───────────────
const CAP2_MAPA={
  central:"TRANSFORMAÇÕES DA MATÉRIA",
  nos:[
    {id:"A",label:"Física",sub:"Não altera composição / Reversível",cor:C.blue},
    {id:"B",label:"Química",sub:"Altera composição / Geralmente irreversível",cor:C.red},
    {id:"C",label:"Biológica",sub:"Em seres vivos / Processo vital",cor:C.green},
    {id:"D",label:"Exemplos Físicas",sub:"Derreter, amassar,\ncortar, dissolver, prancha",cor:C.blueLight,pai:"A",corPai:C.blue},
    {id:"E",label:"Exemplos Químicas",sub:"Ferrugem, queima,\nbolo, alisamento químico",cor:C.redLight,pai:"B",corPai:C.red},
    {id:"F",label:"Exemplos Biológicas",sub:"Metamorfose, crescimento,\ngerminação",cor:C.greenLight,pai:"C",corPai:C.green},
  ]
};
const CAP3_MAPA={
  central:"SEPARAÇÃO DE MISTURAS",
  nos:[
    {id:"A",label:"Sólido + Sólido",sub:"Misturas de sólidos",cor:C.orange},
    {id:"B",label:"Sólido + Líquido",sub:"Sólido em líquido",cor:C.blue},
    {id:"C",label:"Líquido + Líquido",sub:"Dois líquidos",cor:C.teal},
    {id:"D",label:"Catação",sub:"Visual, manual",cor:C.orangeLight,pai:"A",corPai:C.orange},
    {id:"E",label:"Tamisação",sub:"Por tamanho (peneira)",cor:C.orangeLight,pai:"A",corPai:C.orange},
    {id:"F",label:"Ventilação",sub:"Por corrente de ar",cor:C.orangeLight,pai:"A",corPai:C.orange},
    {id:"G",label:"Levigação",sub:"Por corrente de água",cor:C.orangeLight,pai:"A",corPai:C.orange},
    {id:"H",label:"Decantação",sub:"Repouso + gravidade",cor:C.blueLight,pai:"B",corPai:C.blue},
    {id:"I",label:"Filtração",sub:"Filtro físico",cor:C.blueLight,pai:"B",corPai:C.blue},
    {id:"J",label:"Centrifugação",sub:"Força centrífuga",cor:C.blueLight,pai:"B",corPai:C.blue},
    {id:"K",label:"Evaporação",sub:"Evapora solvente",cor:C.blueLight,pai:"B",corPai:C.blue},
    {id:"L",label:"Dest. Simples",sub:"Ponto ebulição diferente",cor:C.tealLight,pai:"C",corPai:C.teal},
    {id:"M",label:"Dest. Fracionada",sub:"Pontos ebulição próximos",cor:C.tealLight,pai:"C",corPai:C.teal},
  ]
};

function MapaCap1(){ return(
  <div>
    <SectionHeader titulo="🗺️ Mapa Conceitual — Cap. 1" subtitulo="Organização visual dos conceitos de Misturas" cor={C.red}/>
    <MapaComponent dados={CAP1_MAPA} cor={C.red}/>
  </div>
);}
function MapaCap2(){ return(
  <div>
    <SectionHeader titulo="🗺️ Mapa Conceitual — Cap. 2" subtitulo="Organização visual das Transformações" cor={C.purple}/>
    <MapaComponent dados={CAP2_MAPA} cor={C.purple}/>
  </div>
);}
function MapaCap3(){ return(
  <div>
    <SectionHeader titulo="🗺️ Mapa Conceitual — Cap. 3" subtitulo="Organização visual de Separação de Misturas" cor={C.orange}/>
    <MapaComponent dados={CAP3_MAPA} cor={C.orange}/>
  </div>
);}

// ─────────────── APP CONFIG ───────────────
const CAP_CONFIG={
  cap1:{emoji:"🧪",bncc:"EF06CI01",titulo:"Misturas",subtitulo:"Homogêneas e Heterogêneas",cor:C.red,
        teoria:<TeoriaCap1/>,lab:<LabCap1/>,quiz:<QuizCap1/>,discursiva:<DiscursivaCap1/>,mapa:<MapaCap1/>},
  cap2:{emoji:"⚡",bncc:"EF06CI02",titulo:"Transformações",subtitulo:"Físicas, Químicas e Biológicas",cor:C.purple,
        teoria:<TeoriaCap2/>,lab:<LabCap2/>,quiz:<QuizCap2/>,discursiva:<DiscursivaCap2/>,mapa:<MapaCap2/>},
  cap3:{emoji:"🔬",bncc:"EF06CI03",titulo:"Separação",subtitulo:"Métodos de Separação de Misturas",cor:C.orange,
        teoria:<TeoriaCap3/>,lab:<LabCap3/>,quiz:<QuizCap3/>,discursiva:<DiscursivaCap3/>,mapa:<MapaCap3/>},
};

const CAPS=[
  {id:"cap1",label:"Cap. 1 — Misturas"},
  {id:"cap2",label:"Cap. 2 — Transformações"},
  {id:"cap3",label:"Cap. 3 — Separação"},
];

const TABS=[
  {id:"teoria",    label:"📖 Teoria",        desc:"Conceitos + cards"},
  {id:"lab",       label:"🧪 Laboratório",   desc:"Simulações"},
  {id:"quiz",      label:"❓ Objetivas",     desc:"Com gabarito"},
  {id:"discursiva",label:"✍️ Discursivas",  desc:"Com resposta modelo"},
  {id:"mapa",      label:"🗺️ Mapa",         desc:"Conceitos"},
];

const totalQ = CAP1_QUIZ.length + CAP2_QUIZ.length + CAP3_QUIZ.length;

export default function App(){
  const [cap,setCap]=useState("cap1");
  const [tab,setTab]=useState("teoria");

  const cfg=CAP_CONFIG[cap];

  function mudarCap(id){ setCap(id); setTab("teoria"); }

  return(
    <div style={{fontFamily:"'Segoe UI','Helvetica Neue',sans-serif",background:C.bg,minHeight:"100vh",paddingBottom:40}}>
      <style>{`
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes popIn{0%{opacity:0;transform:scale(0.9)}100%{opacity:1;transform:scale(1)}}
        *{box-sizing:border-box}
        textarea:focus{border-color:${C.blue}!important;outline:none}
        button:focus{outline:none}
      `}</style>

      {/* HEADER */}
      <div style={{background:`linear-gradient(135deg,${C.blueDark} 0%,${C.blue} 100%)`,padding:"18px 24px 0",boxShadow:"0 4px 20px rgba(13,71,161,0.4)"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          {/* Logo + Título */}
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:14,flexWrap:"wrap"}}>
            <Logo size={38}/>
            <div style={{borderLeft:"2px solid rgba(255,255,255,0.3)",paddingLeft:16}}>
              <div style={{color:"rgba(255,255,255,0.7)",fontSize:11,fontWeight:600,letterSpacing:2,textTransform:"uppercase"}}>AlfaReview · Ciências 6º Ano</div>
              <div style={{color:"#fff",fontSize:19,fontWeight:900,lineHeight:1.2}}>Unidade 1 — Matéria e Energia</div>
            </div>
            <div style={{marginLeft:"auto",background:"rgba(255,255,255,0.15)",borderRadius:10,padding:"6px 14px",textAlign:"center"}}>
              <div style={{color:"rgba(255,255,255,0.8)",fontSize:10,fontWeight:600}}>QUESTÕES</div>
              <div style={{color:"#fff",fontSize:20,fontWeight:900}}>{totalQ}Q</div>
            </div>
          </div>
          {/* Abas de Capítulos */}
          <div style={{display:"flex",gap:4,overflowX:"auto"}}>
            {CAPS.map(ch=>(
              <button key={ch.id} onClick={()=>mudarCap(ch.id)} style={{
                padding:"9px 18px",borderRadius:"10px 10px 0 0",border:"none",
                background:ch.id===cap?"#fff":"rgba(255,255,255,0.18)",
                color:ch.id===cap?C.blueDark:"#fff",
                fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"inherit",
                transition:"all 0.2s",whiteSpace:"nowrap",flexShrink:0,
              }}>{ch.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{maxWidth:900,margin:"0 auto",padding:"0 16px"}}>
        <div style={{background:C.white,borderRadius:"0 16px 16px 16px",boxShadow:"0 4px 24px rgba(0,0,0,0.08)",overflow:"hidden"}}>
          {/* Sub-abas */}
          <div style={{display:"flex",borderBottom:`2px solid ${C.grayLight}`,overflowX:"auto"}}>
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)} style={{
                flex:1,minWidth:70,padding:"14px 6px",border:"none",
                borderBottom:tab===t.id?`3px solid ${cfg.cor}`:"3px solid transparent",
                background:tab===t.id?cfg.cor+"18":"transparent",
                cursor:"pointer",fontFamily:"inherit",
                fontWeight:tab===t.id?800:600,fontSize:11,
                color:tab===t.id?cfg.cor:C.gray,transition:"all 0.2s",
              }}>
                <div>{t.label}</div>
                <div style={{fontSize:9,opacity:0.7,marginTop:2}}>{t.desc}</div>
              </button>
            ))}
          </div>

          {/* Cabeçalho do capítulo */}
          <div style={{padding:"20px 24px 0"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18,paddingBottom:16,borderBottom:`2px solid ${C.grayLight}`}}>
              <div style={{width:46,height:46,borderRadius:14,background:`linear-gradient(135deg,${cfg.cor},${cfg.cor}CC)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{cfg.emoji}</div>
              <div>
                <div style={{fontSize:17,fontWeight:900,color:C.blueDark}}>{cfg.titulo}</div>
                <div style={{fontSize:12,color:C.gray}}>{cfg.subtitulo}</div>
              </div>
              <div style={{marginLeft:"auto",textAlign:"right"}}>
                <div style={{fontSize:10,color:C.gray,fontWeight:700,letterSpacing:1}}>BNCC</div>
                <div style={{fontSize:12,fontWeight:800,color:cfg.cor}}>{cfg.bncc}</div>
              </div>
            </div>
          </div>

          {/* Conteúdo da aba */}
          <div key={cap+tab} style={{padding:"0 24px 28px",animation:"fadeIn 0.3s ease"}}>
            {cfg[tab]}
          </div>

          {/* Footer */}
          <div style={{textAlign:"center",padding:"14px",borderTop:`1px solid ${C.grayLight}`,fontSize:11,color:C.gray}}>
            AlfaReview · Ciências 6º Ano · Unidade 1 · 1º Trimestre · © LMVN
          </div>
        </div>
      </div>
    </div>
  );
}
