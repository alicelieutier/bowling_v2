const sum = (array) => {
  return array.reduce((a,b) => a + b, 0)
}

class Frame {
  #rolls;
  #bonuses;

  constructor() {
    this.#rolls = []
    this.#bonuses = []
  }

  /* returns the status of a frame
  * OPEN - still needs some rolls
  * BONUS_NEEDED - doesn't need more rolls
  *    but is expecting some bonus rolls
  * DONE - Has all rolls and bonuses needed.
  *   Score for DONE frames is the final score.
  */
  status() {
    if (!this.#isFinishedRolling()) {
      return 'OPEN'
    }
    if (this.#needsBonus()) {
      return 'BONUS_NEEDED'
    }
    return 'DONE'
  }

  addRoll(nbOfPins) {
    switch (this.status()) {
      case 'OPEN':
        this.#rolls.push(nbOfPins)
        break;
      case 'BONUS_NEEDED':
        this.#bonuses.push(nbOfPins)
        break;
    }
  }

  pinsLeft() {
    switch (this.status()) {
      case 'OPEN':
        return 10 - (this.#rolls[0] || 0)
      case 'BONUS_NEEDED':
        // return 10 if first bonus OR
        // if second bonus and first bonus was 0 or 10
        return 10 - (this.#bonuses[0] || 0) % 10
      case 'DONE':
        return undefined
    }
  }

  score() {
    return sum(this.#rolls) + sum(this.#bonuses)
  }

  displayData(previousScore = 0) {
    return {
      rolls: this.#rollsForDisplay(),
      bonuses: this.#bonuses,
      cumulativeScore: this.score() + previousScore,
    }
  }

  #rollsForDisplay() {
    if (this.#isStrike()) {
      return ['X']
    }
    if (this.#isSpare()) {
      return [this.#rolls[0].toString(), '/']
    }
    return this.#rolls.map((roll) => roll.toString())
  }

  #isFinishedRolling() {
    return (
      this.#rolls.length === 2
      || this.#isStrike() && this.#rolls.length === 1
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
      this.#isSpare() && this.#bonuses.length < 1
      || this.#isStrike() && this.#bonuses.length < 2
    )
  }
}