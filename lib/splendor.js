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

Splendor.gems = [
	'diamond',
	'sapphire',
	'emerald',
	'ruby',
	'onyx'
];

function shuffle(list) {
	for (var i = list.length-1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i+1));
		var tmp = list[i];
		list[i] = list[j];
		list[j] = tmp;
	}
}

var Player = function() {
	this.tableau = [];
	this.reserved = [];
	this.gold = 0;
	this.chips = {
		diamond: 0,
		sapphire: 0,
		emerald: 0,
		ruby: 0,
		onyx: 0,
	};
};

var Level = function(level) {
	this.level = level;
	this.cards = [];
	this.draw = [];
	cards.forEach(function(card) {
		if (card.level == level) {
			this.draw.push(card);
		}
	}.bind(this));
	for (var i = 0; i < 4; i++) {
		this.cards.push(this.draw.shift());
	}
};

Splendor.Game = function(numPlayers) {
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
	this.player = new Player();
	this.opponents = []
	for (var i = 0; i < numPlayers-1; i++) {
		this.opponents.push(new Player());
	}
};

var listeners = [];
Splendor.recv = function(listener) {
	listeners.push(listener);
};

Splendor.send = function() {
	listeners.forEach(function(listener) { listener() });
};

})(window.Splendor = window.Splendor || {});