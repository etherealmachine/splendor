import csv
import json

with open('cards.csv') as f:
	r = csv.DictReader(f)
	cards = [row for row in r]

gems = [
	'diamond',
	'sapphire',
	'emerald',
	'ruby',
	'onyx'
]

for card in cards:
	for gem in gems:
		if card[gem] == '':
			card[gem] = 0
		else:
			card[gem] = int(card[gem])
	card['points'] = int(card['points'])
	card['level'] = int(card['level'])

print 'window.Splendor = window.Splendor || {cards: %s};' % (json.dumps(cards),)