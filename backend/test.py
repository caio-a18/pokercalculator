import poker_cards

import poker_game

your_hand = ["AD", "AC"]

opponent1_hand = ["JS", "JH"]

test = poker_game.PokerGame(2, [])

test.update_cards(your_hand)

print(test.all_cards)

print(test.clubs)

print(test.diamonds)