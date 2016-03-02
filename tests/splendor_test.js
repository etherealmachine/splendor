describe("Splendor.Game", function() {
  it("should create a new game with the right number of nobles", function() {
  	var game = new Splendor.Game(2);
    expect(game.nobles.length).toBe(3);
  });
});

describe("Splendor.Player.payment", function() {
  it("should assess payment required for a card", function() {
  	var player = new Splendor.Player();
  	player.chips.diamond = 2;
  	player.chips.sapphire = 2;
  	player.chips.emerald = 3;
  	player.chips.ruby = 2;
  	var card = {
			diamond: 1,
			sapphire: 1,
			emerald: 1,
			ruby: 1,
			onyx: 0
  	};
    expect(player.payment(card)).toEqual({
			diamond: 1,
			sapphire: 1,
			emerald: 1,
			ruby: 1,
			onyx: 0,
			gold: 0
    });
  });
  it("should return null if the player cannot pay", function() {
  	var player = new Splendor.Player();
  	player.chips.diamond = 0;
  	player.chips.sapphire = 2;
  	player.chips.emerald = 3;
  	player.chips.ruby = 2;
  	var card = {
			diamond: 1,
			sapphire: 1,
			emerald: 1,
			ruby: 1,
			onyx: 0
  	};
    expect(player.payment(card)).toBeNull();
  });
  it("should use gold if necessary", function() {
  	var player = new Splendor.Player();
  	player.chips.diamond = 1;
  	player.chips.sapphire = 1;
  	player.chips.emerald = 2;
  	player.chips.ruby = 2;
  	player.chips.onyx = 2;
  	player.chips.gold = 1;
  	var card = {
			diamond: 0,
			sapphire: 2,
			emerald: 0,
			ruby: 2,
			onyx: 0
  	};
    expect(player.payment(card)).toEqual({
			diamond: 0,
			sapphire: 1,
			emerald: 0,
			ruby: 2,
			onyx: 0,
			gold: 1
    });
  });
  it("should use bonus if possible", function() {
    var player = new Splendor.Player();
    player.tableau = [{gem: 'sapphire'}, {gem: 'sapphire'}];
    player.chips.diamond = 1;
    player.chips.sapphire = 1;
    player.chips.emerald = 1;
    player.chips.ruby = 1;
    player.chips.onyx = 1;
    player.chips.gold = 1;
    var card = {
      diamond: 0,
      sapphire: 2,
      emerald: 0,
      ruby: 2,
      onyx: 0
    };
    expect(player.payment(card)).toEqual({
      diamond: 0,
      sapphire: 0,
      emerald: 0,
      ruby: 1,
      onyx: 0,
      gold: 1
    });
  });
});