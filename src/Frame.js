class Frame {
  #rolls;

  constructor() {
    this.#rolls = []
  }

  addRoll(nbOfPins) {
    if (!this.#isFinishedRolling()) {
      this.#rolls.push(nbOfPins)
      return true
    }
    if (this.#needsBonus()) {
      this.#rolls.push(nbOfPins)
    }
    return false
  }

  score() {
    return this.#rolls.reduce((a,b) => a + b, 0)
  }

  #isFinishedRolling() {
    return (
      this.#rolls.length >= 2
      || this.#isStrike() && this.#rolls.length >= 1
    )
  }

  #isSpare() {
    return this.#rolls[0] + this.#rolls[1] === 10
  }

  #isStrike() {
    return this.#rolls[0] === 10
  }

  #needsBonus() {
    return (
      this.#isSpare() && this.#rolls.length < 3
      || this.#isStrike() && this.#rolls.length < 3
    )
  }
}