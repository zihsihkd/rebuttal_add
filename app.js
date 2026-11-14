"use strict";
const media=window.VIDEO_MEDIA||[],byId=new Map(media.map(m=>[m.id,m]));
const names={DramaR2:'DramaR²',MovieAgent:'MovieAgent',VGoT:'VGoT',ViMax:'ViMax',VideoClaw:'VideoClaw'};
const $=id=>document.getElementById(id);
let currentEpisode=1,currentRound=12,currentMethod='DramaR2',toastTimer;
const methodId=()=>`comparison-${currentMethod.toLowerCase()}`;
const pairId=round=>`rsi-round-${round}-episode-${currentEpisode}`;
const clock=s=>{const n=Math.round(s);return `${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`};
function toast(s){clearTimeout(toastTimer);$('toast').textContent=s;$('toast').hidden=false;toastTimer=setTimeout(()=>$('toast').hidden=true,3000)}
function bindVideo(v,m){if(!m)return;v.pause();v.poster=m.poster;v.src=m.src;v.style.aspectRatio=`${m.width}/${m.height}`;v.load()}
function renderMethod(){
 const m=byId.get(methodId());if(!m)return;bindVideo($('method-video'),m);
 document.querySelector('.method-player').classList.toggle('portrait',m.height>m.width);
 $('method-summary').textContent='A florist and an aristocratic passenger meet aboard an ocean liner and promise to share three sunsets before the voyage ends.';
 $('method-focus').textContent='Figure 3 in the paper · English source · Romance · Landscape. Full videos from all five methods.';
 $('method-meta').textContent=names[currentMethod]+' · '+clock(m.duration)+' · '+m.width+' × '+m.height;
 document.querySelectorAll('[data-method]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.method===currentMethod)));
}
function audio(){const c=$('audio-source').value;['before','after'].forEach(n=>$(n+'-video').muted=c!==n)}
function renderPair(){
 $('after-title').textContent=`Round ${currentRound}`+(currentRound===12?' · DramaR²':'');
 for(const [c,r] of [['before',0],['after',currentRound]]){
  const m=byId.get(pairId(r));bindVideo($(c+'-video'),m);
  $(c+'-meta').textContent=`Episode ${currentEpisode} · ${clock(m.duration)} · ${m.width} × ${m.height}`;
 }
 document.querySelectorAll('[data-round]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.round===currentRound)));
 document.querySelectorAll('[data-episode]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.episode===currentEpisode)));
 audio();$('play-both').textContent='Play both';
}
function route(){
 const h=decodeURIComponent(location.hash.slice(1)),pair=h.match(/^rsi-round-(6|9|12)-ep([12])$/);
 if(pair){currentRound=+pair[1];currentEpisode=+pair[2];renderPair();$('rsi').scrollIntoView();return}
 const m=byId.get(h.startsWith('video-')?h.slice(6):h);
 if(m?.group==='comparison'){currentMethod=m.method;renderMethod();$('comparison').scrollIntoView()}
 else if(m?.group==='rsi'){currentRound=m.round||12;currentEpisode=m.episode;renderPair();$('rsi').scrollIntoView()}
 else if(h==='harness')$('workflow-step-8').scrollIntoView();
}
$('method-options').innerHTML=Object.keys(names).map(m=>`<button data-method="${m}" type="button" aria-pressed="${m===currentMethod}">${names[m]}</button>`).join('');
document.querySelectorAll('[data-method]').forEach(b=>b.addEventListener('click',()=>{currentMethod=b.dataset.method;renderMethod()}));
document.querySelectorAll('[data-episode]').forEach(b=>b.addEventListener('click',()=>{currentEpisode=+b.dataset.episode;renderPair()}));
document.querySelectorAll('[data-round]').forEach(b=>b.addEventListener('click',()=>{currentRound=+b.dataset.round;renderPair()}));
document.querySelectorAll('[data-section]').forEach(b=>b.addEventListener('click',()=>$(b.dataset.section).scrollIntoView({behavior:'smooth'})));
$('audio-source').addEventListener('change',audio);
$('reset-both').addEventListener('click',()=>{['before','after'].forEach(c=>{const v=$(c+'-video');v.pause();v.currentTime=0});$('play-both').textContent='Play both'});
$('play-both').addEventListener('click',async()=>{
 const a=$('before-video'),b=$('after-video');if(!a.paused||!b.paused){a.pause();b.pause();return}
 document.querySelectorAll('video').forEach(v=>{if(v!==a&&v!==b)v.pause()});audio();
 const results=await Promise.allSettled([a.play(),b.play()]);
 if(results.some(r=>r.status==='rejected')){a.pause();b.pause();toast('Use each video’s play button to start.')}
});
for(const id of ['before-video','after-video'])for(const event of ['play','pause','ended'])$(id).addEventListener(event,()=>{$('play-both').textContent=(!$('before-video').paused||!$('after-video').paused)?'Pause both':'Play both'});
document.querySelectorAll('video').forEach(v=>{
 v.addEventListener('error',()=>toast('Video could not load. Please reload the page.'));
 v.addEventListener('play',()=>document.querySelectorAll('video').forEach(other=>{
  const groups=[['before-video','after-video'],['variation-1','variation-2','variation-3']];
  if(other!==v&&!groups.some(g=>g.includes(v.id)&&g.includes(other.id)))other.pause();
 }));
});
const seedPlayers=[1,2,3].map(n=>$('variation-'+n));
const setSeedAudio=()=>{const n=Number($('seed-audio').value);seedPlayers.forEach((v,i)=>v.muted=n!==i+1)};
$('seed-audio').addEventListener('change',setSeedAudio);
$('seed-play').addEventListener('click',()=>{setSeedAudio();Promise.allSettled(seedPlayers.map(v=>v.play()))});
$('seed-pause').addEventListener('click',()=>seedPlayers.forEach(v=>v.pause()));
$('seed-reset').addEventListener('click',()=>seedPlayers.forEach(v=>{v.pause();v.currentTime=0}));
window.addEventListener('hashchange',route);
renderMethod();renderPair();setSeedAudio();route();
