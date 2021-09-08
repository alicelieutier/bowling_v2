class Scorecard {
  #rolls

  constructor() {
    this.#rolls = 0
  }

  addRoll(nbOfPins) {
    this.#rolls += nbOfPins
  }

  totalScore() {
    return this.#rolls
  }
}