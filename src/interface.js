
// Build the input
function createInputButton(displayString, callback) {
  const button = document.createElement('button')
  button.innerText = displayString
  button.addEventListener('click', callback)
  return button
}

function createButtons(firstRoll = true, maxPins = 10) {
  const div = document.createElement('div')
  for (let i = 0; i < maxPins; i++) {
    div.appendChild(createInputButton(i.toString(), () => console.log(i)))
  }
  div.appendChild(createInputButton('X', () => console.log(10)))
  return div
}

let div = createButtons()
const input = document.getElementById("input")
input.appendChild(div)

// Build the scores
function createFrame({rolls, bonuses, cumulativeScore}) {
  // { rolls: ['X'], bonuses: [0,1], cumulativeScore: 60}
  const div = document.createElement('div')
  const html = `
    <div>${rolls.join(' | ')}</div>
    <div>${cumulativeScore}</div>
  `
  div.innerHTML = html
  return div
}

function createScorecard(scorecard) {
  const div = document.createElement('div')
  scorecard.displayData().forEach(element => {
    div.appendChild(createFrame(element))
  });
  return div
}

function displayScores(scorecard) {
  const scores = document.getElementById("scores")
  scores.appendChild(createScorecard(scorecard))  
}

const s = new Scorecard()
displayScores(s)