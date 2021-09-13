describe('Frame', function(){

  // #rolls
  // .addRoll | returns true if the roll is consumed
  // .score
  // .displayString
  
  describe('.score - calculates the score of a frame', function(){
    it('1,2 returns 3', function() {
      let frame = new Frame()
      frame.addRoll(1)
      frame.addRoll(2)
      expect(frame.score()).toEqual(3)
    })
    
    it('10,2,5 returns 17 - Strike', function() {
      let frame = new Frame()
      frame.addRoll(10)
      frame.addRoll(2)
      frame.addRoll(5)
      expect(frame.score()).toEqual(17)
    }) 

    it('1,9,5 returns 15 - Spare', function() {
      let frame = new Frame()
      frame.addRoll(1)
      frame.addRoll(9)
      frame.addRoll(5)
      console.log(JSON.stringify(frame.displayData()))
      expect(frame.score()).toEqual(15)
    })

    it("Doesn't take into account more rolls than needed", function() {
      let frame = new Frame()
      frame.addRoll(0)
      frame.addRoll(10)
      frame.addRoll(7)
      frame.addRoll(1)
      frame.addRoll(9)
      frame.addRoll(5)
      expect(frame.score()).toEqual(17)
    }) 

  })

  describe('.displayData - creates display data for a frame', function(){
    it("1,2 returns {rolls: ['1','2'], bonuses: [], cumulativeScore: 3}", function() {
      let frame = new Frame()
      frame.addRoll(1)
      frame.addRoll(2)
      expect(frame.displayData()).toEqual({rolls: ['1','2'], bonuses: [], cumulativeScore: 3})
    })
    
    it("10,2,5 returns {rolls: ['X'], bonuses: [2, 5], cumulativeScore: 17} - Strike", function() {
      let frame = new Frame()
      frame.addRoll(10)
      frame.addRoll(2)
      frame.addRoll(5)
      expect(frame.displayData()).toEqual({rolls: ['X'], bonuses: [2, 5], cumulativeScore: 17})
    }) 

    it("1,9,5 returns {rolls: ['1','/'], bonuses: [5], cumulativeScore: 15} - Spare", function() {
      let frame = new Frame()
      frame.addRoll(1)
      frame.addRoll(9)
      frame.addRoll(5)
      expect(frame.displayData()).toEqual({rolls: ['1','/'], bonuses: [5], cumulativeScore: 15})
    })

    it("Calculates cumulative score correctly", function() {
      let frame = new Frame()
      frame.addRoll(5)
      frame.addRoll(3)
      expect(frame.displayData(20)).toEqual({rolls: ['5','3'], bonuses: [], cumulativeScore: 28})
    })
  })

  describe('.status - returns the status of a frame', function(){
    it("returns 'OPEN' if waiting for first roll", function() {
      let frame = new Frame()
      expect(frame.status()).toEqual('OPEN')
    })
    
    it("returns 'OPEN' if waiting for second roll", function() {
      let frame = new Frame()
      frame.addRoll(4)
      expect(frame.status()).toEqual('OPEN')
    })

    it("returns 'BONUS_NEEDED' if waiting for a bonus - Spare", function() {
      let frame = new Frame()
      frame.addRoll(4)
      frame.addRoll(6)
      expect(frame.status()).toEqual('BONUS_NEEDED')
    })

    it("returns 'BONUS_NEEDED' if waiting for a bonus - Strike, first bonus", function() {
      let frame = new Frame()
      frame.addRoll(10)
      expect(frame.status()).toEqual('BONUS_NEEDED')
    })

    it("returns 'BONUS_NEEDED' if waiting for a bonus - Strike, second bonus", function() {
      let frame = new Frame()
      frame.addRoll(10)
      frame.addRoll(4)
      expect(frame.status()).toEqual('BONUS_NEEDED')
    })

    it("returns 'DONE' if it doesn't need any more rolls", function() {
      let frame = new Frame()
      frame.addRoll(3)
      frame.addRoll(4)
      expect(frame.status()).toEqual('DONE')
    })

    it("returns 'DONE' if it doesn't need any more rolls - Strike", function() {
      let frame = new Frame()
      frame.addRoll(10)
      frame.addRoll(4)
      frame.addRoll(6)
      expect(frame.status()).toEqual('DONE')
    })

    it("returns 'DONE' if it doesn't need any more rolls - Spare", function() {
      let frame = new Frame()
      frame.addRoll(8)
      frame.addRoll(2)
      frame.addRoll(6)
      expect(frame.status()).toEqual('DONE')
    })
  })

  describe('.pinsLeft - calculates the number of pins left for a frame', function(){
    it("returns 10 for first rolls", function() {
      let frame = new Frame()
      expect(frame.pinsLeft()).toEqual(10)
    })
    
    it("returns correct number for second roll", function() {
      let frame = new Frame()
      frame.addRoll(4)
      expect(frame.pinsLeft()).toEqual(6)
    }) 

    it("returns undefined when roll is finished - zero bonus needed", function() {
      let frame = new Frame()
      frame.addRoll(4)
      frame.addRoll(3)
      expect(frame.pinsLeft()).toBe(undefined)
    })

    it("returns undefined when roll is finished - no more bonus needed", function() {
      let frame = new Frame()
      frame.addRoll(4)
      frame.addRoll(6)
      frame.addRoll(4)
      expect(frame.pinsLeft()).toBe(undefined)
    }) 

    it("returns 10 when roll is finished but needs a first bonus", function() {
      let frame = new Frame()
      frame.addRoll(10)
      expect(frame.pinsLeft()).toBe(10)
    })

    it("returns the complement to 10 when roll is finished but needs a second bonus", function() {
      let frame = new Frame()
      frame.addRoll(10)
      frame.addRoll(3)
      expect(frame.pinsLeft()).toBe(7)
    }) 
  })
})