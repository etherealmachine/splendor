import csv
import json

with open('cards.csv') as f:
	r = csv.DictReader(f)
	items = [row for row in r]

gems = [
	'diamond',
	'sapphire',
	'emerald',
	'ruby',
	'onyx'
]

cards = []
for item in items:
	card = {
		'cost': [0, 0, 0, 0, 0],
		'gem': item['gem'],
		'points': int(item['points']),
		'level': int(item['level'])
	}
	for i, gem in enumerate(gems):
		if item[gem] != '':
			card['cost'][i] = int(item[gem])
	cards.append(card)

print 'window.Splendor = window.Splendor || {cards: %s};' % (json.dumps(cards),)