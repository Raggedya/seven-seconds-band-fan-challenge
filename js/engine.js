(function exposeEngine(scope){
  "use strict";
  function shuffle(items,random=Math.random){const copy=[...items];for(let i=copy.length-1;i>0;i-=1){const j=Math.floor(random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]]}return copy}
  function prepareQuestions(items,count,random=Math.random){return shuffle(items.filter(item=>item.active),random).slice(0,count).map(item=>({...item,options:shuffle(item.options,random)}))}
  function classificationFor(score,classifications,band){const match=classifications.find(item=>score>=item.min&&score<=item.max)||classifications[0];return{...match,message:match.message.replaceAll("{band}",band)}}
  function calculateStats(answers,total){const correct=answers.filter(a=>a.correct).length;const unanswered=answers.filter(a=>a.unanswered).length;const incorrect=total-correct-unanswered;const times=answers.filter(a=>!a.unanswered).map(a=>a.responseSeconds);const totalResponseTime=times.reduce((sum,time)=>sum+time,0);const averageResponseTime=times.length?totalResponseTime/times.length:0;const correctTimes=answers.filter(a=>a.correct).map(a=>a.responseSeconds);return{correct,incorrect,unanswered,totalResponseTime,averageResponseTime,fastestCorrect:correctTimes.length?Math.min(...correctTimes):null,accuracy:total?Math.round(correct/total*100):0}}
  scope.SevenSecondsBandEngine={shuffle,prepareQuestions,classificationFor,calculateStats};
})(typeof window!=="undefined"?window:globalThis);

