describe("LegalChipDraws", function() {
  it("should calcuate the allowed draws given a set of chips", function() {
  	var chips = new Tuple(4, 4, 4, 4, 4);
  	var draws = LegalChipDraws(chips);
    expect(draws.length).toBe(15);

  	chips = new Tuple(3, 4, 4, 4, 4);
  	draws = LegalChipDraws(chips);
    expect(draws.length).toBe(14);

  	chips = new Tuple(1, 0, 2, 0, 4);
  	draws = LegalChipDraws(chips);
    expect(draws.length).toBe(2);
  });
});