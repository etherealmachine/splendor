var diamond = 'diamond';
var sapphire = 'sapphire';
var emerald = 'emerald';
var ruby = 'ruby';
var onyx = 'onyx';

var gems = [
	diamond,
	sapphire,
	emerald,
	ruby,
	onyx
];

(function(Splendor) {

var nobles = [
	{
		points: 3,
		ruby: 4,
		emerald: 4
	},
	{
		points: 3,
		onyx: 3,
		ruby: 3,
		diamond: 3 
	},
	{
		points: 3,
		sapphire: 4,
		diamond: 4
	},
	{
		points: 3,
		onyx: 4,
		diamond: 4
	},
	{
		points: 3,
		sapphire: 4,
		emerald: 4
	},
	{
		points: 3,
		emerald: 3,
		sapphire: 3,
		ruby: 3
	},
	{
		points: 3,
		emerald: 3,
		sapphire: 3,
		diamond: 3
	},
	{
		points: 3,
		onyx: 4,
		ruby: 4
	},
	{
		points: 3,
		onyx: 3,
		sapphire: 3,
		diamond: 3
	},
	{
		points: 3,
		onyx: 3,
		ruby: 3,
		emerald: 3
	}
];

function shuffle(list) {
	for (var i = list.length-1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i+1));
		var tmp = list[i];
		list[i] = list[j];
		list[j] = tmp;
	}
}

var Player = function(name) {
	this.name = name;
	this.tableau = [];
	this.reserved = [];
	this.chips = {
		diamond: 0,
		sapphire: 0,
		emerald: 0,
		ruby: 0,
		onyx: 0,
		gold: 0
	};
};

Player.prototype.bonus = function() {
	var bonus = {};
	gems.forEach(function(gem) {
		bonus[gem] = 0;
	});
	this.tableau.forEach(function(card) {
		bonus[card.gem]++;
	});
	return bonus;
}

Player.prototype.payment = function(costs) {
	var payment = {
		gold: 0
	};
	var balance = 0;
	var bonus = this.bonus();
	costs.forEach(function(cost, i) {
		var gem = gems[i];
		cost = Math.max(0, cost - bonus[gem]);
		if (this.chips[gem] >= cost) {
			payment[gem] = cost;
		} else {
			payment[gem] = this.chips[gem];
			balance += cost - this.chips[gem];
		}
	}.bind(this));
	if (balance > 0 && this.chips.gold >= balance) {
		payment.gold = balance;
	} else if (balance > 0) {
		return null;
	}
	return payment;
};

var Level = function(level) {
	this.level = level;
	this.cards = [];
	this.draw = [];
	Splendor.cards.forEach(function(card) {
		if (card.level == level) {
			this.draw.push(card);
		}
	}.bind(this));
	for (var i = 0; i < 4; i++) {
		this.cards.push(this.draw.shift());
	}
};

var Game = function(numPlayers) {
	this.nobles = [];
	shuffle(nobles);
	for (var i = 0; i < numPlayers+1; i++) {
		this.nobles.push(nobles[i]);
		this.nobles[i].index = i;
	}
	this.levels = [
		new Level(1),
		new Level(2),
		new Level(3),
	];
	this.chips = {
		diamond: 7,
		sapphire: 7,
		emerald: 7,
		ruby: 7,
		onyx: 7,
		gold: 5
	};
	var remove = 0;
	if (numPlayers == 3) {
		remove = 2;
	} else if (numPlayers == 2) {
		remove = 3;
	}
	Splendor.gems.forEach(function(gem) {
		this.chips[gem] -= remove;
	}.bind(this));
	this.player = new Player('Human');
	this.opponents = []
	for (var i = 1; i <= numPlayers-1; i++) {
		this.opponents.push(new Player('Computer ' + i));
	}
};

Game.prototype.take = function(player, chips) {
	chips.forEach(function(gem) {
		var count = 1;
		if (chips.length == 1 && this.chips[gem] >= 4) {
			count = 2;
		}
		player.chips[gem] += count;
		this.chips[gem] -= count;
	}.bind(this));
}

Game.prototype.reserve = function(player, card) {
	// place the card in the player's reserved list
	player.reserved.push(card);

  // remove and replace the card from the level
  var level = this.levels[card.level-1];
  var drawn = level.draw.shift();
  level.cards.splice(level.cards.indexOf(card), 1, drawn);

  // give the player 1 gold
  this.chips.gold -= 1;
  player.chips.gold += 1;
}

Game.prototype.purchase = function(player, card) {
  // compute payment
  var payment = player.payment(card.cost);
  if (payment == null) {
    console.error('trying to purchase unaffordable card');
    return;
  }

  // pay for the card
  for (var gem in payment) {
    var chips = payment[gem];
    this.player.chips[gem] -= chips;
    this.chips[gem] += chips;
  }

  // place the card in the player's tableau
  player.tableau.push(card);

  if (player.reserved.indexOf(card) != -1) {
	  // remove the card from the player's reserved list
	  player.reserved.splice(player.reserved.indexOf(card), 1);
	} else {
	  // remove and replace the card from the level
	  var level = this.levels[card.level-1];
	  var drawn = level.draw.shift();
	  level.cards.splice(level.cards.indexOf(card), 1, drawn);
	}
}

Game.prototype.reserveRandom = function(player, level) {
  // assert the player cannot have more than 3 reserved cards
  if (player.reserved.length >= 3) {
    console.error('trying to reserve more than three cards');
    return;
  }

  // assert the deck has cards left
  if (level.draw.length <= 0) {
    console.error('trying to reserve from empty deck');
    return;
  }
  // draw a card and transfer it to the player's reserved list
	var drawn = level.draw.shift();
  player.reserved.push(drawn);

  // give the player 1 gold
  this.chips.gold -= 1;
  player.chips.gold += 1;
}

Splendor.gems = gems;
Splendor.Player = Player;
Splendor.Game = Game;

var listeners = [];
Splendor.recv = function(listener) {
	listeners.push(listener);
};

Splendor.send = function(event) {
	listeners.forEach(function(listener) { listener(event) });
};

})(window.Splendor = window.Splendor || {});