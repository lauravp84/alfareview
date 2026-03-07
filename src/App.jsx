import { useState } from "react";

const C = {
  red:"#D32F2F",redLight:"#FFEBEE",redDark:"#B71C1C",
  blue:"#1565C0",blueLight:"#E3F2FD",blueDark:"#0D47A1",
  white:"#FFFFFF",bg:"#F5F7FA",gray:"#607080",grayLight:"#ECEFF1",
  green:"#2E7D32",greenLight:"#E8F5E9",
  orange:"#E65100",orangeLight:"#FFF3E0",
};

function Logo({size=40}){
  return(
    <svg width={size*1.8} height={size} viewBox="0 0 180 60" fill="none">
      <circle cx="26" cy="24" r="14" stroke={C.red} strokeWidth="5" fill="none"/>
      <line x1="36" y1="34" x2="46" y2="46" stroke={C.red} strokeWidth="5" strokeLinecap="round"/>
      <path d="M14 8 Q30 20 46 44" stroke={C.blue} strokeWidth="6" strokeLinecap="round" fill="none"/>
      <circle cx="20" cy="22" r="2.5" fill={C.blue}/>
      <circle cx="27" cy="18" r="2.5" fill={C.blue}/>
      <circle cx="34" cy="22" r="2.5" fill={C.blue}/>
      <line x1="20" y1="22" x2="27" y2="18" stroke={C.blue} strokeWidth="1.5"/>
      <line x1="27" y1="18" x2="34" y2="22" stroke={C.blue} strokeWidth="1.5"/>
      <text x="58" y="32" fontFamily="sans-serif" fontWeight="800" fontSize="22" fill={C.blue}>Alfa</text>
      <text x="103" y="32" fontFamily="sans-serif" fontWeight="800" fontSize="22" fill={C.red}>Review</text>
    </svg>
  );
}

// ── LAB ──────────────────────────────────────────────────────────────────────
const SUBS=[
  {id:"agua",  label:"Água",   color:"#64B5F6",emoji:"💧"},
  {id:"oleo",  label:"Óleo",   color:"#FFF176",emoji:"🛢️"},
  {id:"sal",   label:"Sal",    color:"#ECEFF1",emoji:"🧂"},
  {id:"areia", label:"Areia",  color:"#BCAAA4",emoji:"🏖️"},
  {id:"alcool",label:"Álcool", color:"#B2EBF2",emoji:"🧴"},
  {id:"acucar",label:"Açúcar", color:"#FFF9C4",emoji:"🍬"},
  {id:"gelo",  label:"Gelo",   color:"#E3F2FD",emoji:"🧊"},
  {id:"terra", label:"Terra",  color:"#8D6E63",emoji:"🌱"},
];

// ─── DICIONÁRIO COMPLETO DE MISTURAS ─────────────────────────────────────────
// Chave sempre em ordem alfabética (gerada por mkKey)
// Classificação baseada em: Atkins & Jones, Feltre, Usberco & Salvador (Química 6º/8º ano)
// Regra geral: açúcar, sal e álcool dissolvem-se em água → homogênea.
// Óleo, areia, terra e gelo formam fases visíveis com água → heterogênea.
// Sólidos-sólidos (areia+sal, areia+açúcar etc.) → heterogênea (fases visíveis a olho nu ou granulometria distinta).
// Álcool+óleo: imiscíveis (polares vs. apolares) → heterogênea bifásica.
// Álcool+sal / álcool+açúcar: dissolução parcial ou total, mas considerados homogêneos no contexto do 6º ano.

const MIX={
  // ── 2 substâncias SEM água ──────────────────────────────────────────────────
  "acucar+alcool": {type:"homogênea",  ph:1,label:"",         desc:"O açúcar dissolve-se no álcool (etanol) → solução líquida homogênea, 1 fase.",layers:["#FFF9C4"]},
  "acucar+areia":  {type:"heterogênea",ph:2,label:"Bifásica", desc:"Açúcar (sólido branco) e areia (sólido marrom) são grânulos visíveis de tamanhos e cores distintos → mistura heterogênea bifásica sólida.",layers:["#FFF9C4","#BCAAA4"]},
  "acucar+gelo":   {type:"heterogênea",ph:2,label:"Bifásica", desc:"Açúcar (sólido cristalino) + gelo (sólido de água) — dois sólidos de composição diferente, fases distintas → bifásica.",layers:["#FFF9C4","#E3F2FD"]},
  "acucar+oleo":   {type:"heterogênea",ph:2,label:"Bifásica", desc:"Açúcar é polar e não se dissolve em óleo (apolar). As partículas sólidas ficam visíveis no líquido → heterogênea bifásica.",layers:["#FFF9C4","#FFF176"]},
  "acucar+sal":    {type:"heterogênea",ph:2,label:"Bifásica", desc:"Açúcar e sal são dois sólidos distintos. A olho nu (ou com microscópio) é possível distinguir os cristais → heterogênea bifásica sólida.",layers:["#FFF9C4","#ECEFF1"]},
  "acucar+terra":  {type:"heterogênea",ph:2,label:"Bifásica", desc:"Açúcar cristalino + terra (partículas de solo) — fases sólidas distintas → heterogênea bifásica.",layers:["#FFF9C4","#8D6E63"]},
  "alcool+areia":  {type:"heterogênea",ph:2,label:"Bifásica", desc:"A areia não se dissolve no álcool. Partículas sólidas se depositam no fundo → heterogênea bifásica.",layers:["#B2EBF2","#BCAAA4"]},
  "alcool+gelo":   {type:"heterogênea",ph:2,label:"Bifásica", desc:"Gelo (sólido) flutuando em álcool líquido — dois estados físicos distintos → heterogênea bifásica.",layers:["#B2EBF2","#E3F2FD"]},
  "alcool+oleo":   {type:"heterogênea",ph:2,label:"Bifásica", desc:"Álcool (polar) e óleo (apolar) são imiscíveis — formam duas camadas visíveis → heterogênea bifásica.",layers:["#FFF176","#B2EBF2"]},
  "alcool+sal":    {type:"homogênea",  ph:1,label:"",         desc:"O sal dissolve-se parcialmente no álcool etílico, formando solução homogênea no contexto do 6º ano → 1 fase.",layers:["#B2EBF2"]},
  "alcool+terra":  {type:"heterogênea",ph:2,label:"Bifásica", desc:"A terra (partículas de solo) não se dissolve no álcool → partículas visíveis em suspensão: heterogênea bifásica.",layers:["#B2EBF2","#8D6E63"]},
  "areia+gelo":    {type:"heterogênea",ph:2,label:"Bifásica", desc:"Areia (sólido mineral) + gelo (sólido de água) — dois sólidos de composição diferente → heterogênea bifásica.",layers:["#E3F2FD","#BCAAA4"]},
  "areia+oleo":    {type:"heterogênea",ph:2,label:"Bifásica", desc:"Areia não se dissolve em óleo. Partículas sólidas se depositam no fundo do líquido → heterogênea bifásica.",layers:["#FFF176","#BCAAA4"]},
  "areia+sal":     {type:"heterogênea",ph:2,label:"Bifásica", desc:"Areia e sal são dois sólidos de granulometria e composição distintas → heterogênea bifásica sólida.",layers:["#ECEFF1","#BCAAA4"]},
  "areia+terra":   {type:"heterogênea",ph:2,label:"Bifásica", desc:"Areia (grãos de sílica) e terra (mistura de minerais e matéria orgânica) — sólidos heterogêneos → bifásica.",layers:["#BCAAA4","#8D6E63"]},
  "gelo+oleo":     {type:"heterogênea",ph:2,label:"Bifásica", desc:"Gelo (sólido/água) e óleo (líquido apolar) são imiscíveis — formam duas fases distintas → bifásica.",layers:["#FFF176","#E3F2FD"]},
  "gelo+sal":      {type:"heterogênea",ph:2,label:"Bifásica", desc:"Gelo (sólido) + sal (sólido) — dois sólidos distintos antes da fusão → heterogênea bifásica.",layers:["#E3F2FD","#ECEFF1"]},
  "gelo+terra":    {type:"heterogênea",ph:2,label:"Bifásica", desc:"Gelo e terra são dois sólidos de composição completamente diferente → heterogênea bifásica.",layers:["#E3F2FD","#8D6E63"]},
  "oleo+sal":      {type:"heterogênea",ph:2,label:"Bifásica", desc:"Sal (sólido polar) não se dissolve em óleo (apolar). Grânulos de sal visíveis no óleo → heterogênea bifásica.",layers:["#FFF176","#ECEFF1"]},
  "oleo+terra":    {type:"heterogênea",ph:2,label:"Bifásica", desc:"Terra não se dissolve em óleo. Partículas sólidas visíveis no líquido → heterogênea bifásica.",layers:["#FFF176","#8D6E63"]},
  "sal+terra":     {type:"heterogênea",ph:2,label:"Bifásica", desc:"Sal (cristais brancos) e terra (partículas escuras) — dois sólidos distintos → heterogênea bifásica.",layers:["#ECEFF1","#8D6E63"]},

  // ── 2 substâncias COM água ──────────────────────────────────────────────────
  "acucar+agua":   {type:"homogênea",  ph:1,label:"",         desc:"O açúcar dissolve-se completamente na água (alta solubilidade: ~200g/100mL a 20°C) → solução aquosa homogênea, 1 fase.",layers:["#E8F5E9"]},
  "agua+alcool":   {type:"homogênea",  ph:1,label:"",         desc:"Água e álcool etílico são miscíveis em qualquer proporção (ambos polares) → 1 fase homogênea.",layers:["#B2EBF2"]},
  "agua+areia":    {type:"heterogênea",ph:2,label:"Bifásica", desc:"Areia não se dissolve na água. Deposita no fundo por gravidade → heterogênea bifásica.",layers:["#64B5F6","#BCAAA4"]},
  "agua+gelo":     {type:"heterogênea",ph:2,label:"Bifásica", desc:"Gelo (H₂O sólido) flutua na água líquida. Dois estados físicos distintos da mesma substância → heterogênea bifásica.",layers:["#E3F2FD","#64B5F6"]},
  "agua+oleo":     {type:"heterogênea",ph:2,label:"Bifásica", desc:"Água (polar) e óleo (apolar) são imiscíveis. Óleo flutua no topo por ser menos denso → heterogênea bifásica.",layers:["#FFF176","#64B5F6"]},
  "agua+sal":      {type:"homogênea",  ph:1,label:"",         desc:"O sal (NaCl) dissolve-se completamente na água (solubilidade: ~36g/100mL a 20°C) → solução aquosa homogênea, 1 fase.",layers:["#90CAF9"]},
  "agua+terra":    {type:"heterogênea",ph:2,label:"Bifásica", desc:"Terra (mistura de minerais e matéria orgânica) em suspensão na água → partículas visíveis: heterogênea bifásica.",layers:["#64B5F6","#8D6E63"]},

  // ── 3 substâncias COM água ──────────────────────────────────────────────────
  "acucar+agua+alcool":  {type:"homogênea",  ph:1,label:"",         desc:"Açúcar e álcool dissolvem-se completamente em água → solução aquosa homogênea, 1 fase.",layers:["#E8F5E9"]},
  "acucar+agua+areia":   {type:"heterogênea",ph:2,label:"Bifásica", desc:"Açúcar dissolve-se na água; areia deposita no fundo → fases: solução (liquida) + areia (sólida): bifásica.",layers:["#E8F5E9","#BCAAA4"]},
  "acucar+agua+gelo":    {type:"heterogênea",ph:2,label:"Bifásica", desc:"Açúcar dissolve-se na água formando solução; gelo (sólido) flutua na solução → bifásica.",layers:["#E3F2FD","#E8F5E9"]},
  "acucar+agua+oleo":    {type:"heterogênea",ph:2,label:"Bifásica", desc:"Açúcar dissolve-se na água; óleo flutua acima da solução aquosa → bifásica (solução+óleo).",layers:["#FFF176","#E8F5E9"]},
  "acucar+agua+sal":     {type:"homogênea",  ph:1,label:"",         desc:"Tanto o açúcar quanto o sal dissolvem-se completamente em água → solução aquosa homogênea, 1 fase.",layers:["#90CAF9"]},
  "acucar+agua+terra":   {type:"heterogênea",ph:2,label:"Bifásica", desc:"Açúcar dissolve-se na água; terra fica em suspensão/deposita → bifásica.",layers:["#E8F5E9","#8D6E63"]},
  "agua+alcool+areia":   {type:"heterogênea",ph:2,label:"Bifásica", desc:"Água e álcool formam fase líquida homogênea; areia deposita no fundo → bifásica.",layers:["#B2EBF2","#BCAAA4"]},
  "agua+alcool+gelo":    {type:"heterogênea",ph:2,label:"Bifásica", desc:"Água e álcool são miscíveis; gelo (sólido) flutua ou deposita na mistura → bifásica.",layers:["#E3F2FD","#B2EBF2"]},
  "agua+alcool+oleo":    {type:"heterogênea",ph:2,label:"Bifásica", desc:"Água+álcool formam fase polar; óleo (apolar) flutua acima → bifásica.",layers:["#FFF176","#B2EBF2"]},
  "agua+alcool+sal":     {type:"homogênea",  ph:1,label:"",         desc:"Sal dissolve-se na mistura água-álcool → solução homogênea, 1 fase.",layers:["#B2EBF2"]},
  "agua+alcool+terra":   {type:"heterogênea",ph:2,label:"Bifásica", desc:"Água e álcool miscíveis; terra fica em suspensão visível → bifásica.",layers:["#B2EBF2","#8D6E63"]},
  "agua+areia+gelo":     {type:"heterogênea",ph:3,label:"Trifásica",desc:"Gelo (sólido flutuando), água (líquida) e areia (sólido no fundo) → 3 fases distintas: trifásica.",layers:["#E3F2FD","#64B5F6","#BCAAA4"]},
  "agua+areia+oleo":     {type:"heterogênea",ph:3,label:"Trifásica",desc:"3 fases: areia deposita no fundo, água no meio, óleo flutua no topo → trifásica.",layers:["#FFF176","#64B5F6","#BCAAA4"]},
  "agua+areia+sal":      {type:"heterogênea",ph:2,label:"Bifásica", desc:"Sal dissolve-se na água; areia deposita no fundo → bifásica (solução salina + areia sólida).",layers:["#90CAF9","#BCAAA4"]},
  "agua+areia+terra":    {type:"heterogênea",ph:2,label:"Bifásica", desc:"Areia e terra são sólidos insolúveis em água — ambas depositam no fundo (podem parecer 1 ou 2 fases sólidas) → bifásica/trifásica. Considerada bifásica no 6º ano.",layers:["#64B5F6","#BCAAA4"]},
  "agua+gelo+oleo":      {type:"heterogênea",ph:3,label:"Trifásica",desc:"3 fases: óleo flutua no topo, água no meio, gelo deposita no fundo → trifásica.",layers:["#FFF176","#64B5F6","#E3F2FD"]},
  "agua+gelo+sal":       {type:"heterogênea",ph:2,label:"Bifásica", desc:"Sal dissolve-se na água; gelo (sólido) flutua na solução salina → bifásica.",layers:["#E3F2FD","#90CAF9"]},
  "agua+gelo+terra":     {type:"heterogênea",ph:3,label:"Trifásica",desc:"3 fases: terra deposita no fundo, água no meio, gelo flutua no topo → trifásica.",layers:["#E3F2FD","#64B5F6","#8D6E63"]},
  "agua+oleo+sal":       {type:"heterogênea",ph:2,label:"Bifásica", desc:"Sal dissolve-se na água formando solução salina; óleo flutua acima → bifásica (solução+óleo).",layers:["#FFF176","#90CAF9"]},
  "agua+oleo+terra":     {type:"heterogênea",ph:3,label:"Trifásica",desc:"3 fases: terra no fundo, água no meio, óleo no topo → trifásica.",layers:["#FFF176","#64B5F6","#8D6E63"]},
  "agua+sal+terra":      {type:"heterogênea",ph:2,label:"Bifásica", desc:"Sal dissolve-se na água; terra fica em suspensão/deposita → bifásica (solução salina + terra sólida).",layers:["#90CAF9","#8D6E63"]},
  "agua+oleo+areia":     {type:"heterogênea",ph:3,label:"Trifásica",desc:"3 fases: areia no fundo, água no meio, óleo no topo → trifásica.",layers:["#FFF176","#64B5F6","#BCAAA4"]},

  // ── 3 substâncias SEM água ──────────────────────────────────────────────────
  "acucar+alcool+areia":  {type:"heterogênea",ph:2,label:"Bifásica", desc:"Açúcar dissolve-se no álcool; areia deposita no fundo → bifásica.",layers:["#FFF9C4","#BCAAA4"]},
  "acucar+alcool+gelo":   {type:"heterogênea",ph:2,label:"Bifásica", desc:"Açúcar dissolve-se no álcool; gelo flutua na solução → bifásica.",layers:["#E3F2FD","#FFF9C4"]},
  "acucar+alcool+oleo":   {type:"heterogênea",ph:2,label:"Bifásica", desc:"Açúcar dissolve-se no álcool (polar); óleo (apolar) flutua acima → bifásica.",layers:["#FFF176","#FFF9C4"]},
  "acucar+alcool+sal":    {type:"homogênea",  ph:1,label:"",         desc:"Açúcar e sal dissolvem-se no álcool → solução homogênea no contexto do 6º ano.",layers:["#FFF9C4"]},
  "acucar+alcool+terra":  {type:"heterogênea",ph:2,label:"Bifásica", desc:"Açúcar dissolve-se no álcool; terra não se dissolve → bifásica.",layers:["#FFF9C4","#8D6E63"]},
  "acucar+areia+gelo":    {type:"heterogênea",ph:3,label:"Trifásica",desc:"3 sólidos distintos: açúcar (branco cristalino), areia (marrom granular), gelo (translúcido) → trifásica sólida.",layers:["#FFF9C4","#E3F2FD","#BCAAA4"]},
  "acucar+areia+oleo":    {type:"heterogênea",ph:2,label:"Bifásica", desc:"Açúcar e areia (sólidos) não se dissolvem em óleo → partículas sólidas visíveis no óleo: bifásica.",layers:["#FFF176","#BCAAA4"]},
  "acucar+areia+sal":     {type:"heterogênea",ph:3,label:"Trifásica",desc:"3 sólidos distintos: açúcar, areia e sal — cores e texturas diferentes → trifásica sólida.",layers:["#FFF9C4","#ECEFF1","#BCAAA4"]},
  "acucar+areia+terra":   {type:"heterogênea",ph:3,label:"Trifásica",desc:"Açúcar, areia e terra: 3 sólidos distintos a olho nu → trifásica.",layers:["#FFF9C4","#BCAAA4","#8D6E63"]},
  "acucar+gelo+oleo":     {type:"heterogênea",ph:2,label:"Bifásica", desc:"Açúcar e gelo (sólidos) não se dissolvem em óleo → partículas visíveis: bifásica.",layers:["#FFF176","#FFF9C4"]},
  "acucar+gelo+sal":      {type:"heterogênea",ph:3,label:"Trifásica",desc:"Açúcar, gelo e sal: 3 sólidos de composição distintas → trifásica sólida.",layers:["#FFF9C4","#E3F2FD","#ECEFF1"]},
  "acucar+gelo+terra":    {type:"heterogênea",ph:3,label:"Trifásica",desc:"Açúcar, gelo e terra: 3 sólidos distintos → trifásica.",layers:["#FFF9C4","#E3F2FD","#8D6E63"]},
  "acucar+oleo+sal":      {type:"heterogênea",ph:2,label:"Bifásica", desc:"Açúcar e sal (sólidos polares) não se dissolvem em óleo (apolar) → sólidos visíveis no óleo: bifásica.",layers:["#FFF176","#ECEFF1"]},
  "acucar+oleo+terra":    {type:"heterogênea",ph:2,label:"Bifásica", desc:"Açúcar e terra (sólidos) não se dissolvem em óleo → partículas visíveis: bifásica.",layers:["#FFF176","#8D6E63"]},
  "acucar+sal+terra":     {type:"heterogênea",ph:3,label:"Trifásica",desc:"Açúcar, sal e terra: 3 sólidos distintos → trifásica sólida.",layers:["#FFF9C4","#ECEFF1","#8D6E63"]},
  "alcool+areia+gelo":    {type:"heterogênea",ph:2,label:"Bifásica", desc:"Areia deposita no fundo do álcool; gelo flutua na superfície → bifásica.",layers:["#E3F2FD","#BCAAA4"]},
  "alcool+areia+oleo":    {type:"heterogênea",ph:3,label:"Trifásica",desc:"Óleo (apolar) flutua sobre álcool (polar); areia deposita no fundo → 3 fases: trifásica.",layers:["#FFF176","#B2EBF2","#BCAAA4"]},
  "alcool+areia+sal":     {type:"heterogênea",ph:2,label:"Bifásica", desc:"Sal dissolve-se parcialmente no álcool; areia deposita → bifásica.",layers:["#B2EBF2","#BCAAA4"]},
  "alcool+areia+terra":   {type:"heterogênea",ph:2,label:"Bifásica", desc:"Areia e terra não se dissolvem em álcool → sólidos visíveis: bifásica.",layers:["#B2EBF2","#BCAAA4"]},
  "alcool+gelo+oleo":     {type:"heterogênea",ph:3,label:"Trifásica",desc:"Óleo flutua sobre álcool; gelo flutua/deposita → 3 fases: trifásica.",layers:["#FFF176","#B2EBF2","#E3F2FD"]},
  "alcool+gelo+sal":      {type:"heterogênea",ph:2,label:"Bifásica", desc:"Sal dissolve-se no álcool; gelo (sólido) flutua → bifásica.",layers:["#E3F2FD","#B2EBF2"]},
  "alcool+gelo+terra":    {type:"heterogênea",ph:2,label:"Bifásica", desc:"Terra não se dissolve no álcool; gelo flutua → bifásica.",layers:["#B2EBF2","#E3F2FD"]},
  "alcool+oleo+sal":      {type:"heterogênea",ph:2,label:"Bifásica", desc:"Álcool (polar) e óleo (apolar) formam 2 fases líquidas; sal dissolve-se na fase polar → bifásica.",layers:["#FFF176","#B2EBF2"]},
  "alcool+oleo+terra":    {type:"heterogênea",ph:3,label:"Trifásica",desc:"Óleo flutua sobre álcool; terra deposita no fundo → 3 fases: trifásica.",layers:["#FFF176","#B2EBF2","#8D6E63"]},
  "alcool+sal+terra":     {type:"heterogênea",ph:2,label:"Bifásica", desc:"Sal dissolve-se no álcool; terra não se dissolve → bifásica.",layers:["#B2EBF2","#8D6E63"]},
  "areia+gelo+oleo":      {type:"heterogênea",ph:3,label:"Trifásica",desc:"3 fases: areia no fundo, gelo flutuando, óleo líquido → trifásica.",layers:["#FFF176","#E3F2FD","#BCAAA4"]},
  "areia+gelo+sal":       {type:"heterogênea",ph:3,label:"Trifásica",desc:"Areia, gelo e sal: 3 sólidos distintos → trifásica sólida.",layers:["#E3F2FD","#ECEFF1","#BCAAA4"]},
  "areia+gelo+terra":     {type:"heterogênea",ph:3,label:"Trifásica",desc:"Areia, gelo e terra: 3 sólidos de composição distintas → trifásica.",layers:["#E3F2FD","#BCAAA4","#8D6E63"]},
  "areia+oleo+sal":       {type:"heterogênea",ph:2,label:"Bifásica", desc:"Areia e sal (sólidos) não se dissolvem em óleo → partículas visíveis no líquido: bifásica.",layers:["#FFF176","#BCAAA4"]},
  "areia+oleo+terra":     {type:"heterogênea",ph:2,label:"Bifásica", desc:"Areia e terra (sólidos) não se dissolvem em óleo → bifásica.",layers:["#FFF176","#BCAAA4"]},
  "areia+sal+terra":      {type:"heterogênea",ph:3,label:"Trifásica",desc:"Areia, sal e terra: 3 sólidos distintos → trifásica sólida.",layers:["#ECEFF1","#BCAAA4","#8D6E63"]},
  "gelo+oleo+sal":        {type:"heterogênea",ph:3,label:"Trifásica",desc:"Sal (sólido) deposita no fundo do óleo; gelo flutua na superfície → 3 fases: trifásica.",layers:["#FFF176","#E3F2FD","#ECEFF1"]},
  "gelo+oleo+terra":      {type:"heterogênea",ph:3,label:"Trifásica",desc:"Terra deposita no fundo do óleo; gelo flutua na superfície → 3 fases: trifásica.",layers:["#FFF176","#E3F2FD","#8D6E63"]},
  "gelo+sal+terra":       {type:"heterogênea",ph:3,label:"Trifásica",desc:"Gelo, sal e terra: 3 sólidos distintos → trifásica.",layers:["#E3F2FD","#ECEFF1","#8D6E63"]},
  "oleo+sal+terra":       {type:"heterogênea",ph:2,label:"Bifásica", desc:"Sal e terra (sólidos) não se dissolvem em óleo → partículas visíveis no óleo: bifásica.",layers:["#FFF176","#8D6E63"]},

  // ── 4 substâncias COM água ──────────────────────────────────────────────────
  "acucar+agua+alcool+areia":  {type:"heterogênea",ph:2,label:"Bifásica", desc:"Açúcar+álcool dissolvem-se na água; areia deposita → bifásica.",layers:["#E8F5E9","#BCAAA4"]},
  "acucar+agua+alcool+gelo":   {type:"heterogênea",ph:2,label:"Bifásica", desc:"Açúcar+álcool dissolvem-se na água; gelo flutua → bifásica.",layers:["#E3F2FD","#E8F5E9"]},
  "acucar+agua+alcool+oleo":   {type:"heterogênea",ph:2,label:"Bifásica", desc:"Açúcar+álcool dissolvem-se na água; óleo flutua acima → bifásica.",layers:["#FFF176","#E8F5E9"]},
  "acucar+agua+alcool+sal":    {type:"homogênea",  ph:1,label:"",         desc:"Açúcar, álcool e sal dissolvem-se completamente na água → solução homogênea, 1 fase.",layers:["#90CAF9"]},
  "acucar+agua+alcool+terra":  {type:"heterogênea",ph:2,label:"Bifásica", desc:"Açúcar+álcool dissolvem-se na água; terra deposita → bifásica.",layers:["#E8F5E9","#8D6E63"]},
  "acucar+agua+areia+gelo":    {type:"heterogênea",ph:3,label:"Trifásica",desc:"Açúcar dissolve-se; gelo flutua na solução; areia deposita no fundo → trifásica.",layers:["#E3F2FD","#E8F5E9","#BCAAA4"]},
  "acucar+agua+areia+oleo":    {type:"heterogênea",ph:3,label:"Trifásica",desc:"Açúcar dissolve-se na água; areia deposita; óleo flutua → trifásica.",layers:["#FFF176","#E8F5E9","#BCAAA4"]},
  "acucar+agua+areia+sal":     {type:"heterogênea",ph:2,label:"Bifásica", desc:"Açúcar e sal dissolvem-se na água; areia deposita → bifásica.",layers:["#90CAF9","#BCAAA4"]},
  "acucar+agua+areia+terra":   {type:"heterogênea",ph:2,label:"Bifásica", desc:"Açúcar dissolve-se; areia e terra depositam no fundo → bifásica.",layers:["#E8F5E9","#BCAAA4"]},
  "acucar+agua+gelo+oleo":     {type:"heterogênea",ph:3,label:"Trifásica",desc:"Açúcar dissolve-se na água; gelo flutua; óleo flutua acima → trifásica.",layers:["#FFF176","#E3F2FD","#E8F5E9"]},
  "acucar+agua+gelo+sal":      {type:"heterogênea",ph:2,label:"Bifásica", desc:"Açúcar e sal dissolvem-se na água; gelo flutua na solução → bifásica.",layers:["#E3F2FD","#90CAF9"]},
  "acucar+agua+gelo+terra":    {type:"heterogênea",ph:3,label:"Trifásica",desc:"Açúcar dissolve-se; gelo flutua; terra deposita no fundo → trifásica.",layers:["#E3F2FD","#E8F5E9","#8D6E63"]},
  "acucar+agua+oleo+sal":      {type:"heterogênea",ph:2,label:"Bifásica", desc:"Açúcar e sal dissolvem-se na água; óleo flutua acima da solução → bifásica.",layers:["#FFF176","#90CAF9"]},
  "acucar+agua+oleo+terra":    {type:"heterogênea",ph:3,label:"Trifásica",desc:"Açúcar dissolve-se; terra deposita; óleo flutua → trifásica.",layers:["#FFF176","#E8F5E9","#8D6E63"]},
  "acucar+agua+sal+terra":     {type:"heterogênea",ph:2,label:"Bifásica", desc:"Açúcar e sal dissolvem-se na água; terra deposita → bifásica.",layers:["#90CAF9","#8D6E63"]},
  "agua+alcool+areia+gelo":    {type:"heterogênea",ph:3,label:"Trifásica",desc:"Água+álcool formam fase líquida; gelo flutua; areia deposita → trifásica.",layers:["#E3F2FD","#B2EBF2","#BCAAA4"]},
  "agua+alcool+areia+oleo":    {type:"heterogênea",ph:3,label:"Trifásica",desc:"Água+álcool formam fase polar; óleo flutua; areia deposita → trifásica.",layers:["#FFF176","#B2EBF2","#BCAAA4"]},
  "agua+alcool+areia+sal":     {type:"heterogênea",ph:2,label:"Bifásica", desc:"Água+álcool+sal formam solução; areia deposita → bifásica.",layers:["#B2EBF2","#BCAAA4"]},
  "agua+alcool+areia+terra":   {type:"heterogênea",ph:2,label:"Bifásica", desc:"Água+álcool miscíveis; areia e terra depositam → bifásica.",layers:["#B2EBF2","#BCAAA4"]},
  "agua+alcool+gelo+oleo":     {type:"heterogênea",ph:3,label:"Trifásica",desc:"Água+álcool formam fase polar; óleo flutua acima; gelo flutua → trifásica.",layers:["#FFF176","#E3F2FD","#B2EBF2"]},
  "agua+alcool+gelo+sal":      {type:"heterogênea",ph:2,label:"Bifásica", desc:"Água+álcool+sal formam solução; gelo flutua → bifásica.",layers:["#E3F2FD","#B2EBF2"]},
  "agua+alcool+gelo+terra":    {type:"heterogênea",ph:3,label:"Trifásica",desc:"Água+álcool miscíveis; gelo flutua; terra deposita → trifásica.",layers:["#E3F2FD","#B2EBF2","#8D6E63"]},
  "agua+alcool+oleo+sal":      {type:"heterogênea",ph:2,label:"Bifásica", desc:"Água+álcool+sal formam fase polar; óleo flutua acima → bifásica.",layers:["#FFF176","#B2EBF2"]},
  "agua+alcool+oleo+terra":    {type:"heterogênea",ph:3,label:"Trifásica",desc:"Água+álcool formam fase polar; óleo flutua; terra deposita → trifásica.",layers:["#FFF176","#B2EBF2","#8D6E63"]},
  "agua+alcool+sal+terra":     {type:"heterogênea",ph:2,label:"Bifásica", desc:"Água+álcool+sal formam solução; terra deposita → bifásica.",layers:["#B2EBF2","#8D6E63"]},
  "agua+areia+gelo+oleo":      {type:"heterogênea",ph:4,label:"Polifásica",desc:"4 fases: areia no fundo, água no meio-baixo, gelo flutuando, óleo no topo → polifásica.",layers:["#FFF176","#E3F2FD","#64B5F6","#BCAAA4"]},
  "agua+areia+gelo+sal":       {type:"heterogênea",ph:3,label:"Trifásica",desc:"Sal dissolve-se na água; areia deposita; gelo flutua na solução → trifásica.",layers:["#E3F2FD","#90CAF9","#BCAAA4"]},
  "agua+areia+gelo+terra":     {type:"heterogênea",ph:4,label:"Polifásica",desc:"4 fases: terra no fundo, areia acima, água no meio, gelo flutuando → polifásica.",layers:["#E3F2FD","#64B5F6","#BCAAA4","#8D6E63"]},
  "agua+areia+oleo+sal":       {type:"heterogênea",ph:3,label:"Trifásica",desc:"Sal dissolve-se na água; areia deposita; óleo flutua → trifásica.",layers:["#FFF176","#90CAF9","#BCAAA4"]},
  "agua+areia+oleo+terra":     {type:"heterogênea",ph:4,label:"Polifásica",desc:"4 fases: terra no fundo, areia acima, água no meio, óleo no topo → polifásica.",layers:["#FFF176","#64B5F6","#BCAAA4","#8D6E63"]},
  "agua+areia+sal+terra":      {type:"heterogênea",ph:3,label:"Trifásica",desc:"Sal dissolve-se na água; areia e terra depositam (podem ser 1 ou 2 fases sólidas) → trifásica.",layers:["#90CAF9","#BCAAA4","#8D6E63"]},
  "agua+gelo+oleo+sal":        {type:"heterogênea",ph:3,label:"Trifásica",desc:"Sal dissolve-se na água; gelo flutua; óleo flutua acima → trifásica.",layers:["#FFF176","#E3F2FD","#90CAF9"]},
  "agua+gelo+oleo+terra":      {type:"heterogênea",ph:4,label:"Polifásica",desc:"4 fases: terra no fundo, água no meio, gelo flutuando, óleo no topo → polifásica (como P1 Q1).",layers:["#FFF176","#E3F2FD","#64B5F6","#8D6E63"]},
  "agua+gelo+sal+terra":       {type:"heterogênea",ph:3,label:"Trifásica",desc:"Sal dissolve-se na água; terra deposita; gelo flutua na solução → trifásica.",layers:["#E3F2FD","#90CAF9","#8D6E63"]},
  "agua+oleo+sal+terra":       {type:"heterogênea",ph:3,label:"Trifásica",desc:"Sal dissolve-se na água; terra deposita; óleo flutua acima → trifásica.",layers:["#FFF176","#90CAF9","#8D6E63"]},
  // P1 Q1 exato:
  "agua+oleo+areia+gelo":      {type:"heterogênea",ph:4,label:"Polifásica",desc:"4 fases: areia no fundo, água no meio, gelo flutuando, óleo no topo → POLIFÁSICA (PA1 Q1).",layers:["#FFF176","#E3F2FD","#64B5F6","#BCAAA4"]},
  "agua+oleo+gelo+terra":      {type:"heterogênea",ph:4,label:"Polifásica",desc:"4 fases: terra no fundo, água, gelo flutuando, óleo no topo → POLIFÁSICA (PA1 Q1: água+óleo+terra+gelo).",layers:["#FFF176","#E3F2FD","#64B5F6","#8D6E63"]},

  // ── 4 substâncias SEM água ──────────────────────────────────────────────────
  // Regra: álcool+açúcar → solúvel (homogênea); óleo+álcool → imiscíveis; sólidos sem solvente → heterogênea sólida
  "acucar+alcool+areia+gelo":  {type:"heterogênea",ph:3,label:"Trifásica", desc:"Açúcar dissolve-se no álcool; areia deposita no fundo; gelo flutua → 3 fases: trifásica.",layers:["#E3F2FD","#FFF9C4","#BCAAA4"]},
  "acucar+alcool+areia+oleo":  {type:"heterogênea",ph:3,label:"Trifásica", desc:"Açúcar+álcool formam fase polar; óleo flutua acima; areia deposita → trifásica.",layers:["#FFF176","#FFF9C4","#BCAAA4"]},
  "acucar+alcool+areia+sal":   {type:"heterogênea",ph:2,label:"Bifásica",  desc:"Açúcar e sal dissolvem-se no álcool; areia deposita no fundo → bifásica.",layers:["#FFF9C4","#BCAAA4"]},
  "acucar+alcool+areia+terra": {type:"heterogênea",ph:2,label:"Bifásica",  desc:"Açúcar dissolve-se no álcool; areia e terra depositam → bifásica.",layers:["#FFF9C4","#BCAAA4"]},
  "acucar+alcool+gelo+oleo":   {type:"heterogênea",ph:3,label:"Trifásica", desc:"Açúcar+álcool formam fase polar; óleo flutua acima; gelo flutua → trifásica.",layers:["#FFF176","#E3F2FD","#FFF9C4"]},
  "acucar+alcool+gelo+sal":    {type:"heterogênea",ph:2,label:"Bifásica",  desc:"Açúcar e sal dissolvem-se no álcool; gelo (sólido) flutua na solução → bifásica.",layers:["#E3F2FD","#FFF9C4"]},
  "acucar+alcool+gelo+terra":  {type:"heterogênea",ph:2,label:"Bifásica",  desc:"Açúcar dissolve-se no álcool; gelo flutua; terra deposita → bifásica/trifásica. Simplificado: bifásica.",layers:["#FFF9C4","#E3F2FD"]},
  "acucar+alcool+oleo+sal":    {type:"heterogênea",ph:2,label:"Bifásica",  desc:"Açúcar e sal dissolvem-se no álcool (polar); óleo (apolar) flutua acima → bifásica.",layers:["#FFF176","#FFF9C4"]},
  "acucar+alcool+oleo+terra":  {type:"heterogênea",ph:3,label:"Trifásica", desc:"Açúcar dissolve-se no álcool; óleo flutua; terra deposita → trifásica.",layers:["#FFF176","#FFF9C4","#8D6E63"]},
  "acucar+alcool+sal+terra":   {type:"heterogênea",ph:2,label:"Bifásica",  desc:"Açúcar e sal dissolvem-se no álcool; terra deposita → bifásica.",layers:["#FFF9C4","#8D6E63"]},
  "acucar+areia+gelo+oleo":    {type:"heterogênea",ph:3,label:"Trifásica", desc:"Açúcar e areia (sólidos) não se dissolvem em óleo; gelo flutua → trifásica.",layers:["#FFF176","#E3F2FD","#BCAAA4"]},
  "acucar+areia+gelo+sal":     {type:"heterogênea",ph:4,label:"Polifásica",desc:"4 sólidos distintos: açúcar, areia, gelo e sal — 4 fases sólidas → polifásica.",layers:["#FFF9C4","#E3F2FD","#ECEFF1","#BCAAA4"]},
  "acucar+areia+gelo+terra":   {type:"heterogênea",ph:4,label:"Polifásica",desc:"Açúcar, areia, gelo e terra: 4 sólidos distintos → polifásica.",layers:["#FFF9C4","#E3F2FD","#BCAAA4","#8D6E63"]},
  "acucar+areia+oleo+sal":     {type:"heterogênea",ph:2,label:"Bifásica",  desc:"Açúcar, areia e sal (sólidos) não se dissolvem em óleo → sólidos visíveis no óleo: bifásica.",layers:["#FFF176","#BCAAA4"]},
  "acucar+areia+oleo+terra":   {type:"heterogênea",ph:2,label:"Bifásica",  desc:"Açúcar, areia e terra não se dissolvem em óleo → sólidos visíveis: bifásica.",layers:["#FFF176","#BCAAA4"]},
  "acucar+areia+sal+terra":    {type:"heterogênea",ph:4,label:"Polifásica",desc:"Açúcar, areia, sal e terra: 4 sólidos distintos → polifásica.",layers:["#FFF9C4","#ECEFF1","#BCAAA4","#8D6E63"]},
  "acucar+gelo+oleo+sal":      {type:"heterogênea",ph:3,label:"Trifásica", desc:"Açúcar e sal (sólidos) não se dissolvem em óleo; gelo flutua → trifásica.",layers:["#FFF176","#E3F2FD","#FFF9C4"]},
  "acucar+gelo+oleo+terra":    {type:"heterogênea",ph:3,label:"Trifásica", desc:"Açúcar, gelo e terra (sólidos) no óleo → trifásica.",layers:["#FFF176","#E3F2FD","#8D6E63"]},
  "acucar+gelo+sal+terra":     {type:"heterogênea",ph:4,label:"Polifásica",desc:"Açúcar, gelo, sal e terra: 4 sólidos distintos → polifásica.",layers:["#FFF9C4","#E3F2FD","#ECEFF1","#8D6E63"]},
  "acucar+oleo+sal+terra":     {type:"heterogênea",ph:2,label:"Bifásica",  desc:"Açúcar, sal e terra (sólidos) não se dissolvem em óleo → bifásica.",layers:["#FFF176","#8D6E63"]},
  "alcool+areia+gelo+oleo":    {type:"heterogênea",ph:3,label:"Trifásica", desc:"Óleo flutua sobre álcool; areia deposita; gelo flutua → trifásica.",layers:["#FFF176","#E3F2FD","#BCAAA4"]},
  "alcool+areia+gelo+sal":     {type:"heterogênea",ph:2,label:"Bifásica",  desc:"Sal dissolve-se no álcool; areia deposita; gelo flutua na solução → bifásica/trifásica. Simplificado: bifásica.",layers:["#B2EBF2","#BCAAA4"]},
  "alcool+areia+gelo+terra":   {type:"heterogênea",ph:2,label:"Bifásica",  desc:"Areia e terra depositam no fundo do álcool; gelo flutua → bifásica.",layers:["#B2EBF2","#BCAAA4"]},
  "alcool+areia+oleo+sal":     {type:"heterogênea",ph:3,label:"Trifásica", desc:"Óleo flutua sobre álcool; areia deposita; sal dissolve-se no álcool → trifásica.",layers:["#FFF176","#B2EBF2","#BCAAA4"]},
  "alcool+areia+oleo+terra":   {type:"heterogênea",ph:3,label:"Trifásica", desc:"Óleo flutua sobre álcool; areia e terra depositam → trifásica.",layers:["#FFF176","#B2EBF2","#BCAAA4"]},
  "alcool+areia+sal+terra":    {type:"heterogênea",ph:2,label:"Bifásica",  desc:"Sal dissolve-se no álcool; areia e terra depositam → bifásica.",layers:["#B2EBF2","#BCAAA4"]},
  "alcool+gelo+oleo+sal":      {type:"heterogênea",ph:3,label:"Trifásica", desc:"Óleo flutua sobre álcool; sal dissolve-se no álcool; gelo flutua → trifásica.",layers:["#FFF176","#E3F2FD","#B2EBF2"]},
  "alcool+gelo+oleo+terra":    {type:"heterogênea",ph:3,label:"Trifásica", desc:"Óleo flutua sobre álcool; terra deposita; gelo flutua → trifásica.",layers:["#FFF176","#E3F2FD","#B2EBF2"]},
  "alcool+gelo+sal+terra":     {type:"heterogênea",ph:2,label:"Bifásica",  desc:"Sal dissolve-se no álcool; gelo flutua; terra deposita → bifásica.",layers:["#B2EBF2","#E3F2FD"]},
  "alcool+oleo+sal+terra":     {type:"heterogênea",ph:3,label:"Trifásica", desc:"Óleo flutua sobre álcool (polar); sal dissolve-se no álcool; terra deposita → trifásica.",layers:["#FFF176","#B2EBF2","#8D6E63"]},
  "areia+gelo+oleo+sal":       {type:"heterogênea",ph:4,label:"Polifásica",desc:"4 fases: areia deposita no fundo do óleo; gelo flutua; sal (sólido) visível; óleo líquido → polifásica.",layers:["#FFF176","#E3F2FD","#ECEFF1","#BCAAA4"]},
  "areia+gelo+oleo+terra":     {type:"heterogênea",ph:4,label:"Polifásica",desc:"4 fases: terra no fundo, areia acima, gelo flutuando, óleo líquido → polifásica.",layers:["#FFF176","#E3F2FD","#BCAAA4","#8D6E63"]},
  "areia+gelo+sal+terra":      {type:"heterogênea",ph:4,label:"Polifásica",desc:"Areia, gelo, sal e terra: 4 sólidos distintos → polifásica.",layers:["#E3F2FD","#ECEFF1","#BCAAA4","#8D6E63"]},
  "areia+oleo+sal+terra":      {type:"heterogênea",ph:2,label:"Bifásica",  desc:"Areia, sal e terra (sólidos) não se dissolvem em óleo → sólidos no fundo do óleo: bifásica.",layers:["#FFF176","#BCAAA4"]},
  "gelo+oleo+sal+terra":       {type:"heterogênea",ph:4,label:"Polifásica",desc:"4 fases distintas: sal (sólido), terra (sólido), gelo (flutuando), óleo (líquido) → polifásica.",layers:["#FFF176","#E3F2FD","#ECEFF1","#8D6E63"]},
};
function mkKey(sel){return[...sel].sort().join("+");}

// ── QUESTÕES OBJETIVAS (P1 + similares) ─────────────────────────────────────
const QS=[
  {src:"PA1 Q1",
   q:"Numa laboratório, alunos misturaram água, óleo, terra e cubos de gelo (4 substâncias). Qual é a classificação dessa mistura quanto ao número de fases?",
   opts:["Homogênea — 1 fase","Bifásica — 2 fases","Trifásica — 3 fases","Polifásica — 4 fases"],
   ans:3,
   fb:"Água, óleo, terra e gelo formam 4 fases visíveis distintas → mistura POLIFÁSICA (4 ou mais fases). Cada substância ocupa camadas separadas no recipiente."},
  {src:"PA1 Q2",
   q:"Rogério só come o caldo da feijoada, sem grãos nem carnes. Sabendo que a feijoada é mistura heterogênea, qual método de separação é mais adequado para obter apenas o caldo?",
   opts:["Destilação fracionada","Centrifugação","Tamisação (coar)","Evaporação"],
   ans:2,
   fb:"Tamisação (coar): usa peneira/coador para separar sólidos (grãos, carnes) do líquido (caldo). É o método adequado para separar sólido de líquido em mistura heterogênea grossa."},
  {src:"PA1 Q3",
   q:"O ar atmosférico é formado por nitrogênio, oxigênio, CO₂ e outros gases. Em relação à presença ou ausência de fases, o ar é classificado como:",
   opts:["Mistura heterogênea bifásica","Mistura heterogênea trifásica","Mistura homogênea — 1 fase","Substância pura composta"],
   ans:2,
   fb:"O ar é mistura HOMOGÊNEA (solução gasosa) — ao misturarmos gases, formamos sempre 1 única fase uniforme. Não há fronteiras visíveis entre os componentes."},
  {src:"PA1 Q4",
   q:"Considere: I – Água com sal; II – Óleo na água. Classifique as misturas I e II e indique os processos de separação adequados, respectivamente:",
   opts:[
     "I: heterogênea/evaporação — II: homogênea/decantação",
     "I: homogênea/evaporação — II: heterogênea/decantação",
     "I: homogênea/filtração — II: heterogênea/destilação",
     "I: heterogênea/decantação — II: homogênea/evaporação",
   ],
   ans:1,
   fb:"Água+sal = homogênea → separa por EVAPORAÇÃO (a água evapora, o sal cristaliza). Óleo+água = heterogênea → separa por DECANTAÇÃO (aguardar as fases separarem e retirar o óleo)."},
  {src:"PA1 Q5",
   q:"No preparo de gelatina, dissolve-se o pó em água quente. Qual substância atua como SOLUTO?",
   opts:["A água, pois é o solvente universal","O pó de gelatina, pois é o que se dissolve","Os dois são solutos simultaneamente","Nenhum — é substância pura"],
   ans:1,
   fb:"SOLUTO = substância dissolvida = pó de gelatina. SOLVENTE = substância que dissolve = água. A água dissolve o pó, e não o contrário."},
  {src:"PA1 Q6",
   q:"A metamorfose da lagarta em borboleta é classificada como transformação BIOLÓGICA porque:",
   opts:[
     "Altera permanentemente a composição química da matéria",
     "Ocorre apenas mudança de forma, sem alterar a substância",
     "Faz parte do desenvolvimento natural do ser vivo, sem alterar sua matéria quimicamente",
     "Resulta de reação química entre reagentes e produtos distintos",
   ],
   ans:2,
   fb:"Transformação biológica: ocorre em seres vivos como parte do seu desenvolvimento natural (metamorfose, crescimento). NÃO altera a composição química da matéria — é diferente dos fenômenos químicos."},
  {src:"PA1 Q7",
   q:"O cloreto de sódio (NaCl) é formado por sódio (Na) e cloro (Cl). Com base em sua composição química, o NaCl é classificado como:",
   opts:["Mistura homogênea","Substância pura simples","Substância pura composta","Mistura heterogênea bifásica"],
   ans:2,
   fb:"Substância COMPOSTA: formada por 2 ou mais tipos de elementos químicos (Na + Cl). NÃO é mistura — não se separa por métodos físicos. Substância simples teria apenas 1 elemento (ex: O₂)."},
  {src:"PA1 Q8",
   q:"Medalhas de Tóquio 2020: ouro (ouro+prata), bronze (cobre+zinco), prata (prata pura). Quais são misturas homogêneas sólidas (ligas metálicas)?",
   opts:["Apenas a de prata","Apenas a de bronze","As de ouro e bronze","As três medalhas"],
   ans:2,
   fb:"Ouro (ouro+prata) e Bronze (cobre+zinco) são LIGAS METÁLICAS → misturas homogêneas sólidas. A prata é substância pura simples (1 único metal) → não é mistura."},
  {src:"PA1 Q9",
   q:"Por que a destilação fracionada é mais adequada que a destilação simples para separar os componentes do petróleo?",
   opts:[
     "É mais barata e rápida que a destilação simples",
     "Separa substâncias com diferentes pontos de ebulição, obtendo múltiplos produtos (gasolina, querosene, diesel...)",
     "Filtra as impurezas sólidas do petróleo bruto",
     "Usa centrifugação para separar as fases do petróleo",
   ],
   ans:1,
   fb:"Destilação FRACIONADA separa líquidos com diferentes pontos de ebulição — cada fração sai em temperatura específica, obtendo gasolina, querosene, diesel etc. A destilação simples não consegue separar esses múltiplos componentes individualmente."},
  {src:"PA1 Q10",
   q:"Uma tirinha mostra gelo (sólido) derretendo em líquido (fusão) e depois evaporando (vaporização). Esses fenômenos são classificados como:",
   opts:[
     "Químicos — formam novas substâncias",
     "Biológicos — envolvem seres vivos",
     "Físicos — apenas mudam o estado físico sem alterar a composição química",
     "Químicos e biológicos simultaneamente",
   ],
   ans:2,
   fb:"Fusão e vaporização são FENÔMENOS FÍSICOS: apenas alteram o estado físico da matéria (sólido→líquido→gasoso), sem formar novas substâncias. A água (H₂O) continua sendo água em qualquer estado."},
  {src:"PA1 Q11",
   q:"Amanda viu catação sendo usada para separar cascas de alho, mas o método era lento. Qual método mais eficiente ela poderia sugerir para separar cascas leves dos bulbos pesados?",
   opts:["Decantação","Ventilação","Filtração","Destilação"],
   ans:1,
   fb:"VENTILAÇÃO: usa corrente de ar para separar materiais de densidades/tamanhos diferentes. As cascas leves do alho voam com o ar, enquanto os bulbos pesados ficam na bancada — muito mais eficiente que a catação manual."},
  {src:"PA1 Q12",
   q:"No tratamento de água, mantém-se a água em repouso por tempo adequado para que o material em suspensão se deposite no fundo. Qual método é esse?",
   opts:["Filtração","Centrifugação","Decantação","Tamisação"],
   ans:2,
   fb:"DECANTAÇÃO: manter em repouso para que sólidos se depositem no fundo por ação da gravidade. É uma das etapas do tratamento de água potável nas ETAs (Estações de Tratamento de Água)."},
  {src:"PA1 Q13",
   q:"Relacione: mistura trifásica formada por DUAS substâncias. Qual alternativa corresponde a essa classificação?",
   opts:["Sal + água (homogênea, 1 fase)","Água + óleo + areia (trifásica, 3 substâncias)","Água líquida + gelo (bifásica, 2 substâncias)","Vapor d'água + O₂ + N₂ (homogênea gasosa)"],
   ans:2,
   fb:"Água (líquida) + gelo (sólido) = 2 substâncias (H₂O nos estados líquido e sólido) formando 2 fases → BIFÁSICA. Para trifásica com 2 substâncias: água + óleo formam 2 fases, não 3. Questão de relação colunas — atenção ao enunciado original da P1."},
  {src:"PA1 Q14",
   q:"O alisamento de cabelo pode ser físico (chapinha) ou químico (escova progressiva). Qual a diferença fundamental entre esses dois processos?",
   opts:[
     "A chapinha usa temperatura mais alta que a escova progressiva",
     "A chapinha muda a forma do fio temporariamente; a escova altera as ligações químicas permanentemente",
     "Ambos são fenômenos químicos, só diferem nos produtos usados",
     "Ambos são físicos — apenas diferem na duração do efeito",
   ],
   ans:1,
   fb:"Chapinha = FÍSICO: muda a forma do fio temporariamente, sem alterar sua composição — quando molhado, volta ao normal. Escova progressiva = QUÍMICO: destrói ligações das proteínas (queratina) do fio de forma permanente e irreversível."},
  {src:"PA1 Q15",
   q:"O ar-condicionado filtra poeira e microrganismos do ar antes de devolvê-lo ao ambiente. Qual método de separação está envolvido? Cite outra mistura separada pelo mesmo método.",
   opts:[
     "Decantação — separa também areia da água",
     "Filtração — separa também o café do pó de café (coagem)",
     "Centrifugação — separa também componentes do sangue",
     "Ventilação — separa também cascas de cereais",
   ],
   ans:1,
   fb:"O ar-condicionado usa FILTRAÇÃO para reter partículas sólidas (poeira, bactérias) do ar. O mesmo método é usado na coagem do café: o filtro retém o pó de café (sólido) e deixa passar o café (líquido)."},
  // ── QUESTÕES INÉDITAS ESTILO P1 ─────────────────────────────────────────
  {src:"Estilo PA1",
   q:"Quatro béqueres contêm: (I) água+sal, (II) água+óleo, (III) água+óleo+areia, (IV) água+álcool. Quais são HOMOGÊNEOS?",
   opts:["I e II","II e III","I e IV","III e IV"],
   ans:2,
   fb:"Água+sal e água+álcool dissolvem-se completamente → 1 fase → HOMOGÊNEAS. Água+óleo (2 fases) e água+óleo+areia (3 fases) têm fases visíveis → heterogêneas."},
  {src:"Estilo PA1",
   q:"O soro fisiológico usado em hospitais é solução de NaCl a 0,9% em água. Qual é o solvente e qual é o soluto?",
   opts:[
     "Solvente = NaCl; Soluto = água",
     "Solvente = água; Soluto = NaCl",
     "Ambos são solventes",
     "É substância pura — não há soluto nem solvente",
   ],
   ans:1,
   fb:"SOLVENTE = água (dissolve o soluto). SOLUTO = NaCl (dissolvido na água). A concentração 0,9% indica a quantidade de NaCl (soluto) presente em 100 mL de solução."},
  {src:"Estilo PA1",
   q:"Joana misturou para o churrasco: água, vinagre, azeite, cebola, pimentão e tomate picados. Quantos ingredientes há e como se classifica essa mistura?",
   opts:[
     "4 ingredientes — mistura homogênea",
     "5 ingredientes — mistura homogênea",
     "6 ingredientes — mistura heterogênea",
     "6 ingredientes — substância composta",
   ],
   ans:2,
   fb:"São 6 ingredientes (água, vinagre, azeite, cebola, pimentão, tomate). Os sólidos picados são visíveis na fase líquida → mistura HETEROGÊNEA. Nunca é substância composta — isso seria uma molécula com esses elementos."},
  {src:"Estilo PA1",
   q:"Em supermercado, um confeiteiro peneira farinha de trigo para evitar grumos. Esse processo é denominado:",
   opts:["Levigação","Decantação","Tamisação","Catação"],
   ans:2,
   fb:"TAMISAÇÃO (peneirar): separa sólidos de tamanhos diferentes usando uma malha (tamise/peneira). A farinha fina passa pelos furos; os grumos ficam retidos."},
  {src:"Estilo PA1",
   q:"O leite e o sangue parecem homogêneos, mas são misturas heterogêneas. O que comprova isso?",
   opts:[
     "Têm cor uniforme e apenas uma fase visível",
     "Suas partículas só são vistas ao microscópio e separam-se por centrifugação",
     "São substâncias puras compostas por moléculas idênticas",
     "Apresentam exatamente dois componentes químicos",
   ],
   ans:1,
   fb:"Leite e sangue são heterogêneos COLOIDAIS: as partículas (glóbulos vermelhos, proteínas, gorduras) são microscópicas — só visíveis ao microscópio — e separam-se por centrifugação, revelando múltiplas fases."},
];

// ── DISCURSIVAS ───────────────────────────────────────────────────────────────
const DS=[
  {src:"PA1 Q3",
   q:"O ar atmosférico é considerado uma mistura de gases em diversas proporções. Cite a classificação desse tipo de mistura em relação à presença ou ausência de fases, justificando sua resposta.",
   mod:`O ar atmosférico é uma mistura HOMOGÊNEA — apresenta apenas 1 fase visível.

Justificativa: quando gases são misturados, distribuem-se uniformemente, formando uma solução gasosa com composição aparentemente uniforme em qualquer ponto. Não é possível identificar as fases dos componentes separados a olho nu — nitrogênio, oxigênio, gás carbônico e gases nobres se misturam completamente, sem fronteiras visíveis entre eles.`},
  {src:"PA1 Q8",
   q:"As medalhas das Olimpíadas de Tóquio 2020: ouro (ouro+prata), bronze (cobre+zinco) e prata (prata pura). Identifique as medalhas classificadas como misturas homogêneas sólidas e justifique sua resposta.",
   mod:`As medalhas de OURO e de BRONZE são misturas homogêneas sólidas (ligas metálicas).

• Medalha de OURO: formada por ouro (Au) e prata (Ag) — dois metais que se misturam completamente no estado sólido, sem fronteiras visíveis entre eles → mistura homogênea sólida (liga metálica).

• Medalha de BRONZE: formada por cobre (Cu) e zinco (Zn) — também uma liga metálica com 1 fase homogênea uniforme.

A medalha de PRATA é substância pura simples (apenas Ag) — não é mistura.`},
  {src:"PA1 Q14",
   q:"O alisamento de cabelo pode ser feito por chapinha (física) ou por escova progressiva (química). Esse procedimento pode ser classificado como químico, físico ou os dois? Justifique.",
   mod:`O alisamento pode ser FÍSICO ou QUÍMICO, dependendo do método.

• FÍSICO (chapinha/prancha): muda temporariamente a forma do fio. As ligações das proteínas se refazem quando o cabelo é molhado — a composição química NÃO é alterada. Fenômeno reversível.

• QUÍMICO (escova progressiva): destrói e reconstrói permanentemente as ligações químicas das proteínas (queratina) do fio. A composição química é ALTERADA de forma irreversível → transformação química.

Portanto, existem os dois tipos, e cada um é classificado de forma diferente.`},
  {src:"PA1 Q2 — Discursiva",
   q:"A feijoada é uma mistura heterogênea. Explique o que caracteriza uma mistura heterogênea e indique o método de separação mais adequado para separar o caldo líquido dos grãos e das carnes sólidas. Justifique.",
   mod:`Uma mistura heterogênea apresenta 2 ou mais fases visíveis, onde é possível distinguir os diferentes componentes a olho nu.

Na feijoada, é possível ver claramente os grãos de feijão, os pedaços de carne e o caldo líquido — fases distintas e visíveis → mistura heterogênea.

O método mais adequado é a TAMISAÇÃO (coar): passa a mistura por uma peneira/coador, que retém os sólidos (grãos e carnes) e deixa passar o líquido (caldo).

Outro método possível: CATAÇÃO — retirar os pedaços sólidos manualmente com uma colher ou pegador.`},
];

// ── IMAGENS POR CONCEITO (Unsplash/Wikimedia — URLs livres) ──────────────────
// ⚠️ SUBSTITUA os conceitos (definicao/apostila) pelos textos EXATOS da apostila
// quando receber o PDF. A estrutura de imagem e página já está pronta.
const IMGS={
  materia:           "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80",
  substancia_pura:   "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=600&q=80",
  soluto_solvente:   "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80",
  mistura_homogenea: "https://images.unsplash.com/photo-1559825481-12a05cc00344?w=600&q=80",
  mistura_heterogenea:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80",
  heterogeneos_especiais:"https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&q=80",
  combinacoes:       "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
  fenomenos_fisicos: "https://images.unsplash.com/photo-1548610762-c9e5e24eba5e?w=600&q=80",
  fenomenos_quimicos:"https://images.unsplash.com/photo-1516220362602-dba5272034e7?w=600&q=80",
  fenomenos_biologicos:"https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=600&q=80",
  sep_catacao:       "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&q=80",
  sep_tamisacao:     "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80",
  sep_ventilacao:    "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=600&q=80",
  sep_levigacao:     "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=600&q=80",
  sep_decantacao:    "https://images.unsplash.com/photo-1527549993586-dff825b37782?w=600&q=80",
  sep_filtracao:     "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
  sep_centrifugacao: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&q=80",
  sep_evaporacao:    "https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=600&q=80",
  sep_destilacao_simples:"https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=600&q=80",
  sep_destilacao_fracionada:"https://images.unsplash.com/photo-1513828742140-ccaa28f3eda0?w=600&q=80",
  sep_fusao_fracionada:"https://images.unsplash.com/photo-1565680018093-ebb6b9ab5460?w=600&q=80",
};

// ── TEORIA DA APOSTILA (com referência de página) ────────────────────────────
// ⚠️ CAMPO "definicao": substitua pelo texto EXATO como aparece na apostila
// ⚠️ CAMPO "apostila": substitua pelo parágrafo exato da apostila
const TEORIA = [
  {
    id:"materia",
    titulo:"Matéria",
    pagina:"p. 7",
    emoji:"⚗️",
    cor: C.blueDark,
    corLight: "#E8EAF6",
    // ⚠️ SUBSTITUIR pelo conceito exato da apostila p. 7
    definicao:"Na natureza, raramente iremos encontrar uma substância pura, ou seja, uma substância que esteja totalmente livre de outra. Até mesmo a água potável ou a água mineral, por mais limpas que estejam, possuem sais minerais e gases participando de suas constituições e formando uma mistura.",
    apostila:"Para se fazer uma mistura, é necessário que se tenha reagentes que, em geral, são substâncias puras. Estes reagentes são denominados de soluto e solvente. Solvente é o que dissolve o soluto. A água é considerada como o solvente universal, pois é capaz de dissolver a maior parte das substâncias.",
    exemplos:["Água pura (H₂O) → substância pura","Água + sal → mistura","Ar atmosférico → mistura de gases"],
    destaque: null,
  },
  {
    id:"substancia_pura",
    titulo:"Substância Pura",
    pagina:"p. 7",
    emoji:"🔵",
    cor: C.blue,
    corLight: C.blueLight,
    definicao:"As substâncias puras podem ser classificadas de acordo com a sua composição química, como substâncias simples ou compostas. Substância Simples: São formadas por um único tipo de elemento químico. Substância Composta: São formadas por dois ou mais tipos de elementos químicos.",
    apostila:"Exemplo de Substância Simples: a molécula do gás oxigênio (O₂) é formada somente pelo elemento químico oxigênio. Exemplo de Substância Composta: a molécula da água (H₂O) é formada pelos elementos químicos oxigênio e hidrogênio.",
    exemplos:[
      "Substância SIMPLES: O₂ (oxigênio), H₂ (hidrogênio), Fe (ferro) — 1 elemento",
      "Substância COMPOSTA: H₂O (água), NaCl (sal), CO₂ (gás carbônico) — 2+ elementos",
      "NaCl (cloreto de sódio): Na + Cl → substância composta (PA1 Q7)",
    ],
    destaque:"⚠️ NaCl não é mistura! É substância composta — não pode ser separada por métodos físicos.",
  },
  {
    id:"soluto_solvente",
    titulo:"Soluto, Solvente e Solução",
    pagina:"p. 8",
    emoji:"💧",
    cor: "#0277BD",
    corLight: "#E1F5FE",
    definicao:"Solvente é o que dissolve o soluto. A água é considerada como o solvente universal, pois é capaz de dissolver a maior parte das substâncias. A solução pode ser diluída ou concentrada — esta característica está relacionada à concentração da solução.",
    apostila:"Quantidade de soluto e solvente: a solução pode ser diluída ou concentrada. Esta característica está relacionada à concentração da solução. Você mexe, mexe e mexe com a colher, mas o açúcar não dissolve. Isso significa que você colocou açúcar demais! A mistura está com excesso de soluto e o açúcar que não foi diluído, precipitou no fundo.",
    exemplos:[
      "Água + sal: sal = soluto | água = solvente → salmoura (solução salina)",
      "Gelatina: pó de gelatina = soluto | água = solvente (PA1 Q5)",
      "Soro fisiológico: NaCl 0,9% = soluto | água = solvente",
      "Concentração: diluída (pouco soluto) → concentrada (muito soluto)",
    ],
    destaque:"💡 Regra prática: o solvente está em maior quantidade e dissolve; o soluto está em menor quantidade e é dissolvido.",
  },
  {
    id:"mistura_homogenea",
    titulo:"Mistura Homogênea",
    pagina:"p. 9",
    emoji:"🔵",
    cor: C.blue,
    corLight: C.blueLight,
    definicao:"As diferentes substâncias presentes numa mistura podem não ser visualizadas a olho nu. Isto ocorre pois formam uma mistura homogênea. As soluções são misturas homogêneas de duas ou mais substâncias puras. As soluções podem ser classificadas, quanto ao estado físico, em: sólidas, líquidas e gasosas.",
    apostila:"Soluções sólidas – formadas por diferentes sólidos, em geral, metais. Por exemplo: o bronze é uma liga sólida formada a partir do cobre e do estanho; o aço é uma liga metálica formada de ferro e carbono e o ouro 14 e 18 quilates, formados de ouro acrescido de diferentes metais. Soluções gasosas – formadas por diferentes gases. Por exemplo: o ar do botijão de gás é composto por gases butano, buteno, propano, propeno, etano, pentano, dentre outros. Soluções líquidas – formadas por diferentes líquidos ou de sólidos dissolvidos em líquidos. O soro fisiológico, utilizado em emergências hospitalares, é um solução de água com cloreto de sódio (NaCl) a 0,9%.",
    exemplos:[
      "Soluções LÍQUIDAS: água + sal, água + açúcar, soro fisiológico (NaCl 0,9%)",
      "Soluções SÓLIDAS (ligas metálicas): ouro 18k (Au+Ag+Cu), bronze (Cu+Zn), aço (Fe+C)",
      "Soluções GASOSAS: ar atmosférico (N₂+O₂+CO₂...), GLP/botijão de gás (propano+butano)",
      "Ouro 18k: 75% ouro + 25% cobre/paládio/prata (PA1 Q8)",
    ],
    destaque:"💡 O ar atmosférico é mistura HOMOGÊNEA gasosa — ao misturar gases, sempre formamos 1 fase uniforme (PA1 Q3).",
  },
  {
    id:"mistura_heterogenea",
    titulo:"Mistura Heterogênea",
    pagina:"p. 10",
    emoji:"🟠",
    cor: C.orange,
    corLight: C.orangeLight,
    definicao:"Quando a mistura é heterogênea, as fases da mistura são distinguidas, visualmente, apresentando diferentes fases. As misturas que apresentam 2 fases são chamadas de bifásicas; as que apresentam 3 fases são chamadas de trifásicas, enquanto as que possuem 4 ou mais fases são chamadas de polifásicas.",
    apostila:"Na primeira imagem, certamente, você consegue perceber que existem duas substâncias: água e óleo. Mas, na segunda imagem, onde está o açúcar? É possível que uma mistura contenha diferentes componentes, formando número distinto de fases.",
    exemplos:[
      "BIFÁSICA (2 fases): água + óleo, água + areia, água + gelo",
      "TRIFÁSICA (3 fases): água + óleo + areia (areia↓, água, óleo↑)",
      "POLIFÁSICA (4+ fases): água + óleo + terra + gelo (PA1 Q1)",
      "Petróleo flutuando na água → bifásica (exercício do livro)",
    ],
    destaque:"⚠️ ATENÇÃO P1 Q1: água + óleo + terra + gelo = 4 substâncias → 4 fases → POLIFÁSICA!",
  },
  {
    id:"heterogeneos_especiais",
    titulo:"Heterogêneos Especiais: Sangue e Leite",
    pagina:"p. 11",
    emoji:"🔬",
    cor: "#6A1B9A",
    corLight: "#F3E5F5",
    definicao:"Apesar de, a olho nu, parecerem misturas homogêneas, tanto o leite quanto o sangue são misturas heterogêneas. Isto ocorre pois suas pequenas partes podem ser visualizadas através de um microscópio e podem ser separadas por centrifugação.",
    apostila:"O sangue é composto por: Plasma (60% do total) + Leucócitos e plaquetas (1% do total) + Eritrócitos (40% do total). Suas pequenas partes podem ser visualizadas através de um microscópio e podem ser separadas por centrifugação.",
    exemplos:[
      "SANGUE: plasma (60%) + leucócitos (glóbulos brancos) + eritrócitos (glóbulos vermelhos)",
      "LEITE: água + gordura + proteínas + lactose — separáveis por centrifugação",
      "Método de separação: CENTRIFUGAÇÃO (usa força centrífuga por RPM)",
    ],
    destaque:"💡 Regra: se pode ser separado por centrifugação → é heterogêneo, mesmo parecendo uniforme!",
  },
  {
    id:"combinacoes",
    titulo:"Diferença: Mistura × Combinação",
    pagina:"p. 12",
    emoji:"⚗️",
    cor: C.redDark,
    corLight: C.redLight,
    definicao:"Misturas: Ocorrem quando duas ou mais substâncias são colocadas em contato umas com as outras, sem que ocorra uma reação química entre elas. Neste caso, estão apenas misturadas, conservando suas principais propriedades químicas. Combinações: Ocorrem quando duas ou mais substâncias são colocadas em contato umas com as outras, ocorrendo uma reação química entre elas e formando uma nova substância. Dessa forma, não voltam mais ao que eram, anteriormente.",
    apostila:"Sempre que juntamos duas ou mais substâncias puras diferentes, formamos uma mistura ou uma combinação. Exemplo de Mistura: água + óleo; água + álcool. Exemplo de Combinação: ingredientes → bolo.",
    exemplos:[
      "MISTURA: água + sal → posso evaporar e recuperar o sal",
      "COMBINAÇÃO: ferro + oxigênio → ferrugem (nova substância, irreversível)",
      "MISTURA: água + óleo → posso separar por decantação",
      "COMBINAÇÃO: farinha + ovos + calor → bolo (não dá para 'desassar')",
    ],
    destaque:"🔑 Chave: mistura = componentes conservam propriedades e podem ser separados. Combinação = nova substância, irreversível.",
  },
  {
    id:"fenomenos_fisicos",
    titulo:"Fenômenos Físicos",
    pagina:"p. 21",
    emoji:"🧊",
    cor: "#1976D2",
    corLight: "#E3F2FD",
    definicao:"Fenômenos Físicos: Não alteram a constituição da matéria. Esses fenômenos ocorrem quando há apenas mudança na forma, tamanho ou estado físico da matéria. Nesses casos, a composição química permanece a mesma. Por exemplo, uma latinha de alumínio amassada, um copo quebrado etc.",
    apostila:"A latinha de alumínio, ao ser amassada, apenas mudou de forma, mas permaneceu sendo de alumínio. Isto significa que sofreu transformação física. O secador ou a prancha de cabelos, desfazem as ligações químicas, sem destruí-las. Assim que o cabelo é molhado, as ligações se refazem, voltando ao normal. Como não ocorre alteração na constituição do fio dizemos que é uma transformação física.",
    exemplos:[
      "Gelo derretendo → sólido vira líquido (fusão), mas continua sendo H₂O",
      "Água evaporando → líquido vira vapor (vaporização), continua H₂O",
      "Latinha de refrigerante amassada → muda de forma, mas o alumínio é o mesmo",
      "Chapinha/prancha no cabelo → muda a forma do fio temporariamente (PA1 Q14)",
      "Fusão e vaporização do gelo (tirinha — P1 Q10)",
    ],
    destaque:"💡 Teste: depois do fenômeno, a substância voltou ao estado anterior? Se sim → físico!",
  },
  {
    id:"fenomenos_quimicos",
    titulo:"Fenômenos Químicos",
    pagina:"p. 22",
    emoji:"🔥",
    cor: C.red,
    corLight: C.redLight,
    definicao:"Fenômenos Químicos: Alteram a constituição da matéria. Esses fenômenos mudam a condição química da matéria, transformando em nova substância. Portanto, são transformações permanentes. Por exemplo, um fósforo queimado, um bolo assado, a gasolina de um carro, a queima de um papel etc.",
    apostila:"O palito de fósforo, ao ser queimado, modifica-se de forma que não conseguimos voltar a ter o palito igual a como era antes. Isto significa que se modificou, isto é, sofreu transformação química. Um alisante de cabelo desfaz e destrói as ligações químicas existentes entre as proteínas dos fios do cabelo, alisando-os, definitivamente. Portanto, é uma transformação química.",
    exemplos:[
      "Fósforo queimando → cinzas (nova substância formada, irreversível)",
      "Bolo assado → farinha + ovos + calor → bolo (não pode ser desfeito)",
      "Ferrugem → ferro + oxigênio → óxido de ferro (irreversível)",
      "Escova progressiva → altera ligações das proteínas do cabelo (PA1 Q14)",
      "Água oxigenada no ferimento → espuma = gás O₂ liberado (exercício do livro)",
    ],
    destaque:"⚠️ Evidências de transformação química: mudança de cor, gás, precipitado, calor/luz, odor.",
  },
  {
    id:"fenomenos_biologicos",
    titulo:"Fenômenos Biológicos",
    pagina:"p. 23",
    emoji:"🦋",
    cor: C.green,
    corLight: C.greenLight,
    definicao:"Fenômenos Biológicos: Não alteram a constituição da matéria. Esses fenômenos ocorrem com seres vivos. Em geral, fazem parte de uma programação biológica do desenvolvimento do ser vivo. Por exemplo, a metamorfose do sapo e da borboleta, o crescimento de uma criança, e crescimento de pelos e penas etc.",
    apostila:"A lagarta, ao sofrer metamorfose, muda sua forma, passa a ter asas e a ser uma linda borboleta. Estas mudanças significam que houve uma transformação biológica. Se pararmos para observar, todos os dias nos deparamos com transformações que ocorrem com a matéria, seja num fósforo que acendemos, uma latinha ou copo que amassamos ou na metamorfose de uma borboleta. Todas essas modificações são fenômenos, que promovem a transformação da matéria.",
    exemplos:[
      "Metamorfose da borboleta: lagarta → crisálida → borboleta (PA1 Q6)",
      "Metamorfose do sapo: girino → sapo adulto",
      "Crescimento humano: bebê → criança → adulto",
      "Cicatrização de uma ferida",
      "Digestão dos alimentos no corpo (exercício do livro)",
    ],
    destaque:"💡 Fenômeno biológico ≠ químico: a metamorfose faz parte do desenvolvimento NATURAL do ser vivo, programado geneticamente.",
  },
  {
    id:"sep_catacao",
    titulo:"Separação: Catação",
    pagina:"p. 31",
    emoji:"✋",
    cor: "#5D4037",
    corLight: "#EFEBE9",
    definicao:"Catação: Processo de separação de sólidos que podem ser distinguidos visualmente. Consiste na retirada manual de cada um dos elementos da mistura com uso das mãos ou de pinças.",
    apostila:"Diferente das combinações, as misturas podem ser separadas. Algumas de forma manual e simples, outras de forma laboratorial e com uso de equipamentos. Para escolher o tipo de separação de misturas, é necessário conhecer as propriedades de cada uma das substâncias presentes na mistura.",
    exemplos:[
      "Retirar pedras do feijão antes de cozinhar",
      "Separar conchas da areia na praia",
      "Separar cascas de alho (PA1 Q11 — mas não é o mais eficiente!)",
    ],
    destaque:"⚠️ Limitação: é lenta. Para cascas leves como alho, a VENTILAÇÃO é mais eficiente (PA1 Q11).",
  },
  {
    id:"sep_tamisacao",
    titulo:"Separação: Tamisação (Peneiração)",
    pagina:"p. 32",
    emoji:"⬜",
    cor: "#5D4037",
    corLight: "#EFEBE9",
    definicao:"Tamisação: Processo de separação de sólidos por meio de uma malha, denominada tamise, também conhecida como peneira. As malhas das peneiras podem ter diferentes tamanhos.",
    apostila:"Geralmente, boleiros e confeiteiros peneiram farinhas e açúcares, na preparação das receitas, para evitar a formação de grumos. A peneiração é um método de separação de sólidos denominada de tamisação.",
    exemplos:[
      "Peneirar farinha de trigo para retirar grumos (PA1 Q estilo)",
      "Separação de areia grossa da fina na construção civil",
      "Coar a feijoada para separar caldo (líquido) dos grãos (sólido) (PA1 Q2)",
      "Separar cascalho da areia em pedreiras",
    ],
    destaque:"💡 Tamisação = separar sólidos de tamanhos diferentes. Coar = separar sólido de líquido (mesmo princípio).",
  },
  {
    id:"sep_ventilacao",
    titulo:"Separação: Ventilação",
    pagina:"p. 32",
    emoji:"💨",
    cor: "#0288D1",
    corLight: "#E1F5FE",
    definicao:"Ventilação: Processo de separação de sólidos mediante corrente de ar. Processo muito usado na separação de cascas secas de cereais e grãos.",
    apostila:"Em supermercados, na bancada de alhos, é comum pessoas descascarem as cabeças de alho e deixarem as cascas no local. De tempo em tempo, um funcionário abana essa bancada, de forma que as cascas voem, caiam no chão, sejam varridas e coletadas. O processo descrito acima, de separação das cascas do alho das cabeças de alho, é classificado como ventilação.",
    exemplos:[
      "Separar cascas de alho dos bulbos (PA1 Q11 — método mais eficiente)",
      "Joeirar trigo: grãos pesados caem, palha leve voa",
      "Separar cascas de amendoim dos grãos",
      "Ventilação na fazenda: separar grãos de café da casca",
    ],
    destaque:"🌟 PA1 Q11: ventilação é mais eficiente que catação para separar cascas leves de alho dos bulbos pesados.",
  },
  {
    id:"sep_levigacao",
    titulo:"Separação: Levigação",
    pagina:"p. 33",
    emoji:"🌊",
    cor: "#0288D1",
    corLight: "#E1F5FE",
    definicao:"Levigação: Processo de separação de sólidos, de diferentes densidades, através de corrente de água.",
    apostila:"Diferente das combinações, as misturas podem ser separadas. Para escolher o tipo de separação de misturas, é necessário conhecer as propriedades de cada uma das substâncias presentes na mistura. A levigação é especialmente usada na separação de minerais e garimpo.",
    exemplos:[
      "Garimpo: separar ouro (pesado) da areia (leve) com água corrente",
      "Separar areia fina da pedra em rios",
      "Lavagem de minerais em mineradoras",
    ],
    destaque:"💡 Diferença: levigação usa ÁGUA EM MOVIMENTO. Decantação usa REPOUSO.",
  },
  {
    id:"sep_decantacao",
    titulo:"Separação: Decantação",
    pagina:"p. 34",
    emoji:"🏺",
    cor: "#0277BD",
    corLight: "#E1F5FE",
    definicao:"Decantação: Processo de separação de sólidos em meio líquido ou de líquidos com densidades diferentes. Em geral, requer repouso para que o sólido se deposite no fundo.",
    apostila:"Numa Estação de Tratamento da Água (ETA), a água passa por etapas de tratamento. Uma dessas etapas consiste em manter a água em repouso, durante um certo tempo, em tanques, para que os sólidos em suspensão se depositem no fundo. À essa operação denominamos de decantação.",
    exemplos:[
      "Tratamento de água potável — manter a água em repouso (ETA) (PA1 Q12)",
      "Separar água + óleo: o óleo flutua, a água fica embaixo",
      "Separar areia da água: areia deposita no fundo por gravidade",
      "Separar petróleo da água do mar em vazamentos",
    ],
    destaque:"🌟 P1 Q12: decantação = manter em repouso para o material sólido depositar no fundo por gravidade.",
  },
  {
    id:"sep_filtracao",
    titulo:"Separação: Filtração",
    pagina:"p. 35",
    emoji:"☕",
    cor: "#00838F",
    corLight: "#E0F7FA",
    definicao:"Filtração: Processo de separação de sólidos e líquido. Consiste na passagem do líquido por um filtro, que retém o sólido. Existem diferentes tipos de filtros, com porosidades maiores ou menores, de acordo com o que se deseja filtrar.",
    apostila:"Frequentemente, compramos sal, açúcar, diferentes óleos, assim como realizamos processos de separação de misturas em nossas casas, em simples processos como escorrer um macarrão, filtrar água para beber, centrifugar roupas na máquina de lavar.",
    exemplos:[
      "Coar café: pó de café (sólido) fica no filtro; café (líquido) passa (PA1 Q15)",
      "Ar-condicionado: filtra poeira e microrganismos do ar (PA1 Q15)",
      "Filtro de água doméstico: retém partículas sólidas",
      "Filtração do sangue pelos rins (processo biológico análogo)",
    ],
    destaque:"🌟 P1 Q15: ar-condicionado usa FILTRAÇÃO para reter poeira/microrganismos. Mesmo método do coador de café.",
  },
  {
    id:"sep_centrifugacao",
    titulo:"Separação: Centrifugação",
    pagina:"p. 36",
    emoji:"🔄",
    cor: "#6A1B9A",
    corLight: "#F3E5F5",
    definicao:"Centrifugação: Processo de separação de sólidos e/ou líquidos, de diferentes densidades, através de força centrífuga. A mistura é colocada num aparelho que promove rotações por minuto (RPM), separando os componentes pela sua densidade.",
    apostila:"Apesar de, a olho nu, parecerem misturas homogêneas, tanto o leite quanto o sangue são misturas heterogêneas. Suas pequenas partes podem ser visualizadas através de um microscópio e podem ser separadas por centrifugação. O sangue centrifugado separa em: Plasma (60% do total) + Leucócitos e plaquetas (1%) + Eritrócitos (40%).",
    exemplos:[
      "Separação do sangue: plasma + leucócitos + eritrócitos (p. 36)",
      "Separação do leite: creme de leite (gordura) + soro",
      "Máquina de lavar: centrifuga as roupas para retirar a água",
      "Sangue e leite são heterogêneos — provados pela centrifugação (p. 11)",
    ],
    destaque:"💡 Centrifugação prova que sangue e leite são heterogêneos — mesmo parecendo uniformes a olho nu!",
  },
  {
    id:"sep_evaporacao",
    titulo:"Separação: Evaporação",
    pagina:"p. 37",
    emoji:"☀️",
    cor: "#F57F17",
    corLight: "#FFF9C4",
    definicao:"Evaporação: Processo de separação dos sólidos de um meio líquido, a partir da evaporação do líquido.",
    apostila:"As salinas são locais onde aprisionam a água do mar, até que o sal cristalize e a água evapore. Dessa forma, o sal cristalizado fica retido no fundo dos tanques. Posteriormente, é coletado e levado para as empresas, para ser lavado e embalado. As principais salinas brasileiras estão localizadas na região Norte do país. No estado do Rio de Janeiro, encontramos salinas na Região dos Lagos.",
    exemplos:[
      "Salinas: água do mar evapora → sal cristaliza (produção de sal marinho)",
      "Água com sal: evaporar a água → recuperar o sal (PA1 Q4)",
      "Soro fisiológico: evaporar → recuperar NaCl",
      "Extração de açúcar da cana: evaporar a água da garapa",
    ],
    destaque:"🌟 P1 Q4: água + sal (homogênea) → método de separação = EVAPORAÇÃO.",
  },
  {
    id:"sep_destilacao_simples",
    titulo:"Separação: Destilação Simples",
    pagina:"p. 38",
    emoji:"🌡️",
    cor: "#E65100",
    corLight: "#FFF3E0",
    definicao:"Destilação: Processo de separação de sólidos ou líquidos em uma mistura líquida, com diferentes densidades. Consiste na passagem do líquido para o estado gasoso. Posteriormente, ocorre condensação, voltando para o estado líquido, como a água destilada.",
    apostila:"Em hospitais é comum o uso de água destilada para a diluição de medicamentos, sendo também chamada de água de injeção. Essa água é obtida por meio da destilação de água não pura, e então condensada em outro recipiente, de forma que não contenha nenhum tipo de gás, sais minerais ou outros produtos dissolvidos. Dessa forma, não altera a composição do medicamento a ser usado.",
    exemplos:[
      "Produção de água destilada para laboratório e injeções hospitalares",
      "Separar álcool da água (se os pontos de ebulição forem muito diferentes)",
      "Destilar água salgada para obter água potável (dessalinização simples)",
    ],
    destaque:"💡 Destilação simples → 1 produto coletado. Destilação fracionada → múltiplos produtos separados.",
  },
  {
    id:"sep_destilacao_fracionada",
    titulo:"Separação: Destilação Fracionada",
    pagina:"p. 39",
    emoji:"🏭",
    cor: "#BF360C",
    corLight: "#FBE9E7",
    definicao:"Destilação Fracionada: Processo de separação de misturas de líquidos com diferentes pontos de ebulição. A mistura é submetida a temperaturas diferenciadas, com a extração de produtos diversos.",
    apostila:"Muitas substâncias são derivadas do petróleo. Depois de extraído da natureza, o petróleo é levado para uma refinaria de petróleo, onde passará pelo processo de destilação fracionada. Na destilação de petróleo bruto, os produtos mais leves saem do topo das colunas e os produtos mais pesados saem da parte inferior da coluna. Entre os derivados de petróleo produzidos em refinarias estão: óleo diesel, gasolina, nafta, querosene e óleo combustível.",
    exemplos:[
      "Refinaria de petróleo: gás de cozinha → nafta → querosene → gasolina → diesel → asfalto (PA1 Q9)",
      "Separação do ar líquido: N₂ (−196°C) + O₂ (−183°C) + Ar (−186°C)",
      "Produção de cachaça: destilação fracionada do caldo de cana fermentado",
    ],
    destaque:"🌟 P1 Q9: destilação FRACIONADA é mais adequada para o petróleo porque separa múltiplos componentes por diferentes pontos de ebulição.",
  },
  {
    id:"sep_fusao_fracionada",
    titulo:"Separação: Fusão Fracionada",
    pagina:"p. 40",
    emoji:"🔩",
    cor: "#4E342E",
    corLight: "#EFEBE9",
    definicao:"Fusão fracionada: Processo de separação de sólidos, com diferentes pontos de fusão. A mistura é submetida a variações de temperaturas, obtendo os produtos, separadamente.",
    apostila:"Prata: 962°C · Ouro: 1063°C · Ferro: 1538°C. A mistura é submetida a variações de temperaturas, obtendo os produtos, separadamente. Exemplo clássico: Fusão de areia e enxofre — com aquecimento, o enxofre funde primeiro (ponto de fusão menor), ficando líquido enquanto a areia permanece sólida.",
    exemplos:[
      "Separar prata (fusão 962°C) do ouro (1063°C) e do ferro (1538°C)",
      "Separar metais de diferentes pontos de fusão em ligas metálicas",
      "Refinamento de metais preciosos na metalurgia",
    ],
    destaque:"💡 Fusão fracionada é para SÓLIDOS. Destilação fracionada é para LÍQUIDOS. Ambas usam temperatura.",
  },
];

// ─── COMPONENTE TEORIA ───────────────────────────────────────────────────────
function TeoriaCap1() {
  const [open, setOpen] = useState(null);

  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      {/* banner de instruções */}
      <div style={{
        background:"linear-gradient(135deg,#E8F5E9,#C8E6C9)",
        borderRadius:14,padding:"12px 16px",
        border:"1px solid #81C784",
        display:"flex",alignItems:"center",gap:10,
        marginBottom:6,
      }}>
        <span style={{fontSize:22}}>📖</span>
        <div>
          <div style={{fontWeight:800,color:C.green,fontSize:13}}>Teoria da Apostila — Capítulo 1</div>
          <div style={{fontSize:12,color:"#388E3C"}}>Clique em qualquer conceito para ver a explicação completa com referência de página da apostila, exemplos e dicas para a prova.</div>
        </div>
      </div>

      {/* seção: Misturas e Substâncias */}
      <SectionHeader titulo="🧪 Substâncias e Misturas" paginas="pp. 7–12" cor={C.blueDark}/>
      {TEORIA.filter(t=>["materia","substancia_pura","soluto_solvente","mistura_homogenea","mistura_heterogenea","heterogeneos_especiais","combinacoes"].includes(t.id)).map(t=>(
        <ConceCard key={t.id} t={t} open={open} setOpen={setOpen}/>
      ))}

      {/* seção: Fenômenos */}
      <SectionHeader titulo="⚡ Fenômenos Físicos, Químicos e Biológicos" paginas="pp. 21–27" cor="#6A1B9A"/>
      {TEORIA.filter(t=>["fenomenos_fisicos","fenomenos_quimicos","fenomenos_biologicos"].includes(t.id)).map(t=>(
        <ConceCard key={t.id} t={t} open={open} setOpen={setOpen}/>
      ))}

      {/* seção: Separação */}
      <SectionHeader titulo="🔬 Métodos de Separação de Misturas" paginas="pp. 31–40" cor={C.orange}/>
      {TEORIA.filter(t=>t.id.startsWith("sep_")).map(t=>(
        <ConceCard key={t.id} t={t} open={open} setOpen={setOpen}/>
      ))}
    </div>
  );
}

function SectionHeader({titulo,paginas,cor}) {
  return (
    <div style={{
      background:cor,borderRadius:10,padding:"10px 16px",
      display:"flex",justifyContent:"space-between",alignItems:"center",
      marginTop:8,
    }}>
      <span style={{color:"#fff",fontWeight:800,fontSize:13}}>{titulo}</span>
      <span style={{
        background:"rgba(255,255,255,0.2)",borderRadius:20,
        padding:"2px 10px",color:"#fff",fontSize:11,fontWeight:700,
      }}>{paginas}</span>
    </div>
  );
}

function ConceCard({t, open, setOpen}) {
  const isOpen = open === t.id;
  const img = IMGS[t.id];
  return (
    <div style={{
      borderRadius:14,border:`2px solid ${isOpen?t.cor:"#E0E0E0"}`,
      overflow:"hidden",transition:"all 0.25s",
      boxShadow:isOpen?`0 6px 24px ${t.cor}30`:"0 1px 4px rgba(0,0,0,0.06)",
    }}>
      {/* CABEÇALHO com thumbnail */}
      <button onClick={()=>setOpen(isOpen?null:t.id)} style={{
        width:"100%",border:"none",padding:0,
        background:isOpen?t.cor:C.white,
        cursor:"pointer",fontFamily:"inherit",
        display:"flex",alignItems:"stretch",
        transition:"all 0.25s",minHeight:68,
      }}>
        {img&&<div style={{width:80,flexShrink:0,backgroundImage:`url(${img})`,backgroundSize:"cover",backgroundPosition:"center",opacity:isOpen?0.7:1}}/>}
        <div style={{flex:1,padding:"12px 14px",textAlign:"left",display:"flex",flexDirection:"column",justifyContent:"center"}}>
          <div style={{fontWeight:800,fontSize:14,color:isOpen?"#fff":t.cor,lineHeight:1.3}}>{t.emoji} {t.titulo}</div>
          <div style={{fontSize:11,color:isOpen?"rgba(255,255,255,0.75)":C.gray,marginTop:3}}>{isOpen?"▲ fechar":"▼ ver conceito, exemplos e imagem"}</div>
        </div>
        <div style={{flexShrink:0,display:"flex",alignItems:"center",paddingRight:14}}>
          <div style={{padding:"4px 12px",borderRadius:20,background:isOpen?"rgba(255,255,255,0.2)":t.corLight,border:isOpen?"1px solid rgba(255,255,255,0.4)":`1px solid ${t.cor}44`}}>
            <span style={{fontWeight:800,fontSize:11,color:isOpen?"#fff":t.cor}}>📄 {t.pagina}</span>
          </div>
        </div>
      </button>

      {/* CONTEÚDO EXPANDIDO */}
      {isOpen&&(
        <div style={{background:t.corLight,animation:"fadeIn 0.25s ease"}}>
          {/* imagem grande */}
          {img&&(
            <div style={{width:"100%",height:220,backgroundImage:`url(${img})`,backgroundSize:"cover",backgroundPosition:"center",position:"relative"}}>
              <div style={{position:"absolute",inset:0,background:`linear-gradient(to bottom,transparent 40%,${t.corLight} 100%)`}}/>
              <div style={{position:"absolute",bottom:10,left:14,background:"rgba(0,0,0,0.6)",borderRadius:8,padding:"4px 12px"}}>
                <span style={{color:"#fff",fontSize:11,fontWeight:700}}>{t.titulo} · {t.pagina}</span>
              </div>
            </div>
          )}

          <div style={{padding:"16px 18px"}}>
            {/* CONCEITO DA APOSTILA — destaque principal */}
            <div style={{marginBottom:16}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <div style={{background:t.cor,color:"#fff",borderRadius:8,padding:"3px 12px",fontSize:11,fontWeight:800,letterSpacing:0.5}}>
                  📌 CONCEITO · {t.pagina}
                </div>
              </div>
              <div style={{
                background:C.white,borderRadius:12,padding:"16px 18px",
                border:`2.5px solid ${t.cor}`,
                fontSize:14.5,color:"#0D1B2A",lineHeight:1.75,fontWeight:600,
                boxShadow:`inset 4px 0 0 ${t.cor}`,
              }}>
                {t.definicao}
              </div>
            </div>

            {/* apostila */}
            <div style={{background:C.white,borderRadius:10,padding:"12px 14px",border:`1px solid ${t.cor}33`,marginBottom:14}}>
              <div style={{fontWeight:800,color:t.cor,fontSize:12,marginBottom:6,display:"flex",alignItems:"center",gap:6}}>
                <span>📚</span> Na apostila ({t.pagina})
              </div>
              <p style={{margin:0,fontSize:13,color:"#37474F",lineHeight:1.65}}>{t.apostila}</p>
            </div>

            {/* exemplos */}
            <div style={{marginBottom:t.destaque?14:0}}>
              <div style={{fontWeight:800,color:t.cor,fontSize:12,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>💡 Exemplos do cotidiano</div>
              {t.exemplos.map((ex,i)=>(
                <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:7}}>
                  <span style={{width:22,height:22,borderRadius:"50%",background:t.cor,color:"#fff",fontSize:10,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>{i+1}</span>
                  <span style={{fontSize:13,color:"#37474F",lineHeight:1.55}}>{ex}</span>
                </div>
              ))}
            </div>

            {/* destaque prova */}
            {t.destaque&&(
              <div style={{background:t.destaque.startsWith("🌟")?"#FFF8E1":t.destaque.startsWith("⚠️")?"#FFEBEE":"#E3F2FD",borderRadius:10,padding:"10px 14px",border:`1px solid ${t.destaque.startsWith("🌟")?"#FFB300":t.destaque.startsWith("⚠️")?C.red:C.blue}`}}>
                <p style={{margin:0,fontSize:13,color:"#212121",fontWeight:600,lineHeight:1.5}}>{t.destaque}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
// ── MAPA CONCEITUAL ──────────────────────────────────────────────────────────
const NODES=[
  {id:"materia",   x:50,y:6, c:C.blueDark,s:"g",  l:"Matéria",          i:"Tudo que tem massa e ocupa espaço. Classificada como substância pura ou mistura."},
  {id:"spura",     x:18,y:22,c:C.blue,    s:"m",  l:"Substância Pura",  i:"Formada por 1 único tipo de substância. Propriedades físicas e químicas fixas. Ex: água pura (H₂O), ouro 24k."},
  {id:"mistura",   x:76,y:22,c:C.blue,    s:"m",  l:"Mistura",          i:"União de 2+ substâncias SEM reação química. Componentes conservam suas propriedades."},
  {id:"simples",   x:5, y:40,c:"#1976D2", s:"p",  l:"Subst. Simples",   i:"1 único elemento químico. Ex: O₂ (oxigênio), H₂ (hidrogênio), Fe (ferro puro)."},
  {id:"composta",  x:28,y:40,c:"#1976D2", s:"p",  l:"Subst. Composta",  i:"2+ elementos químicos. Ex: H₂O (água), NaCl (sal), CO₂ (gás carbônico)."},
  {id:"homo",      x:62,y:40,c:C.blue,    s:"p",  l:"Homogênea",        i:"1 fase — componentes indistinguíveis a olho nu. Ex: água+sal, ar atmosférico, ouro 18k."},
  {id:"hetero",    x:87,y:40,c:C.orange,  s:"p",  l:"Heterogênea",      i:"2+ fases visíveis. Ex: água+óleo (bifásica), água+óleo+areia (trifásica). Sangue e leite = heterogêneos coloidais."},
  {id:"soluto",    x:50,y:57,c:"#0277BD", s:"p",  l:"Soluto",           i:"Substância dissolvida. Ex: sal (em água+sal), pó de gelatina (em gelatina pronta)."},
  {id:"solvente",  x:68,y:57,c:"#0277BD", s:"p",  l:"Solvente",         i:"Substância que dissolve o soluto. ÁGUA = solvente universal."},
  {id:"bifas",     x:78,y:72,c:C.redDark, s:"mi", l:"Bifásica (2f.)",   i:"2 fases visíveis. Ex: água+óleo, água+areia, água+gelo."},
  {id:"trifas",    x:90,y:72,c:C.redDark, s:"mi", l:"Trifásica (3f.)",  i:"3 fases. Ex: água+óleo+areia, água+gelo+óleo."},
  {id:"polif",     x:84,y:83,c:"#6D4C41", s:"mi", l:"Polifásica (4+)",  i:"4+ fases. Ex: água+óleo+terra+gelo (PA1 Q1)."},
  {id:"fen",       x:18,y:57,c:"#6A1B9A", s:"m",  l:"Fenômenos",        i:"Modificações que ocorrem com a matéria. Podem ser físicos, químicos ou biológicos."},
  {id:"fisico",    x:5, y:74,c:"#7B1FA2", s:"p",  l:"Físico",           i:"NÃO altera composição química. Ex: gelo derretendo, chapinha no cabelo, latinha amassada, fusão, vaporização."},
  {id:"quimico",   x:19,y:74,c:"#7B1FA2", s:"p",  l:"Químico",          i:"ALTERA composição química → nova substância. Ex: bolo assado, queimar papel, escova progressiva, ferrugem."},
  {id:"bio",       x:33,y:74,c:"#7B1FA2", s:"p",  l:"Biológico",        i:"Em seres vivos — parte do desenvolvimento natural. Ex: metamorfose da borboleta, crescimento, cicatrização."},
];
const EDGES=[
  ["materia","spura"],["materia","mistura"],["materia","fen"],
  ["spura","simples"],["spura","composta"],
  ["mistura","homo"],["mistura","hetero"],
  ["homo","soluto"],["homo","solvente"],
  ["hetero","bifas"],["hetero","trifas"],["trifas","polif"],
  ["fen","fisico"],["fen","quimico"],["fen","bio"],
];

// ═══ COMPONENTS ═══════════════════════════════════════════════════════════════
function Beaker({layers=[],label=""}){
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
      <div style={{
        width:90,height:130,border:"3px solid #90A4AE",borderTop:"none",
        borderRadius:"0 0 18px 18px",background:"#fff",overflow:"hidden",
        position:"relative",boxShadow:"inset 2px 0 8px rgba(0,0,0,0.07)",
      }}>
        {layers.length===0
          ?<div style={{height:"100%",background:"#F5F7FA"}}/>
          :[...layers].reverse().map((color,i)=>(
            <div key={i} style={{height:`${100/layers.length}%`,background:color,transition:"all 0.6s ease",borderTop:i>0?"1px dashed rgba(0,0,0,0.1)":"none"}}/>
          ))
        }
        <div style={{position:"absolute",top:8,left:10,width:8,height:"70%",background:"rgba(255,255,255,0.4)",borderRadius:4}}/>
      </div>
      <span style={{fontSize:11,color:C.gray,fontWeight:600,textAlign:"center",maxWidth:110}}>{label||"Vazio"}</span>
    </div>
  );
}

function Chip({sub,selected,onClick}){
  const on=selected.includes(sub.id);
  return(
    <button onClick={()=>onClick(sub.id)} style={{
      padding:"7px 12px",borderRadius:24,
      border:`2px solid ${on?C.blue:"#CFD8DC"}`,
      background:on?C.blueLight:C.white,
      cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:13,
      color:on?C.blueDark:C.gray,
      display:"flex",alignItems:"center",gap:5,
      transition:"all 0.2s",
      boxShadow:on?`0 2px 8px rgba(21,101,192,0.2)`:"none",
    }}>
      <span>{sub.emoji}</span>{sub.label}
    </button>
  );
}

function LabCap1(){
  const [sel,setSel]=useState([]);
  const [res,setRes]=useState(null);
  function toggle(id){
    setRes(null);
    setSel(prev=>prev.includes(id)?prev.filter(x=>x!==id):prev.length>=4?prev:[...prev,id]);
  }
  function analisar(){
    const k=mkKey(sel);
    setRes(MIX[k]||{type:"indefinida",ph:"?",label:"",desc:"Combinação não mapeada. Inclua água como base e tente: água+óleo+areia, água+gelo+óleo, água+oleo+terra+gelo...",layers:["#ECEFF1"]});
  }
  const layers=res?res.layers:(sel.length>0?["#E3F2FD"]:[]);
  return(
    <div style={{display:"flex",flexDirection:"column",gap:20}}>
      <div style={{background:"linear-gradient(135deg,#E3F2FD,#BBDEFB)",borderRadius:16,padding:20,border:"1px solid #90CAF9"}}>
        <p style={{margin:"0 0 10px",fontWeight:700,color:C.blueDark,fontSize:14}}>
          🧪 Selecione substâncias (até 4) e clique em <strong>Analisar Mistura</strong>:
        </p>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {SUBS.map(s=><Chip key={s.id} sub={s} selected={sel} onClick={toggle}/>)}
        </div>
        <p style={{margin:"10px 0 0",fontSize:12,color:C.gray}}>
          💡 <strong>Dica P1:</strong> Teste água+óleo+terra+gelo para reproduzir a mistura polifásica da prova!
        </p>
      </div>
      <div style={{display:"flex",gap:24,alignItems:"flex-start",flexWrap:"wrap"}}>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10}}>
          <Beaker layers={layers} label={sel.length>0?sel.map(id=>SUBS.find(s=>s.id===id)?.label).join("+"):""}/>
          <div style={{display:"flex",gap:8}}>
            <button disabled={sel.length<2} onClick={analisar} style={{
              padding:"10px 20px",borderRadius:24,border:"none",
              background:sel.length<2?"#CFD8DC":`linear-gradient(135deg,${C.blue},${C.blueDark})`,
              color:"#fff",fontWeight:800,fontSize:13,
              cursor:sel.length<2?"not-allowed":"pointer",
              boxShadow:sel.length>=2?"0 4px 12px rgba(21,101,192,0.3)":"none",
            }}>🔬 Analisar</button>
            <button onClick={()=>{setSel([]);setRes(null);}} style={{
              padding:"10px 16px",borderRadius:24,border:"2px solid #CFD8DC",
              background:"#fff",color:C.gray,fontWeight:700,fontSize:13,cursor:"pointer",
            }}>🗑️ Limpar</button>
          </div>
        </div>
        {res&&(
          <div style={{
            flex:1,minWidth:220,
            background:res.type==="homogênea"?C.blueLight:res.type==="indefinida"?C.grayLight:C.orangeLight,
            border:`2px solid ${res.type==="homogênea"?C.blue:res.type==="indefinida"?"#B0BEC5":C.orange}`,
            borderRadius:16,padding:18,animation:"fadeIn 0.4s ease",
          }}>
            <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:10}}>
              <span style={{fontSize:28}}>{res.type==="homogênea"?"🔵":res.type==="indefinida"?"⚪":"🟠"}</span>
              <div>
                <div style={{fontWeight:800,fontSize:15,color:res.type==="homogênea"?C.blueDark:res.type==="indefinida"?C.gray:C.orange,textTransform:"uppercase"}}>
                  Mistura {res.type}
                </div>
                {res.type!=="indefinida"&&(
                  <div style={{fontSize:12,color:C.gray,fontWeight:600}}>
                    {res.ph} fase{res.ph>1?"s":""}  {res.label?`→ ${res.label}`:""}
                  </div>
                )}
              </div>
            </div>
            <p style={{margin:0,fontSize:13,color:"#37474F",lineHeight:1.6}}>{res.desc}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function QuizCap1(){
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
  function next(){if(cur+1>=QS.length){setDone(true);return;}setCur(c=>c+1);setCho(null);}
  function restart(){setCur(0);setCho(null);setScore(0);setDone(false);setHist([]);}
  if(done){
    const pct=Math.round((score/QS.length)*100);
    return(
      <div style={{textAlign:"center",padding:30}}>
        <div style={{fontSize:56}}>{pct>=80?"🏆":pct>=60?"📚":"💪"}</div>
        <div style={{fontSize:28,fontWeight:800,color:C.blueDark,marginTop:8}}>{score} / {QS.length} acertos</div>
        <div style={{margin:"16px auto",width:240,height:14,background:"#ECEFF1",borderRadius:8,overflow:"hidden"}}>
          <div style={{width:`${pct}%`,height:"100%",background:pct>=70?C.green:pct>=50?C.orange:C.red,borderRadius:8,transition:"width 1s ease"}}/>
        </div>
        <p style={{color:C.gray,fontWeight:600}}>
          {pct>=80?"Excelente! Você está pronto para a P1!":pct>=60?"Bom! Revise as questões marcadas em vermelho.":"Continue estudando! Use o laboratório e o mapa conceitual."}
        </p>
        <div style={{textAlign:"left",marginTop:16,display:"flex",flexDirection:"column",gap:6}}>
          {hist.map((h,i)=>(
            <div key={i} style={{
              padding:"7px 12px",borderRadius:8,fontSize:12,
              background:h.ok?C.greenLight:"#FFEBEE",
              border:`1px solid ${h.ok?C.green:C.red}`,
              color:h.ok?C.green:C.red,fontWeight:600,
            }}>
              {h.ok?"✅":"❌"} Q{h.q+1} [{QS[h.q].src}]: {QS[h.q].q.substring(0,55)}...
            </div>
          ))}
        </div>
        <button onClick={restart} style={{
          marginTop:20,padding:"12px 28px",borderRadius:24,border:"none",
          background:`linear-gradient(135deg,${C.blue},${C.blueDark})`,
          color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer",
          boxShadow:"0 4px 12px rgba(21,101,192,0.3)",
        }}>🔄 Tentar Novamente</button>
      </div>
    );
  }
  const q=QS[cur];
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:12,fontWeight:700,color:C.gray}}>{cur+1} / {QS.length}</span>
          <span style={{fontSize:10,padding:"2px 8px",borderRadius:20,background:C.blueLight,color:C.blueDark,fontWeight:700}}>{q.src}</span>
        </div>
        <span style={{fontSize:12,fontWeight:800,color:C.blue}}>✅ {score} acerto{score!==1?"s":""}</span>
      </div>
      <div style={{height:6,background:"#ECEFF1",borderRadius:4,marginBottom:18,overflow:"hidden"}}>
        <div style={{height:"100%",borderRadius:4,width:`${(cur/QS.length)*100}%`,background:`linear-gradient(90deg,${C.blue},${C.red})`,transition:"width 0.4s ease"}}/>
      </div>
      <div style={{background:C.blueLight,borderRadius:14,padding:18,border:"1px solid #90CAF9",marginBottom:16}}>
        <p style={{margin:0,fontWeight:700,fontSize:15,color:C.blueDark,lineHeight:1.55}}>{q.q}</p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {q.opts.map((opt,i)=>{
          let bg=C.white,bord="#CFD8DC",col="#37474F";
          if(cho!==null){
            if(i===q.ans){bg=C.greenLight;bord=C.green;col=C.green;}
            else if(i===cho&&cho!==q.ans){bg="#FFEBEE";bord=C.red;col=C.red;}
          }
          return(
            <button key={i} onClick={()=>choose(i)} style={{
              padding:"12px 16px",borderRadius:12,border:`2px solid ${bord}`,
              background:bg,cursor:cho!==null?"default":"pointer",
              textAlign:"left",fontFamily:"inherit",fontWeight:600,fontSize:14,color:col,
              transition:"all 0.2s",display:"flex",alignItems:"center",gap:10,
            }}>
              <span style={{
                width:24,height:24,borderRadius:"50%",border:`2px solid ${bord}`,
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:11,fontWeight:800,flexShrink:0,
                background:cho!==null&&(i===q.ans||i===cho)?(i===q.ans?C.green:C.red):"transparent",
                color:cho!==null&&(i===q.ans||i===cho)?"#fff":col,
              }}>{String.fromCharCode(65+i)}</span>
              {opt}
            </button>
          );
        })}
      </div>
      {cho!==null&&(
        <div style={{
          marginTop:14,padding:14,borderRadius:12,
          background:cho===q.ans?C.greenLight:"#FFF8E1",
          border:`1px solid ${cho===q.ans?C.green:"#FFB300"}`,
          animation:"fadeIn 0.3s ease",
        }}>
          <span style={{fontWeight:700,color:cho===q.ans?C.green:C.orange}}>
            {cho===q.ans?"✅ Correto! ":"❌ Incorreto. "}
          </span>
          <span style={{fontSize:13,color:"#37474F"}}>{q.fb}</span>
          <div style={{marginTop:10,textAlign:"right"}}>
            <button onClick={next} style={{
              padding:"8px 22px",borderRadius:20,border:"none",
              background:`linear-gradient(135deg,${C.blue},${C.blueDark})`,
              color:"#fff",fontWeight:800,fontSize:13,cursor:"pointer",
            }}>{cur+1>=QS.length?"Ver Resultado →":"Próxima →"}</button>
          </div>
        </div>
      )}
    </div>
  );
}

function DiscursivaCap1(){
  const [ans,setAns]=useState(DS.map(()=>""));
  const [shown,setShown]=useState(DS.map(()=>false));
  return(
    <div style={{display:"flex",flexDirection:"column",gap:24}}>
      {DS.map((d,i)=>(
        <div key={i} style={{background:C.white,borderRadius:16,padding:20,border:"1px solid #CFD8DC",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <span style={{fontSize:10,padding:"2px 10px",borderRadius:20,background:C.redLight,color:C.red,fontWeight:700}}>{d.src}</span>
          </div>
          <div style={{background:C.redLight,borderRadius:10,padding:14,border:"1px solid #EF9A9A",marginBottom:14}}>
            <p style={{margin:0,fontWeight:700,color:C.redDark,fontSize:14,lineHeight:1.5}}>✍️ Questão {i+1}: {d.q}</p>
          </div>
          <textarea
            value={ans[i]}
            onChange={e=>setAns(prev=>prev.map((v,j)=>j===i?e.target.value:v))}
            placeholder="Escreva sua resposta aqui..."
            style={{width:"100%",minHeight:110,padding:12,borderRadius:10,border:"2px solid #CFD8DC",fontFamily:"inherit",fontSize:13,color:"#37474F",resize:"vertical",outline:"none",lineHeight:1.6,boxSizing:"border-box"}}
          />
          <div style={{marginTop:10,display:"flex",justifyContent:"flex-end"}}>
            <button disabled={ans[i].trim().length<10}
              onClick={()=>setShown(prev=>prev.map((v,j)=>j===i?true:v))}
              style={{
                padding:"9px 20px",borderRadius:20,border:"none",
                background:ans[i].trim().length<10?"#CFD8DC":`linear-gradient(135deg,${C.red},${C.redDark})`,
                color:"#fff",fontWeight:800,fontSize:13,
                cursor:ans[i].trim().length<10?"not-allowed":"pointer",
              }}>Ver Resposta Modelo</button>
          </div>
          {shown[i]&&(
            <div style={{marginTop:14,padding:16,borderRadius:12,background:C.greenLight,border:`1px solid ${C.green}`,animation:"fadeIn 0.4s ease"}}>
              <div style={{fontWeight:800,color:C.green,fontSize:13,marginBottom:8}}>📝 Resposta Modelo:</div>
              <pre style={{margin:0,fontFamily:"inherit",fontSize:13,color:"#37474F",whiteSpace:"pre-wrap",lineHeight:1.7}}>{d.mod}</pre>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function MapaCap1(){
  const [act,setAct]=useState(null);
  const node=act?NODES.find(n=>n.id===act):null;
  const R={g:4.5,m:3.5,p:3,mi:2.2};
  const F={g:1.15,m:1.0,p:0.9,mi:0.75};
  return(
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <p style={{margin:0,fontSize:13,color:C.gray,fontWeight:600}}>💡 Clique em qualquer nó para ver a definição e exemplos do cotidiano.</p>
      <div style={{background:"linear-gradient(135deg,#F5F7FA,#E3F2FD)",borderRadius:16,overflow:"hidden",border:"1px solid #90CAF9"}}>
        <svg viewBox="0 0 100 92" style={{width:"100%",height:"auto",minHeight:260}}>
          {EDGES.map(([a,b],i)=>{
            const na=NODES.find(n=>n.id===a);const nb=NODES.find(n=>n.id===b);
            return<line key={i} x1={na.x} y1={na.y+R[na.s]} x2={nb.x} y2={nb.y-R[nb.s]} stroke="#B0BEC5" strokeWidth="0.4" strokeDasharray="1.2,0.8"/>;
          })}
          {NODES.map(n=>{
            const r=R[n.s];const fs=F[n.s];const on=act===n.id;
            const words=n.l.split(" ");
            return(
              <g key={n.id} onClick={()=>setAct(act===n.id?null:n.id)} style={{cursor:"pointer"}}>
                <circle cx={n.x} cy={n.y} r={r} fill={on?n.c:n.c+"22"} stroke={n.c} strokeWidth={on?"0.7":"0.4"} style={{transition:"all 0.2s"}}/>
                {words.length===1
                  ?<text x={n.x} y={n.y+0.4} textAnchor="middle" dominantBaseline="middle" fontSize={fs*0.88} fontWeight={on?"800":"600"} fill={on?"#fff":n.c} style={{userSelect:"none"}}>{n.l}</text>
                  :words.map((w,wi)=>(
                    <text key={wi} x={n.x} y={n.y-(words.length-1)*fs*0.44+wi*fs*0.88} textAnchor="middle" dominantBaseline="middle" fontSize={fs*0.82} fontWeight={on?"800":"600"} fill={on?"#fff":n.c} style={{userSelect:"none"}}>{w}</text>
                  ))
                }
              </g>
            );
          })}
        </svg>
      </div>
      {node&&(
        <div style={{background:C.white,borderRadius:14,padding:16,border:`2px solid ${node.c}`,animation:"fadeIn 0.3s ease",boxShadow:`0 4px 16px ${node.c}33`}}>
          <div style={{fontWeight:800,color:node.c,fontSize:15,marginBottom:6}}>📌 {node.l}</div>
          <p style={{margin:0,fontSize:13,color:"#37474F",lineHeight:1.6}}>{node.i}</p>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// CAPÍTULO 2 — TRANSFORMAÇÕES QUÍMICAS (pp. 21–30)
// ══════════════════════════════════════════════════════════════════════════════

const FENOMENOS=[
  {id:"amassar",    label:"Amassar latinha",   emoji:"🥤", tipo:"físico",    cor:C.blue,   desc:"A forma do alumínio muda, mas a composição química permanece Al (alumínio). Reversível com força. → Fenômeno FÍSICO."},
  {id:"gelo",       label:"Gelo derretendo",   emoji:"🧊", tipo:"físico",    cor:C.blue,   desc:"H₂O muda de estado sólido para líquido (fusão). A substância é a mesma — só mudou o estado físico. → Fenômeno FÍSICO."},
  {id:"chapinha",   label:"Chapinha no cabelo",emoji:"💇", tipo:"físico",    cor:C.blue,   desc:"O calor da prancha muda a forma do fio temporariamente (altera ligações físicas de hidrogênio). O fio continua sendo fio de cabelo. → Fenômeno FÍSICO. (PA1 Q14)"},
  {id:"vapor",      label:"Água evaporando",   emoji:"♨️", tipo:"físico",    cor:C.blue,   desc:"H₂O muda de líquido para vapor (vaporização). Mesma substância, diferente estado físico. → Fenômeno FÍSICO."},
  {id:"dissolve",   label:"Sal na água",       emoji:"🧂", tipo:"físico",    cor:C.blue,   desc:"O sal se dissolve mas não reage — pode ser recuperado por evaporação. → Fenômeno FÍSICO (dissolução)."},
  {id:"ferrugem",   label:"Ferrugem",          emoji:"🔩", tipo:"químico",   cor:C.red,    desc:"Fe + O₂ → Fe₂O₃ (óxido de ferro). Nova substância formada, irreversível. Evidência: mudança de cor (marrom). → Fenômeno QUÍMICO."},
  {id:"bolo",       label:"Bolo assando",      emoji:"🎂", tipo:"químico",   cor:C.red,    desc:"Farinha + ovos + leite + calor → bolo (novas substâncias). Irreversível — não é possível 'desassar'. → Fenômeno QUÍMICO."},
  {id:"fosforo",    label:"Fósforo queimando", emoji:"🔥", tipo:"químico",   cor:C.red,    desc:"Madeira + O₂ → CO₂ + H₂O + cinzas. Nova substância formada, liberação de luz e calor. → Fenômeno QUÍMICO."},
  {id:"escova",     label:"Escova progressiva",emoji:"💆", tipo:"químico",   cor:C.red,    desc:"Produtos químicos quebram e reorganizam as ligações dissulfeto das proteínas do cabelo (queratina). Nova estrutura formada, duradoura. → Fenômeno QUÍMICO. (PA1 Q14)"},
  {id:"agua_oxig",  label:"Água oxigenada",    emoji:"🩹", tipo:"químico",   cor:C.red,    desc:"H₂O₂ → H₂O + O₂ (gás). A espuma branca na ferida é gás oxigênio sendo liberado — evidência de reação química. → Fenômeno QUÍMICO."},
  {id:"borboleta",  label:"Metamorfose",       emoji:"🦋", tipo:"biológico", cor:C.green,  desc:"Lagarta → crisálida → borboleta. Processo de desenvolvimento natural do ser vivo, programado geneticamente. → Fenômeno BIOLÓGICO. (PA1 Q6)"},
  {id:"sapo",       label:"Metamorfose do sapo",emoji:"🐸",tipo:"biológico", cor:C.green,  desc:"Girino (aquático, com brânquias) → sapo adulto (terrestre, com pulmões). Transformação biológica natural. → Fenômeno BIOLÓGICO."},
  {id:"crescimento",label:"Crescimento humano",emoji:"👶", tipo:"biológico", cor:C.green,  desc:"Bebê → criança → adulto. Processo de desenvolvimento natural do organismo ao longo do tempo. → Fenômeno BIOLÓGICO."},
  {id:"cicatriz",   label:"Cicatrização",      emoji:"🩺", tipo:"biológico", cor:C.green,  desc:"O corpo regenera tecidos danificados — processo biológico natural do organismo vivo. → Fenômeno BIOLÓGICO."},
  {id:"digestao",   label:"Digestão",          emoji:"🍎", tipo:"biológico", cor:C.green,  desc:"Enzimas do corpo quebram os alimentos em nutrientes. Processo biológico natural que ocorre em todos os seres vivos. → Fenômeno BIOLÓGICO."},
];

function LabCap2(){
  const [sel,setSel]=useState(null);
  const f=sel?FENOMENOS.find(x=>x.id===sel):null;
  const corTipo={físico:C.blue,químico:C.red,biológico:C.green};
  const bgTipo={físico:C.blueLight,químico:C.redLight,biológico:C.greenLight};
  const icone={físico:"⚗️",químico:"🔥",biológico:"🌱"};
  return(
    <div>
      <div style={{background:"linear-gradient(135deg,#E8EAF6,#C5CAE9)",borderRadius:14,padding:"12px 16px",marginBottom:16,border:"1px solid #9FA8DA"}}>
        <div style={{fontWeight:800,color:"#283593",fontSize:13}}>🔬 Laboratório de Fenômenos</div>
        <div style={{fontSize:12,color:"#3949AB",marginTop:2}}>Clique em um fenômeno para classificá-lo e entender o porquê.</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:10,marginBottom:16}}>
        {FENOMENOS.map(fn=>(
          <button key={fn.id} onClick={()=>setSel(sel===fn.id?null:fn.id)} style={{
            padding:"12px 8px",borderRadius:12,border:`2px solid ${sel===fn.id?fn.cor:"#E0E0E0"}`,
            background:sel===fn.id?fn.cor:C.white,
            cursor:"pointer",fontFamily:"inherit",textAlign:"center",
            transition:"all 0.2s",
            boxShadow:sel===fn.id?`0 4px 12px ${fn.cor}44`:"none",
          }}>
            <div style={{fontSize:26,marginBottom:4}}>{fn.emoji}</div>
            <div style={{fontSize:11,fontWeight:700,color:sel===fn.id?"#fff":fn.cor,lineHeight:1.3}}>{fn.label}</div>
            {sel!==fn.id&&<div style={{
              marginTop:4,fontSize:9,fontWeight:800,
              padding:"2px 6px",borderRadius:10,
              background:bgTipo[fn.tipo],color:corTipo[fn.tipo],display:"inline-block"
            }}>{fn.tipo.toUpperCase()}</div>}
          </button>
        ))}
      </div>
      {f&&(
        <div style={{background:bgTipo[f.tipo],borderRadius:14,padding:18,border:`2px solid ${f.cor}`,animation:"fadeIn 0.3s ease"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
            <span style={{fontSize:28}}>{f.emoji}</span>
            <div>
              <div style={{fontWeight:800,fontSize:16,color:f.cor}}>{f.label}</div>
              <div style={{
                display:"inline-flex",alignItems:"center",gap:4,
                background:f.cor,color:"#fff",borderRadius:20,
                padding:"3px 12px",fontSize:11,fontWeight:800,marginTop:4,
              }}>{icone[f.tipo]} Fenômeno {f.tipo.toUpperCase()}</div>
            </div>
          </div>
          <p style={{margin:0,fontSize:13,color:"#212121",lineHeight:1.65}}>{f.desc}</p>
        </div>
      )}
      {!f&&(
        <div style={{textAlign:"center",padding:24,color:C.gray,fontSize:13}}>
          ☝️ Selecione um fenômeno acima para ver a classificação e explicação
        </div>
      )}
    </div>
  );
}

const QS2=[
  {src:"PA1 Q6", q:"A metamorfose de uma borboleta (lagarta → crisálida → borboleta adulta) é um exemplo de:", opts:["Fenômeno físico, pois a massa do inseto não muda","Fenômeno químico, pois novas substâncias são formadas","Fenômeno biológico, pois é o desenvolvimento natural do ser vivo","Fenômeno físico, pois é reversível"], ans:2, fb:"A metamorfose é um processo biológico — faz parte do ciclo de vida natural da borboleta, programado geneticamente. Não é físico (irreversível) nem simplesmente químico (é um processo de desenvolvimento)."},
  {src:"PA1 Q10",q:"Uma tirinha mostra gelo derretendo e depois evaporando. Qual é a classificação correta desses fenômenos?", opts:["Químico e biológico","Físico e químico","Físico e físico","Químico e químico"], ans:2, fb:"Fusão (gelo → água) e vaporização (água → vapor) são mudanças de estado físico — a substância H₂O permanece a mesma em ambos. Os dois são FÍSICOS."},
  {src:"PA1 Q14 A",q:"Passar a chapinha no cabelo é classificado como fenômeno:", opts:["Químico, pois altera permanentemente o cabelo","Físico, pois muda a forma sem alterar a composição química do fio","Biológico, pois ocorre em ser vivo","Químico, pois usa calor"], ans:1, fb:"A chapinha/prancha altera as ligações físicas (pontes de hidrogênio) dos fios temporariamente — a composição química da queratina não muda. É um fenômeno FÍSICO."},
  {src:"PA1 Q14 B",q:"A escova progressiva aplicada nos cabelos é classificada como fenômeno:", opts:["Físico, pois usa calor","Biológico, pois ocorre no cabelo humano","Químico, pois altera as ligações químicas das proteínas do cabelo","Físico, pois é realizada por um profissional"], ans:2, fb:"A escova progressiva usa substâncias químicas (formol, tioglicolato) que quebram e reorganizam as ligações dissulfeto da queratina — nova estrutura proteica formada. É um fenômeno QUÍMICO."},
  {src:"Cap. 2",  q:"Ao queimar um fósforo, observamos chama, fumaça e cinzas. Isso indica:", opts:["Fenômeno físico reversível","Fenômeno químico com formação de novas substâncias","Fenômeno biológico nos seres vivos","Fenômeno físico por mudança de estado"], ans:1, fb:"Evidências de reação química: chama (liberação de energia), fumaça (gases como CO₂ e H₂O) e cinzas (resíduo sólido). Novo material formado, irreversível. → Fenômeno QUÍMICO."},
  {src:"Cap. 2",  q:"Assinale a alternativa que contém APENAS fenômenos físicos:", opts:["Ferrugem, bolo assando, fósforo queimando","Gelo derretendo, água evaporando, latinha amassada","Metamorfose, crescimento, cicatrização","Ferrugem, gelo derretendo, digestão"], ans:1, fb:"Gelo derretendo (fusão), água evaporando (vaporização) e latinha amassada (deformação) são todos fenômenos físicos — a composição química não muda em nenhum deles."},
  {src:"Cap. 2",  q:"A formação de ferrugem no ferro é um fenômeno químico porque:", opts:["O ferro muda de cor apenas","Uma nova substância (óxido de ferro) é formada de forma irreversível","O processo é reversível com lixa","O ferro muda de tamanho"], ans:1, fb:"Fe + O₂ → Fe₂O₃ (óxido de ferro). Nova substância com propriedades diferentes é formada, e o processo é irreversível (evidência: mudança de cor para marrom/laranja)."},
  {src:"Cap. 2",  q:"A equação: REAGENTES → PRODUTOS representa:", opts:["Uma mistura homogênea","Uma separação de misturas","Uma transformação química","Uma transformação física"], ans:2, fb:"REAGENTES → PRODUTOS é a representação de uma transformação química, onde os materiais iniciais (reagentes) formam novos materiais (produtos) com composição química diferente."},
  {src:"Cap. 2",  q:"A cicatrização de uma ferida é um fenômeno:", opts:["Físico, pois muda apenas a aparência da pele","Químico, pois forma novas células","Biológico, pois é o processo natural de regeneração do organismo vivo","Químico e físico ao mesmo tempo"], ans:2, fb:"A cicatrização é um processo biológico — faz parte do sistema de defesa e regeneração natural do organismo vivo, não sendo classificada como simplesmente física ou química."},
  {src:"Cap. 2",  q:"Ao acrescentar água oxigenada (H₂O₂) em uma ferida, observamos efervescência (borbulhas). Isso indica:", opts:["Fenômeno físico — a água oxigenada está evaporando","Fenômeno químico — H₂O₂ se decompõe em H₂O e O₂ (gás)","Fenômeno biológico — o sangue reage com o ar","Fenômeno físico — mudança de estado líquido para gasoso"], ans:1, fb:"H₂O₂ → H₂O + O₂. As bolhas são gás oxigênio sendo liberado — nova substância formada. Evidência clara de transformação QUÍMICA."},
];

function QuizCap2(){
  const [cur,setCur]=useState(0);const [cho,setCho]=useState(null);
  const [score,setScore]=useState(0);const [done,setDone]=useState(false);const [hist,setHist]=useState([]);
  function choose(i){if(cho!==null)return;setCho(i);if(i===QS2[cur].ans)setScore(s=>s+1);setHist(h=>[...h,{q:cur,ok:i===QS2[cur].ans}]);}
  function next(){if(cur+1>=QS2.length){setDone(true);return;}setCur(c=>c+1);setCho(null);}
  function restart(){setCur(0);setCho(null);setScore(0);setDone(false);setHist([]);}
  if(done){
    const pct=Math.round(score/QS2.length*100);
    return(
      <div style={{textAlign:"center",padding:20}}>
        <div style={{fontSize:48,marginBottom:10}}>{pct>=80?"🏆":pct>=60?"👍":"📚"}</div>
        <div style={{fontSize:26,fontWeight:900,color:pct>=80?C.green:pct>=60?C.blue:C.red,marginBottom:4}}>{score}/{QS2.length}</div>
        <div style={{fontSize:14,color:C.gray,marginBottom:16}}>{pct>=80?"Excelente! Dominou as transformações!":pct>=60?"Bom! Revise os conceitos marcados.":"Continue estudando! Revise a teoria e tente novamente."}</div>
        {hist.map((h,i)=>(
          <div key={i} style={{textAlign:"left",padding:"6px 12px",borderRadius:8,marginBottom:4,background:h.ok?C.greenLight:"#FFEBEE",color:h.ok?C.green:C.red,fontWeight:600,fontSize:12}}>
            {h.ok?"✅":"❌"} Q{h.q+1} [{QS2[h.q].src}]: {QS2[h.q].q.substring(0,55)}...
          </div>
        ))}
        <button onClick={restart} style={{marginTop:16,padding:"12px 28px",borderRadius:24,border:"none",background:`linear-gradient(135deg,${C.blue},${C.blueDark})`,color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer"}}>🔄 Tentar Novamente</button>
      </div>
    );
  }
  const q=QS2[cur];
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:12,fontWeight:700,color:C.gray}}>{cur+1} / {QS2.length}</span>
          <span style={{fontSize:10,padding:"2px 8px",borderRadius:20,background:C.blueLight,color:C.blueDark,fontWeight:700}}>{q.src}</span>
        </div>
        <span style={{fontSize:12,fontWeight:800,color:C.blue}}>✅ {score} acerto{score!==1?"s":""}</span>
      </div>
      <div style={{height:6,background:"#ECEFF1",borderRadius:4,marginBottom:18,overflow:"hidden"}}>
        <div style={{height:"100%",borderRadius:4,width:`${(cur/QS2.length)*100}%`,background:`linear-gradient(90deg,${C.blue},${C.red})`,transition:"width 0.4s ease"}}/>
      </div>
      <div style={{background:C.blueLight,borderRadius:14,padding:18,border:"1px solid #90CAF9",marginBottom:16}}>
        <p style={{margin:0,fontWeight:700,fontSize:15,color:C.blueDark,lineHeight:1.55}}>{q.q}</p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {q.opts.map((opt,i)=>{
          let bg=C.white,bord="#CFD8DC",col="#37474F";
          if(cho!==null){if(i===q.ans){bg=C.greenLight;bord=C.green;col=C.green;}else if(i===cho&&cho!==q.ans){bg="#FFEBEE";bord=C.red;col=C.red;}}
          return(
            <button key={i} onClick={()=>choose(i)} style={{padding:"12px 16px",borderRadius:12,border:`2px solid ${bord}`,background:bg,cursor:cho!==null?"default":"pointer",textAlign:"left",fontFamily:"inherit",fontWeight:600,fontSize:14,color:col,transition:"all 0.2s",display:"flex",alignItems:"center",gap:10}}>
              <span style={{width:24,height:24,borderRadius:"50%",border:`2px solid ${bord}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,flexShrink:0,background:cho!==null&&(i===q.ans||i===cho)?(i===q.ans?C.green:C.red):"transparent",color:cho!==null&&(i===q.ans||i===cho)?"#fff":col}}>{String.fromCharCode(65+i)}</span>
              {opt}
            </button>
          );
        })}
      </div>
      {cho!==null&&(
        <div style={{marginTop:14,padding:14,borderRadius:12,background:cho===q.ans?C.greenLight:"#FFF8E1",border:`1px solid ${cho===q.ans?C.green:"#FFB300"}`,animation:"fadeIn 0.3s ease"}}>
          <span style={{fontWeight:700,color:cho===q.ans?C.green:C.orange}}>{cho===q.ans?"✅ Correto! ":"❌ Incorreto. "}</span>
          <span style={{fontSize:13,color:"#37474F"}}>{q.fb}</span>
          <div style={{marginTop:10,textAlign:"right"}}>
            <button onClick={next} style={{padding:"8px 22px",borderRadius:20,border:"none",background:`linear-gradient(135deg,${C.blue},${C.blueDark})`,color:"#fff",fontWeight:800,fontSize:13,cursor:"pointer"}}>{cur+1>=QS2.length?"Ver Resultado →":"Próxima →"}</button>
          </div>
        </div>
      )}
    </div>
  );
}

const DS2=[
  {src:"PA1 Q14",q:"Explique a diferença entre passar chapinha e fazer escova progressiva no cabelo, classificando cada processo como fenômeno físico ou químico. Justifique sua resposta.",modelo:"A chapinha/prancha é um fenômeno FÍSICO: o calor altera temporariamente as ligações físicas (pontes de hidrogênio) entre as moléculas de queratina, mudando a forma do fio. Quando o cabelo umedece, volta à forma anterior — é reversível. A escova progressiva é um fenômeno QUÍMICO: substâncias como o formol ou tioglicolato quebram e reorganizam as ligações dissulfeto (S-S) das proteínas do cabelo, formando uma nova estrutura química permanente. É irreversível — o efeito dura meses até o cabelo crescer."},
  {src:"Cap. 2", q:"Cite três evidências que indicam que uma transformação química ocorreu. Para cada evidência, dê um exemplo do cotidiano.",modelo:"1. Mudança de cor: a ferrugem transforma o ferro cinza em óxido de ferro marrom-alaranjado. 2. Liberação de gás (efervescência): ao acrescentar água oxigenada em uma ferida, formam-se bolhas de gás oxigênio. 3. Liberação de calor e luz: ao queimar um fósforo, ocorre chama visível e liberação de calor. Outras evidências: formação de precipitado (sólido em solução), odor diferente, formação de fumaça."},
  {src:"Cap. 2", q:"Classifique cada fenômeno abaixo em físico, químico ou biológico e justifique: (a) bolo assando no forno; (b) água congelando; (c) girino se transformando em sapo.",modelo:"(a) Bolo assando → QUÍMICO: ingredientes (farinha, ovos, fermento) reagem com o calor formando novas substâncias. Irreversível — não é possível 'desassar' o bolo. (b) Água congelando → FÍSICO: H₂O muda de estado líquido para sólido (solidificação), mas continua sendo H₂O. Reversível — derrete com calor. (c) Girino → sapo → BIOLÓGICO: a metamorfose é o desenvolvimento natural do ser vivo, programado geneticamente no ciclo de vida do anfíbio."},
];

function DiscursivaCap2(){
  const [ans,setAns]=useState({});const [show,setShow]=useState({});
  return(
    <div style={{display:"flex",flexDirection:"column",gap:20}}>
      {DS2.map((d,i)=>(
        <div key={i} style={{background:C.white,borderRadius:14,border:"1px solid #E0E0E0",overflow:"hidden"}}>
          <div style={{background:`linear-gradient(135deg,${C.blue},${C.blueDark})`,padding:"12px 16px",display:"flex",alignItems:"center",gap:10}}>
            <span style={{background:"rgba(255,255,255,0.2)",borderRadius:20,padding:"2px 10px",color:"#fff",fontSize:11,fontWeight:800}}>{d.src}</span>
            <span style={{color:"rgba(255,255,255,0.8)",fontSize:11,fontWeight:600}}>Questão {i+1} de {DS2.length}</span>
          </div>
          <div style={{padding:16}}>
            <p style={{margin:"0 0 12px",fontWeight:700,fontSize:14,color:C.blueDark,lineHeight:1.6}}>{d.q}</p>
            <textarea value={ans[i]||""} onChange={e=>setAns(a=>({...a,[i]:e.target.value}))} placeholder="Digite sua resposta aqui..." rows={4} style={{width:"100%",padding:12,borderRadius:10,border:"2px solid #E0E0E0",fontFamily:"inherit",fontSize:13,resize:"vertical",outline:"none"}}/>
            <div style={{display:"flex",justifyContent:"flex-end",marginTop:10}}>
              <button onClick={()=>setShow(s=>({...s,[i]:!s[i]}))} style={{padding:"8px 20px",borderRadius:20,border:"none",background:show[i]?C.orange:`linear-gradient(135deg,${C.green},${"#1B5E20"})`,color:"#fff",fontWeight:800,fontSize:12,cursor:"pointer"}}>
                {show[i]?"🙈 Ocultar Resposta":"✅ Ver Resposta Modelo"}
              </button>
            </div>
            {show[i]&&(
              <div style={{marginTop:12,background:C.greenLight,borderRadius:10,padding:14,border:`1px solid ${C.green}`,animation:"fadeIn 0.3s ease"}}>
                <div style={{fontWeight:800,color:C.green,fontSize:12,marginBottom:6}}>📝 Resposta Modelo:</div>
                <p style={{margin:0,fontSize:13,color:"#212121",lineHeight:1.65}}>{d.modelo}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

const NODES2=[
  {id:"trans",   x:50,y:8,  s:"g",l:"Transformações",         c:C.blueDark,i:"Toda mudança que a matéria sofre. Pode ser física, química ou biológica."},
  {id:"fisico",  x:20,y:26, s:"m",l:"Físico",                  c:C.blue,    i:"Não altera a composição química. Geralmente reversível. Ex: gelo derretendo, latinha amassada."},
  {id:"quimico", x:50,y:26, s:"m",l:"Químico",                 c:C.red,     i:"Altera a composição — forma novas substâncias. Geralmente irreversível. Ex: ferrugem, bolo."},
  {id:"biologico",x:80,y:26,s:"m",l:"Biológico",               c:C.green,   i:"Ocorre em seres vivos como parte do desenvolvimento natural. Ex: metamorfose, crescimento."},
  {id:"reag",    x:50,y:44, s:"p",l:"Reagentes → Produtos",    c:C.red,     i:"Equação da transformação química: os reagentes (materiais iniciais) formam os produtos (materiais finais com nova composição)."},
  {id:"evidencias",x:50,y:60,s:"p",l:"Evidências",             c:C.redDark, i:"Indicam que houve reação química: mudança de cor, gás, precipitado, calor/luz, odor."},
  {id:"fgelo",   x:10,y:42, s:"mi",l:"Fusão/Vaporização",     c:C.blue,    i:"Mudanças de estado físico: sólido→líquido (fusão), líquido→vapor (vaporização). Mesma substância."},
  {id:"fchap",   x:20,y:56, s:"mi",l:"Chapinha",               c:C.blue,    i:"Fenômeno físico: altera a forma do fio temporariamente sem mudar a composição da queratina."},
  {id:"ferrugem",x:38,y:72, s:"mi",l:"Ferrugem",               c:C.red,     i:"Fe + O₂ → Fe₂O₃. Fenômeno químico: nova substância formada (óxido de ferro), irreversível."},
  {id:"bolo2",   x:62,y:72, s:"mi",l:"Bolo",                   c:C.red,     i:"Fenômeno químico: ingredientes reagem com o calor formando novas substâncias. Irreversível."},
  {id:"escova2", x:80,y:56, s:"mi",l:"Escova",                 c:C.red,     i:"Escova progressiva: fenômeno químico — quebra e reorganiza ligações dissulfeto da queratina."},
  {id:"metamorf",x:76,y:42, s:"mi",l:"Metamorfose",            c:C.green,   i:"Larva → adulto. Fenômeno biológico: desenvolvimento natural programado geneticamente."},
  {id:"cresc2",  x:90,y:56, s:"mi",l:"Crescimento",            c:C.green,   i:"Bebê → adulto. Fenômeno biológico natural do organismo ao longo do tempo."},
];
const EDGES2=[["trans","fisico"],["trans","quimico"],["trans","biologico"],["quimico","reag"],["reag","evidencias"],["fisico","fgelo"],["fisico","fchap"],["quimico","ferrugem"],["quimico","bolo2"],["quimico","escova2"],["biologico","metamorf"],["biologico","cresc2"]];

function MapaCap2(){
  const [act,setAct]=useState(null);
  const node=act?NODES2.find(n=>n.id===act):null;
  const R={g:5,m:4,p:3.2,mi:2.4};const F={g:1.1,m:0.95,p:0.85,mi:0.72};
  return(
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <p style={{margin:0,fontSize:13,color:C.gray,fontWeight:600}}>💡 Clique em qualquer nó para ver definição e exemplos.</p>
      <div style={{background:"linear-gradient(135deg,#FFF3E0,#FFE0B2)",borderRadius:16,overflow:"hidden",border:"1px solid #FFCC80"}}>
        <svg viewBox="0 0 100 82" style={{width:"100%",height:"auto",minHeight:260}}>
          {EDGES2.map(([a,b],i)=>{const na=NODES2.find(n=>n.id===a);const nb=NODES2.find(n=>n.id===b);return<line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="#B0BEC5" strokeWidth="0.4" strokeDasharray="1.2,0.8"/>;})}
          {NODES2.map(n=>{const r=R[n.s];const fs=F[n.s];const on=act===n.id;const words=n.l.split(" ");return(
            <g key={n.id} onClick={()=>setAct(act===n.id?null:n.id)} style={{cursor:"pointer"}}>
              <circle cx={n.x} cy={n.y} r={r} fill={on?n.c:n.c+"22"} stroke={n.c} strokeWidth={on?"0.7":"0.4"} style={{transition:"all 0.2s"}}/>
              {words.length===1?<text x={n.x} y={n.y+0.4} textAnchor="middle" dominantBaseline="middle" fontSize={fs*0.88} fontWeight={on?"800":"600"} fill={on?"#fff":n.c} style={{userSelect:"none"}}>{n.l}</text>:words.map((w,wi)=>(<text key={wi} x={n.x} y={n.y-(words.length-1)*fs*0.44+wi*fs*0.88} textAnchor="middle" dominantBaseline="middle" fontSize={fs*0.82} fontWeight={on?"800":"600"} fill={on?"#fff":n.c} style={{userSelect:"none"}}>{w}</text>))}
            </g>
          );})}
        </svg>
      </div>
      {node&&(<div style={{background:C.white,borderRadius:14,padding:16,border:`2px solid ${node.c}`,animation:"fadeIn 0.3s ease",boxShadow:`0 4px 16px ${node.c}33`}}><div style={{fontWeight:800,color:node.c,fontSize:15,marginBottom:6}}>📌 {node.l}</div><p style={{margin:0,fontSize:13,color:"#37474F",lineHeight:1.6}}>{node.i}</p></div>)}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// CAPÍTULO 3 — SEPARAÇÃO DE MISTURAS (pp. 31–41)
// ══════════════════════════════════════════════════════════════════════════════

const METODOS=[
  {id:"catacao",     label:"Catação",              emoji:"✋", tipo:"sólido-sólido",  cor:"#5D4037", desc:"Separação manual de componentes sólidos visíveis com diferentes tamanhos/aparências. Simples, mas lenta.", ex:"Retirar pedras do feijão antes de cozinhar.", pagina:"p. 31"},
  {id:"tamisacao",   label:"Tamisação",             emoji:"⬜", tipo:"sólido-sólido",  cor:"#795548", desc:"Peneira com furos de tamanho definido separa sólidos por granulometria. Rápida e eficiente para sólidos.", ex:"Peneirar farinha de trigo, coar feijoada (PA1 Q2).", pagina:"p. 32"},
  {id:"ventilacao",  label:"Ventilação",            emoji:"💨", tipo:"sólido-sólido",  cor:"#0288D1", desc:"Corrente de ar separa materiais por diferença de densidade: leves são carregados, pesados ficam.", ex:"Separar cascas de alho (PA1 Q11), joeirar trigo.", pagina:"p. 32"},
  {id:"levigacao",   label:"Levigação",             emoji:"🌊", tipo:"sólido-sólido",  cor:"#0277BD", desc:"Água em movimento (corrente) separa sólidos por densidade: leves são arrastados, pesados ficam.", ex:"Garimpo: separar ouro (pesado) da areia (leve).", pagina:"p. 33"},
  {id:"decantacao",  label:"Decantação",            emoji:"🏺", tipo:"líquido-sólido", cor:"#1565C0", desc:"Repouso: sólido mais denso deposita no fundo por gravidade; ou líquidos imiscíveis formam camadas.", ex:"Tratamento de água (ETA) (PA1 Q12), separar água+óleo.", pagina:"p. 34"},
  {id:"filtracao",   label:"Filtração",             emoji:"☕", tipo:"líquido-sólido", cor:"#00838F", desc:"Filtro poroso retém sólido e deixa o líquido passar. Muito usada em casa e laboratório.", ex:"Coar café (PA1 Q15), filtro de água, ar-condicionado.", pagina:"p. 35"},
  {id:"centrifug",   label:"Centrifugação",         emoji:"🔄", tipo:"líquido-sólido", cor:"#6A1B9A", desc:"Força centrífuga (alta rotação/RPM) separa componentes por densidade: mais densos vão para fora (fundo do tubo).", ex:"Separar sangue (plasma+células), separar leite.", pagina:"p. 36"},
  {id:"evaporacao",  label:"Evaporação",            emoji:"☀️", tipo:"líquido-sólido", cor:"#F57F17", desc:"Calor evapora o solvente líquido, deixando o soluto sólido como resíduo.", ex:"Salinas (PA1 Q4): água do mar evapora, sal cristaliza.", pagina:"p. 37"},
  {id:"dest_simples",label:"Destilação Simples",    emoji:"🌡️", tipo:"líquido-líquido",cor:"#E65100", desc:"Evaporar + condensar: separa 1 líquido de sólido dissolvido. Usa balão + condensador + coletor.", ex:"Produção de água destilada para laboratório e injeções.", pagina:"p. 38"},
  {id:"dest_frac",   label:"Dest. Fracionada",      emoji:"🏭", tipo:"líquido-líquido",cor:"#BF360C", desc:"Coluna fracionadora separa múltiplos líquidos por diferentes pontos de ebulição (temperatura de vapor).", ex:"Refinaria de petróleo: gás→nafta→querosene→gasolina→diesel→asfalto (PA1 Q9).", pagina:"p. 39"},
  {id:"fusao_frac",  label:"Fusão Fracionada",      emoji:"🔩", tipo:"sólido-sólido",  cor:"#4E342E", desc:"Aquecimento gradual separa sólidos com diferentes pontos de fusão. Cada metal funde em sua temperatura.", ex:"Separar Ag (962°C), Au (1063°C), Fe (1538°C).", pagina:"p. 40"},
];

const MISTURAS3=[
  {id:"feijao",   label:"Feijão + pedras",    emoji:"🫘", metodo:"catacao",    desc:"Pedras e grãos de feijão têm tamanhos e aparências diferentes → CATAÇÃO (separação manual)."},
  {id:"alho",     label:"Cascas de alho",     emoji:"🧄", metodo:"ventilacao", desc:"Cascas são leves, bulbos são pesados → VENTILAÇÃO (corrente de ar). Mais eficiente que catação. (PA1 Q11)"},
  {id:"feijoada", label:"Caldo + grãos",      emoji:"🍲", metodo:"tamisacao",  desc:"Grãos ficam retidos na peneira, caldo (líquido) passa pelos furos → TAMISAÇÃO/COAGEM. (PA1 Q2)"},
  {id:"ouro",     label:"Ouro + areia",       emoji:"⚱️", metodo:"levigacao",  desc:"Ouro é denso e pesado, areia é leve → LEVIGAÇÃO (corrente de água no garimpo)."},
  {id:"agua_areia",label:"Água + areia",      emoji:"🏖️", metodo:"decantacao", desc:"Areia deposita no fundo por gravidade em repouso → DECANTAÇÃO. (PA1 Q12)"},
  {id:"cafe",     label:"Café coado",         emoji:"☕", metodo:"filtracao",   desc:"Pó de café (sólido) fica no filtro, café líquido passa → FILTRAÇÃO. (PA1 Q15)"},
  {id:"sangue",   label:"Sangue",             emoji:"🩸", metodo:"centrifug",  desc:"Plasma (60%, menos denso) fica no topo; células (leucócitos, eritrócitos) vão ao fundo → CENTRIFUGAÇÃO."},
  {id:"salina",   label:"Água do mar → sal",  emoji:"🧂", metodo:"evaporacao", desc:"Sol aquece a água do mar, que evapora, deixando o NaCl (sal) cristalizado → EVAPORAÇÃO. (PA1 Q4)"},
  {id:"agua_dest",label:"Água destilada",     emoji:"💧", metodo:"dest_simples",desc:"Água+sais → aquecer → vapor → condensar → água pura → DESTILAÇÃO SIMPLES."},
  {id:"petroleo", label:"Petróleo (refinaria)",emoji:"⛽",metodo:"dest_frac",  desc:"Diferentes componentes têm diferentes pontos de ebulição → DESTILAÇÃO FRACIONADA. (PA1 Q9)"},
  {id:"ligas",    label:"Ligas metálicas",    emoji:"⚙️", metodo:"fusao_frac", desc:"Ag (962°C), Au (1063°C), Fe (1538°C): diferentes pontos de fusão → FUSÃO FRACIONADA."},
];

function LabCap3(){
  const [selMist,setSelMist]=useState(null);
  const [selMet,setSelMet]=useState(null);
  const [modo,setModo]=useState("quiz"); // "quiz" ou "guia"
  const mist=selMist?MISTURAS3.find(m=>m.id===selMist):null;
  const corTipo={"sólido-sólido":"#5D4037","líquido-sólido":C.blue,"líquido-líquido":C.orange};
  return(
    <div>
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        <button onClick={()=>{setModo("quiz");setSelMist(null);setSelMet(null);}} style={{flex:1,padding:"10px",borderRadius:10,border:"none",background:modo==="quiz"?C.blue:"#E0E0E0",color:modo==="quiz"?"#fff":"#607080",fontWeight:800,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>🎯 Modo Quiz — Qual método usar?</button>
        <button onClick={()=>{setModo("guia");setSelMist(null);setSelMet(null);}} style={{flex:1,padding:"10px",borderRadius:10,border:"none",background:modo==="guia"?C.orange:"#E0E0E0",color:modo==="guia"?"#fff":"#607080",fontWeight:800,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>📖 Modo Guia — Explorar métodos</button>
      </div>

      {modo==="quiz"&&(
        <div>
          <div style={{background:"linear-gradient(135deg,#FFF3E0,#FFE0B2)",borderRadius:12,padding:"10px 14px",marginBottom:12,border:"1px solid #FFCC80",fontSize:12,color:"#E65100",fontWeight:600}}>
            🔬 Selecione uma mistura e descubra qual método de separação é mais adequado!
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))",gap:8,marginBottom:14}}>
            {MISTURAS3.map(m=>{
              const metCorreto=METODOS.find(mt=>mt.id===m.metodo);
              const acertou=selMist===m.id&&selMet===m.metodo;
              const errou=selMist===m.id&&selMet&&selMet!==m.metodo;
              return(
                <button key={m.id} onClick={()=>{setSelMist(m.id);setSelMet(null);}} style={{
                  padding:"10px 6px",borderRadius:10,border:`2px solid ${selMist===m.id?(acertou?C.green:errou?C.red:C.orange):"#E0E0E0"}`,
                  background:selMist===m.id?(acertou?C.greenLight:errou?"#FFEBEE":C.orangeLight):C.white,
                  cursor:"pointer",fontFamily:"inherit",textAlign:"center",transition:"all 0.2s",
                }}>
                  <div style={{fontSize:22}}>{m.emoji}</div>
                  <div style={{fontSize:10,fontWeight:700,color:selMist===m.id?metCorreto.cor:C.gray,lineHeight:1.3,marginTop:3}}>{m.label}</div>
                </button>
              );
            })}
          </div>
          {selMist&&(
            <div>
              <div style={{fontWeight:700,fontSize:13,color:C.blueDark,marginBottom:8}}>Qual método separa <strong>{mist.label}</strong>?</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))",gap:8,marginBottom:10}}>
                {METODOS.map(mt=>{
                  const correto=mt.id===mist.metodo;
                  const escolhido=selMet===mt.id;
                  let bg=C.white,bord="#E0E0E0",cor2=C.gray;
                  if(selMet){if(correto){bg=C.greenLight;bord=C.green;cor2=C.green;}else if(escolhido){bg="#FFEBEE";bord=C.red;cor2=C.red;}}
                  return(
                    <button key={mt.id} onClick={()=>selMet===null&&setSelMet(mt.id)} style={{
                      padding:"8px 4px",borderRadius:8,border:`2px solid ${bord}`,background:bg,
                      cursor:selMet?"default":"pointer",fontFamily:"inherit",textAlign:"center",transition:"all 0.2s",
                    }}>
                      <div style={{fontSize:18}}>{mt.emoji}</div>
                      <div style={{fontSize:9,fontWeight:700,color:cor2,lineHeight:1.3,marginTop:2}}>{mt.label}</div>
                    </button>
                  );
                })}
              </div>
              {selMet&&(
                <div style={{background:selMet===mist.metodo?C.greenLight:"#FFF8E1",borderRadius:12,padding:14,border:`1px solid ${selMet===mist.metodo?C.green:"#FFB300"}`,animation:"fadeIn 0.3s ease"}}>
                  <span style={{fontWeight:800,color:selMet===mist.metodo?C.green:C.orange}}>{selMet===mist.metodo?"✅ Correto! ":"❌ Incorreto. "}</span>
                  <span style={{fontSize:13,color:"#37474F"}}>{mist.desc}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {modo==="guia"&&(
        <div>
          <div style={{background:"linear-gradient(135deg,#E8F5E9,#C8E6C9)",borderRadius:12,padding:"10px 14px",marginBottom:12,border:"1px solid #81C784",fontSize:12,color:C.green,fontWeight:600}}>
            📚 Explore cada método: clique para ver definição, exemplo e página da apostila.
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {METODOS.map(mt=>{
              const on=selMet===mt.id;
              return(
                <div key={mt.id} style={{borderRadius:12,border:`2px solid ${on?mt.cor:"#E0E0E0"}`,overflow:"hidden",transition:"all 0.2s"}}>
                  <button onClick={()=>setSelMet(on?null:mt.id)} style={{
                    width:"100%",padding:"10px 14px",border:"none",background:on?mt.cor:C.white,
                    cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:10,transition:"all 0.2s",
                  }}>
                    <span style={{fontSize:18}}>{mt.emoji}</span>
                    <div style={{flex:1,textAlign:"left"}}>
                      <span style={{fontWeight:800,fontSize:13,color:on?"#fff":mt.cor}}>{mt.label}</span>
                      <span style={{fontSize:10,marginLeft:8,padding:"1px 8px",borderRadius:10,background:on?"rgba(255,255,255,0.2)":"#F5F5F5",color:on?"#fff":C.gray,fontWeight:600}}>{mt.tipo}</span>
                    </div>
                    <span style={{padding:"3px 10px",borderRadius:20,background:on?"rgba(255,255,255,0.2)":"#F5F5F5",fontSize:10,fontWeight:700,color:on?"#fff":mt.cor}}>📄 {mt.pagina}</span>
                  </button>
                  {on&&(
                    <div style={{background:"#FAFAFA",padding:"12px 16px",borderTop:`1px solid ${mt.cor}33`,animation:"fadeIn 0.25s ease"}}>
                      <p style={{margin:"0 0 8px",fontSize:13,color:"#212121",lineHeight:1.6}}>{mt.desc}</p>
                      <div style={{background:mt.cor+"11",borderRadius:8,padding:"8px 12px",border:`1px solid ${mt.cor}33`}}>
                        <span style={{fontWeight:700,color:mt.cor,fontSize:12}}>💡 Exemplo: </span>
                        <span style={{fontSize:12,color:"#37474F"}}>{mt.ex}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

const QS3=[
  {src:"PA1 Q2",  q:"Para separar o caldo da feijoada dos grãos de feijão, o método mais adequado é:", opts:["Decantação","Tamisação (coagem)","Evaporação","Centrifugação"], ans:1, fb:"Tamisação/coagem: a peneira (ou coador) retém os grãos sólidos e deixa o caldo (líquido) passar pelos furos. Método adequado para separar sólidos de líquidos por diferença de tamanho."},
  {src:"PA1 Q4",  q:"Para separar água+sal (mistura homogênea) e obter o sal puro, o método correto é:", opts:["Decantação, pois são fases diferentes","Evaporação, pois a água evapora e o sal fica","Filtração, pois o sal é sólido","Centrifugação, pois o sal é mais denso"], ans:1, fb:"Evaporação: a água (solvente) evapora com o calor do sol, e o NaCl (soluto) cristaliza e fica no recipiente. Aplicação direta: as salinas produzem sal marinho por evaporação solar."},
  {src:"PA1 Q9",  q:"A refinaria de petróleo separa seus componentes (gás, nafta, gasolina, diesel) porque eles têm:", opts:["Densidades iguais","Diferentes pontos de ebulição — destilação fracionada","Cores diferentes — filtração","Diferentes tamanhos — tamisação"], ans:1, fb:"Destilação fracionada: cada componente do petróleo tem um ponto de ebulição diferente. A coluna fracionadora permite coletar cada fração separadamente conforme a temperatura aumenta."},
  {src:"PA1 Q11", q:"Para separar cascas leves de alho dos bulbos pesados, o método MAIS eficiente é:", opts:["Catação, pois são sólidos visíveis","Ventilação, pois as cascas são leves e os bulbos pesados","Tamisação, pois têm tamanhos diferentes","Levigação, pois a água carrega as cascas"], ans:1, fb:"Ventilação: a corrente de ar carrega as cascas leves de alho enquanto os bulbos pesados permanecem. É mais eficiente que a catação (manual, lenta) nesse caso."},
  {src:"PA1 Q12", q:"Em uma estação de tratamento de água (ETA), para retirar partículas sólidas em suspensão, usa-se:", opts:["Centrifugação","Destilação fracionada","Decantação — manter a água em repouso","Fusão fracionada"], ans:2, fb:"Decantação: a água em repouso permite que as partículas sólidas (como areia, terra) depositem no fundo por gravidade. Nas ETAs, essa é uma das primeiras etapas do tratamento."},
  {src:"PA1 Q15", q:"O filtro do ar-condicionado retém poeira e microrganismos. Qual método de separação isso representa?", opts:["Decantação","Centrifugação","Evaporação","Filtração"], ans:3, fb:"Filtração: o filtro (material poroso) retém os sólidos (poeira, microrganismos) e deixa o ar (fluido) passar. O mesmo princípio do coador de café."},
  {src:"Cap. 3", q:"O garimpo de ouro usa água corrente para separar ouro (denso) da areia (leve). Esse método é:", opts:["Decantação","Filtração","Levigação","Ventilação"], ans:2, fb:"Levigação: usa corrente de água para separar sólidos por diferença de densidade. O ouro, mais denso, fica no fundo; a areia leve é arrastada pela água."},
  {src:"Cap. 3", q:"Para separar sangue em plasma, leucócitos e eritrócitos, usa-se:", opts:["Filtração","Decantação simples","Centrifugação","Evaporação"], ans:2, fb:"Centrifugação: a rotação em alta velocidade (RPM) gera força centrífuga. Os componentes mais densos (eritrócitos) vão para o fundo; os menos densos (plasma) ficam no topo."},
  {src:"Cap. 3", q:"Para obter água destilada pura (usada em laboratório e injeções), o método é:", opts:["Decantação","Filtração","Destilação simples","Fusão fracionada"], ans:2, fb:"Destilação simples: a água é aquecida e vaporiza, o vapor passa pelo condensador (serpentina), resfria e condensa como água pura no coletor. Sais e impurezas ficam no balão."},
  {src:"Cap. 3", q:"Para separar prata (ponto de fusão 962°C), ouro (1063°C) e ferro (1538°C) de uma liga metálica, usa-se:", opts:["Destilação fracionada — diferente ebulição","Fusão fracionada — diferente ponto de fusão","Centrifugação — diferente densidade","Filtração — diferente tamanho"], ans:1, fb:"Fusão fracionada: aquece-se gradualmente a mistura. A prata funde primeiro (962°C) e é separada; depois o ouro (1063°C); por último o ferro (1538°C). Cada metal é coletado separadamente."},
];

function QuizCap3(){
  const [cur,setCur]=useState(0);const [cho,setCho]=useState(null);
  const [score,setScore]=useState(0);const [done,setDone]=useState(false);const [hist,setHist]=useState([]);
  function choose(i){if(cho!==null)return;setCho(i);if(i===QS3[cur].ans)setScore(s=>s+1);setHist(h=>[...h,{q:cur,ok:i===QS3[cur].ans}]);}
  function next(){if(cur+1>=QS3.length){setDone(true);return;}setCur(c=>c+1);setCho(null);}
  function restart(){setCur(0);setCho(null);setScore(0);setDone(false);setHist([]);}
  if(done){
    const pct=Math.round(score/QS3.length*100);
    return(
      <div style={{textAlign:"center",padding:20}}>
        <div style={{fontSize:48,marginBottom:10}}>{pct>=80?"🏆":pct>=60?"👍":"📚"}</div>
        <div style={{fontSize:26,fontWeight:900,color:pct>=80?C.green:pct>=60?C.blue:C.red,marginBottom:4}}>{score}/{QS3.length}</div>
        <div style={{fontSize:14,color:C.gray,marginBottom:16}}>{pct>=80?"Excelente! Separação de misturas dominada!":pct>=60?"Bom! Revise os métodos marcados.":"Continue! Explore o laboratório de métodos."}</div>
        {hist.map((h,i)=>(<div key={i} style={{textAlign:"left",padding:"6px 12px",borderRadius:8,marginBottom:4,background:h.ok?C.greenLight:"#FFEBEE",color:h.ok?C.green:C.red,fontWeight:600,fontSize:12}}>{h.ok?"✅":"❌"} Q{h.q+1} [{QS3[h.q].src}]: {QS3[h.q].q.substring(0,55)}...</div>))}
        <button onClick={restart} style={{marginTop:16,padding:"12px 28px",borderRadius:24,border:"none",background:`linear-gradient(135deg,${C.blue},${C.blueDark})`,color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer"}}>🔄 Tentar Novamente</button>
      </div>
    );
  }
  const q=QS3[cur];
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:12,fontWeight:700,color:C.gray}}>{cur+1} / {QS3.length}</span>
          <span style={{fontSize:10,padding:"2px 8px",borderRadius:20,background:C.blueLight,color:C.blueDark,fontWeight:700}}>{q.src}</span>
        </div>
        <span style={{fontSize:12,fontWeight:800,color:C.blue}}>✅ {score} acerto{score!==1?"s":""}</span>
      </div>
      <div style={{height:6,background:"#ECEFF1",borderRadius:4,marginBottom:18,overflow:"hidden"}}>
        <div style={{height:"100%",borderRadius:4,width:`${(cur/QS3.length)*100}%`,background:`linear-gradient(90deg,${C.blue},${C.red})`,transition:"width 0.4s ease"}}/>
      </div>
      <div style={{background:C.blueLight,borderRadius:14,padding:18,border:"1px solid #90CAF9",marginBottom:16}}>
        <p style={{margin:0,fontWeight:700,fontSize:15,color:C.blueDark,lineHeight:1.55}}>{q.q}</p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {q.opts.map((opt,i)=>{
          let bg=C.white,bord="#CFD8DC",col="#37474F";
          if(cho!==null){if(i===q.ans){bg=C.greenLight;bord=C.green;col=C.green;}else if(i===cho&&cho!==q.ans){bg="#FFEBEE";bord=C.red;col=C.red;}}
          return(<button key={i} onClick={()=>choose(i)} style={{padding:"12px 16px",borderRadius:12,border:`2px solid ${bord}`,background:bg,cursor:cho!==null?"default":"pointer",textAlign:"left",fontFamily:"inherit",fontWeight:600,fontSize:14,color:col,transition:"all 0.2s",display:"flex",alignItems:"center",gap:10}}><span style={{width:24,height:24,borderRadius:"50%",border:`2px solid ${bord}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,flexShrink:0,background:cho!==null&&(i===q.ans||i===cho)?(i===q.ans?C.green:C.red):"transparent",color:cho!==null&&(i===q.ans||i===cho)?"#fff":col}}>{String.fromCharCode(65+i)}</span>{opt}</button>);
        })}
      </div>
      {cho!==null&&(<div style={{marginTop:14,padding:14,borderRadius:12,background:cho===q.ans?C.greenLight:"#FFF8E1",border:`1px solid ${cho===q.ans?C.green:"#FFB300"}`,animation:"fadeIn 0.3s ease"}}><span style={{fontWeight:700,color:cho===q.ans?C.green:C.orange}}>{cho===q.ans?"✅ Correto! ":"❌ Incorreto. "}</span><span style={{fontSize:13,color:"#37474F"}}>{q.fb}</span><div style={{marginTop:10,textAlign:"right"}}><button onClick={next} style={{padding:"8px 22px",borderRadius:20,border:"none",background:`linear-gradient(135deg,${C.blue},${C.blueDark})`,color:"#fff",fontWeight:800,fontSize:13,cursor:"pointer"}}>{cur+1>=QS3.length?"Ver Resultado →":"Próxima →"}</button></div></div>)}
    </div>
  );
}

const DS3=[
  {src:"PA1 Q4",  q:"Compare os métodos de separação adequados para: (a) mistura homogênea água+sal; (b) mistura heterogênea água+óleo. Justifique cada escolha.",modelo:"(a) Água+sal (homogênea): usa-se EVAPORAÇÃO. A água (solvente) evapora com o calor do sol ou de uma chama, e o NaCl (soluto) cristaliza e fica no recipiente. Aplicação: as salinas produzem sal marinho por evaporação solar. (b) Água+óleo (heterogênea bifásica): usa-se DECANTAÇÃO. Os dois líquidos são imiscíveis e têm densidades diferentes — o óleo flutua sobre a água. Em repouso, as fases se separam e o óleo pode ser retirado com funil de separação."},
  {src:"PA1 Q9",  q:"Por que a destilação FRACIONADA é o método adequado para separar o petróleo em suas frações (gás de cozinha, nafta, gasolina, querosene, diesel, asfalto)?",modelo:"A destilação fracionada é adequada porque os diferentes componentes do petróleo têm DIFERENTES PONTOS DE EBULIÇÃO. A coluna fracionadora permite que, ao aquecer o petróleo, cada componente vaporizasse em uma temperatura específica e condense em um nível diferente da coluna, sendo coletado separadamente. Exemplo: gás de cozinha (ponto de ebulição ~20°C), nafta (~40°C), querosene (~70°C), gasolina (~100°C), diesel (~200°C) e asfalto (~300°C+). Isso é diferente da destilação simples, que coleta apenas um produto."},
  {src:"Cap. 3", q:"Explique por que o sangue e o leite, apesar de parecerem homogêneos a olho nu, são classificados como misturas heterogêneas. Qual método comprova isso?",modelo:"O sangue e o leite são classificados como heterogêneos porque contêm partículas em suspensão que, embora muito pequenas (invisíveis a olho nu), podem ser separadas e distinguidas. No caso do sangue, é formado por plasma (60%, líquido amarelado, menos denso), leucócitos (glóbulos brancos) e eritrócitos (glóbulos vermelhos, mais densos). No leite, há água, gordura, proteínas e lactose. O método que comprova a heterogeneidade é a CENTRIFUGAÇÃO: ao girar em alta velocidade, os componentes mais densos vão ao fundo do tubo e os menos densos ficam no topo, revelando as fases distintas."},
];

function DiscursivaCap3(){
  const [ans,setAns]=useState({});const [show,setShow]=useState({});
  return(
    <div style={{display:"flex",flexDirection:"column",gap:20}}>
      {DS3.map((d,i)=>(
        <div key={i} style={{background:C.white,borderRadius:14,border:"1px solid #E0E0E0",overflow:"hidden"}}>
          <div style={{background:`linear-gradient(135deg,${C.orange},${"#BF360C"})`,padding:"12px 16px",display:"flex",alignItems:"center",gap:10}}>
            <span style={{background:"rgba(255,255,255,0.2)",borderRadius:20,padding:"2px 10px",color:"#fff",fontSize:11,fontWeight:800}}>{d.src}</span>
            <span style={{color:"rgba(255,255,255,0.8)",fontSize:11,fontWeight:600}}>Questão {i+1} de {DS3.length}</span>
          </div>
          <div style={{padding:16}}>
            <p style={{margin:"0 0 12px",fontWeight:700,fontSize:14,color:"#BF360C",lineHeight:1.6}}>{d.q}</p>
            <textarea value={ans[i]||""} onChange={e=>setAns(a=>({...a,[i]:e.target.value}))} placeholder="Digite sua resposta aqui..." rows={4} style={{width:"100%",padding:12,borderRadius:10,border:"2px solid #E0E0E0",fontFamily:"inherit",fontSize:13,resize:"vertical",outline:"none"}}/>
            <div style={{display:"flex",justifyContent:"flex-end",marginTop:10}}>
              <button onClick={()=>setShow(s=>({...s,[i]:!s[i]}))} style={{padding:"8px 20px",borderRadius:20,border:"none",background:show[i]?C.orange:`linear-gradient(135deg,${C.green},${"#1B5E20"})`,color:"#fff",fontWeight:800,fontSize:12,cursor:"pointer"}}>
                {show[i]?"🙈 Ocultar Resposta":"✅ Ver Resposta Modelo"}
              </button>
            </div>
            {show[i]&&(<div style={{marginTop:12,background:C.greenLight,borderRadius:10,padding:14,border:`1px solid ${C.green}`,animation:"fadeIn 0.3s ease"}}><div style={{fontWeight:800,color:C.green,fontSize:12,marginBottom:6}}>📝 Resposta Modelo:</div><p style={{margin:0,fontSize:13,color:"#212121",lineHeight:1.65}}>{d.modelo}</p></div>)}
          </div>
        </div>
      ))}
    </div>
  );
}

const NODES3=[
  {id:"sep",       x:50,y:8, s:"g",l:"Separação de Misturas",    c:C.blueDark,  i:"Métodos físicos usados para separar os componentes de uma mistura sem alterar a composição química de cada substância."},
  {id:"solsol",    x:20,y:26,s:"m",l:"Sólido-Sólido",            c:"#5D4037",   i:"Métodos para separar dois ou mais sólidos: catação, tamisação, ventilação, levigação, fusão fracionada."},
  {id:"liqliq",    x:50,y:26,s:"m",l:"Líquido-Líquido",          c:C.orange,    i:"Métodos para separar dois líquidos imiscíveis ou com diferentes pontos de ebulição: decantação, destilação."},
  {id:"liqsol",    x:80,y:26,s:"m",l:"Líquido-Sólido",           c:C.blue,      i:"Métodos para separar um líquido de um sólido em suspensão ou dissolvido: filtração, decantação, evaporação, centrifugação."},
  {id:"catac",     x:8, y:44,s:"p",l:"Catação",                  c:"#5D4037",   i:"Separação manual. Ex: retirar pedras do feijão. (p. 31)"},
  {id:"tamis",     x:20,y:44,s:"p",l:"Tamisação",                c:"#795548",   i:"Peneira por tamanho. Ex: coar feijoada, peneirar farinha. (p. 32)"},
  {id:"vent",      x:32,y:44,s:"p",l:"Ventilação",               c:"#0288D1",   i:"Corrente de ar por densidade. Ex: cascas de alho, joeirar trigo. (p. 32)"},
  {id:"leviga",    x:20,y:60,s:"mi",l:"Levigação",               c:"#0277BD",   i:"Água em movimento. Ex: garimpo de ouro. (p. 33)"},
  {id:"fusaof",    x:8, y:60,s:"mi",l:"Fusão Frac.",             c:"#4E342E",   i:"Diferentes pontos de fusão. Ex: Ag 962°C, Au 1063°C, Fe 1538°C. (p. 40)"},
  {id:"decan",     x:50,y:44,s:"p",l:"Decantação",               c:"#1565C0",   i:"Repouso: sólido deposita ou líquidos formam camadas. Ex: ETA, água+óleo. (p. 34)"},
  {id:"destfrac",  x:50,y:60,s:"p",l:"Dest. Fracionada",         c:"#BF360C",   i:"Diferentes pontos de ebulição. Ex: refinaria de petróleo. (p. 39)"},
  {id:"destsim",   x:64,y:60,s:"mi",l:"Dest. Simples",           c:"#E65100",   i:"Evaporar+condensar 1 componente. Ex: água destilada. (p. 38)"},
  {id:"filtr",     x:80,y:44,s:"p",l:"Filtração",                c:"#00838F",   i:"Filtro retém sólido, passa líquido. Ex: café, ar-condicionado. (p. 35)"},
  {id:"evap",      x:92,y:44,s:"p",l:"Evaporação",               c:"#F57F17",   i:"Calor evapora solvente, fica soluto. Ex: salinas (NaCl). (p. 37)"},
  {id:"centri",    x:86,y:60,s:"p",l:"Centrifugação",            c:"#6A1B9A",   i:"Força centrífuga (RPM). Ex: separar sangue, leite. (p. 36)"},
];
const EDGES3=[["sep","solsol"],["sep","liqliq"],["sep","liqsol"],["solsol","catac"],["solsol","tamis"],["solsol","vent"],["solsol","leviga"],["solsol","fusaof"],["liqliq","decan"],["liqliq","destfrac"],["liqliq","destsim"],["liqsol","filtr"],["liqsol","evap"],["liqsol","centri"],["liqsol","decan"]];

function MapaCap3(){
  const [act,setAct]=useState(null);
  const node=act?NODES3.find(n=>n.id===act):null;
  const R={g:5,m:4,p:3.2,mi:2.4};const F={g:1.0,m:0.9,p:0.82,mi:0.70};
  return(
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <p style={{margin:0,fontSize:13,color:C.gray,fontWeight:600}}>💡 Clique em qualquer nó para ver definição, exemplo e página da apostila.</p>
      <div style={{background:"linear-gradient(135deg,#FBE9E7,#FFCCBC)",borderRadius:16,overflow:"hidden",border:"1px solid #FFAB91"}}>
        <svg viewBox="0 0 100 72" style={{width:"100%",height:"auto",minHeight:240}}>
          {EDGES3.map(([a,b],i)=>{const na=NODES3.find(n=>n.id===a);const nb=NODES3.find(n=>n.id===b);return<line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="#B0BEC5" strokeWidth="0.4" strokeDasharray="1.2,0.8"/>;})}
          {NODES3.map(n=>{const r=R[n.s];const fs=F[n.s];const on=act===n.id;const words=n.l.split(" ");return(
            <g key={n.id} onClick={()=>setAct(act===n.id?null:n.id)} style={{cursor:"pointer"}}>
              <circle cx={n.x} cy={n.y} r={r} fill={on?n.c:n.c+"22"} stroke={n.c} strokeWidth={on?"0.7":"0.4"} style={{transition:"all 0.2s"}}/>
              {words.length===1?<text x={n.x} y={n.y+0.4} textAnchor="middle" dominantBaseline="middle" fontSize={fs*0.88} fontWeight={on?"800":"600"} fill={on?"#fff":n.c} style={{userSelect:"none"}}>{n.l}</text>:words.map((w,wi)=>(<text key={wi} x={n.x} y={n.y-(words.length-1)*fs*0.44+wi*fs*0.88} textAnchor="middle" dominantBaseline="middle" fontSize={fs*0.82} fontWeight={on?"800":"600"} fill={on?"#fff":n.c} style={{userSelect:"none"}}>{w}</text>))}
            </g>
          );})}
        </svg>
      </div>
      {node&&(<div style={{background:C.white,borderRadius:14,padding:16,border:`2px solid ${node.c}`,animation:"fadeIn 0.3s ease",boxShadow:`0 4px 16px ${node.c}33`}}><div style={{fontWeight:800,color:node.c,fontSize:15,marginBottom:6}}>📌 {node.l}</div><p style={{margin:0,fontSize:13,color:"#37474F",lineHeight:1.6}}>{node.i}</p></div>)}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// CONFIG POR CAPÍTULO
// ══════════════════════════════════════════════════════════════════════════════
const CAP_CONFIG={
  cap1:{emoji:"🧪",bncc:"EF06CI01",titulo:"Misturas Homogêneas e Heterogêneas",cor:C.red,
        teoria:<TeoriaCap1/>,lab:<LabCap1/>,quiz:<QuizCap1/>,discursiva:<DiscursivaCap1/>,mapa:<MapaCap1/>},
  cap2:{emoji:"⚡",bncc:"EF06CI02",titulo:"Transformações Físicas, Químicas e Biológicas",cor:"#6A1B9A",
        teoria:<TeoriaCap2/>,lab:<LabCap2/>,quiz:<QuizCap2/>,discursiva:<DiscursivaCap2/>,mapa:<MapaCap2/>},
  cap3:{emoji:"🔬",bncc:"EF06CI03",titulo:"Separação de Misturas",cor:C.orange,
        teoria:<TeoriaCap3/>,lab:<LabCap3/>,quiz:<QuizCap3/>,discursiva:<DiscursivaCap3/>,mapa:<MapaCap3/>},
};

// Aba Teoria para Cap2 e Cap3 usa TeoriaCap1 filtrado — definir componentes separados:
function TeoriaCap2(){
  const [open,setOpen]=useState(null);
  const ids=["fenomenos_fisicos","fenomenos_quimicos","fenomenos_biologicos","combinacoes"];
  return(
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      <div style={{background:"linear-gradient(135deg,#EDE7F6,#D1C4E9)",borderRadius:14,padding:"12px 16px",border:"1px solid #B39DDB",display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
        <span style={{fontSize:22}}>📖</span>
        <div><div style={{fontWeight:800,color:"#4527A0",fontSize:13}}>Teoria da Apostila — Capítulo 2</div>
        <div style={{fontSize:12,color:"#5E35B1"}}>Fenômenos Físicos, Químicos e Biológicos · pp. 21–30</div></div>
      </div>
      <SectionHeader titulo="⚡ Fenômenos e Transformações" paginas="pp. 21–30" cor="#6A1B9A"/>
      {TEORIA.filter(t=>ids.includes(t.id)).map(t=>(<ConceCard key={t.id} t={t} open={open} setOpen={setOpen}/>))}
    </div>
  );
}

function TeoriaCap3(){
  const [open,setOpen]=useState(null);
  const ids=TEORIA.filter(t=>t.id.startsWith("sep_")).map(t=>t.id);
  return(
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      <div style={{background:"linear-gradient(135deg,#FBE9E7,#FFCCBC)",borderRadius:14,padding:"12px 16px",border:"1px solid #FFAB91",display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
        <span style={{fontSize:22}}>📖</span>
        <div><div style={{fontWeight:800,color:"#BF360C",fontSize:13}}>Teoria da Apostila — Capítulo 3</div>
        <div style={{fontSize:12,color:"#E64A19"}}>Separação de Misturas · pp. 31–41</div></div>
      </div>
      <SectionHeader titulo="🔬 Métodos de Separação" paginas="pp. 31–40" cor={C.orange}/>
      {TEORIA.filter(t=>ids.includes(t.id)).map(t=>(<ConceCard key={t.id} t={t} open={open} setOpen={setOpen}/>))}
    </div>
  );
}

// ═══ APP ══════════════════════════════════════════════════════════════════════
const TABS=[
  {id:"teoria",    label:"📖 Teoria",         desc:"Apostila + páginas"},
  {id:"lab",       label:"🧪 Laboratório",     desc:"Simulações"},
  {id:"quiz",      label:"❓ Objetivas",       desc:"Com gabarito"},
  {id:"discursiva",label:"✍️ Discursivas",     desc:"Com resposta modelo"},
  {id:"mapa",      label:"🗺️ Mapa",            desc:"Conceitos"},
];
const CAPS=[
  {id:"cap1",label:"Cap. 1 — Misturas",       ok:true},
  {id:"cap2",label:"Cap. 2 — Transformações", ok:true},
  {id:"cap3",label:"Cap. 3 — Separação",      ok:true},
];

export default function App(){
  const [tab,setTab]=useState("teoria");
  const [cap,setCap]=useState("cap1");
  const cfg=CAP_CONFIG[cap];
  const totalQ=(cap==="cap1"?QS.length+DS.length:cap==="cap2"?QS2.length+DS2.length:QS3.length+DS3.length);
  return(
    <div style={{fontFamily:"'Segoe UI','Helvetica Neue',sans-serif",background:C.bg,minHeight:"100vh",paddingBottom:40}}>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}*{box-sizing:border-box}textarea:focus{border-color:${C.blue}!important;box-shadow:0 0 0 3px ${C.blueLight}}`}</style>
      {/* HEADER */}
      <div style={{background:`linear-gradient(135deg,${C.blueDark} 0%,${C.blue} 60%,#1976D2 100%)`,padding:"18px 24px 0",boxShadow:"0 4px 20px rgba(13,71,161,0.4)"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:14}}>
            <Logo size={36}/>
            <div style={{borderLeft:"2px solid rgba(255,255,255,0.3)",paddingLeft:16}}>
              <div style={{color:"rgba(255,255,255,0.7)",fontSize:11,fontWeight:600,letterSpacing:2,textTransform:"uppercase"}}>Módulo · Ciências · 1º Trimestre</div>
              <div style={{color:"#fff",fontSize:18,fontWeight:800,lineHeight:1.2}}>Unidade 1 — Matéria e Energia</div>
            </div>
            <div style={{marginLeft:"auto",background:"rgba(255,255,255,0.15)",borderRadius:10,padding:"6px 14px",textAlign:"center"}}>
              <div style={{color:"rgba(255,255,255,0.8)",fontSize:10,fontWeight:600}}>QUESTÕES</div>
              <div style={{color:"#fff",fontSize:20,fontWeight:900}}>{totalQ}Q</div>
            </div>
          </div>
          <div style={{display:"flex",gap:4}}>
            {CAPS.map(ch=>(
              <button key={ch.id} onClick={()=>{setCap(ch.id);setTab("teoria");}} style={{
                padding:"8px 16px",borderRadius:"10px 10px 0 0",border:"none",
                background:ch.id===cap?"#fff":"rgba(255,255,255,0.2)",
                color:ch.id===cap?C.blueDark:"#fff",
                fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"inherit",
              }}>{ch.label}</button>
            ))}
          </div>
        </div>
      </div>
      {/* CONTENT */}
      <div style={{maxWidth:900,margin:"0 auto",padding:"0 16px"}}>
        <div style={{background:C.white,borderRadius:"0 16px 16px 16px",boxShadow:"0 4px 24px rgba(0,0,0,0.08)",overflow:"hidden"}}>
          <div style={{display:"flex",borderBottom:`2px solid ${C.grayLight}`,overflowX:"auto"}}>
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)} style={{
                flex:1,minWidth:80,padding:"14px 6px",border:"none",
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
          <div style={{padding:"24px",animation:"fadeIn 0.3s ease"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20,paddingBottom:16,borderBottom:`2px solid ${C.grayLight}`}}>
              <div style={{width:44,height:44,borderRadius:12,background:`linear-gradient(135deg,${cfg.cor},${cfg.cor}CC)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{cfg.emoji}</div>
              <div>
                <div style={{fontSize:11,color:C.gray,fontWeight:700,textTransform:"uppercase",letterSpacing:1}}>BNCC {cfg.bncc} · 1º Trimestre · Unidade 1</div>
                <div style={{fontSize:16,fontWeight:800,color:C.blueDark}}>{cfg.titulo}</div>
              </div>
            </div>
            {tab==="teoria"     && cfg.teoria}
            {tab==="lab"        && cfg.lab}
            {tab==="quiz"       && cfg.quiz}
            {tab==="discursiva" && cfg.discursiva}
            {tab==="mapa"       && cfg.mapa}
          </div>
        </div>
        <div style={{textAlign:"center",marginTop:20,color:"#B0BEC5",fontSize:11,fontWeight:600}}>
          AlfaReview · Ciências 6º Ano · Unidade 1 · 1º Trimestre · © LMVN
        </div>
      </div>
    </div>
  );
}
