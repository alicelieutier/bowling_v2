# New Bowling 🎳

New code design for a bowling challenge with an interface

The idea is that a scorecard starts with 10 empty frames
The last one is a special frame

Each roll is sent to all the frames in order until consumed.

Scorecard
#frames
.addRoll
.totalScore
.displayString

Frame
#rolls
.addRoll | returns true if the roll is consumed
.score
.displayString
