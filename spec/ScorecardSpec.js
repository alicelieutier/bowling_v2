describe('Scorecard', function(){

    describe('.totalScore - calculates the score of a game', function(){
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
    describe('.displayData - creates data to display for a game', function(){
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
            expect(scorecard.displayData()).toEqual([
                {rolls: ['1','4'], bonuses: [], cumulativeScore: 5},
                {rolls: ['4','5'], bonuses: [], cumulativeScore: 14},
                {rolls: ['6','/'], bonuses: [5], cumulativeScore: 29},
                {rolls: ['5','/'], bonuses: [10], cumulativeScore: 49},
                {rolls: ['X'], bonuses: [0,1], cumulativeScore: 60},
                {rolls: ['0','1'], bonuses: [], cumulativeScore: 61},
                {rolls: ['7','/'], bonuses: [6], cumulativeScore: 77},
                {rolls: ['6','/'], bonuses: [10], cumulativeScore: 97},
                {rolls: ['X'], bonuses: [2, 8], cumulativeScore: 117},
                {rolls: ['2','/'], bonuses: [6], cumulativeScore: 133},
            ])
        })
    })
    describe('.isGameFinished - returns true if the game is complete', function() {
        it("returns false if missing a frame", function() {
            let scorecard = new Scorecard()
            scorecard.addRoll(10) // 1
            scorecard.addRoll(10) // 2
            scorecard.addRoll(10) // 3
            scorecard.addRoll(10) // 4
            scorecard.addRoll(10) // 5
            scorecard.addRoll(10) // 6
            scorecard.addRoll(10) // 7
            scorecard.addRoll(10) // 8
            
            scorecard.addRoll(0) 
            scorecard.addRoll(4) // 9

            expect(scorecard.isGameFinished()).toEqual(false)
        })

        it("returns false if missing a roll", function() {
            let scorecard = new Scorecard()
            scorecard.addRoll(10) // 1
            scorecard.addRoll(10) // 2
            scorecard.addRoll(10) // 3
            scorecard.addRoll(10) // 4
            scorecard.addRoll(10) // 5
            scorecard.addRoll(10) // 6
            scorecard.addRoll(10) // 7
            scorecard.addRoll(10) // 8
            
            scorecard.addRoll(0) 
            scorecard.addRoll(4) // 9

            scorecard.addRoll(2) // unfinished tenth frame
            
            expect(scorecard.isGameFinished()).toEqual(false)
        })
          
        it("returns false if missing bonus rolls at the end", function() {
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

            scorecard.addRoll(3)
            // missing one bonus roll
            expect(scorecard.isGameFinished()).toEqual(false)
        })

        it("returns true if all frames are complete - no bonuses", function() {
            let scorecard = new Scorecard()
            scorecard.addRoll(10) // 1
            scorecard.addRoll(10) // 2
            scorecard.addRoll(10) // 3
            scorecard.addRoll(10) // 4
            scorecard.addRoll(10) // 5
            scorecard.addRoll(10) // 6
            scorecard.addRoll(10) // 7
            scorecard.addRoll(10) // 8
            
            scorecard.addRoll(0) 
            scorecard.addRoll(4) // 9

            scorecard.addRoll(2)
            scorecard.addRoll(6) // 10

            expect(scorecard.isGameFinished()).toEqual(true)
        })

        it("returns true if all frames are complete with bonuses", function() {
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
            scorecard.addRoll(6)
            scorecard.addRoll(3)
            expect(scorecard.isGameFinished()).toEqual(true)
        })
    })
    describe('.maxPinsForNextRoll - returns max number of pins the player can roll next', function() {
        it("returns 10 at the start of a frame", function() {
            let scorecard = new Scorecard()
            scorecard.addRoll(6)
            scorecard.addRoll(2)
            expect(scorecard.maxPinsForNextRoll()).toEqual(10)
        })
        
        it("returns 10 at the start of a frame - Strike", function() {
            let scorecard = new Scorecard()
            scorecard.addRoll(10) // 1
            expect(scorecard.maxPinsForNextRoll()).toEqual(10)
        })

        it("returns the complement to ten on the second roll of a frame (7, 3)", function() {
            let scorecard = new Scorecard()
            scorecard.addRoll(7)
            expect(scorecard.maxPinsForNextRoll()).toEqual(3)
        })

        it("returns the complement to ten on the second roll of a frame (0, 10)", function() {
            let scorecard = new Scorecard()
            scorecard.addRoll(0)
            expect(scorecard.maxPinsForNextRoll()).toEqual(10)
        })

        it("returns the complement to ten on the second roll of a frame (9, 1)", function() {
            let scorecard = new Scorecard()
            scorecard.addRoll(9)
            expect(scorecard.maxPinsForNextRoll()).toEqual(1)
        })

        it("returns 10 on first tenth frame bonus roll", function() {
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

            expect(scorecard.maxPinsForNextRoll()).toEqual(10)
        })

        it("returns the complement to 10 on second tenth frame bonus roll", function() {
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

            scorecard.addRoll(6) // first tenth frame bonus

            expect(scorecard.maxPinsForNextRoll()).toEqual(4)
        })
    })
})