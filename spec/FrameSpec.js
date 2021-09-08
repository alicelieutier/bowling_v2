describe('Frame', function(){

  // #rolls
  // .addRoll | returns true if the roll is consumed
  // .score
  // .displayString
  
  describe('calculates the score of a frame', function(){
    it('1,2 returns 6', function() {
      let frame = new Frame()
      frame.addRoll(1)
      frame.addRoll(2)
      expect(frame.score()).toEqual(3)
    })    
  })
})