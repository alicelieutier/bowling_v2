describe('Scorecard', function(){

// #frames
// .addRoll
// .totalScore
// .displayString
    describe('calculates the score of a game', function(){
        it('1,2,1,2 returns 6', function() {
            let scorecard = new Scorecard()
            scorecard.addRoll(1)
            scorecard.addRoll(2)
            scorecard.addRoll(1)
            scorecard.addRoll(2)
            expect(scorecard.totalScore()).toEqual(6)
        })

        it('1,1,1 returns 3', function() {
            let scorecard = new Scorecard()
            scorecard.addRoll(1)
            scorecard.addRoll(1)
            scorecard.addRoll(1)
            expect(scorecard.totalScore()).toEqual(3)
        })

        it('10,1,1 returns 14 - Strike bonuses', function() {
            let scorecard = new Scorecard()
            scorecard.addRoll(10)
            scorecard.addRoll(1)
            scorecard.addRoll(1)
            expect(scorecard.totalScore()).toEqual(14)
        })

        it('7,3,3 returns 16 - Spare bonuses', function() {
            let scorecard = new Scorecard()
            scorecard.addRoll(7)
            scorecard.addRoll(3)
            scorecard.addRoll(3)
            expect(scorecard.totalScore()).toEqual(16)
        })

        it('0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 returns 0 - Gutter game', function() {
            let scorecard = new Scorecard()
            scorecard.addRoll(0)
            scorecard.addRoll(0)
            scorecard.addRoll(0)
            scorecard.addRoll(0)
            scorecard.addRoll(0)
            scorecard.addRoll(0)
            scorecard.addRoll(0)
            scorecard.addRoll(0)
            scorecard.addRoll(0)
            scorecard.addRoll(0)
            scorecard.addRoll(0)
            scorecard.addRoll(0)
            scorecard.addRoll(0)
            scorecard.addRoll(0)
            scorecard.addRoll(0)
            scorecard.addRoll(0)
            scorecard.addRoll(0)
            scorecard.addRoll(0)
            scorecard.addRoll(0)
            scorecard.addRoll(0)
            expect(scorecard.totalScore()).toEqual(0)
        })

        it('10,10,10,10,10,10,10,10,10,10,10,10 returns 300 - Perfect game', function() {
            let scorecard = new Scorecard()
            scorecard.addRoll(10)
            scorecard.addRoll(10)
            scorecard.addRoll(10)
            scorecard.addRoll(10)
            scorecard.addRoll(10)
            scorecard.addRoll(10)
            scorecard.addRoll(10)
            scorecard.addRoll(10)
            scorecard.addRoll(10)
            scorecard.addRoll(10)
            // bonus rolls
            scorecard.addRoll(10)
            scorecard.addRoll(10)
            expect(scorecard.totalScore()).toEqual(300)
        })

        it('1,4,4,5,6,4,5,5,10,0,1,7,3,6,4,10,2,8,6 returns 133 - Typical game', function() {
            let scorecard = new Scorecard()
            scorecard.addRoll(1)
            scorecard.addRoll(4)

            scorecard.addRoll(4)
            scorecard.addRoll(5)

            scorecard.addRoll(6)
            scorecard.addRoll(4)

            scorecard.addRoll(5)
            scorecard.addRoll(5)

            scorecard.addRoll(10)

            scorecard.addRoll(0)
            scorecard.addRoll(1)

            scorecard.addRoll(7)
            scorecard.addRoll(3)

            scorecard.addRoll(6)
            scorecard.addRoll(4)

            scorecard.addRoll(10)

            scorecard.addRoll(2)
            scorecard.addRoll(8)
            scorecard.addRoll(6) // bonus roll
            expect(scorecard.totalScore()).toEqual(133)
        })
    })
})