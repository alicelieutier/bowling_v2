
function log(data) {
  console.log(JSON.stringify(data))
}

class Scorecard {
  #frames

  constructor() {
    this.#frames = []
    for (let i = 0; i < 10; i++) {
      this.#frames.push(new Frame())
    }
  }

  addRoll(nbOfPins) {
    const bonusNeedingFrames = this.#frames.filter(frame => frame.status() === 'BONUS_NEEDED')
    bonusNeedingFrames.forEach(frame => frame.addRoll(nbOfPins))
    
    const currentFrame = this.#currentFrame()
    currentFrame && currentFrame.addRoll(nbOfPins)
  }

  isGameFinished() {
    return this.#frames.filter(frame => frame.status() !== 'DONE').length === 0
  }

  maxPinsForNextRoll() {
    if (this.#currentFrame()) {
      return this.#currentFrame().pinsLeft()
    }
    // we are in the tenth bonus frame, or the game has ended
    return this.#frames[9].pinsLeft()
  }

  totalScore() {
    return this.#frames.reduce((total, frame) => total + frame.score(), 0)
  }

  displayData() {
    let [_, result] = this.#frames.reduce(
      (acc, frame) => {
        let [runningScore, data] = acc
        data.push(frame.displayData(runningScore))
        return [runningScore + frame.score(), data]
      },
      [0, []]
    )
    return result;
  }

  #currentFrame() {
    return this.#frames.find(frame => frame.status() === 'OPEN')
  }
}