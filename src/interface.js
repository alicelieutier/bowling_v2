
// Build the input area

function createOneButton(displayString, callback) {
  const button = document.createElement('button')
  button.innerText = displayString
  button.addEventListener('click', callback)
  return button
}

function createButtons(callback, maxPins = 10) {
  const div = document.createElement('div')
  div.innerHTML = '<p>Enter your roll:</p>'
  for (let i = 0; i <= maxPins; i++) {
    div.appendChild(createOneButton(i.toString(), () => callback(i)))
  }
  return div
}

function createInputArea(callback, maxPins = 10) {
  let div = createButtons(callback, maxPins)
  const input = document.getElementById("input")
  input.innerHTML = ''
  input.appendChild(div)
}

// Build the scorecard

function createFrame({rolls, bonuses, cumulativeScore}) {
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

function updateScores(pins) {
  s.addRoll(pins)
  displayScores(s)
  if (!s.isGameFinished()) {
    createInputArea(updateScores, s.maxPinsForNextRoll())
  } else {
    const input = document.getElementById("input")
    input.innerHTML = `
      <p>Game over!</p>
      <p>You scored ${s.totalScore()} points.</p>
      <button onclick="location.reload();">New game?</button>
    `
  }
}

displayScores(s)
createInputArea(updateScores, s.maxPinsForNextRoll())



