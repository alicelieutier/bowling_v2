# New Bowling 🎳

Try me at [bawdy-snails.surge.sh](https://bawdy-snails.surge.sh/)

New code design for a bowling challenge with an interface

The idea is that a scorecard starts with 10 empty frames

Each roll is sent to the first open frame, and all frames that still need bonuses. No special case for the tenth frame.

The game ends when no more frame are open or need bonuses.

## Classes public interface:

#### Scorecard
- `.addRoll` - takes the number of pins rolled, distributes it to frames.
- `.totalScore`

   For the UI:
- `.displayData`
- `.isGameFinished`
- `.maxPinsForNextRoll`

#### Frame
- `.status` - OPEN, BONUS_NEEDED or DONE
- `.addRoll` - takes the number of pins rolled
- `.score`

   For the UI:
- `.pinsLeft`
- `.displayData`

## Testing

My tests are not isolated currently. That is - scorecard tests act more like feature tests. This is because I wrote them first, in order to support the whole system. If I come back to this is will be to add some isolated tests to scorecard.
