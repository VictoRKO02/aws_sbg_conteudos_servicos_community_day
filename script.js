/* AWS SBG — curadoria de estudos, navegação, filtros e progresso local. Sem dependências. */
'use strict';

const resources = [
  {
    id:'filas', phase:1, type:'article', level:'Iniciante', visual:'queue', palette:'blue', art:'QUEUE',
    title:'O que é uma fila de mensagens?',
    description:'Comece pelos conceitos de produtor, consumidor, comunicação assíncrona e desacoplamento entre serviços.',
    tags:['Filas','Produtor','Consumidor'],
    url:'https://aws.amazon.com/pt/message-queue/'
  },
  {
    id:'pubsub', phase:1, type:'article', level:'Iniciante', visual:'pubsub', palette:'orange', art:'PUB/SUB',
    title:'O que é mensageria Pub/Sub?',
    description:'Entenda a diferença entre enviar uma tarefa para uma fila e publicar um evento para vários assinantes.',
    tags:['Pub/Sub','Tópicos','Fanout'],
    url:'https://aws.amazon.com/what-is/pub-sub-messaging/?ams%23interactive-card-vertical%23pattern-data--1819409748.search=request#amsc1--29unty'
  },
  {
    id:'video-fundamentos', phase:1, type:'video', level:'Iniciante', palette:'blue', video:'smCXdM5uSUk',
    title:'Vídeo complementar — fundamentos',
    description:'Material em vídeo selecionado para complementar a introdução à mensageria. Assista e registre suas dúvidas.',
    tags:['Vídeo','Revisão','Conceitos'],
    url:'https://www.youtube.com/watch?v=smCXdM5uSUk'
  },
  {
    id:'sqs', phase:2, type:'docs', level:'Intermediário', visual:'sqs', palette:'orange', art:'SQS',
    title:'Amazon SQS — Guia do desenvolvedor',
    description:'Documentação oficial sobre filas, tipos de entrega, ciclo de vida das mensagens e tempo limite de visibilidade.',
    tags:['SQS','Ciclo de vida','AWS'],
    url:'https://docs.aws.amazon.com/pt_br/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html'
  },
  {
    id:'sns-xamarin', phase:2, type:'docs', level:'Intermediário', visual:'sns', palette:'purple', art:'SNS',
    title:'Amazon SNS — tópicos e assinaturas',
    description:'Referência específica do antigo SDK Xamarin: introduz tópicos, assinaturas, publicação e notificações push.',
    tags:['SNS','Tópicos','Xamarin / legado'],
    url:'https://docs.aws.amazon.com/mobile/sdkforxamarin/developerguide/sns.html'
  },
  {
    id:'dlq', phase:2, type:'article', level:'Intermediário', visual:'dlq', palette:'red', art:'DLQ',
    title:'Dead-Letter Queue: tratando falhas',
    description:'Aprenda por que mensagens que não podem ser processadas precisam de uma estratégia de isolamento e análise.',
    tags:['DLQ','Falhas','Reprocessamento'],
    url:'https://aws.amazon.com/what-is/dead-letter-queue/?trk=faq_card'
  },
  {
    id:'video-aprofundamento', phase:2, type:'video', level:'Intermediário', palette:'purple', video:'tbADIYDY4J4',
    title:'Aula complementar em vídeo',
    description:'Aprofunde o estudo com o vídeo indicado. O link mantém o ponto de reprodução selecionado originalmente.',
    tags:['Aula','Aprofundamento','Vídeo'],
    url:'https://www.youtube.com/watch?v=tbADIYDY4J4&t=2369s'
  },
  {
    id:'kafka-video', phase:3, type:'video', level:'Intermediário', palette:'teal', video:'o5yviW6QSrE',
    title:'Introdução ao Apache Kafka — playlist',
    description:'Explore o início do ecossistema Kafka e avance pela sequência de vídeos recomendada.',
    tags:['Kafka','Streaming','Playlist'],
    url:'https://www.youtube.com/watch?v=o5yviW6QSrE&list=PL5aY_NrL1rjt_AZxj11kQjiTNLGg4ZaZA'
  },
  {
    id:'rabbit-kafka', phase:3, type:'article', level:'Intermediário', visual:'compare', palette:'blue', art:'VS',
    title:'RabbitMQ vs. Kafka: qual a diferença?',
    description:'Compare padrões de uso, retenção de dados, distribuição de mensagens e streaming entre duas tecnologias.',
    tags:['RabbitMQ','Kafka','Comparativo'],
    url:'https://aws.amazon.com/pt/compare/the-difference-between-rabbitmq-and-kafka/'
  },
  {
    id:'rabbit-video', phase:3, type:'video', level:'Intermediário', palette:'orange', video:'2YWHtbZJ0QI',
    title:'RabbitMQ — aprenda em vídeo',
    description:'Material para visualizar o funcionamento de um broker e relacioná-lo aos conceitos estudados.',
    tags:['RabbitMQ','Broker','Vídeo'],
    url:'https://www.youtube.com/watch?v=2YWHtbZJ0QI'
  },
  {
    id:'eda', phase:4, type:'article', level:'Avançado', visual:'eda', palette:'purple', art:'EDA',
    title:'O que é arquitetura orientada a eventos?',
    description:'Entenda os princípios de Event-Driven Architecture e como eventos ajudam a conectar sistemas distribuídos.',
    tags:['EDA','Eventos','Arquitetura'],
    url:'https://aws.amazon.com/what-is/eda/?trk=faq_card'
  },
  {
    id:'eda-video', phase:4, type:'video', level:'Avançado', palette:'teal', video:'8xFBQc1A4B8',
    title:'Arquitetura orientada a eventos — aula',
    description:'Uma visão mais aprofundada sobre comunicação entre microsserviços e decisões em sistemas orientados a eventos.',
    tags:['Event-driven','Microsserviços','Vídeo'],
    url:'https://www.youtube.com/watch?v=8xFBQc1A4B8&t=1677s'
  }
];

const phases = [
  {id:1, number:'01',title:'Fundamentos',description:'Mensagens, filas, produtor, consumidor e padrão Pub/Sub.'},
  {id:2, number:'02',title:'Serviços AWS',description:'Amazon SQS, SNS, ciclo de vida, falhas e DLQ.'},
  {id:3, number:'03',title:'Brokers & Kafka',description:'RabbitMQ, streaming e diferenças entre tecnologias.'},
  {id:4, number:'04',title:'Event-Driven',description:'Arquitetura orientada a eventos e decisões práticas.'}
];

const STORAGE_KEY='aws-sbg-completed-v1';
let completed=loadCompleted();
let activeType='all';
let activePhase='all';
let searchText='';
let toastTimer;

const $=(selector)=>document.querySelector(selector);
const icons={article:'ic-book',video:'ic-video',docs:'ic-doc'};
const labels={article:'ARTIGO',video:'VÍDEO',docs:'DOCUMENTAÇÃO'};
const svg=(id)=>`<svg class="icon" aria-hidden="true"><use href="#${id}"/></svg>`;
const safe=(s)=>String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function loadCompleted(){
  try{
    const ids=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');
    return new Set(Array.isArray(ids)?ids.filter(id=>resources.some(x=>x.id===id)):[]);
  }catch(_error){return new Set();}
}
function saveCompleted(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify([...completed]));}catch(_error){/* O navegador pode desabilitar armazenamento local. */}}
function normalize(value){return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();}
function showToast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2900);}

function renderPhases(){
  $('#phaseGrid').innerHTML=phases.map(phase=>{
    const items=resources.filter(r=>r.phase===phase.id);
    const done=items.filter(r=>completed.has(r.id)).length;
    const fullyDone=done===items.length;
    return `<article class="phase-card${fullyDone?' phase-done':''}">
      <div class="phase-card-num">${phase.number}</div>
      <h3>${safe(phase.title)}</h3><p>${safe(phase.description)}</p>
      <div class="phase-bottom"><span>${done}/${items.length} concluídos</span><button data-phase-jump="${phase.id}" type="button" aria-label="Ver conteúdos da etapa ${phase.number}">${fullyDone?'Revisar':'Explorar'} ${svg('ic-arrow-right')}</button></div>
    </article>`;
  }).join('');
}

function renderVisual(resource){
  if(resource.type==='video'){
    return `<div class="resource-visual is-video">
      <img loading="lazy" src="https://i.ytimg.com/vi/${resource.video}/hqdefault.jpg" alt="" onerror="this.style.display='none'" />
      <span class="resource-type-pill">${svg('ic-video')} ${labels.video}</span>
      <span class="resource-stage-pill">ETAPA 0${resource.phase}</span>
      <span class="video-play">${svg('ic-play')}</span>
    </div>`;
  }
  const visualIcon=resource.visual==='queue'||resource.visual==='sqs'||resource.visual==='dlq'?'ic-queue':resource.visual==='eda'?'ic-activity':'ic-layers';
  return `<div class="resource-visual visual-${resource.palette}">
    <span class="resource-type-pill">${svg(icons[resource.type])} ${labels[resource.type]}</span>
    <span class="resource-stage-pill">ETAPA 0${resource.phase}</span>
    <span class="resource-illustration"><span class="illustration-symbol">${svg(visualIcon)}</span><span class="illustration-word ${resource.art.length>6?'long':''}">${resource.art}</span></span>
  </div>`;
}

function renderResources(){
  const query=normalize(searchText);
  const results=resources.filter(resource=>{
    const typeMatch=activeType==='all'||resource.type===activeType;
    const phaseMatch=activePhase==='all'||String(resource.phase)===String(activePhase);
    const indexed=normalize([resource.title,resource.description,...resource.tags,resource.level,phases[resource.phase-1].title].join(' '));
    return typeMatch&&phaseMatch&&(!query||indexed.includes(query));
  });
  $('#resourceGrid').innerHTML=results.map(resource=>{
    const isDone=completed.has(resource.id);
    return `<article id="resource-${resource.id}" class="resource-card${isDone?' resource-done':''}">
      ${renderVisual(resource)}
      <div class="resource-body">
        <div class="resource-meta"><span class="level">${safe(resource.level)}</span><span class="meta-sep">•</span><span>${resource.type==='video'?'Assista':resource.type==='docs'?'Documentação oficial':'Leitura recomendada'}</span></div>
        <h3>${safe(resource.title)}</h3><p>${safe(resource.description)}</p>
        <div class="resource-tags">${resource.tags.map(tag=>`<span>${safe(tag)}</span>`).join('')}</div>
      </div>
      <div class="resource-footer">
        <a href="${safe(resource.url)}" target="_blank" rel="noopener noreferrer" class="resource-open" aria-label="Abrir ${safe(resource.title)} em outra guia">${resource.type==='video'?'Assistir vídeo':'Acessar conteúdo'} ${svg('ic-arrow-up-right')}</a>
        <button class="resource-complete${isDone?' completed':''}" data-complete="${resource.id}" type="button" aria-pressed="${isDone}" aria-label="${isDone?'Desmarcar':'Marcar'} ${safe(resource.title)} como concluído"><span class="complete-circle">${svg('ic-check')}</span><span>${isDone?'Concluído':'Concluir'}</span></button>
      </div>
    </article>`;
  }).join('');
  const total=results.length;
  $('#resultSummary').textContent=`Exibindo ${total} de ${resources.length} ${total===1?'recurso':'recursos'} da trilha`;
  $('#emptyState').hidden=total!==0;
  updateTypeTabs();
}

function updateTypeTabs(){
  document.querySelectorAll('[data-filter]').forEach(button=>{
    const selected=button.dataset.filter===activeType;
    button.classList.toggle('filter-active',selected);
    button.setAttribute('aria-pressed',String(selected));
  });
}
function updateProgress(){
  const n=completed.size,total=resources.length,percent=Math.round(n/total*100);
  $('#progressLabel').textContent=`${n} de ${total} concluídos`;
  $('#progressPercent').textContent=`${percent}%`;
  $('#progressFill').style.width=`${percent}%`;
  $('#progressBar').setAttribute('aria-valuenow',String(n));
  $('#progressBar').setAttribute('aria-valuetext',`${percent}% da trilha concluída`);
  renderPhases();
}

function jumpToNext(){
  const next=resources.find(r=>!completed.has(r.id));
  if(!next){
    document.querySelector('#trilha').scrollIntoView({behavior:'smooth',block:'start'});
    showToast('Parabéns! Você concluiu todos os conteúdos da trilha.');
    return;
  }
  // Revele o item, mesmo quando a biblioteca estava filtrada.
  activeType='all';activePhase='all';searchText='';
  $('#searchInput').value='';$('#phaseFilter').value='all';
  renderResources();
  const card=document.getElementById(`resource-${next.id}`);
  card?.scrollIntoView({behavior:'smooth',block:'center'});
  if(card){card.classList.add('resource-target');setTimeout(()=>card.classList.remove('resource-target'),1900);}
}
function showPhase(phaseId){
  activePhase=String(phaseId);activeType='all';searchText='';
  $('#phaseFilter').value=String(phaseId);$('#searchInput').value='';
  renderResources();
  $('#biblioteca').scrollIntoView({behavior:'smooth',block:'start'});
}
function clearFilters(){
  activeType='all';activePhase='all';searchText='';
  $('#searchInput').value='';$('#phaseFilter').value='all';
  renderResources();
}

// Eventos centralizados: cards podem ser recriados pelos filtros sem perder listeners.
$('#resourceGrid').addEventListener('click',event=>{
  const control=event.target.closest('[data-complete]');
  if(!control)return;
  const {complete:id}=control.dataset;
  if(completed.has(id)){completed.delete(id);showToast('Recurso removido dos concluídos.');}
  else{completed.add(id);showToast('Boa! Estudo marcado como concluído.');}
  saveCompleted();updateProgress();renderResources();
});
$('#phaseGrid').addEventListener('click',event=>{
  const button=event.target.closest('[data-phase-jump]');
  if(button)showPhase(button.dataset.phaseJump);
});
$('#filters').addEventListener('click',event=>{
  const button=event.target.closest('[data-filter]');
  if(!button)return;
  activeType=button.dataset.filter;renderResources();
});
$('#searchInput').addEventListener('input',event=>{searchText=event.target.value;renderResources();});
$('#phaseFilter').addEventListener('change',event=>{activePhase=event.target.value;renderResources();});
$('#clearFilters').addEventListener('click',clearFilters);
$('#startButton').addEventListener('click',jumpToNext);
$('#continueButton').addEventListener('click',jumpToNext);
$('#endButton').addEventListener('click',()=>document.querySelector('#trilha').scrollIntoView({behavior:'smooth'}));
$('#resetProgress').addEventListener('click',()=>{
  if(!completed.size){showToast('Sua trilha já está no início.');return;}
  if(!window.confirm('Reiniciar seu progresso? Os itens marcados como concluídos serão desmarcados neste navegador.'))return;
  completed.clear();saveCompleted();updateProgress();renderResources();showToast('Progresso reiniciado.');
});
$('#menuButton').addEventListener('click',()=>{
  const opened=$('#mainNav').classList.toggle('open');
  $('#menuButton').setAttribute('aria-expanded',String(opened));
  $('#menuButton').setAttribute('aria-label',opened?'Fechar menu':'Abrir menu');
});
document.querySelectorAll('.main-nav a').forEach(link=>link.addEventListener('click',()=>{
  $('#mainNav').classList.remove('open');
  $('#menuButton').setAttribute('aria-expanded','false');
}));
document.addEventListener('keydown',event=>{
  if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){
    event.preventDefault();$('#searchInput').focus();document.querySelector('#biblioteca').scrollIntoView({behavior:'smooth'});
  }
  if(event.key==='Escape'){
    $('#mainNav').classList.remove('open');$('#menuButton').setAttribute('aria-expanded','false');
    if(document.activeElement===$('#searchInput'))$('#searchInput').blur();
  }
});

$('#totalBadge').textContent=String(resources.length);
$('#currentYear').textContent=String(new Date().getFullYear());
updateProgress();renderResources();
