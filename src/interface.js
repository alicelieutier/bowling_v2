
// Build the input
function createInputButton(displayString, callback) {
  const button = document.createElement('button')
  button.innerText = displayString
  button.addEventListener('click', callback)
  return button
}

function createButtons(callback, maxPins = 10) {
  const div = document.createElement('div')
  div.innerHTML = '<p>Enter your roll:</p>'
  for (let i = 0; i <= maxPins; i++) {
    div.appendChild(createInputButton(i.toString(), () => callback(i)))
  }
  // div.appendChild(createInputButton('/', () => callback(maxPins)))
  // div.appendChild(createInputButton('X', () => callback(maxPins)))
  return div
}

function createInput(callback, maxPins = 10) {
  let div = createButtons(callback, maxPins)
  const input = document.getElementById("input")
  input.innerHTML = ''
  input.appendChild(div)
}

// Build the scores
function createFrame({rolls, bonuses, cumulativeScore}) {
  // { rolls: ['X'], bonuses: [0,1], cumulativeScore: 60}
  const div = document.createElement('div')
  div.className = 'frame'
  const html = `
    <div class="rolls">${rolls.join(' | ')}</div>
    <div class="score tooltip">
      ${cumulativeScore}
      ${bonuses.length > 0 ? `<span class="tooltip-text">Bonus: ${bonuses}</span>` : ''}
    </div>
  `
  div.innerHTML = html
  return div
}

function createScorecard(scorecard) {
  const div = document.createElement('div')
  div.className = 'scorecard'
  scorecard.displayData().forEach(element => {
    div.appendChild(createFrame(element))
  });
  return div
}

function displayScores(scorecard) {
  const scores = document.getElementById("scores")
  scores.innerHTML = ''
  scores.appendChild(createScorecard(scorecard))  
}

const s = new Scorecard()
displayScores(s)

function updateScores(pins) {
  s.addRoll(pins)
  displayScores(s)
  if (!s.isGameFinished()) {
    createInput(updateScores, s.maxPinsForNextRoll())
  } else {
    const input = document.getElementById("input")
    input.innerHTML = '<p>Game over!</p>'
  }
}

createInput(updateScores, s.maxPinsForNextRoll())
