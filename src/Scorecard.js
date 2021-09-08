class Scorecard {
  #frames

  constructor() {
    this.#frames = []
    for (let i = 0; i < 10; i++) {
      this.#frames.push(new Frame())
    }
  }

  addRoll(nbOfPins) {
    for (let i = 0; i < 10; i++) {
      if (this.#frames[i].addRoll(nbOfPins)) {
        return
      }
    }
  }

  totalScore() {
    console.log(this.#frames)
    return this.#frames.reduce((acc, el) => acc + el.score(), 0)
  }
}