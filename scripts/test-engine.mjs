import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

await import(pathToFileURL(path.resolve('js/engine.js')));
const E=globalThis.SevenSecondsBandEngine;
const questions=JSON.parse(await fs.readFile('data/questions.json','utf8'));
const config=JSON.parse(await fs.readFile('config/band.json','utf8'));

const bank=new E.FreshQuestionBank(questions,config.questionMix,()=>.42);
const firstRound=bank.nextRound();
assert.equal(firstRound.length,12);
assert.equal(new Set(firstRound.map(question=>question.id)).size,12);
assert.deepEqual(
  firstRound.reduce((counts,question)=>({...counts,[question.difficulty]:counts[question.difficulty]+1}),{easy:0,medium:0,hard:0}),
  {easy:3,medium:6,hard:3}
);
assert.ok(firstRound.every(question=>question.options.length===4));
const secondRound=bank.nextRound();
assert.equal(secondRound.length,12,'The complete 12-question bank should reset for replay.');
assert.equal(new Set(secondRound.map(question=>question.id)).size,12);

const expectedRankings=new Map([[0,'Curious Listener'],[3,'Curious Listener'],[4,'Proper Fan'],[6,'Proper Fan'],[7,'Deep Cut Disciple'],[9,'Deep Cut Disciple'],[10,'Band Historian'],[11,'Band Historian'],[12,'How Did You Know That?!']]);
for(const[score,label]of expectedRankings)assert.equal(E.classificationFor(score,config.classifications,config.bandName).label,label);

const stats=E.calculateStats([
  {correct:true,unanswered:false,responseSeconds:2},
  {correct:false,unanswered:false,responseSeconds:4},
  {correct:false,unanswered:true,responseSeconds:7}
],3);
assert.deepEqual({correct:stats.correct,incorrect:stats.incorrect,unanswered:stats.unanswered},{correct:1,incorrect:1,unanswered:1});
assert.equal(stats.averageResponseTime,3);
assert.equal(stats.fastestCorrect,2);
console.log('Engine tests passed: 12-question mix, replay reset, rankings and statistics.');
