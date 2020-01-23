'use strict';

{
const words = [
  'apple',
  'visual',
  'studio',
  'code',
  'dean',
  'deluca'
]

let word ;
let loc ;
let score ;
let miss ;
const timeLimit = 3 * 1000;
let startTime;
let isPlaying = false;
let accuracy;

const target = document.getElementById('target');
const scoreLabel = document.getElementById('score');
const missLabel = document.getElementById('miss');
const timerlabel = document.getElementById('timer');

function updateTarget(){
  let placeholder = '';
  for (let i = 0; i < loc; i++){
    placeholder += '_';
  }
  target.textContent = placeholder + word.substring(loc);
}

function updateTimer(){
  const timeleft = startTime + timeLimit - Date.now();
  timerlabel.textContent = (timeleft / 1000).toFixed(2);

  const timeoutId =  setTimeout(() => {
    updateTimer();
  }, 10);
  
  if(timeleft < 0){
    isPlaying = false;
    clearTimeout(timeoutId);
    timerlabel.textContent ="0.00";
    setTimeout(() => {
      showResult();
    }, 100);

    target.textContent = 'click to replay';
  }
}

function showResult(){
  if(score + miss === 0){
    accuracy = 0;
  } else {
    accuracy = score / (score + miss) * 100;
  }
  alert(`${score} letters, ${miss} misses, ${accuracy.toFixed(2)}% accuracy!`);
}

window.addEventListener('click', () => {
  if(isPlaying === true){
    return;
  }
  isPlaying = true;

  loc = 0;
  score = 0;
  miss = 0;
  scoreLabel.textContent = score;
  missLabel.textContent = miss;
  word = words[Math.floor(Math.random() * words.length)];

  target.textContent = word;
  startTime = Date.now();
  updateTimer();
  
})

window.addEventListener('keydown', (e) => {
  if(isPlaying !== true){
    return;
  }
  if(e.key === word[loc]){
    loc++;
    if(loc === word.length){
      word = words[Math.floor(Math.random()* words.length)];
      loc = 0;
    }
    updateTarget();
    score++;
    scoreLabel.textContent = score;
  } else {
    miss++;
    missLabel.textContent = miss;
  }
});

}